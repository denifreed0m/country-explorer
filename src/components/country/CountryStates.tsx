import { Box, Typography } from '@mui/material';
import { Country } from '@/src/types/country';

interface CountryStatesProps {
  country: Country;
}

export function CountryStates({ country }: CountryStatesProps) {
  if (!country.states || country.states.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        States/Provinces
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        {country.states.map((state, index) => (
          <Typography key={index} variant="body1">
            {state.name} ({state.code})
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
