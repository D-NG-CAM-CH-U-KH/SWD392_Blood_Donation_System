import {
    Box, Typography, Card, CardContent, FormControlLabel, Checkbox, TextField, FormGroup
  } from '@mui/material';
  import { Favorite } from '@mui/icons-material';
  
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
  }) => (
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
                checked={formData.IsDonated}
                onChange={(e) => setFormData((prev: any) => ({
                  ...prev,
                  IsDonated: e.target.checked
                }))}
              />
            }
            label="Tôi đã từng hiến máu trước đây"
          />
          {formData.IsDonated && (
            <TextField
              fullWidth
              type="date"
              label="Ngày hiến máu gần nhất"
              value={formData.LastDonationDate}
              onChange={(e) => setFormData((prev: any) => ({
                ...prev,
                LastDonationDate: e.target.value
              }))}
              error={!!errors.LastDonationDate}
              helperText={errors.LastDonationDate}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </CardContent>
      </Card>
      {healthQuestions.map((question) => (
        <Card key={question.key} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>{question.label} *</Typography>
            <FormGroup>
              {question.options.map((option: string) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={(formData[question.key] as string[]).includes(option)}
                      onChange={(e) => handleCheckboxChange(question.key, option, e.target.checked)}
                    />
                  }
                  label={option}
                />
              ))}
              <Box display="flex" alignItems="center" gap={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={(formData[question.key] as string[]).includes('Khác')}
                      onChange={(e) => handleCheckboxChange(question.key, 'Khác', e.target.checked)}
                    />
                  }
                  label="Khác:"
                />
                <TextField
                  size="small"
                  placeholder="Vui lòng mô tả..."
                  disabled={!(formData[question.key] as string[]).includes('Khác')}
                  value={formData[`${question.key}Other`] as string}
                  onChange={(e) => setFormData((prev: any) => ({
                    ...prev,
                    [`${question.key}Other`]: e.target.value
                  }))}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </FormGroup>
            {errors[question.key] && (
              <Typography color="error" variant="caption">{errors[question.key]}</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
  
  export default StepHealthCheck;