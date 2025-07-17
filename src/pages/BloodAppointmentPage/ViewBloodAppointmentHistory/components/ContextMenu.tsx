import React from 'react';
import { Menu, MenuItem, Fade } from '@mui/material';
import { EventNote, Edit, Delete } from '@mui/icons-material';

interface ContextMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onView: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ anchorEl, open, onClose, onView, onEdit, onDelete, canEdit }) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    TransitionComponent={Fade}
  >
    <MenuItem onClick={onView}>
      <EventNote sx={{ mr: 1 }} />
      Xem chi tiết
    </MenuItem>
    {canEdit && onEdit && (
      <MenuItem onClick={onEdit}>
        <Edit sx={{ mr: 1 }} />
        Chỉnh sửa
      </MenuItem>
    )}
    {canEdit && onDelete && (
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
        <Delete sx={{ mr: 1 }} />
        Hủy cuộc hẹn
      </MenuItem>
    )}
  </Menu>
);

export default ContextMenu; 