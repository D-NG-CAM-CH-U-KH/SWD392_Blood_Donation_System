import { HealthQuestion, HealthCategory, RiskLevel } from '../types/health.types';

export const healthQuestions: HealthQuestion[] = [
  {
    key: 'dangerousIllness',
    label: 'Bạn có mắc các bệnh nguy hiểm sau đây không?',
    category: HealthCategory.DANGEROUS_ILLNESS,
    riskLevel: RiskLevel.CRITICAL,
    description: 'Các bệnh này có thể truyền qua đường máu hoặc gây nguy hiểm cho người hiến',
    options: [
      'Không có',
      'HIV/AIDS',
      'Viêm gan B',
      'Viêm gan C', 
      'Giang mai',
      'Lao phổi',
      'Ung thư',
      'Bệnh tim mạch nghiêm trọng',
      'Đái tháo đường type 1',
      'Bệnh thận mãn tính',
      'Bệnh gan mãn tính',
      'Động kinh',
      'Bệnh tự miễn',
      'Khác'
    ],
    required: true
  },
  {
    key: 'twelveMonthProblem',
    label: 'Trong vòng 12 tháng qua, bạn có gặp các vấn đề sau không?',
    category: HealthCategory.TEMPORARY_CONDITION,
    riskLevel: RiskLevel.HIGH,
    description: 'Các vấn đề này cần thời gian chờ dài để đảm bảo an toàn',
    options: [
      'Không có',
      'Phẫu thuật lớn',
      'Truyền máu',
      'Cấy ghép nội tạng',
      'Điều trị ung thư',
      'Dùng thuốc ức chế miễn dịch',
      'Thai ngoài tử cung',
      'Sẩy thai',
      'Sinh con',
      'Phá thai',
      'Tiêm vaccine COVID-19 (trong 14 ngày)',
      'Du lịch vùng dịch bệnh',
      'Khác'
    ],
    required: true
  },
  {
    key: 'sixMonthProblem', 
    label: 'Trong vòng 6 tháng qua, bạn có gặp các vấn đề sau không?',
    category: HealthCategory.TEMPORARY_CONDITION,
    riskLevel: RiskLevel.MEDIUM,
    description: 'Các vấn đề này cần thời gian chờ trung bình',
    options: [
      'Không có',
      'Xăm mình',
      'Xỏ khuyên',
      'Châm cứu',
      'Phẫu thuật nhỏ',
      'Nội soi có sinh thiết',
      'Điều trị răng có chảy máu',
      'Tiếp xúc với người mắc viêm gan B/C',
      'Quan hệ tình dục không an toàn',
      'Sử dụng ma túy tiêm',
      'Khác'
    ],
    required: true
  },
  {
    key: 'oneMonthProblem',
    label: 'Trong vòng 1 tháng qua, bạn có gặp các vấn đề sau không?',
    category: HealthCategory.TEMPORARY_CONDITION,
    riskLevel: RiskLevel.MEDIUM,
    options: [
      'Không có',
      'Uống thuốc kháng sinh',
      'Tiêm vaccine (trừ COVID-19)',
      'Điều trị bằng corticosteroid',
      'Dùng thuốc chống đông máu',
      'Điều trị hormone',
      'Dị ứng thuốc nghiêm trọng',
      'Nhổ răng',
      'Viêm họng, viêm amidan',
      'Khác'
    ],
    required: true
  },
  {
    key: 'fourteenDayProblem',
    label: 'Trong vòng 14 ngày qua, bạn có gặp các triệu chứng sau không?',
    category: HealthCategory.TEMPORARY_CONDITION,
    riskLevel: RiskLevel.LOW,
    options: [
      'Không có',
      'Sốt (>37.5°C)',
      'Ho, khó thở',
      'Đau họng',
      'Tiêu chảy',
      'Nôn mửa',
      'Đau đầu dữ dội',
      'Mệt mỏi bất thường',
      'Mất vị giác, khứu giác',
      'Phát ban da',
      'Khác'
    ],
    required: true
  },
  {
    key: 'sevenDayProblem',
    label: 'Trong vòng 7 ngày qua, bạn có gặp các vấn đề sau không?',
    category: HealthCategory.LIFESTYLE,
    riskLevel: RiskLevel.LOW,
    options: [
      'Không có',
      'Uống rượu bia',
      'Hút thuốc lá/thuốc lào',
      'Thức khuya (sau 12h đêm)',
      'Căng thẳng, stress',
      'Ăn uống không đều',
      'Tập thể dục quá sức',
      'Đau răng',
      'Cảm lạnh nhẹ',
      'Mất ngủ',
      'Khác'
    ],
    required: true
  },
  {
    key: 'womanProblem',
    label: 'Đối với phụ nữ: Bạn có gặp các tình huống sau không?',
    category: HealthCategory.WOMEN_SPECIFIC,
    riskLevel: RiskLevel.MEDIUM,
    description: 'Chỉ áp dụng cho phụ nữ. Nam giới chọn "Không áp dụng"',
    options: [
      'Không áp dụng',
      'Không có',
      'Đang có thai',
      'Cho con bú',
      'Đang trong kỳ kinh nguyệt',
      'Vừa sinh con (dưới 6 tháng)',
      'Vừa sẩy thai (dưới 3 tháng)',
      'Vừa phá thai (dưới 3 tháng)',
      'Dùng thuốc tránh thai',
      'Khác'
    ],
    required: true
  }
];
