export type RouteProfile = 'fast' | 'safe' | 'balanced';

export interface RouteGeoJsonPoint {
  type: 'Point';
  coordinates: number[];
}

export interface RouteGeoJsonGeometry {
  type: 'LineString' | 'MultiLineString';
  coordinates: number[][] | number[][][];
}

export interface RouteStepDto {
  seq: number;
  roadName: string | null;
  distanceM: number;
  durationS: number;
  geometry: RouteGeoJsonGeometry;
}

export interface SafetyDto {
  score: number;
  sidewalkM: number;
  crossings: number;
  busyRoadM: number;
  reasons: string[];
}

export interface RouteGeoJsonFeature {
  type: 'Feature';
  properties: Omit<RouteStepDto, 'geometry'>;
  geometry: RouteGeoJsonGeometry;
}

export interface RouteResponseDto {
  profile: RouteProfile;
  school: { id: string; name: string; location: RouteGeoJsonPoint };
  distanceM: number;
  durationS: number;
  snapDistanceM: number;
  safety: SafetyDto;
  steps: RouteStepDto[];
  geometry: {
    type: 'FeatureCollection';
    features: RouteGeoJsonFeature[];
  };
}

export interface RouteStepRow {
  seq: number;
  roadName: string | null;
  distanceM: number;
  durationS: number;
  geometry: RouteStepDto['geometry'];
}
