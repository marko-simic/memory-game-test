const { test, expect } = require("@playwright/test")

test("Should solve the memory game", async ({ page }) => {
  await page.goto("/")

  await expect(page.locator("#card-deck")).toBeVisible()

  const cards = await page.$$(".card")
  let cardType
  for (let index = 0; index < cards.length; index++) {
    // If the card already matched, skip it and continue with the loop
    if ((await cards[index].getAttribute("class")).includes("match")) continue

    await cards[index].click()
    cardType = await cards[index].getAttribute("type")

    // Find a second card with the same type and click on it
    await page
      .locator("[type=" + cardType + "]")
      .nth(1)
      .click()
  }

  await expect(page.locator("h2 >> text=Congratulations")).toBeVisible()

  // Take a screenshot of the congratulations modal
  await page.screenshot({ path: "success.png" }) //
})
