"use client";

import { ArrowDownUpIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
  variant?: "default" | "mobile";
}

const AddTransactionButton = ({
  userCanAddTransaction,
  variant = "default",
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  if (variant === "mobile") {
    return (
      <>
        <Button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
          onClick={() => setDialogIsOpen(true)}
          disabled={!userCanAddTransaction}
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
        <UpsertTransactionDialog
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
        />
      </>
    );
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Adicionar transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;