// src/models/library.ts
import { Subscriber } from "./subscriber.js";

export class Library implements Subscriber {
  name: string;

  constructor(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error("Library name cannot be empty");
    }
    this.name = name.trim();
  }

  notify(magazineName: string, issue: string): void {
    if (!magazineName || !issue) {
      throw new Error("Magazine name and issue cannot be empty");
    }
    console.log(
      `📚 ${this.name} ordered: ${magazineName} - "${issue}" for public access`
    );
  }
}
