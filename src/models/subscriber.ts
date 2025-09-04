// src/models/subscriber.ts
export interface Subscriber {
  name: string;
  notify(magazineName: string, issue: string): void;
}
