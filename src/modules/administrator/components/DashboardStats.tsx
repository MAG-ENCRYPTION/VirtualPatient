import {
  Bloodtype,
  HistoryEdu,
  LocalHospital,
  School,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { getStats } from '../../expert-doctor/network';
import { StatsCard, StatType } from '../../shared/StatsCard';

export const DashboardStats = () => {
  const [statValues, setStatValues] = useState<any>();

  useEffect(() => {
    getStats().then((statistics) => {
      setStatValues(statistics);
    });
  }, []);

  const stats: StatType[] = [
    {
      icon: <HistoryEdu sx={{ fontSize: 50, color: '#777' }} />,
      text: 'Learners',
      value: statValues?.learner_physician,
    },
    {
      icon: <LocalHospital sx={{ fontSize: 50, color: '#777' }} />,
      text: 'Clinical Cases',
      value: statValues?.clinical_case,
    },
    {
      icon: <Bloodtype sx={{ fontSize: 50, color: '#777' }} />,
      text: 'Experts',
      value: statValues?.expert,
    },
    {
      icon: <School sx={{ fontSize: 50, color: '#777' }} />,
      text: 'Evaluations',
      value: statValues?.evaluation,
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      {stats.map((stat) => (
        <Grid item xs={3} key={stat.text}>
          <StatsCard stat={stat} />
        </Grid>
      ))}
    </Grid>
  );
};
