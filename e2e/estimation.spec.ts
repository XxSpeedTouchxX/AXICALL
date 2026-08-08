import { test, expect, type Page } from "@playwright/test";

/** The fixed cookie banner can overlap step buttons at the bottom of the form. */
async function dismissCookieBanner(page: Page) {
  const acceptButton = page.getByRole("button", { name: "Accepter" });
  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  }
}

test.describe("Golden path: home → estimation → result", () => {
  test("completes the 4-step estimator and reaches the result page", async ({ page }) => {
    await page.goto("/");
    await dismissCookieBanner(page);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/estimation gratuite/i);

    await page.getByRole("link", { name: "Estimer mon véhicule" }).first().click();
    await expect(page).toHaveURL(/\/estimation$/);

    // Step 1 — vehicle
    await page.getByLabel("Marque").selectOption("Renault");
    await page.getByLabel("Modèle").selectOption("Clio");
    await page.getByLabel("Année").selectOption({ index: 1 }); // most recent year
    await page.getByLabel("Kilométrage").fill("45000");
    await page.getByLabel("Nombre de portes").selectOption("5");
    await page.getByText("Diesel", { exact: true }).click();
    await page.getByText("Manuelle", { exact: true }).click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Step 2 — condition
    await expect(page.getByLabel("Nombre de propriétaires")).toBeVisible();
    await page.getByText("Très bon", { exact: true }).click();
    // "Oui"/"Non" appear twice (accident, carnetEntretien) — disambiguate by DOM order.
    await page.getByText("Non", { exact: true }).first().click();
    await page.getByText("Valide", { exact: true }).click();
    await page.getByLabel("Nombre de propriétaires").fill("1");
    await page.getByText("Oui", { exact: true }).last().click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Step 3 — situation
    await expect(page.getByText("Urgent", { exact: true })).toBeVisible();
    await page.getByText("Changement de véhicule", { exact: true }).click();
    await page.getByText("Urgent", { exact: true }).click();
    await page.getByRole("button", { name: "Suivant" }).click();

    // Step 4 — contact
    await expect(page.getByLabel("Nom", { exact: true })).toBeVisible();
    await page.getByLabel("Nom", { exact: true }).fill("Dupont");
    await page.getByLabel("Prénom", { exact: true }).fill("Marie");
    await page.getByLabel("Téléphone", { exact: true }).fill("+33 612345678");
    await page.getByLabel("Email", { exact: true }).fill(`e2e-${Date.now()}@example.com`);
    await page.getByLabel("Ville", { exact: true }).fill("Lyon");
    await page.getByLabel("Code postal", { exact: true }).fill("69000");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: "Obtenir mon estimation" }).click();

    await expect(page).toHaveURL(/\/estimation\/merci$/);
    await expect(
      page.getByRole("heading", { name: /votre demande d.estimation a bien été enregistrée/i })
    ).toBeVisible();
    await expect(page.getByText(/Clio/)).toBeVisible();
  });

  test("blocks progression when required step-1 fields are missing", async ({ page }) => {
    await page.goto("/estimation");
    await dismissCookieBanner(page);
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByLabel("Marque")).toBeVisible();
    await expect(page.getByText(/merci de compléter/i)).toBeVisible();
  });
});
