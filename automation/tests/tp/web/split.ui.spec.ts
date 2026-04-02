import { test, expect } from "../../common/fixtures/base.fixture";

test.describe("TP UI flows", () => {
  test.beforeEach(async ({ splitUi }) => {
    await splitUi.openApp();
    await splitUi.pageObject.clickClearEverything(true);
  });

  test("adds and removes friend", async ({ splitUi }) => {
    await splitUi.addFriend("Alice");
    await splitUi.pageObject.friends.deleteFriendByName("Alice");

    await expect(splitUi.pageObject.noFriendsMessage()).toBeVisible();
  });

  test("shows page header", async ({ splitUi }) => {
    await expect(splitUi.pageObject.heading()).toBeVisible();
  });

  test("renames friend inline", async ({ splitUi }) => {
    await splitUi.addFriend("Alice");

    await splitUi.pageObject.friends.renameFriend("Alice", "Alice Renamed");
    await expect(splitUi.pageObject.friendInput("Alice Renamed")).toBeVisible();
  });

  test("adds transaction and displays debt matrix values", async ({
    splitUi,
  }) => {
    await splitUi.addFriend("Alice");
    await splitUi.addFriend("Bob");
    await splitUi.addFriend("Charlie");

    await splitUi.addTransaction({
      title: "Pizza",
      amount: 90,
      payerName: "Alice",
      participants: ["Alice", "Bob", "Charlie"],
    });

    await expect(splitUi.pageObject.transactionsCard("Pizza")).toBeVisible();
    await expect(splitUi.pageObject.debtCellWithValue("30")).toHaveCount(2);
  });

  test("loads demo data and clears everything", async ({ splitUi }) => {
    await splitUi.pageObject.clickLoadDemoData();
    await expect(splitUi.pageObject.friendInput("Ivan")).toBeVisible();
    await expect(splitUi.pageObject.transactionsCard("Pizza")).toBeVisible();

    await splitUi.pageObject.clickClearEverything(true);
    await expect(splitUi.pageObject.noFriendsMessage()).toBeVisible();
    await expect(splitUi.pageObject.noTransactionsMessage()).toBeVisible();
  });

  test("does not clear data when clear dialog is dismissed", async ({
    splitUi,
  }) => {
    await splitUi.addFriend("Alice");

    await splitUi.pageObject.clickClearEverything(false);

    await expect(splitUi.pageObject.friendInput("Alice")).toBeVisible();
  });

  test("edits transaction and saves new values", async ({ splitUi }) => {
    await splitUi.addFriend("Alice");
    await splitUi.addFriend("Bob");
    await splitUi.addTransaction({
      title: "Taxi",
      amount: 20,
      payerName: "Alice",
      participants: ["Alice", "Bob"],
    });

    await splitUi.pageObject.saveEditedTransaction({
      originalTitle: "Taxi",
      nextTitle: "Taxi Updated",
      nextAmount: 35,
    });

    await expect(splitUi.pageObject.transactionsCard("Taxi")).toBeVisible();
    await expect(splitUi.pageObject.transactionsCard("Taxi")).toContainText(
      "Alice paid 35",
    );
    await expect(splitUi.pageObject.transactionsCard("Taxi")).toContainText(
      "edited",
    );
  });

  test("cancels transaction edit and keeps old values", async ({ splitUi }) => {
    await splitUi.addFriend("Alice");
    await splitUi.addFriend("Bob");
    await splitUi.addTransaction({
      title: "Dinner",
      amount: 40,
      payerName: "Alice",
      participants: ["Alice", "Bob"],
    });

    await splitUi.pageObject.cancelEditTransaction("Dinner", "Dinner Edited");

    await expect(splitUi.pageObject.transactionsCard("Dinner")).toBeVisible();
    await expect(
      splitUi.pageObject.transactionsCard("Dinner Edited"),
    ).toHaveCount(0);
  });

  test("deletes transaction from list", async ({ splitUi }) => {
    await splitUi.addFriend("Alice");
    await splitUi.addFriend("Bob");
    await splitUi.addTransaction({
      title: "Coffee",
      amount: 10,
      payerName: "Alice",
      participants: ["Alice", "Bob"],
    });

    await splitUi.pageObject.deleteTransaction("Coffee");
    await expect(splitUi.pageObject.transactionsCard("Coffee")).toHaveCount(0);
    await expect(splitUi.pageObject.noTransactionsMessage()).toBeVisible();
  });

  test("shows validation errors for invalid transaction submission", async ({
    splitUi,
  }) => {
    await splitUi.addFriend("Alice");
    await splitUi.addFriend("Bob");

    await splitUi.pageObject.transactionForm.addTransaction({
      amount: 0,
      payerName: "Alice",
      participants: [],
      title: "Invalid Transaction",
    });

    await expect(
      splitUi.pageObject
        .formErrors()
        .filter({ hasText: "Amount must be at least 1." }),
    ).toHaveCount(1);
    await expect(
      splitUi.pageObject
        .formErrors()
        .filter({ hasText: "Select at least one participant." }),
    ).toHaveCount(1);
  });

  test("persists data after page reload", async ({ splitUi }) => {
    await splitUi.addFriend("Alice");
    await splitUi.addFriend("Bob");
    await splitUi.addTransaction({
      title: "Groceries",
      amount: 50,
      payerName: "Alice",
      participants: ["Alice", "Bob"],
    });

    await splitUi.pageObject.reload();
    await expect(splitUi.pageObject.friendInput("Alice")).toBeVisible();
    await expect(
      splitUi.pageObject.transactionsCard("Groceries"),
    ).toBeVisible();
  });
});
