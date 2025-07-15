export interface DonationScheduleDTO {
    scheduleID: number;
    scheduledDate: string; // hoặc Date nếu bạn parse từ backend
    location: string;
    status: string;
  }
  