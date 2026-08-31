import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface ArticlePageProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Closing call to action — every pillar page ends by pointing at the simulator. */
  ctaLabel?: string;
  ctaIntro?: string;
  children: ReactNode;
}

/** Shared shell for the editorial pillar pages (/vendre-sa-voiture etc.). */
export function ArticlePage({
  eyebrow,
  title,
  subtitle,
  ctaLabel = "Obtenir mon estimation gratuite",
  ctaIntro,
  children,
}: ArticlePageProps) {
  return (
    <main>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="bg-bone px-4 py-14">
        <article className="article-prose mx-auto max-w-3xl">{children}</article>

        <Reveal>
          <div className="relative mx-auto mt-14 max-w-3xl overflow-hidden bg-black px-6 py-10 text-bone sm:px-10">
            <div
              className="pointer-events-none absolute -right-[10%] -top-[40%] h-[200%] w-[45%]"
              style={{ background: "radial-gradient(circle, rgba(255,74,28,0.2) 0%, transparent 60%)" }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="eyebrow mb-3">— Prochaine étape</p>
              {ctaIntro && <p className="mb-6 max-w-xl text-bone/75">{ctaIntro}</p>}
              <Link href="/estimation" className="inline-block">
                <Button>
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
