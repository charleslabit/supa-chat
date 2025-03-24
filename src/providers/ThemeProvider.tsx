"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";

const themeComponents = {
  Card: {
    defaultProps: {
      radius: "md",
    },
    styles: () => ({
      root: {
        wordBreak: "break-word",
      },
    }),
  },
};

const theme = createTheme({
  components: themeComponents,
  /** Your theme override here */
});

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In Next.js, during SSR, we need to delay the rendering of the app until the colorScheme is determined
  const [hydrated, setHydrated] = useState(false);
  // Use effect to ensure we run this logic only on the client-side
  useEffect(() => {
    setHydrated(true);
  }, []);
  // Avoid hydration errors: Don't render until the app is hydrated  this is for theme settings
  if (!hydrated) return null;
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
