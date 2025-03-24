import { Center, Text } from "@mantine/core";

export const Footer = () => (
  <Center py="md">
    <Text size="sm" color="dimmed">
      Powered by{" "}
      <Text
        component="a"
        href="https://supabase.com"
        target="_blank"
        fw={500}
        td="underline"
        aria-label="Supabase Link"
      >
        Supabase
      </Text>
    </Text>
  </Center>
);
