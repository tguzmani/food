import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import MacroDistribution from './MacroDistribution';
import { useStoreState } from 'easy-peasy';
import useIsDarkMode from 'hooks/useIsDarkMode';

const BMRs = () => {
  const isDarkMode = useIsDarkMode();

  const { user, offsetBMR, proteinGrams, carbsGrams, fatGrams } = useStoreState(
    state => state.users
  );

  const [showFirstCard, setShowFirstCard] = useState(false);
  const secondCardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowFirstCard(false);
        } else {
          setShowFirstCard(true);
        }
      });
    });

    observer.observe(secondCardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      {showFirstCard && (
        <Card
          sx={{
            position: 'absolute',
            width: 'calc(100vw - 32px)',
            top: 64,
            left: 16,
            zIndex: 1000,
            backgroundColor: 'transparent',
            backdropFilter: 'blur(8px)',
            color: isDarkMode ? 'white' : 'inherit',
          }}
        >
          <Stack
            component={CardContent}
            direction='row'
            spacing={2}
            justifyContent='space-between'
            sx={{ paddingBottom: '16px !important' }}
          >
            <Typography variant='body2'>{offsetBMR.toFixed(0)} cal</Typography>
            <Typography variant='body2' color='error.main'>
              {proteinGrams.toFixed(0)} g
            </Typography>
            <Typography variant='body2' color='primary.main'>
              {carbsGrams.toFixed(0)} g
            </Typography>
            <Typography variant='body2' color='success.main'>
              {fatGrams.toFixed(0)} g
            </Typography>
          </Stack>
        </Card>
      )}
      
      <Card ref={secondCardRef}>
        <CardContent>
          <Typography align='center' variant='h6' mb={2}>
            {offsetBMR.toFixed(0)} cal
          </Typography>
          <MacroDistribution />
        </CardContent>
      </Card>
    </>
  );
};

export default BMRs;