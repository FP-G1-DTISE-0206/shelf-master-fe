export {};

declare global {
  interface Window {
    snap?: {
      embed: (token: string, options: { embedId: string }) => void;
      pay: (token: string, options?: Record<string, unknown>) => void;
    };
  }
}
