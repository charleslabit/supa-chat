"use client";
import { AppShell } from "@mantine/core";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
