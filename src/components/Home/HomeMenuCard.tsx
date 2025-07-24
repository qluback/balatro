import { ReactNode } from "react";

interface HomeMenuCardProps {
  children: ReactNode;
  className?: string;
}

export default function HomeMenuCard({
  children,
  className
}: HomeMenuCardProps) {
  return (
    <div className={`bg-blueGrayDarker flex flex-col justify-center items-center gap-2 rounded-xl pb-2 text-white min-w-[200px] ${className}`}>
      {/* {title && <span className="text-lg text-white">{title}</span>} */}
      <div className="bg-blueGrayDark flex justify-center items-center gap-2 flex-1 p-6 rounded-xl w-full">
        {children}
      </div>
    </div>
  );
}
