import InputNicknamePage from "./_components/inputNickname";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SetNicknamePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const email = resolvedSearchParams.email as string;
  return <InputNicknamePage email={email} />;
}
