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

    const certificates = await prisma.certificate.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("[Certificates GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
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
    const { titleBg, titleEn, cloudinaryPublicIdBg, cloudinaryPublicIdEn } =
      body;

    if (!titleBg || !titleEn || !cloudinaryPublicIdBg || !cloudinaryPublicIdEn) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const certificate = await prisma.certificate.create({
      data: {
        titleBg,
        titleEn,
        cloudinaryPublicIdBg,
        cloudinaryPublicIdEn,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error("[Certificates POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
