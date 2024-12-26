import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function ComponentCard({ children }: CardProps) {
  return (
    <>
      <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4">
        {children}
      </div>
    </>
  );
}
