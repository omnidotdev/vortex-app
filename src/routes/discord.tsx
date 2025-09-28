import { createFileRoute } from "@tanstack/react-router";
import { DiscordManager } from "@/components/discord/DiscordManager";

export const Route = createFileRoute("/discord")({
  component: DiscordDashboard,
});

function DiscordDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DiscordManager />
    </div>
  );
}
