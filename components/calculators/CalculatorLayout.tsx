import type { ReactNode } from "react";

type CalculatorLayoutProps = {
  inputs: ReactNode;
  results: ReactNode;
};

export function CalculatorLayout({
  inputs,
  results,
}: CalculatorLayoutProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] lg:items-start">
      <div className="min-w-0">{inputs}</div>
      <div className="min-w-0">{results}</div>
    </div>
  );
}
