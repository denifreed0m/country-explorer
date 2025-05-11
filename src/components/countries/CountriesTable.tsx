import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TableSortLabel,
  CircularProgress,
} from '@mui/material';
import { Country } from '@/src/types/countries';
import { CountriesTableRow } from './CountriesTableRow';

interface CountriesTableProps {
  countries: Country[];
  loading: boolean;
  error: Error | undefined;
  order: 'asc' | 'desc';
  onSort: () => void;
  onCountryClick: (code: string) => void;
}

export function CountriesTable({
  countries,
  loading,
  error,
  order,
  onSort,
  onCountryClick,
}: CountriesTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        maxHeight: 'calc(100vh - 200px)',
        overflow: 'hidden',
        boxShadow: 'none',
        border: 'none',
        position: 'relative',
      }}
    >
      <Table
        stickyHeader
        sx={{
          '& .MuiTableCell-root': {
            borderLeft: 'none',
            borderRight: 'none',
          },
          '& .MuiTableBody-root': {
            overflow: 'auto',
            display: 'block',
            maxHeight: '550px',
          },
          '& .MuiTableHead-root': {
            display: 'table',
            width: '100%',
            tableLayout: 'fixed',
          },
          '& .MuiTableBody-root tr': {
            display: 'table',
            width: '100%',
            tableLayout: 'fixed',
          },
          width: '100%',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell width="25%">
              <TableSortLabel active={true} direction={order} onClick={onSort}>
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell width="25%">Capital</TableCell>
            <TableCell width="25%">Continent</TableCell>
            <TableCell width="25%">Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{
                  width: '100%',
                  height: '400px',
                  border: 'none',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <CircularProgress size={40} />
                  <Typography variant="h6" color="text.secondary">
                    Loading countries...
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
          {!!error && (
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{
                  width: '100%',
                  height: '400px',
                  border: 'none',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <CircularProgress size={40} color="error" />
                  <Typography variant="h6" color="error">
                    Error loading countries: {error.message}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
          {countries.length === 0 && !loading && !error && (
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{
                  width: '100%',
                  height: '400px',
                  border: 'none',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Typography variant="h6" color="text.secondary">
                    No countries found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            !error &&
            countries.map(country => (
              <CountriesTableRow
                key={country.code}
                country={country}
                onCountryClick={onCountryClick}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
