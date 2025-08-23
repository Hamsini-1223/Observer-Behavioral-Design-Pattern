// main.ts
import * as readline from "readline";
import { Magazine } from "./magazine.js";
import { Reader } from "./reader.js";
import { Library } from "./library.js";
import { Subscriber } from "./subscriber.js";

// Create magazines (Publishers)
const magazines = {
  "1": new Magazine("Tech Weekly"),
  "2": new Magazine("Cooking Today"),
  "3": new Magazine("Sports Monthly"),
};

// Create subscribers
const subscribers = {
  "1": new Reader("John"),
  "2": new Reader("Alice"),
  "3": new Reader("Bob"),
  "4": new Library("City Library"),
  "5": new Library("University Library"),
};

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMainMenu(): void {
  console.log("\n" + "=".repeat(50));
  console.log("🎯 MAGAZINE SUBSCRIPTION SYSTEM");
  console.log("=".repeat(50));
  console.log("1. Subscribe someone to a magazine");
  console.log("2. Unsubscribe someone from a magazine");
  console.log("3. Publish new magazine issue");
  console.log("4. Show all subscribers");
  console.log("5. Show subscriber counts");
  console.log("6. Exit");
  console.log("=".repeat(50));
  rl.question("Choose an option (1-6): ", handleMainMenu);
}

function handleMainMenu(choice: string): void {
  switch (choice.trim()) {
    case "1":
      showSubscribeMenu();
      break;
    case "2":
      showUnsubscribeMenu();
      break;
    case "3":
      showPublishMenu();
      break;
    case "4":
      showAllSubscribers();
      break;
    case "5":
      showSubscriberCounts();
      break;
    case "6":
      console.log("\n👋 Goodbye! Thanks for trying the Observer pattern!");
      rl.close();
      return;
    default:
      console.log("❌ Invalid choice. Please try again.");
      showMainMenu();
  }
}

function showSubscribeMenu(): void {
  console.log("\n--- WHO DO YOU WANT TO SUBSCRIBE? ---");
  Object.entries(subscribers).forEach(([key, subscriber]) => {
    console.log(`${key}. ${subscriber.name}`);
  });

  rl.question("Choose subscriber (1-5): ", (subscriberChoice) => {
    if (subscribers[subscriberChoice]) {
      showMagazineMenu(subscriberChoice, "subscribe");
    } else {
      console.log("❌ Invalid choice.");
      showMainMenu();
    }
  });
}

function showUnsubscribeMenu(): void {
  console.log("\n--- WHO DO YOU WANT TO UNSUBSCRIBE? ---");
  Object.entries(subscribers).forEach(([key, subscriber]) => {
    console.log(`${key}. ${subscriber.name}`);
  });

  rl.question("Choose subscriber (1-5): ", (subscriberChoice) => {
    if (subscribers[subscriberChoice]) {
      showMagazineMenu(subscriberChoice, "unsubscribe");
    } else {
      console.log("❌ Invalid choice.");
      showMainMenu();
    }
  });
}

function showMagazineMenu(
  subscriberChoice: string,
  action: "subscribe" | "unsubscribe"
): void {
  console.log(`\n--- CHOOSE MAGAZINE TO ${action.toUpperCase()} ---`);
  Object.entries(magazines).forEach(([key, magazine]) => {
    console.log(`${key}. ${magazine.getMagazineName()}`);
  });

  rl.question("Choose magazine (1-3): ", (magazineChoice) => {
    const subscriber = subscribers[subscriberChoice];
    const magazine = magazines[magazineChoice];

    if (subscriber && magazine) {
      if (action === "subscribe") {
        magazine.subscribe(subscriber);
      } else {
        magazine.unsubscribe(subscriber);
      }
    } else {
      console.log("❌ Invalid choice.");
    }

    showMainMenu();
  });
}

function showPublishMenu(): void {
  console.log("\n--- WHICH MAGAZINE WANTS TO PUBLISH? ---");
  Object.entries(magazines).forEach(([key, magazine]) => {
    console.log(
      `${key}. ${magazine.getMagazineName()} (${magazine.getSubscriberCount()} subscribers)`
    );
  });

  rl.question("Choose magazine (1-3): ", (magazineChoice) => {
    const magazine = magazines[magazineChoice];
    if (magazine) {
      rl.question("Enter the issue title: ", (issueTitle) => {
        if (issueTitle.trim()) {
          magazine.publishIssue(issueTitle.trim());
        } else {
          console.log("❌ Issue title cannot be empty.");
        }
        showMainMenu();
      });
    } else {
      console.log("❌ Invalid choice.");
      showMainMenu();
    }
  });
}

function showAllSubscribers(): void {
  console.log("\n" + "=".repeat(40));
  console.log("📋 ALL CURRENT SUBSCRIPTIONS");
  console.log("=".repeat(40));

  Object.values(magazines).forEach((magazine) => {
    console.log(`\n📖 ${magazine.getMagazineName()}:`);
    const subscriberNames = magazine.getSubscriberNames();
    if (subscriberNames.length === 0) {
      console.log("   No subscribers yet");
    } else {
      subscriberNames.forEach((name) => {
        console.log(`   - ${name}`);
      });
    }
  });

  showMainMenu();
}

function showSubscriberCounts(): void {
  console.log("\n" + "=".repeat(40));
  console.log("📊 SUBSCRIBER STATISTICS");
  console.log("=".repeat(40));

  Object.values(magazines).forEach((magazine) => {
    console.log(
      `📖 ${magazine.getMagazineName()}: ${magazine.getSubscriberCount()} subscribers`
    );
  });

  showMainMenu();
}

// Start the interactive program
console.log("🎯 Welcome to the Observer Pattern Magazine System!");
console.log("This demonstrates how the Observer pattern works in real-time.");
console.log("\nYou can:");
console.log("- Subscribe readers and libraries to magazines");
console.log("- Publish new issues and see who gets notified");
console.log("- Unsubscribe and see the changes");

showMainMenu();
