import { Box, Typography } from '@mui/material';
import { Country } from '@/src/types/country';

interface CountryLanguagesProps {
  country: Country;
}

export function CountryLanguages({ country }: CountryLanguagesProps) {
  return (
    <Box component="section" aria-labelledby="languages-heading">
      <Typography variant="h6" component="h2" id="languages-heading" gutterBottom>
        Languages
      </Typography>
      <Box component="dl" display="flex" flexDirection="column" gap={1}>
        {country.languages.map(lang => (
          <Box key={lang.code} component="div" display="flex" gap={1}>
            <Typography component="dt" variant="body1" fontWeight="bold">
              {lang.name}:
            </Typography>
            <Typography component="dd" variant="body1">
              {lang.code}
              {lang.native && ` (Native: ${lang.native})`}
              {lang.rtl && ' (RTL)'}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
