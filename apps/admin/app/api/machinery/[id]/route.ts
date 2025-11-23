import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";
import { isRecordProtected } from "@/lib/constants";

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

    const category = await prisma.machineryCategory.findUnique({
      where: { id },
      include: {
        models: { orderBy: { order: "asc" } },
        images: { orderBy: { order: "asc" } },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Machinery category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("[Machinery GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch machinery category" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const category = await prisma.machineryCategory.update({
      where: { id },
      data: body,
      include: { models: true, images: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[Machinery PUT] Error:", error);
    return NextResponse.json(
      { error: "Failed to update machinery" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const category = await prisma.machineryCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ error: "Machinery not found" }, { status: 404 });
    }

    // Check if machinery is protected (created before or on cutoff date)
    if (isRecordProtected(category.createdAt)) {
      return NextResponse.json(
        {
          error: "Cannot delete protected record",
          message: "This machinery is part of the initial dataset and cannot be deleted.",
        },
        { status: 403 }
      );
    }

    await prisma.machineryCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Machinery DELETE] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete machinery" },
      { status: 500 }
    );
  }
}
