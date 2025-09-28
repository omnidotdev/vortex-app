import { createFileRoute } from "@tanstack/react-router";
import { AppWrapper } from "@/components/AppWrapper";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  try {
    return <AppWrapper />;
  } catch (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Error loading AppWrapper</h1>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }
}
