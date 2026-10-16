import Image from "next/image";
import honey from "@/assets/images/honey.jpg";
import type { Dictionary } from "@/i18n/dictionaries/az";
import { site, telLink, whatsappLink } from "@/lib/site";
import { Phone, Whatsapp } from "../ui/Icons";
import { Parallax, Reveal } from "../ui/motion";
import { Accent } from "../ui/Section";

export function CtaBand({ t, greeting }: { t: Dictionary["cta"]; greeting: string }) {
  return (
    <section aria-labelledby="cta-title" className="px-2 py-16 md:px-4 md:py-24">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(140deg,var(--color-honey-300)_0%,var(--color-honey-400)_55%,var(--color-honey-500)_100%)] md:rounded-[2.75rem]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_20%,rgb(255_255_255/0.45),transparent_60%)]" />
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="px-6 py-14 sm:px-10 md:py-20 lg:col-span-7 lg:py-28 lg:pl-16">
            <Reveal>
              <h2 id="cta-title" className="text-h2 max-w-xl text-ink [&_em]:text-honey-900">
                <Accent text={t.title} />
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lead mt-5 max-w-lg text-ink/75">{t.lead}</p>
            </Reveal>
            <Reveal delay={0.16} className="mt-9 flex flex-wrap gap-3">
              <a href={whatsappLink(greeting)} target="_blank" rel="noopener noreferrer" className="btn btn-ink btn-lg">
                <Whatsapp size={19} />
                {t.primary}
              </a>
              <a href={telLink} className="btn btn-lg bg-white/55 text-ink backdrop-blur hover:bg-white/85">
                <Phone size={18} />
                {site.phoneDisplay}
              </a>
            </Reveal>
          </div>
          <div className="relative hidden h-full min-h-[30rem] lg:col-span-5 lg:block">
            <Parallax speed={50} className="absolute inset-y-10 right-10 left-0">
              <div className="relative h-full overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgb(61_38_0/0.6)]">
                <Image src={honey} alt="" fill placeholder="blur" sizes="40vw" className="object-cover" />
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
