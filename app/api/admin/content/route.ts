import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/content";

function isAuthed(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  return session && session === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getPortfolioData());
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newContent = await req.json();

  const owner = process.env.GITHUB_OWNER ?? "EVERMATE";
  const repo  = process.env.GITHUB_REPO  ?? "my-portfolio";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not set — cannot save to GitHub" },
      { status: 503 }
    );
  }

  // Fetch current file SHA (required to update via GitHub API)
  const fileRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/content/portfolio.json`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!fileRes.ok) {
    return NextResponse.json({ error: "Could not fetch file from GitHub" }, { status: 502 });
  }

  const { sha } = await fileRes.json();

  const content = Buffer.from(
    JSON.stringify(newContent, null, 2)
  ).toString("base64");

  const updateRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/content/portfolio.json`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "chore: update portfolio content via admin panel",
        content,
        sha,
      }),
    }
  );

  if (!updateRes.ok) {
    const err = await updateRes.json();
    console.error("GitHub API error:", err);
    return NextResponse.json({ error: "Failed to commit to GitHub" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: "Saved — Vercel will redeploy in ~60s" });
}
