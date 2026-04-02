import { Page } from "@playwright/test";
import { SplitPage } from "../pages/SplitPage";

type TransactionInput = {
  title?: string;
  amount: number;
  payerName: string;
  participants: string[];
};

export class SplitFacade {
  readonly pageObject: SplitPage;

  constructor(page: Page) {
    this.pageObject = new SplitPage(page);
  }

  async openApp() {
    await this.pageObject.open();
  }

  async addFriend(name: string) {
    await this.pageObject.friends.addFriend(name);
    await this.pageObject.expectFriendVisible(name);
  }

  async addTransaction(input: TransactionInput) {
    await this.pageObject.transactionForm.addTransaction(input);
  }
}
