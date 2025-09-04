// src/demo.ts
import { Magazine } from "./models/magazine.js";
import { Reader } from "./models/reader.js";
import { Library } from "./models/library.js";

console.log("🎯 Observer Pattern Demo\n");

try {
  const techMagazine = new Magazine("Tech Weekly");
  const cookingMagazine = new Magazine("Cooking Today");

  const john = new Reader("John");
  const alice = new Reader("Alice");
  const cityLibrary = new Library("City Library");

  console.log("--- Subscribing to magazines ---");
  techMagazine.subscribe(john);
  techMagazine.subscribe(cityLibrary);
  cookingMagazine.subscribe(alice);
  cookingMagazine.subscribe(cityLibrary);

  console.log("\n--- Publishing new issues ---");
  techMagazine.publishIssue("Best AI Tools 2024");
  cookingMagazine.publishIssue("Quick Dinner Recipes");

  console.log("\n--- Alice unsubscribes from cooking ---");
  cookingMagazine.unsubscribe(alice);

  console.log("\n--- Publishing again ---");
  cookingMagazine.publishIssue("Healthy Smoothies");

  console.log("\n--- Final counts ---");
  console.log(`Tech Weekly: ${techMagazine.getSubscriberCount()} subscribers`);
  console.log(
    `Cooking Today: ${cookingMagazine.getSubscriberCount()} subscribers`
  );

  console.log("\n✅ Observer pattern working perfectly!");
} catch (error) {
  console.error("❌ Demo failed:", error);
  process.exit(1);
}
