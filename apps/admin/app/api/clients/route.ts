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

    const clients = await prisma.client.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("[Clients GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
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
    const { nameBg, nameEn, logoUrl, website, order } = body;

    if (!nameBg || !nameEn) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: {
        nameBg,
        nameEn,
        logoUrl: logoUrl || null,
        website: website || null,
        order: order ?? 0,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("[Clients POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}
