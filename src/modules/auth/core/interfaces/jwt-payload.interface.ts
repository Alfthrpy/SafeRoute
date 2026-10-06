export interface JwtPayload {
  userId: string;
  email: string;
  positionId: string;
  positionName: string;
  permissions: string[];
}
