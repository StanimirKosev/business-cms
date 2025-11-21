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

    const body = await req.json();
    const { updates } = body; // Array of { id: string, order: number }
    const { id: categoryId } = await params;

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        { error: "Invalid updates format" },
        { status: 400 }
      );
    }

    // Verify that the category exists
    const category = await prisma.machineryCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Update all models in a transaction for data integrity
    const results = await prisma.$transaction(
      updates.map((update) =>
        prisma.machineryModel.update({
          where: { id: update.id },
          data: { order: update.order },
        })
      )
    );

    return NextResponse.json({ success: true, updated: results.length });
  } catch (error) {
    console.error("[Machinery Models Reorder] Error:", error);
    if (error instanceof Error) {
      console.error("[Machinery Models Reorder] Error message:", error.message);
    }
    return NextResponse.json(
      { error: "Failed to reorder machinery models" },
      { status: 500 }
    );
  }
}
