import { Box, Typography } from '@mui/material';
import { Country } from '@/src/types/country';

interface CountryContactInfoProps {
  country: Country;
}

export function CountryContactInfo({ country }: CountryContactInfoProps) {
  return (
    <Box component="section" aria-labelledby="contact-info-heading">
      <Typography variant="h6" component="h2" id="contact-info-heading" gutterBottom>
        Contact Information
      </Typography>
      <Box component="dl" display="flex" flexDirection="column" gap={1}>
        <Box component="div" display="flex" gap={1}>
          <Typography component="dt" variant="body1" fontWeight="bold">
            Phone Code:
          </Typography>
          <Typography component="dd" variant="body1">
            {country.phone || 'N/A'}
          </Typography>
        </Box>
        {country.phones && country.phones.length > 0 && (
          <Box component="div" display="flex" gap={1}>
            <Typography component="dt" variant="body1" fontWeight="bold">
              Phone Codes:
            </Typography>
            <Typography component="dd" variant="body1">
              {country.phones.join(', ')}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
