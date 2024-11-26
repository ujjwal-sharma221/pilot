"use client";

import Link from "next/link";
import { formatDate } from "date-fns";
import { useState, useTransition } from "react";
import { Ellipsis, FileX2 } from "lucide-react";
import { toast } from "sonner";

import { ResumeServerData } from "@/lib/types/db-types";
import { ResumePreview } from "@/components/resume-preview";
import { mapToResumeValues } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteResume } from "@/actions/delete.resume.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/loading-button";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export function ResumeItem({ resume }: ResumeItemProps) {
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group rounded-lg border border-transparent bg-zinc-50 p-3 transition-colors hover:border-zinc-200">
      <div className="space-y-3">
        <div className="flex justify-center">
          <Link
            href={`/editor?resumeId=${resume.id}`}
            className="inline-block w-full text-center"
          >
            <p className="line-clamp-1 text-center font-bold">
              {resume.title || "Untitled"}
            </p>
            {resume.description ? (
              <p className="line-clamp-2 text-xs">{resume.description}</p>
            ) : null}
            <p className="mt-2 text-xs text-muted-foreground">
              {wasUpdated ? "Updated" : "Created on"} on{" "}
              {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
            </p>
          </Link>
          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <MoreMenu resumeId={resume.id} />
          </div>
        </div>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden transition-shadow group-hover:shadow-md"
          />
        </Link>
      </div>
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
}

function MoreMenu({ resumeId }: MoreMenuProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="flext items-center gap-2"
          >
            <FileX2 className="size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationDialog
        resumeId={resumeId}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  );
}

interface ConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: ConfirmationDialogProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
        toast.success("Resume Deleted Successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Resume?</DialogTitle>
          <DialogDescription>
            This is a permanent action and cannot be undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            loading={isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
