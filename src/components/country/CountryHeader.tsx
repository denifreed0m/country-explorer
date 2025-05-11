import { Box, Typography } from '@mui/material';
import { Country } from '@/src/types/country';

interface CountryHeaderProps {
  country: Country;
}

export function CountryHeader({ country }: CountryHeaderProps) {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Box
        sx={{
          fontSize: '6rem',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {country.emoji}
      </Box>
      <Box>
        <Typography variant="h3" component="h2">
          {country.name}
        </Typography>
        {country.native && (
          <Typography
            variant="body1"
            component="p"
            color="text.secondary"
            sx={{ fontSize: '1.5rem', fontWeight: 400 }}
          >
            {country.native}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
