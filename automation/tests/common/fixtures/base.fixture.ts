import { test as base } from "@playwright/test";
import { SplitFacade } from "../../../common/tp/web/facades/SplitFacade";

type AppFixtures = {
  splitUi: SplitFacade;
};

export const test = base.extend<AppFixtures>({
  splitUi: async ({ page }, use) => {
    await use(new SplitFacade(page));
  },
});

export { expect } from "@playwright/test";
