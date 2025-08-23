// subscriber.ts
// Interface that all subscribers must implement
export interface Subscriber {
  name: string;
  notify(magazineName: string, issue: string): void;
}
