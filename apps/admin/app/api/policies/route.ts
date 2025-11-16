import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const policies = await prisma.policy.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(policies);
  } catch (error) {
    console.error("[Policies GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch policies" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      titleBg,
      titleEn,
      subtitleBg,
      subtitleEn,
      cloudinaryPublicIdBg,
      cloudinaryPublicIdEn,
      order
    } = body;

    if (!titleBg || !titleEn || !subtitleBg || !subtitleEn || !cloudinaryPublicIdBg || !cloudinaryPublicIdEn) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const policy = await prisma.policy.create({
      data: {
        titleBg,
        titleEn,
        subtitleBg,
        subtitleEn,
        cloudinaryPublicIdBg,
        cloudinaryPublicIdEn,
        order: order ?? 0,
      },
    });

    return NextResponse.json(policy, { status: 201 });
  } catch (error) {
    console.error("[Policies POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create policy" },
      { status: 500 }
    );
  }
}
