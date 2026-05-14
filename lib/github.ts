export interface GitHubStats {
  followers:   number;
  publicRepos: number;
  totalStars:  number;
  totalForks:  number;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userRes.ok) return null;

    const user  = await userRes.json();
    const repos = reposRes.ok ? (await reposRes.json() as { stargazers_count: number; forks_count: number }[]) : [];

    const totalStars = repos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
    const totalForks = repos.reduce((s, r) => s + (r.forks_count    ?? 0), 0);

    return {
      followers:   user.followers   ?? 0,
      publicRepos: user.public_repos ?? 0,
      totalStars,
      totalForks,
    };
  } catch {
    return null;
  }
}
