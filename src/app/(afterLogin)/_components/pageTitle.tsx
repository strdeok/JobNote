"use client";

import { usePathname } from "next/navigation";

export default function PageTitle() {
  const router = usePathname();
  const title = router.split("/")[1];
  return (
    <span className="absolute left-0 -top-14 font-medium text-4xl">
      {title.charAt(0).toUpperCase() + title.slice(1)}
    </span>
  );
}
