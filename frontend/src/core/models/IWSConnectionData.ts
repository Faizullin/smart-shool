export interface IErrorCode {
  INVALID_ARGUMENT: number;
  PERMISSION_DENIED: number;
  NOT_FOUND: number;
  SERVER_ERROR: number;
  RATE_EXCEED: number;
  AUTHENTICATION_ERROR: number;
}

export interface IErrorMessage {
  INVALID_ARGUMENT: string;
  PERMISSION_DENIED: string;
  NOT_FOUND: string;
  SERVER_ERROR: string;
  SENSOR_DATA_TIME_DELAY: string; // Using specific error code name
  AUTHENTICATION_ERROR: string;
}

export const ErrorCodes: IErrorCode = {
  INVALID_ARGUMENT: 4000,
  PERMISSION_DENIED: 4001,
  NOT_FOUND: 4002,
  SERVER_ERROR: 4003,
  RATE_EXCEED: 4004,
  AUTHENTICATION_ERROR: 4005,
};

export interface IUserConnected {
  user_id: number;
  user_full_name: string;
}
