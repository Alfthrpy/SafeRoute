export const PERMISSIONS = {
  // User Management
  USER: {
    VIEW: 'VIEW_USER',
    ADD: 'ADD_USER',
    UPDATE: 'UPDATE_USER',
    DELETE: 'DELETE_USER',
    MANAGE_PERMISSION: 'MANAGE_USER_PERMISSION',
    CHANGE_POSITION: 'CHANGE_USER_POSITION',
    MANAGE_FAVORITE_SCHOOLS: 'MANAGE_FAVORITE_SCHOOLS',
  },

  // Position Management
  POSITION: {
    VIEW: 'VIEW_POSITION',
    ADD: 'ADD_POSITION',
    UPDATE: 'UPDATE_POSITION',
    DELETE: 'DELETE_POSITION',
  },

  // Permission Management
  PERMISSION: {
    VIEW: 'VIEW_PERMISSION',
    ADD: 'ADD_PERMISSION',
    UPDATE: 'UPDATE_PERMISSION',
    DELETE: 'DELETE_PERMISSION',
  },

  // School Access
  SCHOOL: {
    VIEW: 'VIEW_SCHOOL',
  },

  // Layer Management
  LAYER: {
    VIEW: 'VIEW_LAYER',
    ADD: 'ADD_LAYER',
    UPDATE: 'UPDATE_LAYER',
    DELETE: 'DELETE_LAYER',
  },

  // Route Finding Access
  ROUTE: {
    VIEW: 'VIEW_ROUTE',
  },

  // Self-service profile management
  PROFILE: {
    UPDATE: 'UPDATE_PROFILE',
  },

} as const;
