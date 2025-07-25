export interface HealthQuestion {
    key: string;
    label: string;
    options: string[];
    required?: boolean;
    category?: HealthCategory;
    riskLevel?: RiskLevel;
    description?: string;
  }
  
  export interface DonationFormData {
    // Personal Info
    userID: number;
    isDonated: boolean;
    lastDonationDate?: string;
    
    // Health Questions từ BloodAppointment.component.tsx
    illness: string[];
    illnessOther?: string;
    
    dangerousIllness: string[];
    dangerousIllnessOther?: string;
    
    twelveMonthProblem: string[];
    twelveMonthProblemOther?: string;
    
    sixMonthProblem: string[];
    sixMonthProblemOther?: string;
    
    oneMonthProblem: string[];
    oneMonthProblemOther?: string;
    
    fourteenDayProblem: string[];
    fourteenDayProblemOther?: string;
    
    sevenDayProblem: string[];
    sevenDayProblemOther?: string;
    
    womanProblem: string[];
    womanProblemOther?: string;
  }
  
  export enum HealthCategory {
    DANGEROUS_ILLNESS = 'dangerous_illness',
    TEMPORARY_CONDITION = 'temporary_condition',
    WOMEN_SPECIFIC = 'women_specific',
    LIFESTYLE = 'lifestyle',
    MEDICATION = 'medication'
  }
  
  export enum RiskLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
  }
  