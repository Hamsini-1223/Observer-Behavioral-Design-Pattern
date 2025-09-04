# Observer Pattern: Magazine Subscription System

A TypeScript implementation of the Observer behavioral design pattern using a magazine subscription system.

## Overview

The Observer pattern defines a one-to-many dependency between objects. When the subject changes state, all observers are automatically notified and updated.

This implementation uses magazines as subjects and readers/libraries as observers - when a magazine publishes a new issue, all subscribers are notified.

## Project Structure

```
├── src/
│   ├── models/
│   │   ├── subscriber.ts      # Observer interface (defines update contract)
│   │   ├── magazine.ts        # Publisher (subject) that notifies subscribers
│   │   ├── reader.ts          # Concrete subscriber: individual reader
│   │   └── library.ts         # Concrete subscriber: institution (library)
│   │
│   ├── demo.ts                # Simple demonstration of publisher-subscriber flow
│   └── main.ts                # Interactive application entry logic
│
├── README.md                  # Project documentation
├── package.json               # Project metadata & dependencies
└── tsconfig.json              # TypeScript configuration

```

## Installation

```bash
npm install
npm run build
```

## Usage

### Interactive Demo

```bash
npm start
```

### Simple Demo

```bash
npm run demo
```

## Example Output

```
🎯 MAGAZINE SUBSCRIPTION SYSTEM
1. Subscribe someone to a magazine
2. Unsubscribe someone from a magazine
3. Publish new magazine issue
4. Show all subscribers
5. Show subscriber counts
6. Exit

Choose magazine (1-3): 1
Enter the issue title: AI Revolution 2024

📢 Tech Weekly published: "AI Revolution 2024"
Notifying 2 subscribers...
📧 John received notification: Tech Weekly - "AI Revolution 2024"
📚 City Library ordered: Tech Weekly - "AI Revolution 2024" for public access
```

## Key Components

### Subscriber Interface

```typescript
export interface Subscriber {
  name: string;
  notify(magazineName: string, issue: string): void;
}
```

### Magazine Class (Subject)

```typescript
export class Magazine {
  private subscribers: Subscriber[] = [];

  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  publishIssue(issue: string): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.notify(this.name, issue);
    });
  }
}
```

### Reader Class (Observer)

```typescript
export class Reader implements Subscriber {
  notify(magazineName: string, issue: string): void {
    console.log(
      `📧 ${this.name} received notification: ${magazineName} - "${issue}"`
    );
  }
}
```

## Complete Demo Output

```
🎯 Observer Pattern Demo

--- Subscribing to magazines ---
✅ John subscribed to Tech Weekly
✅ City Library subscribed to Tech Weekly
✅ Alice subscribed to Cooking Today
✅ City Library subscribed to Cooking Today

--- Publishing new issues ---

📢 Tech Weekly published: "Best AI Tools 2024"
Notifying 2 subscribers...
📧 John received notification: Tech Weekly - "Best AI Tools 2024"
📚 City Library ordered: Tech Weekly - "Best AI Tools 2024" for public access

📢 Cooking Today published: "Quick Dinner Recipes"
Notifying 2 subscribers...
📧 Alice received notification: Cooking Today - "Quick Dinner Recipes"
📚 City Library ordered: Cooking Today - "Quick Dinner Recipes" for public access

--- Alice unsubscribes from cooking ---
❌ Alice unsubscribed from Cooking Today

--- Publishing again ---

📢 Cooking Today published: "Healthy Smoothies"
Notifying 1 subscribers...
📚 City Library ordered: Cooking Today - "Healthy Smoothies" for public access

--- Final counts ---
Tech Weekly: 2 subscribers
Cooking Today: 1 subscribers

✅ Observer pattern working perfectly!
```

## How It Works

1. **Subscribe**: Observers register themselves with the subject
2. **Publish**: Subject notifies all registered observers when state changes
3. **Notify**: Each observer handles the notification in their own way
4. **Unsubscribe**: Observers can remove themselves from notifications

## Built By

Ms Hamsini S
