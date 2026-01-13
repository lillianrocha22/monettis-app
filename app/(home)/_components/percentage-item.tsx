import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between gap-2 md:gap-0">
      {/* Icone */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="rounded-lg bg-white bg-opacity-[3%] p-1.5 md:p-2">
          {icon}
        </div>
        <p className="text-xs text-muted-foreground md:text-sm">{title}</p>
      </div>
      <p className="text-xs font-bold md:text-sm">{value}%</p>
    </div>
  );
};

export default PercentageItem;