import EditApplicationsPage from "./_components/EditApplication";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return <EditApplicationsPage id={id} />;
}
