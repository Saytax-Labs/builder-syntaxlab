import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";

type Package = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  price: string;
  format: string;
  paymentUrl?: string;
  status: "available" | "payment-link-pending";
  features: string[];
  delivery: string;
};

type Asset = {
  id: string;
  title: string;
  category: string;
  description: string;
  format?: string;
  price?: string;
  status: "available" | "coming-soon";
  accessUrl?: string;
  url?: string;
  accent: "red" | "orange";
  number: string;
  featured: boolean;
  packages?: Package[];
};

/*
  CENTRAL DIGITAL-ASSET ARRAY
  ------------------------------------------------------------
  Add, edit, or remove products here.

  The Coastal Water Quality product contains all three packages
  inside ONE asset card, as requested.
*/
const digitalAssets: Asset[] = [
  {
    id: "medical-billing-icd10",
    title: "Medical Billing & ICD-10 Synthetic QA Dataset",
    category: "Production-Ready AI Fine-Tuning Datasets",
    description:
      "50,000+ cleaned, verified QA pairs formatted in JSONL and Parquet for fine-tuning healthcare AI models.",
    format: "JSONL / Parquet",
    price: "$249",
    status: "available",
    accessUrl: "https://rzp.io/rzp/4R5SsLB",
    accent: "red",
    number: "001",
    featured: true,
  },
  {
    id: "coastal-water-quality",
    title: "Coastal Water Quality Remote Sensing ML Dataset",
    category: "Remote Sensing / Machine Learning",
    description:
      "50,000 synthetic coastal-water samples designed for ML experimentation, dissertation prototyping, and remote-sensing workflows covering chlorophyll-a, turbidity, TSS, spectral features, and derived indices.",
    format: "CSV / Documentation / ML Resources",
    price: "From $19",
    status: "available",
    url: "#coastal-water-quality",
    accent: "orange",
    number: "002",
    featured: true,
    packages: [
      {
        id: "coastal-dataset",
        title: "Coastal Water Quality Dataset",
        shortTitle: "Dataset",
        description:
          "The core 50,000-row synthetic dataset for coastal water-quality ML experimentation.",
        price: "$19",
        format: "CSV + Documentation",
        paymentUrl: "https://rzp.io/rzp/nX0zaL0",
        status: "available",
        features: [
          "50,000 synthetic coastal-water samples",
          "Sentinel-2-like spectral features",
          "Chlorophyll-a, turbidity, and TSS targets",
          "NDWI, NDCI, red-edge and turbidity features",
          "Latitude, longitude, dates, QA indicators",
          "Train / validation / test split",
        ],
        delivery:
          "Placeholder delivery: after payment, show a secure download button and/or email the download link.",
      },
      {
        id: "coastal-ml-starter",
        title: "Coastal Water Quality ML Starter Kit",
        shortTitle: "ML Starter",
        description:
          "The dataset plus a practical Python workflow for exploration, visualization, baseline modeling, and evaluation.",
        price: "$39",
        format: "Dataset + Python / Jupyter + Tutorials",
        // Replace this placeholder with the dedicated Razorpay link for the $39 package.
        paymentUrl: "",
        status: "payment-link-pending",
        features: [
          "Everything in the Dataset package",
          "Python / Jupyter ML notebook",
          "Data exploration and visualization",
          "Baseline regression workflow",
          "Model evaluation metrics",
          "Step-by-step ML tutorial",
        ],
        delivery:
          "Placeholder delivery: email the purchased package download link after payment.",
      },
      {
        id: "coastal-research-kit",
        title: "Coastal Water Quality Research Kit",
        shortTitle: "Research Kit",
        description:
          "The complete research-oriented workflow with preprocessing, feature engineering, spectral indices, and model comparison.",
        price: "$59",
        format: "Dataset + Notebooks + Pipeline + Tutorials",
        // Replace this placeholder with the dedicated Razorpay link for the $59 package.
        paymentUrl: "",
        status: "payment-link-pending",
        features: [
          "Everything in the ML Starter package",
          "Preprocessing pipeline",
          "Feature engineering workflow",
          "Spectral-index feature set",
          "Model comparison + cross-validation",
          "Research workflow documentation",
        ],
        delivery:
          "Placeholder delivery: email the full Research Kit download link after payment.",
      },
    ],
  },
  {
    id: "agency-os",
    title: "Turnkey Agency Operating Systems",
    category: "n8n + Notion Workspaces",
    description: "Repeatable systems for running a sharper, calmer digital agency.",
    status: "coming-soon",
    accent: "orange",
    number: "003",
    featured: false,
  },
  {
    id: "micro-saas",
    title: "Micro-SaaS Code Boilerplates",
    category: "v0.dev / Bolt.new / Cursor",
    description: "Small, considered foundations for shipping the next useful thing.",
    status: "coming-soon",
    accent: "orange",
    number: "004",
    featured: false,
  },
  {
    id: "compliance-frameworks",
    title: "Compliance Policy Frameworks",
    category: "Google NotebookLM",
    description: "Clear policy building blocks for teams working with sensitive data.",
    status: "coming-soon",
    accent: "orange",
    number: "005",
    featured: false,
  },
  {
    id: "agency-workflows",
    title: "Automated Agency OS Workflows",
    category: "Claude / Gemini + n8n",
    description: "Practical automations that turn busywork into a background process.",
    status: "coming-soon",
    accent: "orange",
    number: "006",
    featured: false,
  },
];

type ModalType = "contact" | "terms" | "privacy" | null;

export default function Index() {
  const [modal, setModal] = useState<ModalType>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  /*
    Supports direct links such as:
    https://yourdomain.com/#assets
    https://yourdomain.com/#coastal-water-quality
    https://yourdomain.com/#payment-success

    This is intentionally only client-side navigation/placeholder behavior.
    No payment verification or delivery automation is implemented here.
  */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    return () => window.clearTimeout(timer);
  }, []);

  const coastalAsset = digitalAssets.find(
    (asset) => asset.id === "coastal-water-quality",
  );

  return (
    <main className="min-h-screen overflow-hidden bg-canvas text-cream selection:bg-flame selection:text-ink">
      <div className="site-noise" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-cream/15 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#assets"
            onClick={(event) => {
              event.preventDefault();
              window.history.replaceState(null, "", "#assets");
              scrollTo("assets");
            }}
            className="group flex items-center gap-3 text-left"
            aria-label="Syntax labs products"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-flame text-[15px] font-black tracking-[-0.1em] text-flame transition-transform group-hover:rotate-12">
              S/
            </span>
            <span className="font-display text-xl font-bold tracking-[-0.04em]">
              Syntax <span className="text-flame">labs</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <button onClick={() => scrollTo("assets")} className="nav-link">
              Browse assets
            </button>
            <button onClick={() => scrollTo("about")} className="nav-link">
              About
            </button>
            <button onClick={() => setModal("contact")} className="nav-link">
              Contact
            </button>
          </nav>

          <button
            onClick={() => {
              window.history.replaceState(null, "", "#coastal-water-quality");
              scrollTo("coastal-water-quality");
            }}
            className="hidden rounded-full bg-red px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-cream transition-all hover:bg-flame hover:text-ink sm:block"
          >
            Shop coastal dataset{" "}
            <ArrowUpRight className="ml-1 inline h-4 w-4" />
          </button>

          <button
            className="rounded-full border border-cream/25 p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-cream/15 bg-ink px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.15em]">
              <button onClick={() => scrollTo("assets")} className="text-left">
                Browse assets
              </button>
              <button onClick={() => scrollTo("about")} className="text-left">
                About
              </button>
              <button onClick={() => setModal("contact")} className="text-left">
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      <section
        id="top"
        className="relative mx-auto flex min-h-[760px] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-36 sm:px-8 sm:pb-24 lg:px-16"
      >
        <div className="pointer-events-none absolute right-[-120px] top-[130px] hidden h-[470px] w-[470px] rounded-full border border-flame/30 lg:block" />
        <div className="pointer-events-none absolute right-[-25px] top-[225px] hidden h-[280px] w-[280px] rounded-full border border-cream/10 lg:block" />

        <div className="mb-12 flex items-start justify-between gap-6">
          <p className="eyebrow">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-flame" />
            Developer-ready digital assets
          </p>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-cream/45 sm:block">
            GLOBAL DIGITAL ASSET SHOP
          </span>
        </div>

        <div className="relative max-w-5xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-flame">
            Tools for people building the future
          </p>
          <h1 className="font-display text-[clamp(4.6rem,13vw,11.5rem)] font-bold leading-[0.82] tracking-[-0.085em] text-cream">
            Build
            <br />
            <span className="text-red">better.</span>
          </h1>

          <div className="mt-10 flex max-w-2xl flex-col justify-between gap-8 border-t border-cream/25 pt-6 sm:flex-row sm:items-end">
            <p className="max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">
              Production-ready datasets, modular operating systems, and
              implementation resources built to help technical teams move from
              idea to deployment faster.
            </p>

            <button
              onClick={() => scrollTo("assets")}
              className="flex shrink-0 items-center gap-3 self-start text-xs font-bold uppercase tracking-[0.17em] text-flame transition-colors hover:text-cream sm:self-end"
            >
              See what&apos;s in the shop
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-flame">
                <ArrowDown className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-5 border-t border-cream/15 pt-5 sm:grid-cols-4">
          <div>
            <p className="stat-value">03</p>
            <p className="stat-label">Product packages</p>
          </div>
          <div>
            <p className="stat-value">50k</p>
            <p className="stat-label">Synthetic samples</p>
          </div>
          <div>
            <p className="stat-value">ML</p>
            <p className="stat-label">Research workflows</p>
          </div>
          <div>
            <p className="stat-value">∞</p>
            <p className="stat-label">Ways to build</p>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 text-ink sm:px-8 lg:px-16 lg:py-28" id="about">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow-dark">Why Syntax labs</p>
            <h2 className="mt-6 max-w-lg font-display text-5xl font-bold leading-[0.9] tracking-[-0.07em] sm:text-7xl">
              Good tools feel like a shortcut.
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="max-w-xl text-xl leading-relaxed text-ink/70 sm:text-2xl">
              We package the hard-won parts of building digital products into
              useful, ready-to-go assets. No fluff. No lock-in. Just a better
              starting line.
            </p>

            <div className="mt-10 grid gap-6 border-t border-ink/20 pt-6 sm:grid-cols-2">
              <div>
                <Database className="mb-4 h-6 w-6 text-red" />
                <h3 className="font-display text-xl font-bold">
                  Useful by default
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  Clean, structured, and ready to plug into the way you work.
                </p>
              </div>

              <div>
                <ShieldCheck className="mb-4 h-6 w-6 text-red" />
                <h3 className="font-display text-xl font-bold">
                  Built with care
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  Thoughtful, transparent assets made for commercial use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="assets"
        className="mx-auto max-w-[1440px] px-5 py-20 scroll-mt-24 sm:px-8 lg:px-16 lg:py-28"
      >
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-cream/20 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">The catalog / 2026</p>
            <h2 className="mt-5 font-display text-5xl font-bold tracking-[-0.07em] sm:text-7xl">
              The good stuff.
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-cream/55">
            Small-batch digital assets for ambitious operators, creators, and
            teams.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {digitalAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onOpenPackages={
                asset.id === "coastal-water-quality"
                  ? () => {
                      window.history.replaceState(
                        null,
                        "",
                        "#coastal-water-quality",
                      );
                      scrollTo("coastal-water-quality");
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      {coastalAsset?.packages && (
        <section
          id="coastal-water-quality"
          className="scroll-mt-24 bg-cream px-5 py-20 text-ink sm:px-8 lg:px-16 lg:py-28"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="flex flex-col gap-8 border-b border-ink/15 pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="eyebrow-dark">Featured research / ML bundle</p>
                <h2 className="mt-5 font-display text-5xl font-bold leading-[0.88] tracking-[-0.07em] sm:text-7xl">
                  Coastal Water Quality
                  <br />
                  <span className="text-red">Remote Sensing.</span>
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
                  Choose the level of support you need: the core dataset, a
                  guided ML starter workflow, or the complete research kit.
                </p>
              </div>

              <a
                href="#assets"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-red hover:bg-red hover:text-cream"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to catalog
              </a>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {coastalAsset.packages.map((pkg, index) => {
                const isConfigured = Boolean(pkg.paymentUrl);

                return (
                  <article
                    key={pkg.id}
                    className={`relative flex min-h-[540px] flex-col overflow-hidden border p-7 sm:p-8 ${
                      index === 0
                        ? "border-red bg-red text-cream"
                        : "border-ink/15 bg-white text-ink"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${
                          index === 0 ? "text-cream/65" : "text-ink/45"
                        }`}
                      >
                        0{index + 1} / 03
                      </span>

                      {index === 0 ? (
                        <span className="rounded-full bg-flame px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
                          Available now
                        </span>
                      ) : (
                        <span className="rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink/50">
                          Payment link pending
                        </span>
                      )}
                    </div>

                    <div className="mt-auto">
                      <p
                        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                          index === 0 ? "text-flame" : "text-red"
                        }`}
                      >
                        {pkg.format}
                      </p>

                      <h3 className="mt-3 max-w-lg font-display text-3xl font-bold leading-[0.94] tracking-[-0.055em] sm:text-4xl">
                        {pkg.title}
                      </h3>

                      <p
                        className={`mt-5 text-sm leading-relaxed ${
                          index === 0 ? "text-cream/75" : "text-ink/60"
                        }`}
                      >
                        {pkg.description}
                      </p>

                      <div
                        className={`mt-7 border-t pt-5 ${
                          index === 0 ? "border-cream/20" : "border-ink/15"
                        }`}
                      >
                        <p className="font-display text-4xl font-bold tracking-[-0.05em]">
                          {pkg.price}
                        </p>

                        <ul className="mt-5 space-y-2.5">
                          {pkg.features.map((feature) => (
                            <li
                              key={feature}
                              className={`flex items-start gap-2 text-sm ${
                                index === 0 ? "text-cream/80" : "text-ink/70"
                              }`}
                            >
                              <Check
                                className={`mt-0.5 h-4 w-4 shrink-0 ${
                                  index === 0 ? "text-flame" : "text-red"
                                }`}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-7">
                          {isConfigured ? (
                            <a
                              href={pkg.paymentUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setSelectedPackage(pkg)}
                              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                                index === 0
                                  ? "bg-cream text-ink hover:bg-flame"
                                  : "bg-red text-cream hover:bg-flame hover:text-ink"
                              }`}
                            >
                              Buy {pkg.shortTitle}
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          ) : (
                            <button
                              type="button"
                              disabled
                              onClick={() => setSelectedPackage(pkg)}
                              className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-ink/10 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink/45"
                            >
                              Razorpay link coming soon
                            </button>
                          )}
                        </div>
                      </div>

                      <p
                        className={`mt-4 text-[11px] leading-relaxed ${
                          index === 0 ? "text-cream/50" : "text-ink/45"
                        }`}
                      >
                        {pkg.delivery}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 border border-ink/15 bg-white p-6 sm:p-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-red">
                Delivery architecture — placeholder only
              </p>
              <div className="mt-4 grid gap-5 md:grid-cols-3">
                <DeliveryStep
                  number="01"
                  title="Payment"
                  body="Customer completes payment on Razorpay."
                />
                <DeliveryStep
                  number="02"
                  title="Success"
                  body="Customer is sent to a future Syntax Labs success URL."
                />
                <DeliveryStep
                  number="03"
                  title="Delivery"
                  body="Future automation can expose a secure download and/or email the download link."
                />
              </div>
            </div>

            <div
              id="payment-success"
              className="mt-8 scroll-mt-24 border border-ink/15 bg-ink p-7 text-cream sm:p-10"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-flame">
                Post-payment success page — placeholder
              </p>
              <h3 className="mt-4 font-display text-4xl font-bold tracking-[-0.05em]">
                Payment received.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/65">
                This section is intentionally not connected to Razorpay yet.
                When you are ready to implement delivery, this page can confirm
                the payment server-side, identify the purchased package, and
                then reveal a secure download link or trigger the delivery
                email.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-cream/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-cream/45"
                >
                  Download — automation not connected
                </button>
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-flame/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-flame/50"
                >
                  Email — automation not connected
                </button>
              </div>

              {selectedPackage && (
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-cream/40">
                  Selected package: {selectedPackage.title}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-red px-5 py-20 text-cream sm:px-8 lg:px-16 lg:py-28">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cream/65">
              Keep in touch
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.88] tracking-[-0.07em] sm:text-8xl">
              Good things
              <br />
              are loading.
            </h2>
          </div>

          <button
            onClick={() => setModal("contact")}
            className="group flex items-center gap-4 border-b border-cream pb-3 text-sm font-bold uppercase tracking-[0.16em]"
          >
            Contact Syntax labs
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-flame text-ink transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </section>

      <footer className="border-t border-cream/15 px-5 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <a
              href="#assets"
              className="font-display text-2xl font-bold tracking-[-0.05em]"
            >
              Syntax <span className="text-flame">labs</span>
            </a>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-cream/45">
              Digital assets for the next version of your work.
              <br />
              Made with intent, somewhere on the internet.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.12em] text-cream/55">
            <button
              onClick={() => setModal("contact")}
              className="hover:text-flame"
            >
              Contact us
            </button>
            <button
              onClick={() => setModal("terms")}
              className="hover:text-flame"
            >
              Terms & conditions
            </button>
            <button
              onClick={() => setModal("privacy")}
              className="hover:text-flame"
            >
              Privacy policy
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1320px] justify-between border-t border-cream/10 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/35">
          <span>© 2026 Syntax labs</span>
          <span>Made for the long road</span>
        </div>
      </footer>

      {modal && <Modal type={modal} onClose={() => setModal(null)} />}
    </main>
  );
}

function AssetCard({
  asset,
  onOpenPackages,
}: {
  asset: Asset;
  onOpenPackages?: () => void;
}) {
  const isAvailable = asset.status === "available";
  const isRed = asset.accent === "red";

  const cardClasses = isRed
    ? "border-red bg-red"
    : "border-cream/20 bg-ink/30";

  const numberClasses = isRed ? "text-cream/60" : "text-flame/80";
  const categoryClasses = isRed ? "text-flame" : "text-cream/45";
  const titleClasses = isRed ? "text-cream" : "text-cream/80";
  const descriptionClasses = isRed
    ? "text-cream/75"
    : "text-cream/45";

  const cardClassName = `group relative flex min-h-[380px] flex-col overflow-hidden border ${cardClasses} p-6 transition-transform hover:-translate-y-1 sm:p-8 ${
    asset.featured ? "md:col-span-2 lg:col-span-2" : ""
  }`;

  const cardContent = (
    <>
      <div className="flex items-center justify-between">
        <span className={`font-mono text-xs ${numberClasses}`}>
          {asset.number} / 06
        </span>

        {isAvailable ? (
          <span className="flex items-center gap-2 rounded-full bg-flame px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            Available now
          </span>
        ) : (
          <span className="rounded-full border border-cream/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-cream/45">
            Coming soon
          </span>
        )}
      </div>

      <div className="mt-auto">
        <p
          className={`mb-3 font-mono text-[10px] uppercase tracking-[0.18em] ${categoryClasses}`}
        >
          {asset.category}
        </p>

        <h3
          className={`max-w-xl font-display text-3xl font-bold leading-[0.94] tracking-[-0.055em] sm:text-4xl ${titleClasses}`}
        >
          {asset.title}
        </h3>

        <p
          className={`mt-5 max-w-lg text-sm leading-relaxed ${descriptionClasses}`}
        >
          {asset.description}
        </p>

        {asset.id === "coastal-water-quality" && asset.packages ? (
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-cream/20 pt-5">
            <div className="flex gap-5 font-mono text-xs">
              <span className="text-cream/45">
                Packages
                <strong className="ml-1 text-cream">03</strong>
              </span>
              <span className="text-cream/45">
                From
                <strong className="ml-1 text-cream">$19</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenPackages}
              className="flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-flame"
            >
              View packages
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          isAvailable &&
          asset.accessUrl && (
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-cream/20 pt-5">
              <div className="flex gap-5 font-mono text-xs">
                <span className="text-cream/45">
                  Format
                  <strong className="ml-1 text-cream">{asset.format}</strong>
                </span>
                <span className="text-cream/45">
                  Price
                  <strong className="ml-1 text-cream">{asset.price}</strong>
                </span>
              </div>

              <a
                href={asset.accessUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-flame"
              >
                Buy now
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )
        )}
      </div>

      {!isAvailable && (
        <div className="absolute bottom-8 right-8 text-flame/35 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
          <ChevronRight className="h-7 w-7" />
        </div>
      )}
    </>
  );

  return asset.url ? (
    <article className={cardClassName}>
      {asset.url === "#coastal-water-quality" ? (
        cardContent
      ) : (
        <a href={asset.url} target="_blank" rel="noreferrer">
          {cardContent}
        </a>
      )}
    </article>
  ) : (
    <article className={cardClassName}>{cardContent}</article>
  );
}

function DeliveryStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border-t border-ink/15 pt-4">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-red">
        {number}
      </div>
      <h4 className="mt-2 font-display text-xl font-bold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{body}</p>
    </div>
  );
}

function Modal({
  type,
  onClose,
}: {
  type: Exclude<ModalType, null>;
  onClose: () => void;
}) {
  const content = {
    contact: {
      label: "Let's talk",
      title: "Have a good idea?",
      body:
        "For questions, collaborations, or just to say hello, reach out at",
      icon: <Mail />,
    },
    terms: {
      label: "The fine print",
      title: "Terms & conditions",
      body:
        "Syntax labs digital assets are licensed for commercial use by the original purchaser. Assets may not be resold, redistributed, or represented as your own. By purchasing, you agree to use all materials responsibly and in accordance with applicable laws.",
      icon: <FileText />,
    },
    privacy: {
      label: "Your data",
      title: "Privacy policy",
      body:
        "We keep things simple. Syntax labs only collects information needed to process purchases or respond to messages. We do not sell personal information or use it for unrelated marketing. Questions about your data can be sent to",
      icon: <LockKeyhole />,
    },
  }[type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-lg border border-cream/20 bg-canvas p-7 sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 rounded-full border border-cream/20 p-2 text-cream/60 hover:text-flame"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-flame text-ink">
          {content.icon}
        </div>

        <p className="eyebrow">{content.label}</p>

        <h2
          id="modal-title"
          className="mt-4 font-display text-4xl font-bold leading-none tracking-[-0.06em]"
        >
          {content.title}
        </h2>

        <p className="mt-5 text-sm leading-relaxed text-cream/65">
          {content.body}{" "}
          {type === "contact" || type === "privacy" ? (
            <a
              className="text-flame underline underline-offset-4"
              href="mailto:syntaxlabscontect@gmail.com"
            >
              syntaxlabscontect@gmail.com
            </a>
          ) : null}
        </p>

        {type === "contact" && (
          <a
            href="mailto:syntaxlabscontect@gmail.com"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-red px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-cream hover:bg-flame hover:text-ink"
          >
            Send an email
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
