import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CONTINENTS } from '@/src/gql';
import { ContinentsData } from '@/src/types/continents';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface CountriesFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedContinent: string | null;
  onContinentChange: (value: string | null) => void;
}

export function CountriesFilters({
  searchQuery,
  onSearchChange,
  selectedContinent,
  onContinentChange,
}: CountriesFiltersProps) {
  const { data: continentsData } = useQuery<ContinentsData>(GET_CONTINENTS, {
    fetchPolicy: 'cache-first',
  });

  return (
    <Box
      component="section"
      role="search"
      aria-label="Country filters"
      sx={{
        mb: 2,
        display: 'flex',
        gap: 2,
      }}
    >
      <FormControl
        variant="outlined"
        sx={{
          minWidth: 200,
          maxWidth: 200,
        }}
      >
        <InputLabel id="continent-select-label">Continent</InputLabel>
        <Select
          labelId="continent-select-label"
          id="continent-select"
          value={selectedContinent || ''}
          onChange={e =>
            onContinentChange(e.target.value === '' ? null : (e.target.value as string))
          }
          label="Continent"
          aria-label="Filter by continent"
        >
          <MenuItem value="">
            <em>All Continents</em>
          </MenuItem>
          {continentsData?.continents.map((continent: { code: string; name: string }) => (
            <MenuItem key={continent.code} value={continent.code}>
              {continent.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        placeholder="Search countries..."
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton onClick={() => onSearchChange('')} edge="end" aria-label="Clear search">
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        aria-label="Search countries by name"
      />
    </Box>
  );
}
