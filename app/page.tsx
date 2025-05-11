'use client';

import { Button, Container, Typography, Box } from '@mui/material';
import styles from './page.module.css';
import { PageHeader } from '@/src/components/PageHeader';

export default function Home() {
  return (
    <>
      <PageHeader title="Country Explorer" />
      <Container maxWidth="lg" className={styles.page}>
        <Box
          component="main"
          className={styles.main}
          sx={{
            gap: 3,
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Country Explorer
          </Typography>
          <Typography color="text.secondary" component="p">
            Discover information about countries around the world. Learn about their population,
            capital cities, languages, and more.
          </Typography>
          <Box sx={{ display: 'inline-flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              href="/countries"
              size="large"
              sx={{ mt: 2 }}
            >
              Explore Countries
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
