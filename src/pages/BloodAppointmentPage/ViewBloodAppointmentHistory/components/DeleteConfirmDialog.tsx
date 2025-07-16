import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, onDelete }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm">
    <DialogTitle>Xác nhận hủy</DialogTitle>
    <DialogContent>
      <Typography>
        Bạn có chắc muốn hủy cuộc hẹn này? Hành động không thể hoàn tác.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Không</Button>
      <Button onClick={onDelete} variant="contained" color="error">
        Có, hủy
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmDialog; 