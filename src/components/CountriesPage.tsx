'use client';

import { useQuery } from '@apollo/client';
import {
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Fade,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useMemo, useState, useCallback } from 'react';
import { GET_COUNTRIES } from '@/src/gql';
import { CountriesData, CountryFilterInput } from '@/src/types/countries';
import { useDebounce } from '@/src/hooks/useDebounce';
import { CountriesFilters } from './countries/CountriesFilters';
import { CountriesTable } from './countries/CountriesTable';
import { CountriesGrid } from './countries/CountriesGrid';
import { useRouter, useSearchParams } from 'next/navigation';
import { Modal } from '@mui/material';
import CountryDetailPage from './CountryPage';
import CloseIcon from '@mui/icons-material/Close';
import { PageHeader } from './PageHeader';
import { Suspense } from 'react';

function CountriesPageContent() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryCode = searchParams.get('country');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const filter = useMemo(() => {
    const filter: CountryFilterInput = {};
    if (debouncedSearchQuery) {
      filter.name = { regex: debouncedSearchQuery };
    }
    if (selectedContinent) {
      filter.continent = { eq: selectedContinent };
    }
    return filter;
  }, [debouncedSearchQuery, selectedContinent]);

  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES, {
    variables: {
      filter,
    },
    fetchPolicy: 'cache-first',
  });

  const handleRequestSort = useCallback(() => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  }, [order]);

  const sortedCountries = useMemo(() => {
    return data?.countries
      ? [...data.countries].sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          return order === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
        })
      : [];
  }, [data, order]);

  const handleCountryClick = useCallback(
    (code: string) => {
      router.push(`/countries?country=${code}`, { scroll: false });
    },
    [router]
  );

  const handleCloseModal = useCallback(() => {
    router.push('/countries', { scroll: false });
  }, [router]);

  const PageBody = useMemo(() => {
    return isMobile ? (
      <CountriesGrid
        countries={sortedCountries}
        loading={loading}
        error={error}
        order={order}
        onSort={handleRequestSort}
        onCountryClick={handleCountryClick}
      />
    ) : (
      <CountriesTable
        countries={sortedCountries}
        loading={loading}
        error={error}
        order={order}
        onSort={handleRequestSort}
        onCountryClick={handleCountryClick}
      />
    );
  }, [sortedCountries, loading, error, order, isMobile, handleRequestSort, handleCountryClick]);

  return (
    <>
      <PageHeader title="Country Explorer" />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: 2,
          px: { xs: 2, sm: 3 },
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <CountriesFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedContinent={selectedContinent}
          onContinentChange={setSelectedContinent}
        />

        {PageBody}

        <Modal
          open={!!countryCode}
          onClose={handleCloseModal}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          closeAfterTransition
        >
          <Fade in={!!countryCode}>
            <Box
              sx={{
                position: 'relative',
                width: '90%',
                maxWidth: 'lg',
                maxHeight: '90vh',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                overflow: 'auto',
                transform: 'translateY(0)',
                transition: 'transform 0.2s ease-in-out',
              }}
              role="dialog"
              aria-modal="true"
            >
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                  },
                  zIndex: 1,
                }}
                aria-label="Close country details"
              >
                <CloseIcon />
              </IconButton>
              {countryCode && <CountryDetailPage countryCode={countryCode} />}
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}

export default function CountriesPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <CircularProgress size={40} />
            <Typography variant="h6" color="text.secondary">
              Loading...
            </Typography>
          </Box>
        </Container>
      }
    >
      <CountriesPageContent />
    </Suspense>
  );
}
