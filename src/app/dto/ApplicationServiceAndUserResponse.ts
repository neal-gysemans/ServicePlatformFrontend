import {UserResponse} from "./UserResponse";

export interface ApplicationServiceAndUserResponse {
  name: string;
  description: string;
  cost: string;
  userResponse: UserResponse;
}
