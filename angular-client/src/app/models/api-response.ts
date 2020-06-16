export interface ApiResponse<T>{
    status: number;
    message: string;
    result: T;
  }