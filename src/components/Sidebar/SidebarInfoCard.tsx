import { ReactNode } from "react";

interface SidebarInfoCardProps {
  children: ReactNode;
  title?: string;
}

export default function SidebarInfoCard({
  children,
  title,
}: SidebarInfoCardProps) {
  return (
    <div className="bg-blueGrayDarker flex flex-col justify-center items-center gap-2 flex-1 rounded-xl p-2 shadow-blackDark">
      {title && <span className="text-lg">{title}</span>}
      <div className="bg-blueGrayDark flex justify-center items-center gap-2 flex-1 p-2 rounded-xl w-full">
        {children}
      </div>
    </div>
  );
}
