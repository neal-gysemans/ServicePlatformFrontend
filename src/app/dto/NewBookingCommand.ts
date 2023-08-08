export interface NewBookingCommand {
  notes: string;
  date_time: Date;
  booked_service_id: bigint;
}
