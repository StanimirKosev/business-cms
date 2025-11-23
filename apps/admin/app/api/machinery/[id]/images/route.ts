import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";

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
    const { cloudinaryPublicId, order } = body;

    if (!cloudinaryPublicId || order === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const image = await prisma.machineryImage.create({
      data: {
        categoryId: id,
        cloudinaryPublicId,
        order,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("[Machinery Images POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create machinery image" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { imageId } = body;

    if (!imageId) {
      return NextResponse.json(
        { error: "Missing image ID" },
        { status: 400 }
      );
    }

    // Delete the image
    await prisma.machineryImage.delete({
      where: { id: imageId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Machinery Images DELETE] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete machinery image" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { images } = body;

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "Images must be a non-empty array" },
        { status: 400 }
      );
    }

    // Update order for all images
    const updatePromises = images.map((image) =>
      prisma.machineryImage.update({
        where: { id: image.id },
        data: { order: image.order },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Machinery Images PATCH] Error:", error);
    return NextResponse.json(
      { error: "Failed to update machinery images" },
      { status: 500 }
    );
  }
}
