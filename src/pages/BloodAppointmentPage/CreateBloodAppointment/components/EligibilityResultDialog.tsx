import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  IconButton
} from '@mui/material';
import {
  Close,
  Warning,
  Error,
  Info,
  Schedule,
  AccessTime,
  Person,
  CalendarToday,
  HealthAndSafety,
  Favorite,
  CheckCircle,
  Shield,
  SecurityUpdateGood
} from '@mui/icons-material';
import { EligibilityCheckResult } from './EligibilityChecker';

interface EligibilityResultDialogProps {
  open: boolean;
  onClose: () => void;
  result: EligibilityCheckResult;
  onGoHome?: () => void; // Optional prop
}

const EligibilityResultDialog: React.FC<EligibilityResultDialogProps> = ({
  open,
  onClose,
  result,
  onGoHome
}) => {
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'Schedule': <Schedule />,
      'AccessTime': <AccessTime />,
      'Warning': <Warning />,
      'Person': <Person />,
      'Error': <Error />,
      'Info': <Info />
    };
    return iconMap[iconName] || <Info />;
  };

  const getSeverityColor = (severity: string) => {
    return severity === 'BLOCKER' ? 'error' : 'warning';
  };

  // ✅ Fixed risk level logic - normalize và handle tất cả cases
  const getRiskLevelColor = (riskLevel: any): string => {
    if (!riskLevel && riskLevel !== 0) return '#64748b';
    
    // Convert to string và normalize
    const riskString = String(riskLevel).toLowerCase().trim();
    
    const colorMap: Record<string, string> = {
      // Low Risk - Xanh lá cây (An toàn)
      '0': '#16a34a',
      'low': '#16a34a',
      
      // Medium Risk - Xanh dương (Cần theo dõi)  
      '1': '#0891b2',
      'medium': '#0891b2',
      
      // High Risk - Cam (Có rủi ro)
      '2': '#ea580c',
      'high': '#ea580c',
      
      // Critical Risk - Đỏ (Nguy hiểm)
      '3': '#dc2626',
      'critical': '#dc2626'
    };
    
    return colorMap[riskString] || '#64748b';
  };

  const getRiskLevelText = (riskLevel: any): string => {
    if (!riskLevel && riskLevel !== 0) return 'Chưa đánh giá';
    
    // Convert to string và normalize
    const riskString = String(riskLevel).toLowerCase().trim();
    
    const textMap: Record<string, string> = {
      '0': 'An toàn hiến máu',
      'low': 'An toàn hiến máu',
      
      '1': 'Cần theo dõi',
      'medium': 'Cần theo dõi',
      
      '2': 'Có rủi ro',
      'high': 'Có rủi ro',
      
      '3': 'Không nên hiến máu', 
      'critical': 'Không nên hiến máu'
    };
    
    return textMap[riskString] || `Mức độ: ${riskLevel}`;
  };

  // ✅ Get appropriate icon based on risk level
  const getRiskLevelIcon = (riskLevel: any, isEligible: boolean) => {
    if (isEligible) {
      return <SecurityUpdateGood sx={{ color: '#16a34a', fontSize: 32 }} />;
    }
    
    const riskString = String(riskLevel || '').toLowerCase().trim();
    
    switch (riskString) {
      case '0':
      case 'low':
        return <CheckCircle sx={{ color: '#16a34a', fontSize: 32 }} />;
      case '1':
      case 'medium':
        return <Shield sx={{ color: '#0891b2', fontSize: 32 }} />;
      case '2':
      case 'high':
        return <Warning sx={{ color: '#ea580c', fontSize: 32 }} />;
      case '3':
      case 'critical':
        return <Error sx={{ color: '#dc2626', fontSize: 32 }} />;
      default:
        return <Warning sx={{ color: '#f44336', fontSize: 32 }} />;
    }
  };

  const formatNextEligibleDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            {/* ✅ Use risk-level specific icon */}
            {getRiskLevelIcon(result.riskLevel, result.isEligible)}
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {result.isEligible ? 'Bạn đủ điều kiện hiến máu!' : 'Bạn chưa đủ điều kiện hiến máu'}
              </Typography>
              {/* ✅ Show risk level prominently */}
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: getRiskLevelColor(result.riskLevel),
                  fontWeight: 600,
                  mt: 0.5
                }}
              >
                Mức độ rủi ro: {getRiskLevelText(result.riskLevel)}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        {/* ✅ Enhanced Health Score Card */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 3, 
            background: `linear-gradient(135deg, ${getRiskLevelColor(result.riskLevel)}10, ${getRiskLevelColor(result.riskLevel)}05)`,
            border: `2px solid ${getRiskLevelColor(result.riskLevel)}40`
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight={600}>
              Điểm đánh giá sức khỏe
            </Typography>
            <Chip
              label={getRiskLevelText(result.riskLevel)}
              sx={{
                backgroundColor: getRiskLevelColor(result.riskLevel),
                color: 'white',
                fontWeight: 700,
                fontSize: '0.9rem',
                px: 1
              }}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={result.score}
              sx={{
                height: 16,
                borderRadius: 8,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 8,
                  background: `linear-gradient(90deg, ${getRiskLevelColor(result.riskLevel)}, ${getRiskLevelColor(result.riskLevel)}cc)`
                }
              }}
            />
          </Box>
          
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" fontWeight={600}>
              {result.score}/100 điểm
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: getRiskLevelColor(result.riskLevel),
                fontWeight: 600
              }}
            >
              {getRiskLevelText(result.riskLevel)}
            </Typography>
          </Box>
        </Paper>

        {result.isEligible ? (
          // ✅ Success Case với màu sắc phù hợp
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              '& .MuiAlert-icon': {
                color: getRiskLevelColor(result.riskLevel)
              }
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              🎉 Chúc mừng! Bạn đủ điều kiện hiến máu an toàn.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Trạng thái sức khỏe: <strong>{getRiskLevelText(result.riskLevel)}</strong>
            </Typography>
            <Typography variant="body2">
              Bạn có thể tiếp tục với bước tiếp theo để đặt lịch hẹn hiến máu.
            </Typography>
          </Alert>
        ) : (
          // ❌ Failed Case
          <Box>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                '& .MuiAlert-icon': {
                  color: getRiskLevelColor(result.riskLevel)
                }
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                😔 Rất tiếc, bạn hiện tại chưa đủ điều kiện hiến máu.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Mức độ rủi ro: <strong style={{ color: getRiskLevelColor(result.riskLevel) }}>
                  {getRiskLevelText(result.riskLevel)}
                </strong>
              </Typography>
              <Typography variant="body2">
                Vui lòng xem các vấn đề cần khắc phục bên dưới và cải thiện sức khỏe.
              </Typography>
            </Alert>

            {/* Next Eligible Date */}
            {result.nextEligibleDate && (
              <Card elevation={2} sx={{ mb: 3 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <CalendarToday sx={{ color: getRiskLevelColor(result.riskLevel) }} />
                    <Typography variant="h6" fontWeight={600}>
                      Ngày có thể hiến máu tiếp theo
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: getRiskLevelColor(result.riskLevel),
                      fontWeight: 700
                    }}
                  >
                    {formatNextEligibleDate(result.nextEligibleDate)}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* Failed Conditions */}
            {result.failedConditions && result.failedConditions.length > 0 && (
              <Card elevation={2} sx={{ mb: 3 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <HealthAndSafety sx={{ color: getRiskLevelColor(result.riskLevel) }} />
                    <Typography variant="h6" fontWeight={600}>
                      Các vấn đề cần khắc phục ({result.failedConditions.length})
                    </Typography>
                  </Box>
                  
                  <List sx={{ py: 0 }}>
                    {result.failedConditions.map((condition, index) => (
                      <Box key={index}>
                        <ListItem sx={{ px: 0, py: 1.5 }}>
                          <ListItemIcon>
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                backgroundColor: `${getSeverityColor(condition.severity) === 'error' ? '#ffebee' : '#fff3e0'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {React.cloneElement(getIconComponent(condition.icon), {
                                sx: { 
                                  color: getSeverityColor(condition.severity) === 'error' ? '#d32f2f' : '#f57c00',
                                  fontSize: 22
                                }
                              })}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {condition.condition}
                                </Typography>
                                <Chip
                                  label={condition.category}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    fontSize: '0.7rem',
                                    color: getRiskLevelColor(result.riskLevel),
                                    borderColor: getRiskLevelColor(result.riskLevel)
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {condition.recommendation}
                                </Typography>
                                {condition.waitingPeriod && (
                                  <Typography 
                                    variant="caption" 
                                    sx={{ 
                                      mt: 0.5, 
                                      display: 'block',
                                      color: getRiskLevelColor(result.riskLevel),
                                      fontWeight: 600
                                    }}
                                  >
                                    ⏱️ Cần chờ: {condition.waitingPeriod} ngày
                                  </Typography>
                                )}
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < result.failedConditions.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}

            {/* Health Improvement Recommendations */}
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  💡 Khuyến nghị cải thiện sức khỏe
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="• Duy trì chế độ ăn uống cân bằng, giàu dinh dưỡng" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Tập thể dục đều đặn và nghỉ ngơi đủ giấc" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Tránh xa thuốc lá, rượu bia và chất kích thích" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Kiểm tra sức khỏe định kỳ với bác sĩ" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Uống đủ nước và bổ sung vitamin cần thiết" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        )}
      </DialogContent>

      {/* ✅ Enhanced Dialog Actions */}
      <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          variant="contained"
          size="large"
          sx={{ 
            minWidth: 220,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${getRiskLevelColor(result.riskLevel)}, ${getRiskLevelColor(result.riskLevel)}cc)`,
            color: 'white',
            '&:hover': {
              background: `linear-gradient(135deg, ${getRiskLevelColor(result.riskLevel)}dd, ${getRiskLevelColor(result.riskLevel)})`,
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 24px ${getRiskLevelColor(result.riskLevel)}40`
            }
          }}
        >
          {result.isEligible ? 'Tiếp tục đặt lịch' : 'Đã hiểu'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EligibilityResultDialog;
