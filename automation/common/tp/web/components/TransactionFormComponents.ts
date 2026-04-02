import type { Page } from "@playwright/test";

type AddTransactionInput = {
  title?: string;
  amount: number;
  payerName: string;
  participants: string[];
};
export class TransactionFormComponent {
  constructor(private readonly page: Page) {}

  private get addSection() {
    return this.page.getByTestId("split-transaction-add-section");
  }

  private get titleInput() {
    return this.addSection.getByLabel("Title");
  }

  private get amountInput() {
    return this.addSection.getByLabel("Amount");
  }

  private get payerSelect() {
    return this.addSection.getByLabel("Payer");
  }

  private get addButton() {
    return this.addSection.getByRole("button", { name: "Add" });
  }

  async addTransaction(input: AddTransactionInput) {
    await this.titleInput.fill(input.title ?? "");
    await this.amountInput.fill(String(input.amount));
    await this.payerSelect.click();
    await this.page.getByRole("option", { name: input.payerName }).click();

    for (const participantName of input.participants) {
      const label = this.page
        .locator("label", { hasText: participantName })
        .first();
      await label.locator('[role="checkbox"]').click();
    }

    await this.addButton.click();
  }
}
