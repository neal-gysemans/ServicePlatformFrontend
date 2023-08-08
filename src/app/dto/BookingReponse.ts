import {UserResponse} from "./UserResponse";
import {ApplicationServiceAndUserResponse} from "./ApplicationServiceAndUserResponse";

export interface BookingReponse {
  notes:string;
  date_time:Date;
  booker:UserResponse;
  booked_service:ApplicationServiceAndUserResponse;
}
