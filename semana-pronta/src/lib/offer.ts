/**
 * Dados da oferta.
 *
 * LINK DO CHECKOUT: para trocar de plataforma (Kiwify ↔ Hotmart), substitua
 * apenas o endereço abaixo. Todos os botões de compra da página passam a usar
 * o novo link, e o nome da plataforma exibido ao lado do preço muda sozinho.
 * Se deixar vazio (""), os botões voltam a levar até a seção de oferta.
 */
export const CHECKOUT_URL = "https://pay.kiwify.com.br/ch6Hh4i";

export const OFFER = {
  product: "Semana Pronta",
  price: "27",
  guaranteeDays: 7,
  pages: 36,
  menus: 4,
  mealsPerMenu: 10,
  recipes: 16,
} as const;

export function checkoutHref(url: string = CHECKOUT_URL): string {
  const trimmed = url.trim();
  return /^https:\/\//.test(trimmed) ? trimmed : "#oferta";
}

export function hasCheckout(url: string = CHECKOUT_URL): boolean {
  return checkoutHref(url) !== "#oferta";
}

/** Nome da plataforma de pagamento, deduzido do link do checkout. */
export function checkoutPlatform(url: string = CHECKOUT_URL): "Kiwify" | "Hotmart" | null {
  if (!hasCheckout(url)) return null;
  let host: string;
  try {
    host = new URL(url.trim()).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (host === "kiwify.com.br" || host.endsWith(".kiwify.com.br")) return "Kiwify";
  if (host === "hotmart.com" || host.endsWith(".hotmart.com")) return "Hotmart";
  return null;
}

export function totalMeals(): number {
  return OFFER.menus * OFFER.mealsPerMenu;
}
