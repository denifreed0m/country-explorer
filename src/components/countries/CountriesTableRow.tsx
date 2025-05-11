import { TableCell, TableRow } from '@mui/material';
import { Country } from '@/src/types/countries';

interface CountriesTableRowProps {
  country: Country;
  onCountryClick: (code: string) => void;
}

export function CountriesTableRow({ country, onCountryClick }: CountriesTableRowProps) {
  return (
    <TableRow
      key={country.code}
      onClick={() => onCountryClick(country.code)}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
        '&:focus': {
          backgroundColor: 'action.selected',
          outline: 'none',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '-2px',
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
      <TableCell>
        <span style={{ fontSize: '2rem', marginRight: '0.5rem', verticalAlign: 'middle' }}>
          {country.emoji}
        </span>
        {country.name}
      </TableCell>
      <TableCell>{country.capital}</TableCell>
      <TableCell>{country.continent.name}</TableCell>
      <TableCell>{country.currency}</TableCell>
    </TableRow>
  );
}
