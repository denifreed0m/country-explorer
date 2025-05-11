'use client';

import { useQuery } from '@apollo/client';
import { CountryData } from '@/src/types/country';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { GET_COUNTRY } from '@/src/gql';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';
import { CountryHeader } from './country/CountryHeader';
import { CountryBasicInfo } from './country/CountryBasicInfo';
import { CountryContactInfo } from './country/CountryContactInfo';
import { CountryLanguages } from './country/CountryLanguages';
import { CountryCurrency } from './country/CountryCurrency';
import { CountryStates } from './country/CountryStates';
import { CountrySubdivisions } from './country/CountrySubdivisions';

export default function CountryDetailPage({ countryCode }: { countryCode: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data, loading, error } = useQuery<CountryData>(GET_COUNTRY, {
    variables: { countryCode },
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (data?.country === null) {
      notFound();
    }
  }, [data]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress size={40} />
          <Typography variant="h6" color="text.secondary">
            Loading country details...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="h6" color="error">
            Error loading country: {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!data || !data.country) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" flexDirection="column" gap={4}>
        <CountryHeader country={data.country} />
        {isMobile ? (
          <Box display="flex" flexDirection="column" gap={4}>
            <CountryBasicInfo country={data.country} />
            <CountryContactInfo country={data.country} />
            <CountryLanguages country={data.country} />
            <CountryCurrency country={data.country} />
            <CountryStates country={data.country} />
            <CountrySubdivisions country={data.country} />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={4}>
            <Box display="flex" gap={4}>
              <Box flex={1}>
                <CountryBasicInfo country={data.country} />
              </Box>
              <Box flex={1}>
                <CountryContactInfo country={data.country} />
              </Box>
            </Box>
            <Box display="flex" gap={4}>
              <Box flex={1}>
                <CountryLanguages country={data.country} />
              </Box>
              <Box flex={1}>
                <CountryCurrency country={data.country} />
              </Box>
            </Box>
            <Box>
              <CountryStates country={data.country} />
            </Box>
            <Box>
              <CountrySubdivisions country={data.country} />
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}
