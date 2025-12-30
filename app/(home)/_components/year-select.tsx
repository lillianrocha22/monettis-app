"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface YearSelectProps {
  availableYears: number[];
}

const YearSelect = ({ availableYears }: YearSelectProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const handleYearChange = (newYear: string) => {
    // Preservar o mês atual ao mudar o ano
    const params = new URLSearchParams();
    params.set("year", newYear);
    if (month) {
      params.set("month", month);
    }
    push(`/?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={(value) => handleYearChange(value)}
      defaultValue={year ?? ""}
    >
      <SelectTrigger className="w-[120px] rounded-full">
        <SelectValue placeholder="Ano" />
      </SelectTrigger>
      <SelectContent>
        {availableYears.map((yearOption) => (
          <SelectItem key={yearOption} value={yearOption.toString()}>
            {yearOption}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearSelect;
