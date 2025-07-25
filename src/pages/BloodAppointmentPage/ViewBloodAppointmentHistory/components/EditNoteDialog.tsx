import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface EditNoteDialogProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditNoteDialog: React.FC<EditNoteDialogProps> = ({ open, value, onChange, onClose, onSave }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Chỉnh sửa ghi chú</DialogTitle>
    <DialogContent>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Ghi chú"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ mt: 2 }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Hủy</Button>
      <Button onClick={onSave} variant="contained">Lưu</Button>
    </DialogActions>
  </Dialog>
);

export default EditNoteDialog; 