import InputNicknamePage from "./_components/inputNickname";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SetNicknamePage({ searchParams }: PageProps) {
  const email = searchParams.email as string;
  return <InputNicknamePage email={email} />;
}
