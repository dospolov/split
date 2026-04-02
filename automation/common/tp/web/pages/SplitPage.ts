import { expect, type Page } from "@playwright/test";
import { BasePage } from "../../../core/BasePage";
import { FriendsComponents } from "../components/FriendsComponents";
import { TransactionFormComponent } from "../components/TransactionFormComponents";

export class SplitPage extends BasePage {
  readonly friends: FriendsComponents;
  readonly transactionForm: TransactionFormComponent;

  constructor(page: Page) {
    super(page);
    this.friends = new FriendsComponents(page);
    this.transactionForm = new TransactionFormComponent(page);
  }

  async open() {
    await this.page.goto("/");
    await expect(this.heading()).toBeVisible();
  }

  heading() {
    return this.page.getByRole("heading", { name: "Split" });
  }

  transactionsCard(title: string) {
    return this.page
      .getByTestId("split-transaction-card")
      .filter({ hasText: title });
  }

  transactionEditButton(title: string) {
    return this.transactionsCard(title).getByRole("button", { name: "Edit" });
  }

  async deleteTransaction(title: string) {
    await this.transactionsCard(title)
      .getByRole("button", { name: "Delete" })
      .click();
  }

  async startEditTransaction(title: string) {
    await this.transactionEditButton(title).click();
  }

  async saveEditedTransaction({
    originalTitle,
    nextTitle,
    nextAmount,
  }: {
    originalTitle: string;
    nextTitle: string;
    nextAmount: number;
  }) {
    await this.startEditTransaction(originalTitle);
    const editForm = this.page.getByTestId("split-edit-transaction-form");
    const titleInput = editForm.getByTestId("split-transaction-title-input");
    const amountInput = editForm.getByTestId("split-transaction-amount-input");
    await titleInput.fill(nextTitle);
    await amountInput.fill(String(nextAmount));
    await editForm.getByRole("button", { name: "Save" }).click();
  }

  async cancelEditTransaction(title: string, nextTitle?: string) {
    await this.startEditTransaction(title);
    const editForm = this.page.getByTestId("split-edit-transaction-form");
    if (nextTitle) {
      await editForm.getByTestId("split-transaction-title-input").fill(nextTitle);
    }
    await editForm.getByRole("button", { name: "Cancel" }).click();
  }

  noFriendsMessage() {
    return this.page.getByTestId("split-no-friends");
  }

  noTransactionsMessage() {
    return this.page.getByTestId("split-no-transactions");
  }

  friendInput(name: string) {
    return this.page.locator(`input[value="${name}"]`).first();
  }

  debtCellWithValue(value: string) {
    return this.page.getByRole("cell", { name: value });
  }

  formErrors() {
    return this.page.getByRole("alert");
  }

  async clickLoadDemoData() {
    await this.page.getByRole("button", { name: "Load demo data" }).click();
  }

  async expectFriendVisible(name: string) {
    await expect(this.friendInput(name)).toBeVisible();
  }

  async clickClearEverything(accept = true) {
    this.page.once("dialog", (dialog) => {
      if (accept) {
        void dialog.accept();
      } else {
        void dialog.dismiss();
      }
    });
    await this.page.getByRole("button", { name: "Clear everything" }).click();
  }

  async reload() {
    await this.page.reload();
  }
}
