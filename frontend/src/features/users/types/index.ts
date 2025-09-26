export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Defines the shape of the API response from our Phoenix backend
export interface ApiResponse {
  data: User[];
}