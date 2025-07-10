export interface DonationFormDTO {
    formID: number;
    userID: number;
    isDonated: boolean;
    illness?: string;
    dangerousIllness?: string;
    twelveMonthProblem?: string;
    sixMonthProblem?: string;
    oneMonthProblem?: string;
    fourteenDayProblem?: string;
    sevenDayProblem?: string;
    womanProblem?: string;
  }
  