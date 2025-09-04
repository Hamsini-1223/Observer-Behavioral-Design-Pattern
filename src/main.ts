// src/main.ts
import * as readline from "readline";
import { Magazine } from "./models/magazine.js";
import { Reader } from "./models/reader.js";
import { Library } from "./models/library.js";
import { Subscriber } from "./models/subscriber.js";

const magazines: Record<string, Magazine> = {
  "1": new Magazine("Tech Weekly"),
  "2": new Magazine("Cooking Today"),
  "3": new Magazine("Sports Monthly"),
};

const subscribers: Record<string, Subscriber> = {
  "1": new Reader("John"),
  "2": new Reader("Alice"),
  "3": new Reader("Bob"),
  "4": new Library("City Library"),
  "5": new Library("University Library"),
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function validateChoice(choice: string, validOptions: string[]): boolean {
  return validOptions.includes(choice.trim());
}

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
  const validChoices = ["1", "2", "3", "4", "5", "6"];

  if (!validateChoice(choice, validChoices)) {
    console.log("❌ Invalid choice. Please select 1-6.");
    showMainMenu();
    return;
  }

  try {
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
        console.log("\n👋 Goodbye!");
        rl.close();
        return;
    }
  } catch (error) {
    console.error("❌ An error occurred:", error);
    showMainMenu();
  }
}

function showSubscribeMenu(): void {
  console.log("\n--- WHO DO YOU WANT TO SUBSCRIBE? ---");
  Object.entries(subscribers).forEach(([key, subscriber]) => {
    console.log(`${key}. ${subscriber.name}`);
  });

  rl.question("Choose subscriber (1-5): ", (subscriberChoice) => {
    if (!validateChoice(subscriberChoice, Object.keys(subscribers))) {
      console.log("❌ Invalid choice. Please select 1-5.");
      showMainMenu();
      return;
    }

    showMagazineMenu(subscriberChoice, "subscribe");
  });
}

function showUnsubscribeMenu(): void {
  console.log("\n--- WHO DO YOU WANT TO UNSUBSCRIBE? ---");
  Object.entries(subscribers).forEach(([key, subscriber]) => {
    console.log(`${key}. ${subscriber.name}`);
  });

  rl.question("Choose subscriber (1-5): ", (subscriberChoice) => {
    if (!validateChoice(subscriberChoice, Object.keys(subscribers))) {
      console.log("❌ Invalid choice. Please select 1-5.");
      showMainMenu();
      return;
    }

    showMagazineMenu(subscriberChoice, "unsubscribe");
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
    if (!validateChoice(magazineChoice, Object.keys(magazines))) {
      console.log("❌ Invalid choice. Please select 1-3.");
      showMainMenu();
      return;
    }

    try {
      const subscriber = subscribers[subscriberChoice];
      const magazine = magazines[magazineChoice];

      // Type safety checks
      if (!subscriber) {
        console.error("❌ Subscriber not found.");
        showMainMenu();
        return;
      }

      if (!magazine) {
        console.error("❌ Magazine not found.");
        showMainMenu();
        return;
      }

      if (action === "subscribe") {
        magazine.subscribe(subscriber);
      } else {
        magazine.unsubscribe(subscriber);
      }
    } catch (error) {
      console.error("❌ Operation failed:", error);
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
    if (!validateChoice(magazineChoice, Object.keys(magazines))) {
      console.log("❌ Invalid choice. Please select 1-3.");
      showMainMenu();
      return;
    }

    rl.question("Enter the issue title: ", (issueTitle) => {
      try {
        const magazine = magazines[magazineChoice];

        // Type safety check
        if (!magazine) {
          console.error("❌ Magazine not found.");
          showMainMenu();
          return;
        }

        magazine.publishIssue(issueTitle);
      } catch (error) {
        console.error("❌ Publishing failed:", error);
      }
      showMainMenu();
    });
  });
}

function showAllSubscribers(): void {
  console.log("\n" + "=".repeat(40));
  console.log("📋 ALL CURRENT SUBSCRIPTIONS");
  console.log("=".repeat(40));

  try {
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
  } catch (error) {
    console.error("❌ Failed to display subscribers:", error);
  }

  showMainMenu();
}

function showSubscriberCounts(): void {
  console.log("\n" + "=".repeat(40));
  console.log("📊 SUBSCRIBER STATISTICS");
  console.log("=".repeat(40));

  try {
    Object.values(magazines).forEach((magazine) => {
      console.log(
        `📖 ${magazine.getMagazineName()}: ${magazine.getSubscriberCount()} subscribers`
      );
    });
  } catch (error) {
    console.error("❌ Failed to display statistics:", error);
  }

  showMainMenu();
}

// Error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
  process.exit(1);
});

console.log("🎯 Welcome to the Observer Pattern Magazine System!");
showMainMenu();
