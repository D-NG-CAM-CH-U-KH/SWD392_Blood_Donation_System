import React from 'react';
import { Stack, TextField, Tabs, Tab } from '@mui/material';
import { Search } from '@mui/icons-material';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: number;
  onFilterChange: (value: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ search, onSearchChange, filter, onFilterChange }) => (
  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
    <TextField
      size="small"
      placeholder="Tìm kiếm..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      InputProps={{
        startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
      }}
      sx={{ minWidth: 250 }}
    />
    <Tabs value={filter} onChange={(_, v) => onFilterChange(v)} sx={{ ml: 2 }}>
      <Tab label="Tất cả" />
      <Tab label="Chờ xác nhận" />
      <Tab label="Đã xác nhận" />
      <Tab label="Hoàn thành" />
      <Tab label="Đã hủy" />
    </Tabs>
  </Stack>
);

export default FilterBar; 