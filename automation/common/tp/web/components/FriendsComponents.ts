import type { Page } from "@playwright/test";

export class FriendsComponents {
  constructor(private readonly page: Page) {}

  private get addFriendInput() {
    return this.page.getByPlaceholder("Add friend name");
  }

  private get addFriendButton() {
    return this.page
      .locator("section")
      .filter({ hasText: "Friends" })
      .getByRole("button", { name: "Add" })
      .first();
  }

  async addFriend(name: string) {
    await this.addFriendInput.fill(name);
    await this.addFriendButton.click();
  }

  async renameFriend(oldName: string, newName: string) {
    await this.page.locator(`input[value="${oldName}"]`).first().fill(newName);
  }

  async deleteFriendByName(name: string) {
    const row = this.page
      .locator("div")
      .filter({ has: this.page.locator(`input[value="${name}"]`).first() })
      .first();

    await row.getByRole("button", { name: "Delete" }).click();
  }
}
