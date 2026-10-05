# AGENT.md — SafeRoute MVP Bandung

> Panduan untuk agen/asisten coding yang mengerjakan repo ini. Sumber: SRS SafeRoute MVP Bandung v1.1 (5 Oktober 2026). Jika ada konflik antara file ini dan SRS, SRS menang; perbarui file ini.

## 1. Ringkasan Proyek

SafeRoute adalah WebGIS rute jalan kaki berbasis keselamatan. Dari titik asal pengguna ke sebuah sekolah, sistem menghasilkan **tiga rute**: `Fastest`, `Safest`, `Balanced`, lalu membandingkan jarak, estimasi waktu, dan tingkat keselamatan relatif.

- Pilot: **Kota Bandung** (batas kecamatan pilot belum ditentukan, lihat §12).
- Faktor keselamatan MVP **hanya atribut jalan itu sendiri**. Kondisi sekitar jalan tidak dihitung.

## 2. Ruang Lingkup

| Termasuk | Tidak termasuk MVP |
|---|---|
| Walking route | Kendaraan bermotor |
| Kota Bandung sebagai pilot | Seluruh Jawa Barat |
| Sekolah sebagai tujuan | Destinasi umum selain sekolah |
| Atribut jalan sebagai safety factor | Environment/land-use scoring, lampu jalan terdekat, sungai, bangunan, kecelakaan |
| Fastest / Safest / Balanced | Live traffic |
| PostgreSQL + PostGIS + pgRouting | Real-time GPS tracking |
| OSM sebagai sumber jaringan jalan | Prediksi kecelakaan berbasis AI |

**Jangan menambah fitur di luar kolom "Tidak termasuk"** tanpa persetujuan eksplisit.

Cakupan sekolah: MVP memakai jenjang **SD** sebagai utama. SMP/SMA/SMK ditambahkan lewat kolom `level` bila koordinat tersedia (OSM atau geocoding alamat dari data Kemendikdasmen).

## 3. Tech Stack

- Database: **PostgreSQL + PostGIS + pgRouting** (routing dengan `pgr_dijkstra`).
- Sumber jaringan jalan: **OpenStreetMap** (BBBike / Overpass / potongan Geofabrik).
- Impor OSM: `osm2pgsql` atau `osm2pgrouting` (dipilih saat implementasi).
- Frontend: WebGIS yang menampilkan rute di peta dan membandingkan metrik.
- Pemotongan ekstrak: `osmium extract` bila memakai Geofabrik Java.

## 4. Arsitektur Data (3 Lapisan)

1. **Geografis:** `LAYER` → `FEATURE` (1:N). **Semua geometry hanya ada di `FEATURE`.**
2. **Domain:** `ROAD`, `SCHOOL` (atribut tanpa geometry; menunjuk ke `FEATURE`).
3. **Graph routing:** `ROAD_NODE` dan `ROAD_EDGE`.

Satu `ROAD` (OSM Way) dipecah menjadi banyak `ROAD_EDGE` pada persimpangan (1:N). Setiap `ROAD_EDGE` punya tepat satu Feature `LineString`; setiap `ROAD_NODE` punya tepat satu Feature `Point`.

## 5. Skema Tabel (ERD v1.1)

**Provenance**
- `DATA_SOURCE`: id, code (UK), name, url, license, attribution
- `IMPORT_BATCH`: id, data_source_id (FK), retrieved_at, source_version, checksum, row_count

**Geografis**
- `LAYER`: id, code (UK), name, geometry_type
- `FEATURE`: id, layer_id (FK), import_batch_id (FK), geom (SRID 4326), source_id

**Domain**
- `ROAD`: id, osm_way_id (UK), name, highway, maxspeed_kmh, maxspeed_status, surface, surface_status, sidewalk, sidewalk_status, access, tags (jsonb)
- `SCHOOL`: id, npsn (UK), name, level, status, address, kelurahan, kecamatan, feature_id (FK, UK)

**Graph**
- `ROAD_NODE`: id, feature_id (FK, UK), osm_node_id
- `ROAD_EDGE`: id, road_id (FK), feature_id (FK, UK), source_node_id (FK), target_node_id (FK), seq_in_road, distance_m, travel_time_s, is_routable
- `SCHOOL_ACCESS_POINT`: id, school_id (FK), road_node_id (FK), snap_distance_m

**Skoring**
- `SCORE_VERSION`: id, version_code (UK), params (jsonb), description, is_active, created_at
- `EDGE_SAFETY`: PK gabungan (edge_id, score_version_id), safety_cost (>= 0), factor_breakdown (jsonb)

**Hasil rute**
- `ROUTE_REQUEST`: id, origin (geom), origin_node_id (FK → ROAD_NODE), school_id (FK), score_version_id (FK), alpha, created_at
- `ROUTE_RESULT`: id, request_id (FK), mode, total_distance_m, total_time_s, total_safety_cost, relative_safety_level
- `ROUTE_RESULT_EDGE`: route_result_id (FK), seq, edge_id (FK)

Daftar `LAYER.code`: `road_node`, `road_edge`, `school`.

## 6. Aturan Integritas (WAJIB)

- **SRID:** simpan di EPSG:4326. Hitung `distance_m` memakai `geography` atau proyeksi lokal UTM 48S (EPSG:32748). Jangan menghitung jarak dalam derajat.
- **Tipe geometry per layer:** `road_node` = Point, `road_edge` = LineString, `school` = Point. Validasi dengan constraint/trigger berdasarkan `layer_id`.
- **Skor non-negatif:** `CHECK (safety_cost >= 0)`. Edge tanpa skor pada versi aktif **tidak boleh dirouting**.
- **Missing ≠ buruk:** `sidewalk_status = 'missing'` bukan `sidewalk = 'no'`. Hanya nilai eksplisit yang dihitung sebagai faktor risiko. Berlaku juga untuk `maxspeed` dan `surface` (kolom `*_status` bernilai `known` / `missing`).
- **Akses:** `access=private` mengeluarkan edge dari jaringan (`is_routable = false`), **bukan** memberi skor rendah.
- **Jalan terlarang pejalan kaki** (mis. `motorway`, jalan tol) dikeluarkan dari jaringan.
- **Skor tidak boleh ditimpa.** Setiap perubahan formula/parameter = `SCORE_VERSION` baru + baris `EDGE_SAFETY` baru, supaya riwayat dapat ditelusuri.
- **Indeks:** GiST pada `FEATURE.geom`; B-tree pada `ROAD_EDGE(source_node_id)`, `ROAD_EDGE(target_node_id)`, `EDGE_SAFETY(score_version_id)`, `SCHOOL(npsn)`.
- **View pgRouting:** `routing_edges` memetakan `id, source, target, cost, reverse_cost` per mode. Edge pejalan kaki dua arah (`reverse_cost = cost`).

## 7. Aturan Atribut Jalan

| Atribut | Peran |
|---|---|
| `highway` | Klasifikasi jalan; faktor safety |
| `maxspeed` | Indikator kecepatan bila tersedia; faktor safety |
| `surface` | Karakteristik permukaan; faktor safety |
| `sidewalk` | Fasilitas pejalan kaki bila tersedia; faktor safety |
| `access` | **Constraint jaringan**, bukan faktor skor |
| `name`, `alt_name` | Informasional, tidak masuk skor |

## 8. Safety Scoring

Skor adalah *derived value* pada level `ROAD_EDGE`. **Formula final belum dikunci** (menunggu validasi cakupan atribut OSM di Bandung).

Usulan awal (untuk divalidasi, jangan dianggap final):

```
safety_cost     = distance_m × risk_multiplier
risk_multiplier = 1 + Σ(bobot_faktor × nilai_risiko_faktor)   # selalu >= 1
```

- Faktor awal: `highway`, `maxspeed`, `sidewalk`, `surface`.
- Atribut `missing` memakai **nilai netral**.
- Simpan parameter di `SCORE_VERSION.params`, rincian per edge di `EDGE_SAFETY.factor_breakdown`.

Langkah validasi sebelum formula dikunci:
1. Hitung persentase edge dengan `sidewalk`, `maxspeed`, `surface` terisi pada area pilot.
2. Faktor bercakupan rendah diberi bobot kecil atau ditunda.
3. Simpan hasil ke `SCORE_VERSION.params` dan `EDGE_SAFETY.factor_breakdown`.

## 9. Routing

| Mode | Edge cost | Tujuan |
|---|---|---|
| Fastest | `travel_time_s` | Waktu minimum |
| Safest | `safety_cost` | Risiko relatif minimum |
| Balanced | `α·norm(time) + (1−α)·norm(safety)` | Keseimbangan; α default 0,5 (konfigurabel) |

- `travel_time_s = distance_m / kecepatan_jalan`; default **5 km/h** (asumsi, konfigurabel).
- Normalisasi dilakukan **global per versi skor** (min-max atau persentil) agar cost per edge tetap statis dan kompatibel dengan shortest-path.
- Titik asal di-snap ke node terdekat; tujuan memakai `SCHOOL_ACCESS_POINT`.
- `relative_safety_level` (tinggi/sedang/rendah) dihitung dari total safety cost **per meter** terhadap sebaran seluruh jaringan (berbasis persentil).
- Simpan setiap hasil: `ROUTE_REQUEST` → `ROUTE_RESULT` (satu per mode) → `ROUTE_RESULT_EDGE`.

## 10. Alur Pemrosesan Data (Pipeline)

1. Catat `DATA_SOURCE`, buat `IMPORT_BATCH`.
2. Ambil data jalan OSM area pilot (BBBike / Overpass / potong dari Geofabrik).
3. Ambil data sekolah (data.go.id / Open Data Bandung; verifikasi dengan Kemendikdasmen).
4. Normalisasi atribut dan validasi (status `known`/`missing`).
5. Simpan geometry ke `FEATURE`, kelompokkan ke `LAYER`.
6. Bangun topologi; pecah menjadi `ROAD_NODE` dan `ROAD_EDGE`.
7. Hitung `distance_m` dan `travel_time_s`.
8. Buat `SCORE_VERSION`; hitung `EDGE_SAFETY`.
9. Snap sekolah ke `ROAD_NODE` (`SCHOOL_ACCESS_POINT`).
10. Gunakan `ROAD_EDGE` sebagai graph routing.

Pipeline harus **idempoten** dan setiap impor tercatat di `IMPORT_BATCH` (tanggal ambil, versi, checksum, row_count).

## 11. Sumber Data (dicek 5 Oktober 2026)

**Sekolah**
- **Utama:** data.go.id — Sekolah Dasar di Kota Bandung: https://data.go.id/dataset/dataset/sekolah-dasar-di-kota-bandung
  Kolom: npsn, nama_sekolah, status_sekolah, alamat, latitude, longitude, no_telepon, kode kecamatan/kelurahan, tahun ajaran. Tidak mutakhir (mencakup 2020/2021 s.d. 2022/2023 Ganjil); hanya SD.
- Sumber asli: https://opendata.bandung.go.id/dataset/sekolah-dasar-di-kota-bandung-2 (dirender JavaScript; buka manual lewat browser).
- Verifikasi via NPSN: https://referensi.data.kemdikbud.go.id/ (tanpa koordinat; perlu geocoding atau join ke OSM). Detail per NPSN: `.../residu/satuanpendidikan/detail/{id}`.
- Pelengkap SMP/SMA/SMK: OSM `amenity=school` via Overpass (cakupan tidak lengkap).
- Validasi jumlah (bukan lokasi): https://bandungkota.bps.go.id/
- DAPODIK Disdik Kota Bandung (https://sinkron.disdik.bandung.go.id/): dari SRS v1.0, belum diverifikasi ulang.
- **Celah:** belum ada dataset berkoordinat resmi untuk SMP/SMA/SMK Kota Bandung yang terverifikasi.

**Jaringan jalan**
- Geofabrik Java: https://download.geofabrik.de/asia/indonesia/java.html (~856 MB `.osm.pbf`; data s.d. 2026-10-03; perlu dipotong ke area pilot).
- BBBike Extract: https://extract.bbbike.org/ (ekstrak poligon kustom, dikirim via email).
- Overpass API: https://wiki.openstreetmap.org/wiki/Overpass_API (cocok untuk area pilot kecil).

**Tooling:** PostGIS https://postgis.net/docs/using_postgis_dbmanagement.html · pgRouting https://docs.pgrouting.org/latest/en/

## 12. Pertanyaan Terbuka (JANGAN diasumsikan; tanyakan ke pemilik proyek)

1. Batas area pilot (kecamatan mana) belum ditentukan.
2. Apakah tag `lit` pada way (lampu di jalan itu sendiri) dihitung sebagai atribut jalan? (Berbeda dari "lampu jalan terdekat" yang di luar MVP.)
3. Sumber koordinat SMP/SMA/SMK: OSM, geocoding, atau permintaan data ke Dinas Pendidikan.
4. Kecepatan jalan default dan nilai α Balanced perlu dikonfirmasi.

Sampai terjawab, buat nilai-nilai tersebut **konfigurabel** (via `SCORE_VERSION.params` / konfigurasi), jangan di-hardcode.

## 13. Lisensi dan Atribusi

- **OSM (ODbL):** wajib menampilkan "© OpenStreetMap contributors" di peta; data turunan mengikuti share-alike.
- **Data sekolah data.go.id / Open Data Bandung:** lisensi tidak tampil eksplisit saat dicek; periksa halaman dataset sebelum redistribusi.
- **Referensi Kemendikdasmen:** pakai untuk verifikasi; periksa ketentuan pemakaian sebelum menyalin massal.
- Catat `license` dan `attribution` di `DATA_SOURCE` untuk setiap sumber.

## 14. Definition of Done MVP

- [ ] Data jalan pilot Bandung dimuat ke PostGIS beserta `IMPORT_BATCH`.
- [ ] Geometry road dan school tersimpan melalui `LAYER` dan `FEATURE`.
- [ ] Node dan edge valid; setiap edge routable punya `distance_m` dan `travel_time_s`.
- [ ] Setiap edge punya `safety_cost` pada versi aktif, dapat ditelusuri lewat `factor_breakdown`.
- [ ] Sekolah terhubung ke graph lewat `SCHOOL_ACCESS_POINT`.
- [ ] Sistem menerima titik asal dan sekolah tujuan, lalu menghasilkan Fastest, Safest, Balanced.
- [ ] Hasil rute tersimpan; frontend menampilkan rute di peta dan membandingkan metriknya.

## 15. Pedoman Kerja untuk Agen

**Lakukan**
- Pertahankan pemisahan geometry (`FEATURE`) dari atribut domain.
- Tulis migrasi SQL yang dapat diulang; sertakan constraint dan indeks di §6.
- Buat versi skor baru, jangan menimpa skor lama.
- Uji routing pada kasus: asal tidak di jaringan (snap), sekolah tanpa access point, edge tanpa skor, jaringan terputus.
- Catat asumsi di komentar atau dokumen ketika menyentuh pertanyaan terbuka.

**Jangan**
- Memperlakukan data `missing` sebagai kondisi buruk.
- Memakai `access` sebagai faktor skor.
- Menyimpan geometry di tabel domain.
- Mengunci formula skor sebelum validasi cakupan atribut selesai.
- Menambahkan faktor lingkungan (lampu terdekat, land-use, kecelakaan, dsb.) ke MVP.
- Melupakan atribusi OSM di UI peta.