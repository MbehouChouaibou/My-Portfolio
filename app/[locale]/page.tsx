import { setRequestLocale } from "next-intl/server";
import { getPortfolioData } from "@/lib/content";
import { locales } from "@/lib/i18n";

import { OpenToWork }      from "@/components/sections/OpenToWork";
import { Hero }            from "@/components/sections/Hero";
import { About }           from "@/components/sections/About";
import { Skills }          from "@/components/sections/Skills";
import { Experience }      from "@/components/sections/Experience";
import { Projects }        from "@/components/sections/Projects";
import { Certifications }  from "@/components/sections/Certifications";
import { Education }       from "@/components/sections/Education";
import { Resume }          from "@/components/sections/Resume";
import { GitHubWidget }    from "@/components/sections/GitHubWidget";
import { Testimonials }    from "@/components/sections/Testimonials";
import { Contact }         from "@/components/sections/Contact";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = getPortfolioData();

  return (
    <>
      <OpenToWork />
      <Hero        profile={data.profile} />
      <About       about={data.about} />
      <Skills      skills={data.skills} />
      <Experience  experiences={data.experiences} />
      <Projects    projects={data.projects} />
      <Certifications certifications={data.certifications} />
      <Education   education={data.education} />
      <Resume      resume={data.resume} />
      <GitHubWidget />
      <Testimonials testimonials={data.testimonials} />
      <Contact     contact={data.contact} profile={data.profile} />
    </>
  );
}
