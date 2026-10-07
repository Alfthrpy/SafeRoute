export type RouteProfile = 'fast' | 'safe' | 'balanced';

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

export interface RouteGeoJsonFeature {
  type: 'Feature';
  properties: Omit<RouteStepDto, 'geometry'>;
  geometry: RouteGeoJsonGeometry;
}

export interface RouteResponseDto {
  profile: RouteProfile;
  school: { id: string; name: string };
  distanceM: number;
  durationS: number;
  snapDistanceM: number;
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
