"use client";

import { FilePlus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/use-premium-modal";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export function CreateResumeButton({ canCreate }: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal();

  if (canCreate) {
    return (
      <Button className="mx-auto flex w-fit gap-2" asChild variant="gooeyLeft">
        <Link href="/editor">
          <FilePlus className="size-5" />
          New Resume
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mx-auto flex w-fit gap-2"
    >
      <FilePlus className="size-5" />
      New Resume
    </Button>
  );
}
