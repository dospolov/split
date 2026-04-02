import type { Page } from "@playwright/test";

type AddTransactionInput = {
  title?: string;
  amount: number;
  payerName: string;
  participantNames: string[];
};

export class TransactionFormComponent {
  constructor(private readonly page: Page) {}

  private get titleInput() {
    return this.page.getByLabel("Title").first();
  }

  private get amountInput() {
    return this.page.getByLabel("Amount").first();
  }

  private get payerSelect() {
    return this.page.getByLabel("Payer").first();
  }

  private get addButton() {
    return this.page
      .locator("div")
      .filter({ hasText: "Add transaction" })
      .getByRole("button", { name: "Add" })
      .first();
  }

  async addTransaction(input: AddTransactionInput) {
    await this.titleInput.fill(input.title ?? "");
    await this.amountInput.fill(String(input.amount));
    await this.payerSelect.click();
    await this.page.getByRole("option", { name: input.payerName }).click();

    for (const participantName of input.participantNames) {
      const label = this.page
        .locator("label", { hasText: participantName })
        .first();
      await label.locator('[role="checkbox"]').click();
    }

    await this.addButton.click();
  }
}
