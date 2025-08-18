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
      <div id="gray-bar" className="bg-[#F5F5F5] w-full h-36" />
      <SideNavigation />
      <div className="relative left-80 w-5xl">
        <PageTitle />
        {children}
      </div>
    </>
  );
}
