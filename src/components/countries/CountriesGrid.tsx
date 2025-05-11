import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Link,
  TableSortLabel,
} from '@mui/material';
import { Country } from '@/src/types/countries';

interface CountriesGridProps {
  countries: Country[];
  loading: boolean;
  error: Error | undefined;
  order: 'asc' | 'desc';
  onSort: () => void;
  onCountryClick: (code: string) => void;
}

export function CountriesGrid({
  countries,
  loading,
  error,
  order,
  onSort,
  onCountryClick,
}: CountriesGridProps) {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <TableSortLabel active={true} direction={order} onClick={onSort} sx={{ cursor: 'pointer' }}>
          Sort by name
        </TableSortLabel>
      </Box>

      {loading && (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={4}>
          <CircularProgress size={40} />
          <Typography variant="h6" color="text.secondary">
            Loading countries...
          </Typography>
        </Box>
      )}

      {!!error && (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={4}>
          <Typography variant="h6" color="error">
            Error loading countries: {error.message}
          </Typography>
        </Box>
      )}

      {countries.length === 0 && !loading && !error && (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={4}>
          <Typography variant="h6" color="text.secondary">
            No countries found
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
          width: '100%',
        }}
        role="list"
        aria-label="List of countries"
      >
        {!loading &&
          !error &&
          countries.map(country => (
            <Box key={country.code} role="listitem">
              <Card
                sx={{
                  height: '100%',
                  '&:focus-within': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                  },
                }}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCountryClick(country.code);
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom component="h2">
                    {country.emoji}{' '}
                    <Link
                      component="button"
                      onClick={() => onCountryClick(country.code)}
                      sx={{
                        textAlign: 'left',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        '&:focus-visible': {
                          outline: '2px solid',
                          outlineColor: 'primary.main',
                          outlineOffset: '2px',
                        },
                      }}
                      aria-label={`View details for ${country.name}`}
                    >
                      {country.name}
                    </Link>
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Capital: {country.capital}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Continent: {country.continent.name}
                  </Typography>
                  <Typography color="text.secondary">Currency: {country.currency}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
