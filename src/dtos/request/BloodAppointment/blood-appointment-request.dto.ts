import { DonationFormDTO } from './donation-form.dto';
import { DonationScheduleDTO } from './donation-schedule.dto';

export interface DonationAppointmentDTO {
  userID: number;
  scheduledDate: string; // ISO date string, e.g. '2025-07-01T09:00:00Z'
  status: string;
  location: string;
  note: string;
  bloodVolume: number;
  donationForm?: DonationFormDTO;
  donationSchedule?: DonationScheduleDTO;
}
