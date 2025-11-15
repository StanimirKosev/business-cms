import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";

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
      include: { models: true },
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
