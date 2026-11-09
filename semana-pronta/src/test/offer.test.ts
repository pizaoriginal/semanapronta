import { describe, expect, it } from "vitest";

import { CHECKOUT_URL, checkoutHref, checkoutPlatform, OFFER, totalMeals } from "@/lib/offer";

describe("oferta", () => {
  it("o checkout ativo é o link da Kiwify informado", () => {
    expect(checkoutHref()).toBe("https://pay.kiwify.com.br/ch6Hh4i");
    expect(CHECKOUT_URL).toBe("https://pay.kiwify.com.br/ch6Hh4i");
  });

  it("identifica a plataforma pelo link", () => {
    expect(checkoutPlatform("https://pay.kiwify.com.br/ch6Hh4i")).toBe("Kiwify");
    expect(checkoutPlatform("https://pay.hotmart.com/X123")).toBe("Hotmart");
    expect(checkoutPlatform("")).toBeNull();
  });

  it("leva para a seção de oferta enquanto não houver link de checkout", () => {
    expect(checkoutHref("")).toBe("#oferta");
  });

  it("usa o link da Hotmart/Kiwify quando ele é informado", () => {
    expect(checkoutHref("https://pay.kiwify.com.br/abc123")).toBe(
      "https://pay.kiwify.com.br/abc123",
    );
  });

  it("4 cardápios de 10 marmitas somam 40 marmitas", () => {
    expect(totalMeals()).toBe(40);
  });

  it("garantia de 7 dias", () => {
    expect(OFFER.guaranteeDays).toBe(7);
  });
});
