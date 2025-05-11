'use client';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { apolloClient } from '../lib/apollo-client';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  colorSchemes: {
    dark: true,
    light: true,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  );
}
