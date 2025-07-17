import React from 'react';
import { Grid, Card, CardContent, Stack, Box, Typography, Avatar } from '@mui/material';

interface Stat {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

interface StatsCardsProps {
  stats: Stat[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    {stats.map((stat, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Card sx={{ height: '100%', width: '250px' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h4" color={`${stat.color}.main`} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: `${stat.color}.main`, width: 48, height: 48 }}>
                {stat.icon}
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default StatsCards; 