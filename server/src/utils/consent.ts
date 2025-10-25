export async function acceptCookiesIfPresent(page: any) {
  try {
    const cookieSelector = "#onetrust-accept-btn-handler";

    // czekamy maksymalnie 5 sekund, ale jeśli się pojawi wcześniej, to od razu klikamy
    const button = await page
      .waitForSelector(cookieSelector, { timeout: 5000 })
      .catch(() => null);

    if (button) {
      await button.click();
      console.log("🍪 Kliknięto przycisk cookies (OneTrust)");
      await new Promise((res) => setTimeout(res, 500)); // chwila na zniknięcie popupu
    } else {
      console.log("🍪 Brak popupu cookies – lecimy dalej");
    }
  } catch (err) {
    console.warn("⚠️ Nie udało się kliknąć przycisku cookies:", err);
  }
}
