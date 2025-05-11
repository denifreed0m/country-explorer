import { Box, Typography } from '@mui/material';
import { Country } from '@/src/types/country';

interface CountryBasicInfoProps {
  country: Country;
}

export function CountryBasicInfo({ country }: CountryBasicInfoProps) {
  return (
    <Box component="section" aria-labelledby="basic-info-heading">
      <Typography variant="h6" component="h2" id="basic-info-heading" gutterBottom>
        Basic Information
      </Typography>
      <Box component="dl" display="flex" flexDirection="column" gap={1}>
        <Box component="div" display="flex" gap={1}>
          <Typography component="dt" variant="body1" fontWeight="bold">
            Country Code:
          </Typography>
          <Typography component="dd" variant="body1">
            {country.code}
          </Typography>
        </Box>
        <Box component="div" display="flex" gap={1}>
          <Typography component="dt" variant="body1" fontWeight="bold">
            Capital:
          </Typography>
          <Typography component="dd" variant="body1">
            {country.capital || 'N/A'}
          </Typography>
        </Box>
        <Box component="div" display="flex" gap={1}>
          <Typography component="dt" variant="body1" fontWeight="bold">
            Continent:
          </Typography>
          <Typography component="dd" variant="body1">
            {country.continent.name} ({country.continent.code})
          </Typography>
        </Box>
        <Box component="div" display="flex" gap={1}>
          <Typography component="dt" variant="body1" fontWeight="bold">
            AWS Region:
          </Typography>
          <Typography component="dd" variant="body1">
            {country.awsRegion || 'N/A'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
