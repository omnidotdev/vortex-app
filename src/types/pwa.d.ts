declare global {
  interface Window {
    workbox?: {
      addEventListener: (event: string, callback: (event: any) => void) => void;
    };
  }
}

export interface PWAUpdateEvent {
  sw: ServiceWorker;
  type: string;
}

export interface ServiceWorkerMessage {
  type: 'SKIP_WAITING';
}
