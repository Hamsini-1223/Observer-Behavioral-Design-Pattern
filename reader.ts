// magazine.ts
import { Subscriber } from "./subscriber.js";

// Magazine acts as Publisher in Observer pattern
export class Magazine {
  private name: string;
  private subscribers: Subscriber[] = [];

  constructor(name: string) {
    this.name = name;
  }

  // Add a subscriber to the list
  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
    console.log(`✅ ${subscriber.name} subscribed to ${this.name}`);
  }

  // Remove a subscriber from the list
  unsubscribe(subscriber: Subscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
      console.log(`❌ ${subscriber.name} unsubscribed from ${this.name}`);
    }
  }

  // Notify all subscribers about new issue
  publishIssue(issue: string): void {
    console.log(`\n📢 ${this.name} published: "${issue}"`);
    console.log(`Notifying ${this.subscribers.length} subscribers...`);

    this.subscribers.forEach((subscriber) => {
      subscriber.notify(this.name, issue);
    });
  }

  // Get number of subscribers
  getSubscriberCount(): number {
    return this.subscribers.length;
  }

  // Get list of subscriber names
  getSubscriberNames(): string[] {
    return this.subscribers.map((subscriber) => subscriber.name);
  }

  // Get magazine name
  getMagazineName(): string {
    return this.name;
  }
}
