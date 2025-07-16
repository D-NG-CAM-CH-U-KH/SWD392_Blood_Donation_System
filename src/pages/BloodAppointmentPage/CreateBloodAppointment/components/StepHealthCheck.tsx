import {
    Box, Typography, Card, CardContent, FormControlLabel, Checkbox, TextField, FormGroup
  } from '@mui/material';
  import { Favorite } from '@mui/icons-material';
  import React from 'react';
  
  export interface HealthQuestion {
    key: string;
    label: string;
    options: string[];
  }
  
  export interface StepHealthCheckProps {
    formData: any;
    errors: { [key: string]: string };
    healthQuestions: HealthQuestion[];
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    handleCheckboxChange: (questionKey: string, option: string, checked: boolean) => void;
  }
  
  const StepHealthCheck: React.FC<StepHealthCheckProps> = ({
    formData, errors, healthQuestions, setFormData, handleCheckboxChange
  }) => {
    // Validate ngày hiến máu gần nhất
    const today = new Date();
    let lastDonationError = '';
    if (formData.isDonated && formData.lastDonationDate) {
      const last = new Date(formData.lastDonationDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      if (last > today) {
        lastDonationError = 'Ngày hiến máu không được lớn hơn ngày hiện tại';
      } else if (last > threeMonthsAgo) {
        lastDonationError = 'Bạn phải chờ ít nhất 3 tháng từ lần hiến máu cuối';
      }
    }
    return (
      <Box>
        <Box textAlign="center" mb={4}>
          <Favorite sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>Khám sức khỏe</Typography>
          <Typography color="text.secondary">Vui lòng trả lời các câu hỏi về tình trạng sức khỏe</Typography>
        </Box>
        <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isDonated}
                  onChange={(e) => setFormData((prev: any) => ({
                    ...prev,
                    isDonated: e.target.checked
                  }))}
                />
              }
              label="Tôi đã từng hiến máu trước đây"
            />
            {formData.isDonated && (
              <TextField
                fullWidth
                type="date"
                label="Ngày hiến máu gần nhất"
                value={formData.lastDonationDate}
                onChange={(e) => setFormData((prev: any) => ({
                  ...prev,
                  lastDonationDate: e.target.value
                }))}
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
                error={!!lastDonationError}
                helperText={lastDonationError}
              />
            )}
          </CardContent>
        </Card>
        {healthQuestions.map((question) => {
          // Xác định option "Không có" hoặc "Không áp dụng"
          const noneOption = question.key === 'womanProblem' ? 'Không áp dụng' : 'Không có';
          const selected = Array.isArray(formData[question.key]) ? formData[question.key] : [];
          const isNoneSelected = selected.includes(noneOption);
          return (
            <Card key={question.key} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{question.label} *</Typography>
                <FormGroup>
                  {question.options.map((option: string) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={selected.includes(option)}
                          onChange={(e) => handleCheckboxChange(question.key, option, e.target.checked)}
                          disabled={
                            // Nếu đã chọn 'Không có' thì disable các option khác
                            (isNoneSelected && option !== noneOption) ||
                            // Nếu đã chọn option khác thì disable 'Không có'
                            (!isNoneSelected && option === noneOption && selected.length > 0)
                          }
                        />
                      }
                      label={option}
                    />
                  ))}
                  {selected.includes('Khác') && (
                    <TextField
                      size="small"
                      placeholder="Vui lòng mô tả..."
                      value={formData[`${question.key}Other`] || ''}
                      onChange={e => setFormData((prev: any) => ({
                        ...prev,
                        [`${question.key}Other`]: e.target.value
                      }))}
                      sx={{ mt: 1, width: '100%' }}
                    />
                  )}
                </FormGroup>
                {errors[question.key] && (
                  <Typography color="error" variant="caption">{errors[question.key]}</Typography>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    );
  };
  
  export default StepHealthCheck;