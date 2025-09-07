"use client";

import { useState, Suspense } from "react";
import Header from "./_components/header";
import InfoChangeModal from "./_components/infoChangeScreen/infoChangeModal";
import PageTitle from "./_components/pageTitle";
import SideNavigation from "./_components/sideNav";
import ProtectedPage from "./_components/protectedPage";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Suspense>
        <ProtectedPage>
          <Header />
          <PageTitle />
          <SideNavigation setIsModal={setIsModal} />
          {isModal && (
            <InfoChangeModal isModal={isModal} setIsModal={setIsModal} />
          )}
          <div className="ml-80 pr-16">{children}</div>
        </ProtectedPage>
      </Suspense>
    </>
  );
}
