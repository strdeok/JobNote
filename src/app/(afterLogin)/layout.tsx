import Header from "./_components/header";
import PageTitle from "./_components/pageTitle";
import SideNavigation from "./_components/sideNav";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <PageTitle />
      <SideNavigation />
      <div className="relative left-80 w-5xl">{children}</div>
    </>
  );
}
