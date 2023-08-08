import {UserResponse} from "./UserResponse";

export interface ApplicationServiceAndUserResponse {
  id: bigint;
  name: string;
  description: string;
  cost: number;
  serviceProvider: UserResponse;
}
