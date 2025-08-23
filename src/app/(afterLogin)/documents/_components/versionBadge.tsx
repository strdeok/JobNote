import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export default function VersionBadge({ children }: { children: string }) {
  return (
    <div className="flex justify-center">
      <div
        className={`${roboto.className} bg-main px-2 py-1 text-white text-xs rounded-xs flex items-center`}
      >
        {children}
      </div>
    </div>
  );
}
