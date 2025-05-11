'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { PageHeader } from '@/src/components/PageHeader';

export default function NotFound() {
  return (
    <>
      <PageHeader title="Country Explorer" />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          gap={3}
          sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper' }}
        >
          <Typography variant="h1" component="h1" color="primary">
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </Typography>
          <Button component={Link} href="/" variant="contained" color="primary" size="large">
            Return to Home
          </Button>
        </Box>
      </Container>
    </>
  );
}
