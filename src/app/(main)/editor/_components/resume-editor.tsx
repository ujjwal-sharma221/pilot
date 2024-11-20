"use client";

import Link from "next/link";

import { Spotlight } from "@/components/spotlight";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ResumeEditor() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex items-center justify-center rounded-b border-b border-zinc-100 bg-white p-6">
        <Spotlight
          className="from-blue-800 via-blue-600 to-blue-400 blur-xl dark:from-blue-900 dark:via-blue-500 dark:to-blue-900"
          size={65}
        />
        <header className="space-y-2 px-3 text-center">
          <h1 className="text-2xl font-bold capitalize">design your resume</h1>
          <p className="text-sm text-muted-foreground">
            Follow the given steps to create your resume. Your progress is saved
            automatically
          </p>
        </header>
      </div>

      <main className="relative flex-grow">
        <div className="absolute inset-0 flex">
          <div className="w-full md:w-1/2">left</div>
          <div className="grow md:border-r"></div>
          <div className="hidden w-1/2 md:flex">right</div>
        </div>
      </main>

      <footer className="sticky bottom-0 w-full bg-white px-3 py-5 shadow-md">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="secondary">Previous Step</Button>
            <Button variant="shine">Next Step</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" asChild>
              <Link href="/resumes">Close</Link>
            </Button>
            <p className="font-mono text-sm text-muted-foreground opacity-0">
              Saving...
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
