import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";
import { isRecordProtected } from "@/lib/constants";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; modelId: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, modelId } = await params;
    const body = await req.json();

    const model = await prisma.machineryModel.update({
      where: { id: modelId },
      data: body,
    });

    return NextResponse.json(model);
  } catch (error) {
    console.error("[Machinery Model PUT] Error:", error);
    return NextResponse.json(
      { error: "Failed to update machinery model" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; modelId: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, modelId } = await params;

    const model = await prisma.machineryModel.findUnique({
      where: { id: modelId },
    });

    if (!model) {
      return NextResponse.json(
        { error: "Machinery model not found" },
        { status: 404 }
      );
    }

    // Check if model is protected (created before or on cutoff date)
    if (isRecordProtected(model.createdAt)) {
      return NextResponse.json(
        {
          error: "Cannot delete protected record",
          message: "This machinery model is part of the initial dataset and cannot be deleted.",
        },
        { status: 403 }
      );
    }

    await prisma.machineryModel.delete({
      where: { id: modelId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Machinery Model DELETE] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete machinery model" },
      { status: 500 }
    );
  }
}
