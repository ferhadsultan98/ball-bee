import Image from "next/image";
import food from "@/assets/images/food.jpg";
import type { Dictionary } from "@/i18n/dictionaries/az";
import { cn } from "@/lib/utils";
import { Bolt, Drop, Leaf, Shield, Sparkle } from "../ui/Icons";
import { Stagger, StaggerItem } from "../ui/motion";
import { Accent } from "../ui/Section";

const ICONS = [Bolt, Shield, Sparkle, Leaf, Drop];

export function Benefits({ t }: { t: Dictionary["benefits"] }) {
  return (
    <section aria-labelledby="benefits-title" className="section-y">
      <div className="container-x">
        <Stagger className="grid auto-rows-[minmax(13rem,auto)] gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          <StaggerItem className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-7 text-white md:col-span-2 md:row-span-2 lg:row-span-3 md:p-10">
            <Image
              src={food}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-z-10 object-cover opacity-80"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
            <div className="flex h-full min-h-[22rem] flex-col justify-between">
              <p className="eyebrow text-honey-300">
                <span className="h-px w-6 bg-current opacity-60" aria-hidden />
                {t.eyebrow}
              </p>
              <h2 id="benefits-title" className="text-h2 max-w-md text-white [&_em]:text-honey-300">
                <Accent text={t.title} />
              </h2>
            </div>
          </StaggerItem>

          {t.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const featured = i === 1;
            return (
              <StaggerItem
                key={item.title}
                className={cn(
                  "group flex flex-col justify-between gap-10 rounded-[2rem] p-7 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1",
                  featured
                    ? "bg-[linear-gradient(160deg,var(--color-honey-300),var(--color-honey-400))] text-ink shadow-[0_20px_50px_-24px_rgb(201_130_0/0.8)]"
                    : "surface",
                  i === t.items.length - 1 && "md:col-span-2",
                )}
              >
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-2xl transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6",
                    featured ? "bg-white/45 text-ink" : "bg-honey-200/70 text-honey-700",
                  )}
                >
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-h3">{item.title}</h3>
                  <p className={cn("mt-2 leading-relaxed", featured ? "text-ink/75" : "text-muted")}>{item.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
