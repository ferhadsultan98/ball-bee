import type { Dictionary } from "@/i18n/dictionaries/az";
import { LogoMark } from "../ui/Logo";
import { Reveal, ScrollWords } from "../ui/motion";

export function Manifesto({ t }: { t: Dictionary["manifesto"] }) {
  return (
    <section aria-label={t.eyebrow} className="section-y">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Reveal>
            <p className="eyebrow lg:sticky lg:top-32">
              <span className="h-px w-6 bg-current opacity-50" aria-hidden />
              {t.eyebrow}
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-9">
          <ScrollWords
            text={t.text}
            className="text-[clamp(1.75rem,1.05rem+2.9vw,3.6rem)] font-medium leading-[1.16] tracking-[-0.035em] text-ink"
          />
          <Reveal className="mt-12 flex items-center gap-4">
            <LogoMark size={56} />
            <span className="accent text-2xl text-ink-soft">{t.signature}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
