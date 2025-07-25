import type { DonationFormData } from '../../../../types/health.types';

export interface EligibilityCheckResult {
  isEligible: boolean;
  failedConditions: FailedCondition[];
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  nextEligibleDate?: Date;
}

export interface FailedCondition {
  category: string;
  condition: string;
  severity: 'WARNING' | 'BLOCKER';
  recommendation: string;
  waitingPeriod?: number;
  icon: string;
}

export class DonorEligibilityChecker {
  private static readonly ELIGIBILITY_RULES = {
    DONATION_INTERVAL: {
      male: 56,
      female: 84,
    },
    
    ABSOLUTE_EXCLUSIONS: [
      'HIV/AIDS', 'Viêm gan B', 'Viêm gan C', 'Giang mai', 'Ung thư'
    ] as const,
    
    // ✅ Sửa TypeScript Error: Thêm Record<string, number>
    TEMPORARY_EXCLUSIONS: {
      'Phẫu thuật': 365,
      'Truyền máu': 365,
      'Xăm mình/xỏ khuyên': 180,
      'Uống thuốc kháng sinh': 30,
      'Cảm cúm, sốt': 14,
      'Đau răng': 7,
      'Uống rượu bia': 1,
    } as Record<string, number>,
  };

  static checkEligibility(formData: DonationFormData, userGender: 'male' | 'female' = 'male'): EligibilityCheckResult {
    const result: EligibilityCheckResult = {
      isEligible: true,
      failedConditions: [],
      score: 100,
      riskLevel: 'LOW'
    };

    this.checkDonationInterval(formData, userGender, result);
    this.checkDangerousIllnesses(formData, result);
    this.checkTemporaryConditions(formData, result);
    this.checkWomenSpecificConditions(formData, result);
    this.calculateRiskLevel(result);
    
    return result;
  }

  private static checkDonationInterval(
    formData: DonationFormData,
    gender: 'male' | 'female',
    result: EligibilityCheckResult
  ) {
    if (formData.isDonated && formData.lastDonationDate) {
      const lastDonation = new Date(formData.lastDonationDate);
      const today = new Date();
      const daysSince = Math.floor((today.getTime() - lastDonation.getTime()) / (1000 * 60 * 60 * 24));
      const requiredInterval = this.ELIGIBILITY_RULES.DONATION_INTERVAL[gender];
      
      if (daysSince < requiredInterval) {
        const waitingDays = requiredInterval - daysSince;
        const nextEligibleDate = new Date(lastDonation);
        nextEligibleDate.setDate(nextEligibleDate.getDate() + requiredInterval);
        
        result.failedConditions.push({
          category: 'Thời gian hiến máu',
          condition: 'Chưa đủ thời gian nghỉ ngơi',
          severity: 'BLOCKER',
          recommendation: `Bạn cần chờ thêm ${waitingDays} ngày nữa để có thể hiến máu an toàn`,
          waitingPeriod: waitingDays,
          icon: 'Schedule'
        });
        
        result.nextEligibleDate = nextEligibleDate;
        result.isEligible = false;
        result.score -= 50;
      }
    }
  }

  private static checkDangerousIllnesses(formData: DonationFormData, result: EligibilityCheckResult) {
    const dangerousConditions = Array.isArray(formData.dangerousIllness) 
      ? formData.dangerousIllness 
      : [];
    
    for (const condition of dangerousConditions) {
      if (this.ELIGIBILITY_RULES.ABSOLUTE_EXCLUSIONS.includes(condition as any)) {
        result.failedConditions.push({
          category: 'Bệnh nghiêm trọng',
          condition: condition,
          severity: 'BLOCKER',
          recommendation: 'Bạn không thể hiến máu do mắc bệnh này. Vui lòng tham khảo ý kiến bác sĩ.',
          icon: 'Warning'
        });
        
        result.isEligible = false;
        result.score -= 100;
      }
    }
  }

  private static checkTemporaryConditions(formData: DonationFormData, result: EligibilityCheckResult) {
    const timeFrames = [
      { key: 'twelveMonthProblem', days: 365 },
      { key: 'sixMonthProblem', days: 180 },
      { key: 'oneMonthProblem', days: 30 },
      { key: 'fourteenDayProblem', days: 14 },
      { key: 'sevenDayProblem', days: 7 }
    ];

    timeFrames.forEach(({ key, days }) => {
      const conditions = Array.isArray(formData[key as keyof DonationFormData]) 
        ? formData[key as keyof DonationFormData] as string[]
        : [];
      
      conditions.forEach(condition => {
        if (condition !== 'Không có' && condition !== 'Khác') {
          // ✅ Sửa TypeScript Error: Bây giờ không còn lỗi
          const waitingPeriod = this.ELIGIBILITY_RULES.TEMPORARY_EXCLUSIONS[condition];
          
          if (waitingPeriod && waitingPeriod > 0) {
            result.failedConditions.push({
              category: this.getCategoryName(key),
              condition: condition,
              severity: waitingPeriod > 30 ? 'BLOCKER' : 'WARNING',
              recommendation: `Cần chờ ${waitingPeriod} ngày sau khi ${condition.toLowerCase()}`,
              waitingPeriod: waitingPeriod,
              icon: 'AccessTime'
            });
            
            if (waitingPeriod > 30) {
              result.isEligible = false;
            }
            
            result.score -= waitingPeriod > 30 ? 30 : 10;
          }
        }
      });
    });
  }

  private static checkWomenSpecificConditions(formData: DonationFormData, result: EligibilityCheckResult) {
    const womenProblems = Array.isArray(formData.womanProblem) 
      ? formData.womanProblem 
      : [];
    
    const blockingConditions = ['Đang có thai', 'Cho con bú', 'Đang trong kỳ kinh nguyệt'];
    
    womenProblems.forEach(condition => {
      if (blockingConditions.includes(condition)) {
        result.failedConditions.push({
          category: 'Điều kiện phụ nữ',
          condition: condition,
          severity: 'BLOCKER',
          recommendation: this.getWomenConditionRecommendation(condition),
          icon: 'Person'
        });
        
        result.isEligible = false;
        result.score -= 50;
      }
    });
  }

  private static calculateRiskLevel(result: EligibilityCheckResult) {
    // Clamp score to [0, 100]
    result.score = Math.max(0, Math.min(100, result.score));
    if (result.score >= 80) result.riskLevel = 'LOW';
    else if (result.score >= 60) result.riskLevel = 'MEDIUM';
    else if (result.score >= 30) result.riskLevel = 'HIGH';
    else result.riskLevel = 'CRITICAL';
  }

  private static getCategoryName(key: string): string {
    const categoryMap: Record<string, string> = {
      'twelveMonthProblem': 'Vấn đề 12 tháng qua',
      'sixMonthProblem': 'Vấn đề 6 tháng qua',
      'oneMonthProblem': 'Vấn đề 1 tháng qua',
      'fourteenDayProblem': 'Vấn đề 14 ngày qua',
      'sevenDayProblem': 'Vấn đề 7 ngày qua'
    };
    return categoryMap[key] || key;
  }

  private static getWomenConditionRecommendation(condition: string): string {
    const recommendations: Record<string, string> = {
      'Đang có thai': 'Phụ nữ có thai không được hiến máu. Vui lòng chờ sau khi sinh ít nhất 6 tháng.',
      'Cho con bú': 'Phụ nữ đang cho con bú nên chờ ít nhất 3 tháng sau khi ngừng cho bú.',
      'Đang trong kỳ kinh nguyệt': 'Nên chờ kết thúc kỳ kinh nguyệt 3-5 ngày để hiến máu an toàn.'
    };
    return recommendations[condition] || 'Vui lòng tham khảo ý kiến bác sĩ.';
  }
}
