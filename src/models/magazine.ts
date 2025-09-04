// src/models/magazine.ts
import { Subscriber } from "./subscriber.js";

export class Magazine {
  private name: string;
  private subscribers: Subscriber[] = [];

  constructor(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error("Magazine name cannot be empty");
    }
    this.name = name.trim();
  }

  subscribe(subscriber: Subscriber): void {
    if (!subscriber) {
      throw new Error("Subscriber cannot be null or undefined");
    }

    if (this.subscribers.includes(subscriber)) {
      console.log(
        `⚠️  ${subscriber.name} is already subscribed to ${this.name}`
      );
      return;
    }

    this.subscribers.push(subscriber);
    console.log(`✅ ${subscriber.name} subscribed to ${this.name}`);
  }

  unsubscribe(subscriber: Subscriber): void {
    if (!subscriber) {
      throw new Error("Subscriber cannot be null or undefined");
    }

    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
      console.log(`❌ ${subscriber.name} unsubscribed from ${this.name}`);
    } else {
      console.log(`⚠️  ${subscriber.name} is not subscribed to ${this.name}`);
    }
  }

  publishIssue(issue: string): void {
    if (!issue || issue.trim().length === 0) {
      throw new Error("Issue title cannot be empty");
    }

    const trimmedIssue = issue.trim();
    console.log(`\n📢 ${this.name} published: "${trimmedIssue}"`);
    console.log(`Notifying ${this.subscribers.length} subscribers...`);

    this.subscribers.forEach((subscriber) => {
      try {
        subscriber.notify(this.name, trimmedIssue);
      } catch (error) {
        console.error(`❌ Failed to notify ${subscriber.name}: ${error}`);
      }
    });
  }

  getSubscriberCount(): number {
    return this.subscribers.length;
  }

  getSubscriberNames(): string[] {
    return this.subscribers.map((subscriber) => subscriber.name);
  }

  getMagazineName(): string {
    return this.name;
  }
}
