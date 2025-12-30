import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
  year: z.string().refine((value) => {
    const yearNum = parseInt(value, 10);
    const currentYear = new Date().getFullYear();
    return !isNaN(yearNum) && yearNum >= 2000 && yearNum <= currentYear + 1;
  }),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;