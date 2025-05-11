import { Box, Typography } from '@mui/material';
import { Country } from '@/src/types/country';

interface CountryCurrencyProps {
  country: Country;
}

export function CountryCurrency({ country }: CountryCurrencyProps) {
  return (
    <Box component="section" aria-labelledby="currency-heading">
      <Typography variant="h6" component="h2" id="currency-heading" gutterBottom>
        Currency
      </Typography>
      <Box component="dl" display="flex" flexDirection="column" gap={1}>
        <Box component="div" display="flex" gap={1}>
          <Typography component="dt" variant="body1" fontWeight="bold">
            Primary Currency:
          </Typography>
          <Typography component="dd" variant="body1">
            {country.currency || 'N/A'}
          </Typography>
        </Box>
        {country.currencies && country.currencies.length > 0 && (
          <Box component="div" display="flex" gap={1}>
            <Typography component="dt" variant="body1" fontWeight="bold">
              All Currencies:
            </Typography>
            <Typography component="dd" variant="body1">
              {country.currencies.join(', ')}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
