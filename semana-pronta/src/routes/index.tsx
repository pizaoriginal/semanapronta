import { createFileRoute } from "@tanstack/react-router";

import { SalesPage } from "@/components/landing/SalesPage";

const TITLE = "Semana Pronta — 40 marmitas caseiras para congelar";
const DESCRIPTION =
  "Guia digital com 4 cardápios, listas de compras, cronograma de preparo e o passo a passo para congelar marmitas com segurança. Uma tarde de cozinha, o almoço da semana resolvido.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: SalesPage,
});
