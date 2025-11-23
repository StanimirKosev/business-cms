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

    const categories = await prisma.machineryCategory.findMany({
      include: {
        models: { orderBy: { order: "asc" } },
        images: { orderBy: { order: "asc" } },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[Machinery GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch machinery" },
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
    const { nameBg, nameEn, count, order } = body;

    if (!nameBg || !nameEn || count === undefined || order === undefined || order === null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const category = await prisma.machineryCategory.create({
      data: {
        nameBg,
        nameEn,
        count,
        order,
      },
      include: { models: true, images: true },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("[Machinery POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create machinery category" },
      { status: 500 }
    );
  }
}
