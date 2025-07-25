import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, IconButton, Button, LinearProgress,
  FormControl, InputLabel, Select, MenuItem, TextField
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import axios from 'axios';

interface CreateBloodRequestDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateBloodRequestDialog: React.FC<CreateBloodRequestDialogProps> = ({ open, onClose, onSuccess }) => {
  const [bloodGroups, setBloodGroups] = useState<any[]>([]);
  const [loadingBloodGroups, setLoadingBloodGroups] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroupId: '',
    volume: '',
    urgencyLevel: '',
    neededDate: '',
    location: ''
  });
  const [formErrors, setFormErrors] = useState<any>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success'|'error'|'info' }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (open) {
      setFormData({ bloodGroupId: '', volume: '', urgencyLevel: '', neededDate: '', location: '' });
      setFormErrors({});
      setSnackbar({ open: false, message: '', severity: 'success' });
      if (bloodGroups.length === 0) {
        setLoadingBloodGroups(true);
        axios.get('https://localhost:5000/api/v1/blood-group')
          .then(res => {
            if (res.data?.data) setBloodGroups(res.data.data);
          })
          .catch(() => setSnackbar({ open: true, message: 'Không thể tải danh sách nhóm máu', severity: 'error' }))
          .finally(() => setLoadingBloodGroups(false));
      }
    }
  }, [open]);

  const validateForm = () => {
    const errors: any = {};
    if (!formData.bloodGroupId) errors.bloodGroupId = 'Vui lòng chọn nhóm máu';
    if (!formData.volume || isNaN(Number(formData.volume)) || Number(formData.volume) < 100) errors.volume = 'Thể tích phải là số lớn hơn 100ml';
    if (!formData.urgencyLevel) errors.urgencyLevel = 'Vui lòng chọn mức độ khẩn cấp';
    if (!formData.neededDate) errors.neededDate = 'Vui lòng chọn ngày cần máu';
    if (!formData.location) errors.location = 'Vui lòng nhập địa điểm';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateBloodRequest = async () => {
    if (!validateForm()) return;
    setLoadingCreate(true);
    try {
      // TODO: Lấy requesterId thực tế từ context/auth
      const requesterId = 3;
      const payload = {
        requesterId,
        bloodGroupId: Number(formData.bloodGroupId),
        volume: Number(formData.volume),
        urgencyLevel: formData.urgencyLevel,
        neededDate: formData.neededDate,
        location: formData.location
      };
      const res = await axios.post('https://localhost:5000/api/v1/blood-request', payload);
      if (res.data?.is_success) {
        setSnackbar({ open: true, message: 'Tạo yêu cầu thành công!', severity: 'success' });
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setSnackbar({ open: true, message: res.data?.message || 'Tạo yêu cầu thất bại', severity: 'error' });
      }
      // Chỉ log JSON ra console
      console.log('JSON gửi BE:', JSON.stringify(payload, null, 2));
    } catch (e: any) {
      setSnackbar({ open: true, message: e?.response?.data?.message || 'Lỗi khi tạo yêu cầu', severity: 'error' });
    } finally {
      setLoadingCreate(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Tạo yêu cầu cần máu</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {loadingBloodGroups ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
            <LinearProgress sx={{ width: '100%' }} />
          </Box>
        ) : (
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth error={!!formErrors.bloodGroupId}>
              <InputLabel>Nhóm máu</InputLabel>
              <Select
                value={formData.bloodGroupId}
                label="Nhóm máu"
                onChange={e => setFormData(f => ({ ...f, bloodGroupId: e.target.value }))}
              >
                <MenuItem value="">Chọn nhóm máu</MenuItem>
                {bloodGroups.map(bg => (
                  <MenuItem key={bg.bloodGroupID} value={bg.bloodGroupID}>{bg.bloodType} - {bg.description}</MenuItem>
                ))}
              </Select>
              {formErrors.bloodGroupId && <Typography color="error" variant="caption">{formErrors.bloodGroupId}</Typography>}
            </FormControl>
            <TextField
              label="Thể tích (ml)"
              type="number"
              value={formData.volume}
              onChange={e => setFormData(f => ({ ...f, volume: e.target.value }))}
              error={!!formErrors.volume}
              helperText={formErrors.volume}
              fullWidth
              inputProps={{ min: 100, step: 50 }}
            />
            <FormControl fullWidth error={!!formErrors.urgencyLevel}>
              <InputLabel>Mức độ khẩn cấp</InputLabel>
              <Select
                value={formData.urgencyLevel}
                label="Mức độ khẩn cấp"
                onChange={e => setFormData(f => ({ ...f, urgencyLevel: e.target.value }))}
              >
                <MenuItem value="">Chọn mức độ</MenuItem>
                <MenuItem value="normal">Bình thường</MenuItem>
                <MenuItem value="urgent">Khẩn cấp</MenuItem>
              </Select>
              {formErrors.urgencyLevel && <Typography color="error" variant="caption">{formErrors.urgencyLevel}</Typography>}
            </FormControl>
            <TextField
              label="Ngày cần máu"
              type="date"
              value={formData.neededDate}
              onChange={e => setFormData(f => ({ ...f, neededDate: e.target.value }))}
              error={!!formErrors.neededDate}
              helperText={formErrors.neededDate}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Địa điểm"
              value={formData.location}
              onChange={e => setFormData(f => ({ ...f, location: e.target.value }))}
              error={!!formErrors.location}
              helperText={formErrors.location}
              fullWidth
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loadingCreate}>Hủy</Button>
        <Button variant="contained" onClick={handleCreateBloodRequest} disabled={loadingCreate || loadingBloodGroups}>
          {loadingCreate ? <LinearProgress sx={{ width: 80 }} /> : 'Tạo yêu cầu'}
        </Button>
      </DialogActions>
      {/* Snackbar nội bộ */}
      {snackbar.open && snackbar.severity !== 'info' && (
        <Box sx={{ position: 'fixed', bottom: 24, left: 0, right: 0, zIndex: 2000 }}>
          <Box display="flex" justifyContent="center">
            <Box bgcolor={snackbar.severity === 'success' ? 'success.main' : snackbar.severity === 'error' ? 'error.main' : 'info.main'} color="white" px={3} py={1.5} borderRadius={2} boxShadow={2}>
              <Typography>{snackbar.message}</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default CreateBloodRequestDialog; 