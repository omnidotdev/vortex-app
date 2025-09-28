import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function PWAUpdate() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const checkForUpdate = async () => {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (
                    newWorker.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    setWaitingWorker(newWorker);
                    setShowUpdatePrompt(true);
                  }
                });
              }
            });

            if (registration.waiting) {
              setWaitingWorker(registration.waiting);
              setShowUpdatePrompt(true);
            }

            // Check for updates periodically
            await registration.update();
          }
        } catch (error) {
          console.log("Error checking for updates:", error);
        }
      };

      checkForUpdate();

      // Check for updates every 10 minutes
      const interval = setInterval(checkForUpdate, 10 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setShowUpdatePrompt(false);
      window.location.reload();
    }
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Update Available</CardTitle>
          <CardDescription>
            A new version of Vortex is available. Update now to get the latest
            features.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button onClick={handleUpdate} size="sm">
            Update
          </Button>
          <Button onClick={handleDismiss} variant="outline" size="sm">
            Later
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
