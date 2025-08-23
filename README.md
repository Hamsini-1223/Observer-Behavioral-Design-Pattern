# Observer Pattern: Magazine Subscription System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A clean TypeScript implementation of the Observer behavioral design pattern using a magazine subscription system as a real-world analogy.

## Overview

The Observer pattern defines a one-to-many dependency between objects. When one object (Publisher) changes state, all dependent objects (Subscribers) are automatically notified and updated.

**Real-world analogy**: Magazine subscriptions - subscribers get notified when new issues are published without having to constantly check for updates.

## Architecture

```
                    ┌─────────────────────┐
                    │   <<interface>>     │
                    │     Subscriber      │
                    ├─────────────────────┤
                    │ + name: string      │
                    │ + notify(): void    │
                    └─────────────────────┘
                             ▲
                             │ implements
                    ┌────────┴────────┐
                    │                 │
         ┌─────────────────┐  ┌─────────────────┐
         │     Reader      │  │     Library     │
         ├─────────────────┤  ├─────────────────┤
         │ + name: string  │  │ + name: string  │
         │ + notify()      │  │ + notify()      │
         └─────────────────┘  └─────────────────┘
                    ▲                 ▲
                    │                 │
                    │ creates         │ creates
                    └─────────┬───────┘
                              │
                    ┌─────────────────────┐
                    │      Magazine       │
                    ├─────────────────────┤
                    │ - name: string      │
                    │ - subscribers[]     │
                    ├─────────────────────┤
                    │ + subscribe()       │
                    │ + unsubscribe()     │
                    │ + publishIssue()    │
                    └─────────────────────┘
                              ▲
                              │ creates/manages
                              │
                    ┌─────────────────────┐
                    │    MagazineApp      │
                    │     (Client)        │
                    ├─────────────────────┤
                    │ - magazines[]       │
                    │ - subscribers[]     │
                    ├─────────────────────┤
                    │ + showMainMenu()    │
                    │ + handleMenu()      │
                    │ + showSubscribe()   │
                    │ + showPublish()     │
                    └─────────────────────┘
```

## Project Structure

```
├── subscriber.ts      # Observer interface
├── magazine.ts        # Publisher (Subject)
├── reader.ts          # Concrete observer (individual)
├── library.ts         # Concrete observer (institution)
├── main.ts           # Interactive console application
├── demo.ts           # Simple demonstration
├── package.json      # NPM configuration
└── README.md         # Documentation
```

## Installation

**Prerequisites**: Node.js and TypeScript

```bash
# Clone repository
git clone <repository-url>
cd observer-pattern-magazine

# Install TypeScript globally (if needed)
npm install -g typescript

# Install dependencies
npm install
```

## Usage

### Interactive Demo

```bash
npm start
```

Provides a console menu to:

- Subscribe/unsubscribe users to magazines
- Publish new issues and see notifications
- View subscription statistics

### Simple Demo

```bash
npm run demo
```

Runs a predefined demonstration showing the pattern in action.

### Manual Build

```bash
npm run build    # Compile TypeScript
node main.js     # Run interactive demo
node demo.js     # Run simple demo
```

## Core Components

### Subscriber Interface

```typescript
export interface Subscriber {
  name: string;
  notify(magazineName: string, issue: string): void;
}
```

Defines the contract for all observers.

### Magazine Class (Publisher)

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

Manages subscribers and handles notifications.

### Reader Class (Concrete Observer)

```typescript
export class Reader implements Subscriber {
  notify(magazineName: string, issue: string): void {
    console.log(`${this.name} received: ${magazineName} - "${issue}"`);
  }
}
```

Individual subscriber implementation.

### Library Class (Concrete Observer)

```typescript
export class Library implements Subscriber {
  notify(magazineName: string, issue: string): void {
    console.log(`${this.name} ordered: ${magazineName} for public access`);
  }
}
```

Institution subscriber implementation.

## Output

### Interactive Demo Output

When you run `npm start`, you'll see:

```
🎯 Welcome to the Observer Pattern Magazine System!
This demonstrates how the Observer pattern works in real-time.

You can:
- Subscribe readers and libraries to magazines
- Publish new issues and see who gets notified
- Unsubscribe and see the changes

==================================================
🎯 MAGAZINE SUBSCRIPTION SYSTEM
==================================================
1. Subscribe someone to a magazine
2. Unsubscribe someone from a magazine
3. Publish new magazine issue
4. Show all subscribers
5. Show subscriber counts
6. Exit
==================================================
Choose an option (1-6): 1

--- WHO DO YOU WANT TO SUBSCRIBE? ---
1. John
2. Alice
3. Bob
4. City Library
5. University Library

Choose subscriber (1-5): 1

--- CHOOSE MAGAZINE TO SUBSCRIBE ---
1. Tech Weekly
2. Cooking Today
3. Sports Monthly

Choose magazine (1-3): 1
✅ John subscribed to Tech Weekly

Choose an option (1-6): 3

--- WHICH MAGAZINE WANTS TO PUBLISH? ---
1. Tech Weekly (1 subscribers)
2. Cooking Today (0 subscribers)
3. Sports Monthly (0 subscribers)

Choose magazine (1-3): 1
Enter the issue title: AI Revolution 2024

📢 Tech Weekly published: "AI Revolution 2024"
Notifying 1 subscribers...
📧 John received notification: Tech Weekly - "AI Revolution 2024"
```

### Simple Demo Output

When you run `npm run demo`, you'll see:

```
🎯 Observer Pattern Simple Demo

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

## Example Output

```
MAGAZINE SUBSCRIPTION SYSTEM
1. Subscribe someone to a magazine
2. Unsubscribe someone from a magazine
3. Publish new magazine issue
4. Show all subscribers
5. Show subscriber counts
6. Exit

Choose an option (1-6): 3
Enter the issue title: AI Revolution 2024

Tech Weekly published: "AI Revolution 2024"
Notifying 2 subscribers...
John received notification: Tech Weekly - "AI Revolution 2024"
City Library ordered: Tech Weekly - "AI Revolution 2024" for public access
```

## Key Benefits

- **Loose Coupling**: Publishers don't need to know subscriber details
- **Dynamic Relationships**: Subscribe/unsubscribe at runtime
- **Open/Closed Principle**: Easy to add new subscriber types
- **Single Responsibility**: Each class has one clear purpose

## Learning Outcomes

This implementation demonstrates:

- Observer pattern structure and flow
- TypeScript interfaces and polymorphism
- Event-driven programming concepts
- Clean code organization principles

## Extensions

Possible enhancements:

- Add email/SMS notification subscribers
- Implement different magazine types
- Add subscription preferences
- Persist data to database
- Create web interface

## Built by

**Ms Hamsini S**

## Resources

- [Observer Pattern - Wikipedia](https://en.wikipedia.org/wiki/Observer_pattern)
- [Observer Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/observer)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
