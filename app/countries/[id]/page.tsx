import CountryDetailPage from '@/src/components/CountryPage';

export default async function CountryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <CountryDetailPage countryCode={id} />;
}
