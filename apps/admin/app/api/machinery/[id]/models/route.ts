import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const models = await prisma.machineryModel.findMany({
      where: { categoryId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(models);
  } catch (error) {
    console.error("[Machinery Models GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch machinery models" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { nameBg, nameEn, count, unit, order } = body;

    if (!nameBg || !nameEn || count === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const model = await prisma.machineryModel.create({
      data: {
        categoryId: id,
        nameBg,
        nameEn,
        count,
        unit: unit || "PIECES",
        order: order ?? 0,
      },
    });

    return NextResponse.json(model, { status: 201 });
  } catch (error) {
    console.error("[Machinery Models POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create machinery model" },
      { status: 500 }
    );
  }
}
