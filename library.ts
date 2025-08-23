// library.ts
import { Subscriber } from "./subscriber.js";

// Library is another concrete subscriber - orders magazines for public
export class Library implements Subscriber {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // This method gets called when magazine publishes new issue
  notify(magazineName: string, issue: string): void {
    console.log(
      `📚 ${this.name} ordered: ${magazineName} - "${issue}" for public access`
    );
  }
}
