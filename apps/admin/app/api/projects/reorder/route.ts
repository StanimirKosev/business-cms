import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { updates } = body; // Array of { id: string, order: number }

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        { error: "Invalid updates format" },
        { status: 400 }
      );
    }

    // Update all projects in a transaction
    const results = await Promise.all(
      updates.map((update) =>
        prisma.project.update({
          where: { id: update.id },
          data: { order: update.order },
          include: { category: true, client: true, images: true },
        })
      )
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("[Projects Reorder] Error:", error);
    return NextResponse.json(
      { error: "Failed to reorder projects" },
      { status: 500 }
    );
  }
}
