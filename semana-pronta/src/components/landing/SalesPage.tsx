import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  Leaf,
  Lock,
  Printer,
  ShieldCheck,
  Snowflake,
  X,
} from "lucide-react";

const PINTEREST_URL = "https://br.pinterest.com/semanapronta/";

function PinterestIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.57-1 4-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.9 2.74.1.12.11.22.08.34l-.33 1.37c-.05.22-.18.27-.41.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.78 2.75-7.26 7.92-7.26 4.16 0 7.39 2.96 7.39 6.93 0 4.13-2.6 7.46-6.22 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z" />
    </svg>
  );
}

import { useEffect, useState } from "react";
import preparoImg from "@/assets/preparo-marmitas.jpg";
import freezerImg from "@/assets/freezer-organizado.jpg";
import pageCover from "@/assets/ebook-p1.jpg";
import pageWeek from "@/assets/ebook-p15.jpg";
import pageTimeline from "@/assets/ebook-p16.jpg";
import pageRecipe from "@/assets/ebook-p17.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "./VideoPlayer";
import { useScrollReveal } from "./useScrollReveal";
import { checkoutHref, checkoutPlatform, OFFER, totalMeals } from "@/lib/offer";

const PRICE_LABEL = `R$ ${OFFER.price}`;

/** Atributos de um link de compra: vai para o checkout (nova aba) ou, sem link, para a oferta. */
function buyLinkProps() {
  const href = checkoutHref();
  return href.startsWith("http") ? { href, target: "_blank", rel: "noopener" } : { href };
}

function Cta({ label = `Quero o guia por ${PRICE_LABEL}` }) {
  return (
    <Button asChild variant="hero" size="xl" className="h-auto min-h-14 w-full whitespace-normal py-3 text-center sm:w-auto">
      <a {...buyLinkProps()}>
        {label}
        <ArrowRight />
      </a>
    </Button>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="shrink-0 font-display text-lg sm:text-xl font-semibold">
          Semana <em className="font-medium text-primary">Pronta</em>
        </a>
        <div className="flex items-center gap-2">
          <a
            href={PINTEREST_URL}
            target="_blank"
            rel="noopener"
            aria-label="Semana Pronta no Pinterest"
            className="grid size-9 place-items-center rounded-full text-primary transition-colors hover:bg-primary-soft"
          >
            <PinterestIcon className="size-5" />
          </a>
          <Button asChild variant="ink" size="sm" className="h-9 px-4">
            <a href="#oferta">Quero o guia</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-glow mx-auto grid max-w-6xl items-center gap-10 px-5 pt-10 pb-16 md:grid-cols-[1.05fr_1fr] md:pt-16 md:pb-24">
      <div className="rise-in">
        <p className="eyebrow">Guia digital · comida caseira congelada</p>
        <h1 className="mt-4 text-[2.1rem] leading-[1.05] sm:text-[2.6rem] font-semibold md:text-6xl">
          Uma tarde de cozinha.{" "}
          <em className="font-medium text-primary">O almoço da semana resolvido.</em>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          {OFFER.menus} cardápios com lista de compras, cronograma de preparo e o passo a passo para
          congelar com segurança. Você cozinha cerca de 2 a 3 horas e monta 10 marmitas de comida de
          verdade.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Cta />
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <FileText className="size-4 text-secondary" /> PDF de {OFFER.pages} páginas
          </li>
          <li className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-secondary" /> {OFFER.guaranteeDays} dias de garantia
          </li>
          <li className="flex items-center gap-1.5">
            <Printer className="size-4 text-secondary" /> Pronto para imprimir
          </li>
        </ul>
      </div>
      <div className="relative mx-auto w-full max-w-[22rem] rise-in [animation-delay:150ms] md:max-w-sm">
        <VideoPlayer />
      </div>
    </section>
  );
}

function Facts() {
  const items = [
    [String(OFFER.menus), "cardápios semanais"],
    [String(totalMeals()), "marmitas no total"],
    [String(OFFER.recipes), "receitas caseiras"],
    ["2–3 h", "de cozinha por semana"],
  ];
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-12 md:grid-cols-4 md:divide-x md:divide-ink-foreground/15">
        {items.map(([n, l]) => (
          <div key={l} className="px-2 text-center">
            <div className="font-display text-4xl font-semibold text-accent md:text-5xl">{n}</div>
            <div className="mt-1 text-sm text-ink-muted">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pains() {
  const pains = [
    {
      t: "“O que eu vou almoçar hoje?”",
      d: "A mesma pergunta todo dia, e a resposta acaba sendo o que der tempo — ou o delivery.",
    },
    {
      t: "Comida estragando na geladeira",
      d: "Você compra com boa intenção, mas sem um plano, metade dos legumes vai para o lixo.",
    },
    {
      t: "Já tentou congelar e não gostou",
      d: "Arroz duro, legume murcho, marmita aguada. Quase sempre é técnica — e técnica se aprende.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="eyebrow">Você se reconhece?</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
        Falta de tempo não é falta de vontade de comer bem.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pains.map((p, i) => (
          <div key={p.t} className="relative rounded-2xl border border-border bg-card p-6 sm:p-7">
            <span className="font-display text-sm font-semibold text-primary">0{i + 1}</span>
            <h3 className="mt-2 text-xl font-semibold">{p.t}</h3>
            <p className="mt-3 text-muted-foreground">{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    ["Planeje", "Escolha um dos 4 cardápios. Cada um tem duas combinações para você não enjoar."],
    ["Compre", "Lista pronta, separada por seção do mercado, com as quantidades para 10 marmitas."],
    [
      "Cozinhe em bloco",
      "Um cronograma organiza forno, pressão e fogão trabalhando ao mesmo tempo.",
    ],
    ["Congele", "Esfrie rápido, monte em linha, etiquete. Na véspera, passe para a geladeira."],
  ];
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <img
          src={preparoImg}
          alt="Pessoa montando marmitas com arroz e carne moída numa cozinha de casa"
          width={1200}
          height={1504}
          loading="lazy"
          className="page-preview aspect-[4/5] w-full rounded-3xl object-cover"
        />
        <div>
          <p className="eyebrow">O método</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Quatro passos simples. O segredo está na ordem.
          </h2>
          <ol className="mt-8 space-y-6">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-5">
                <span className="font-display text-4xl leading-none font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{t}</h3>
                  <p className="mt-1 text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Inside() {
  const chapters = [
    "O método em 4 passos",
    "Potes, utensílios e espaço no freezer",
    "Regras de segurança para congelar",
    "Tabela: o que congela bem e o que não",
    "Como montar uma marmita equilibrada",
    "5 receitas base (arroz, feijão, legumes)",
    "4 cardápios com lista de compras e cronograma",
    "Como descongelar e reaquecer sem ressecar",
    "Adaptações: sem pressão, sem forno, vegetariano",
    "Planilha para calcular o custo da sua marmita",
    "Planejador, lista de compras e etiquetas para imprimir",
  ];
  const previews = [
    [pageWeek, "Página do cardápio da Semana 1 com lista de compras"],
    [pageTimeline, "Página do cronograma do dia de preparo"],
    [pageRecipe, "Página de receitas da Semana 1"],
  ] as const;
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Por dentro do guia</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          Veja as páginas reais antes de comprar.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Nada de “conteúdo secreto”. Estas são páginas do PDF que você recebe.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-3 md:gap-8">
        {previews.map(([src, alt], i) => (
          <img
            key={alt}
            src={src}
            alt={alt}
            width={910}
            height={1286}
            loading="lazy"
            className={`page-preview w-full ${i === 1 ? "md:-translate-y-6" : ""}`}
          />
        ))}
      </div>
      <ul className="mt-14 grid gap-x-10 gap-y-3 md:grid-cols-2">
        {chapters.map((c) => (
          <li key={c} className="flex items-start gap-3 border-b border-border pb-3">
            <Check className="mt-0.5 size-5 shrink-0 text-secondary" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Menus() {
  const weeks = [
    {
      n: 1,
      name: "Clássica",
      time: "≈ 3 h",
      a: "Frango desfiado ao molho de tomate",
      b: "Carne moída com cenoura",
      sides: "Arroz, feijão carioca, brócolis, abóbora assada, cenoura e vagem",
    },
    {
      n: 2,
      name: "Leve",
      time: "≈ 2 h 30",
      a: "Frango em cubos com páprica",
      b: "Almôndegas assadas ao sugo",
      sides: "Arroz integral, purê de batata-doce, couve-flor, brócolis",
    },
    {
      n: 3,
      name: "Econômica",
      time: "≈ 2 h",
      a: "Lentilha com legumes",
      b: "Sobrecoxa assada com colorau",
      sides: "Arroz, macarrão al dente, repolho refogado, abóbora",
    },
    {
      n: 4,
      name: "Caseira de domingo",
      time: "≈ 3 h",
      a: "Picadinho de carne com cenoura",
      b: "Tilápia ao forno com tomate e pimentão",
      sides: "Arroz colorido, feijão preto, couve-flor, legumes assados",
    },
  ];
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow text-accent">Os cardápios</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
          Comida que parece almoço de casa. Porque é.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-muted">
          Ingredientes de qualquer mercado, sem nada difícil de achar. Cada semana rende 10
          marmitas: 5 da combinação A e 5 da B.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {weeks.map((w) => (
            <article key={w.n} className="rounded-2xl border border-ink-muted/20 p-7">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink-muted">Semana {w.n}</span>
                <span className="flex items-center gap-1.5 text-sm text-ink-muted">
                  <Clock className="size-4" /> {w.time}
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-semibold">{w.name}</h3>
              <div className="mt-5 space-y-3">
                <p>
                  <span className="mr-2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                    A
                  </span>
                  {w.a}
                </p>
                <p>
                  <span className="mr-2 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">
                    B
                  </span>
                  {w.b}
                </p>
              </div>
              <p className="mt-5 border-t border-ink-muted/20 pt-4 text-sm text-ink-muted">
                + {w.sides}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Safety() {
  const rules = [
    "Quanto tempo a comida pode ficar fora da geladeira",
    "A temperatura certa do freezer e por quanto tempo guardar",
    "Como esfriar rápido antes de congelar",
    "Por que não recongelar — e como descongelar do jeito certo",
    "Quais alimentos ficam ruins no freezer (e o que usar no lugar)",
  ];
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1fr_0.85fr]">
      <div>
        <p className="eyebrow">Congelar com segurança</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          Marmita boa é marmita segura.
        </h2>
        <p className="mt-4 text-muted-foreground">
          As orientações do guia seguem boas práticas de segurança de alimentos da ANVISA e do
          USDA, explicadas em linguagem de cozinha, sem termos técnicos.
        </p>
        <ul className="mt-8 space-y-3">
          {rules.map((r) => (
            <li key={r} className="flex items-start gap-3">
              <Snowflake className="mt-0.5 size-5 shrink-0 text-primary" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
      <img
        src={freezerImg}
        alt="Gaveta de freezer organizada com marmitas etiquetadas"
        width={1200}
        height={1504}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-3xl object-cover"
      />
    </section>
  );
}

function Honest() {
  const forWho = [
    "Trabalha fora ou em home office e quer almoçar comida caseira",
    "Gasta mais do que gostaria com delivery",
    "Cozinha o básico e quer um roteiro para não se perder",
    "Mora sozinho ou a dois (10 marmitas = 1 ou 2 semanas)",
  ];
  const notFor = [
    "Procura uma dieta para emagrecer ou calorias contadas",
    "Precisa de um cardápio para uma condição de saúde específica",
    "Espera receitas gourmet ou ingredientes sofisticados",
    "Não tem nenhum espaço no freezer",
  ];
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Sem enrolação</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
          Para quem é — e para quem não é.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-secondary-soft p-7">
            <h3 className="text-xl font-semibold">É para você se…</h3>
            <ul className="mt-5 space-y-3">
              {forWho.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-primary-soft p-7">
            <h3 className="text-xl font-semibold">Não é para você se…</h3>
            <ul className="mt-5 space-y-3">
              {notFor.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <X className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-background p-7 md:flex md:items-start md:gap-6">
          <Leaf className="size-8 shrink-0 text-secondary" />
          <div className="mt-3 md:mt-0">
            <h3 className="text-xl font-semibold">O que a gente não promete</h3>
            <p className="mt-2 text-muted-foreground">
              Não prometemos emagrecimento, nem uma economia de valor fixo — o preço da comida muda
              de cidade para cidade. Não há depoimentos inventados nem contagem regressiva nesta
              página. O guia traz uma planilha simples para você calcular o seu próprio custo por
              marmita. As porções são referências gerais e não substituem o acompanhamento de um
              nutricionista.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const included = [
    `E-book Semana Pronta (PDF, ${OFFER.pages} páginas)`,
    `${OFFER.menus} cardápios semanais com 2 combinações cada`,
    "Listas de compras com quantidades",
    "Cronograma minuto a minuto do dia de preparo",
    `${OFFER.recipes} receitas pensadas para o freezer`,
    "Guia de congelamento, descongelamento e reaquecimento",
    "Planejador semanal, lista em branco e etiquetas para imprimir",
  ];
  return (
    <section id="oferta" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-20">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card">
        <div className="bg-ink px-7 py-8 text-ink-foreground md:px-10">
          <p className="eyebrow text-accent">Acesso imediato</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Semana Pronta</h2>
          <p className="mt-2 text-ink-muted">
            Guia digital de marmitas caseiras para congelar
          </p>
        </div>
        <div className="grid gap-8 px-7 py-8 md:grid-cols-[1.3fr_1fr] md:px-10">
          <ul className="space-y-3">
            {included.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-secondary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-center rounded-2xl bg-background p-6 text-center">
            <span className="text-sm text-muted-foreground">Pagamento único</span>
            <div className="mt-1 font-display text-5xl font-semibold sm:text-6xl">
              <span className="align-top text-2xl">R$</span>
              {OFFER.price}
            </div>
            <span className="mt-1 text-sm text-muted-foreground">sem mensalidade</span>
            <div className="mt-6">
              <Cta label="Comprar agora" />
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3.5" /> Pagamento seguro via{" "}
              {checkoutPlatform() ?? "Hotmart ou Kiwify"}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 border-t border-border px-7 py-6 md:px-10">
          <ShieldCheck className="size-8 shrink-0 text-secondary" />
          <p className="text-sm text-muted-foreground">
            <b className="text-foreground">Garantia de {OFFER.guaranteeDays} dias.</b> Se o guia
            não for o que você esperava, peça o reembolso pela própria plataforma de pagamento em
            até {OFFER.guaranteeDays} dias após a compra. É o seu direito de arrependimento (art. 49
            do Código de Defesa do Consumidor) — sem perguntas.
          </p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs: [string, string][] = [
    [
      "Como recebo o guia?",
      "Logo depois da confirmação do pagamento, você recebe por e-mail o acesso para baixar o PDF. Pix e cartão costumam ser confirmados na hora; boleto pode levar até 3 dias úteis.",
    ],
    [
      "Consigo ler no celular?",
      "Sim. O PDF abre em qualquer celular, tablet ou computador. As páginas de planejador, lista e etiquetas foram feitas para imprimir, mas são opcionais.",
    ],
    [
      "Preciso de panela de pressão?",
      "Ajuda, mas não é obrigatória. O guia traz o tempo de cozimento em panela comum para o feijão e o picadinho, e alternativas para quem não tem forno.",
    ],
    [
      "Serve para quantas pessoas?",
      "Cada cardápio rende 10 marmitas: duas semanas de almoço para 1 pessoa ou uma semana para 2. Para família, é só dobrar a lista.",
    ],
    [
      "Tem opção vegetariana?",
      "Há um cardápio com lentilha como proteína e um capítulo de adaptações para trocar as carnes por leguminosas. Não é um guia 100% vegetariano.",
    ],
    [
      "Quanto vou gastar no mercado?",
      "Depende da sua cidade e da época. Por isso não colocamos um valor: o guia traz uma planilha para você calcular o custo real da sua marmita com a sua nota do mercado.",
    ],
    [
      "É uma dieta?",
      "Não. É um método de organização para comer comida caseira com menos esforço. Se você tem objetivos nutricionais, leve o guia para o seu nutricionista ajustar as porções.",
    ],
  ];
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <p className="eyebrow">Dúvidas</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center">
      <h2 className="text-3xl font-semibold md:text-5xl">
        Domingo você cozinha.{" "}
        <em className="font-medium text-primary">A semana agradece.</em>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
        {OFFER.menus} cardápios, {totalMeals()} marmitas e tudo o que você precisa para começar já no
        próximo fim de semana.
      </p>
      <div className="mt-8 flex justify-center">
        <Cta />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pb-28 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-muted-foreground md:flex-row md:justify-between">
        <span className="font-display text-base text-foreground">
          Semana <em className="text-primary">Pronta</em>
        </span>
        <a
          href={PINTEREST_URL}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 text-foreground hover:text-primary"
        >
          <PinterestIcon className="size-4" /> Siga no Pinterest
        </a>
        <span>
          Produto digital. Os resultados dependem da sua rotina e da sua cozinha. Este conteúdo não
          substitui orientação nutricional.
        </span>
      </div>
    </footer>
  );
}

function MobileBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${visible ? "translate-y-0" : "pointer-events-none translate-y-full"} border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden`}>
      <Button asChild variant="hero" className="h-12 w-full text-base">
        <a {...buyLinkProps()}>
          Quero o guia · {PRICE_LABEL}
          <ArrowRight />
        </a>
      </Button>
    </div>
  );
}

export function SalesPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Facts />
        <Pains />
        <Method />
        <Inside />
        <Menus />
        <Safety />
        <Honest />
        <Offer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
