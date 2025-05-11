import { Box, Typography } from '@mui/material';
import { Country } from '@/src/types/country';

interface CountrySubdivisionsProps {
  country: Country;
}

export function CountrySubdivisions({ country }: CountrySubdivisionsProps) {
  if (!country.subdivisions || country.subdivisions.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Subdivisions
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        {country.subdivisions.map(subdivision => (
          <Typography key={subdivision.code} variant="body1">
            {subdivision.name} ({subdivision.code})
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
