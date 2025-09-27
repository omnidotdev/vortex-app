export { DiscordClient, createDiscordClient } from "./client";
export { DiscordIntegrationService } from "./service";

// Re-export Discord piece components for direct access if needed
export { discord, discordAuth } from "@activepieces/piece-discord";

// Convenience function to get Discord piece info
export function getDiscordPieceInfo() {
  return {
    displayName: discord.displayName,
    description: discord.description,
    logoUrl: discord.logoUrl,
    categories: discord.categories,
    authors: discord.authors,
    minimumSupportedRelease: discord.minimumSupportedRelease,
    actions: Object.keys(discord.actions()).map((key) => {
      const action = discord.actions()[key];
      return {
        name: key,
        displayName: action?.displayName || key,
        description: action?.description || "",
        requireAuth: action?.requireAuth || false,
      };
    }),
    triggers: Object.keys(discord.triggers()).map((key) => {
      const trigger = discord.triggers()[key];
      return {
        name: key,
        displayName: trigger?.displayName || key,
        description: trigger?.description || "",
        requireAuth: trigger?.requireAuth || false,
        type: trigger?.type || "POLLING",
      };
    }),
  };
}
