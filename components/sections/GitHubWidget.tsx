import { Star, GitFork, Users, BookOpen } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { fetchGitHubStats } from "@/lib/github";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "EVERMATE";

export async function GitHubWidget() {
  const stats = await fetchGitHubStats(GITHUB_USERNAME);

  const items = [
    { Icon: Users,    label: "Followers",    value: stats?.followers   ?? "—" },
    { Icon: BookOpen, label: "Repos",        value: stats?.publicRepos ?? "—" },
    { Icon: Star,     label: "Stars earned", value: stats?.totalStars  ?? "—" },
    { Icon: GitFork,  label: "Forks",        value: stats?.totalForks  ?? "—" },
  ];

  return (
    <SectionWrapper>
      <SectionHeading label="Open source" title="GitHub Activity" align="center" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {items.map(({ Icon, label, value }) => (
          <div
            key={label}
            className="glass-card-accent p-5 text-center hover:border-primary/30
                       hover:shadow-md hover:shadow-primary/5 transition-all"
          >
            <Icon size={20} className="text-primary mx-auto mb-3" />
            <div className="font-display text-2xl font-black gradient-text">{value}</div>
            <div className="text-[11px] text-muted-foreground mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Contribution graph iframe from ghchart.rshah.org */}
      <div className="glass-card p-4 overflow-hidden">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Contribution graph
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/6366f1/${GITHUB_USERNAME}`}
          alt={`${GITHUB_USERNAME} GitHub contribution graph`}
          className="w-full rounded-xl opacity-90 dark:opacity-70"
          style={{ imageRendering: "auto" }}
        />
      </div>
    </SectionWrapper>
  );
}
