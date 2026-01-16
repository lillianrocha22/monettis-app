"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, DownloadIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useRef, useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
  year: string;
}

const AiReportButton = ({ month, year, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month, year });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };

  const handleSavePDF = async () => {
    if (!reportRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;

    // Criar clone com estilos para PDF (texto preto em fundo branco)
    const clone = reportRef.current.cloneNode(true) as HTMLElement;
    clone.style.color = "#000000";
    clone.style.backgroundColor = "#ffffff";
    clone.style.padding = "20px";

    // Aplicar cor preta a todos os elementos filhos
    clone.querySelectorAll("*").forEach((el) => {
      (el as HTMLElement).style.color = "#000000";
    });

    await html2pdf()
      .set({
        margin: [10, 10, 20, 10], // [top, right, bottom, left]
        filename: `relatorio-ia-${month}-${year}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(clone)
      .save();
  };
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-9 px-2 text-xs md:h-10 md:px-4 md:text-sm">
          <span className="hidden sm:inline">Relatório IA</span>
          <BotIcon className="h-4 w-4 sm:ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-4 max-w-[600px] md:mx-0">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-muted-foreground prose-h3:text-muted-foreground prose-h4:text-muted-foreground prose-strong:text-muted-foreground">
              <div ref={reportRef}>
                <Markdown>{report}</Markdown>
              </div>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              {report && (
                <Button variant="outline" onClick={handleSavePDF}>
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Salvar em PDF
                </Button>
              )}
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;