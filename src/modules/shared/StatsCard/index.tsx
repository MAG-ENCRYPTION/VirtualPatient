import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
  max-width: 250px;
  height: 130px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }

  h3 {
    text-align: center;
  }
`;

export type StatType = {
  icon: ReactNode;
  text: string;
  value: number;
};

export const StatsCard = ({ stat }: { stat: StatType }) => {
  return (
    <Container>
      <div>
        {stat.icon}
        <Typography component='h2' variant='h6' color='primary'>
          {stat.text}
        </Typography>
      </div>
      <Typography component='p' color='text.secondary' variant='h3'>
        {stat.value}
      </Typography>
    </Container>
  );
};
