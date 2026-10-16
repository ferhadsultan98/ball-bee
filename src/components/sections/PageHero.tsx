import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "../ui/Breadcrumbs";
import { ParallaxImage, Reveal, SplitWords } from "../ui/motion";

type Props = {
  title: string;
  lead?: string;
  eyebrow?: string;
  crumbs: Crumb[];
  crumbLabel: string;
  image?: StaticImageData;
  children?: ReactNode;
};

export function PageHero({ title, lead, eyebrow, crumbs, crumbLabel, image, children }: Props) {
  return (
    <section className="relative pt-32 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(55%_60%_at_80%_0%,rgb(249_207_95/0.35),transparent_70%)]" />
      <div className="container-x">
        <Reveal>
          <Breadcrumbs items={crumbs} label={crumbLabel} />
        </Reveal>
        <div className="mt-10 grid items-end gap-8 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {eyebrow ? (
              <Reveal>
                <p className="eyebrow mb-5">
                  <span className="h-px w-6 bg-current opacity-50" aria-hidden />
                  {eyebrow}
                </p>
              </Reveal>
            ) : null}
            <h1 className="text-h1 text-ink">
              <SplitWords text={title} delay={0.1} />
            </h1>
          </div>
          {lead ? (
            <Reveal delay={0.3} className="lg:col-span-4 lg:pb-3">
              <p className="text-lead text-muted">{lead}</p>
            </Reveal>
          ) : null}
        </div>
        {children}
      </div>
      {image ? (
        <div className="px-2 md:px-4">
          <Reveal delay={0.2} y={40}>
            <ParallaxImage
              src={image}
              alt=""
              placeholder="blur"
              preload
              sizes="100vw"
              strength={14}
              className="mt-14 h-[44vh] min-h-[18rem] rounded-[1.75rem] md:mt-20 md:h-[64vh] md:rounded-[2.5rem]"
            />
          </Reveal>
        </div>
      ) : null}
    </section>
  );
}
