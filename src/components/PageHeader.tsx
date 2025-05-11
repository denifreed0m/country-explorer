import {
  AppBar,
  IconButton,
  Container,
  Toolbar,
  Typography,
  useColorScheme,
  Tooltip,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  const { mode, setMode } = useColorScheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      component="nav"
      role="navigation"
      aria-label="Main navigation"
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Link>
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
              color="inherit"
              aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
              sx={{ ml: 1 }}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
