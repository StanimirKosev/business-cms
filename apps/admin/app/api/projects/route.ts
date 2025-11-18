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

    const projects = await prisma.project.findMany({
      include: {
        category: true,
        client: true,
        images: { orderBy: { order: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("[Projects GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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
    const {
      titleBg, titleEn, slug, descriptionBg, descriptionEn, categoryId, clientId, heroImageUrl, featured,
      locationBg, locationEn, workNatureBg, workNatureEn, specificationsBg, specificationsEn, region, mapX, mapY
    } = body;

    if (!titleBg || !titleEn || !slug || !descriptionBg || !descriptionEn || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: "Код вече съществува. Моля, използвайте друг код." },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        titleBg,
        titleEn,
        slug,
        descriptionBg,
        descriptionEn,
        locationBg: locationBg || null,
        locationEn: locationEn || null,
        workNatureBg: workNatureBg || null,
        workNatureEn: workNatureEn || null,
        specificationsBg: specificationsBg || null,
        specificationsEn: specificationsEn || null,
        categoryId,
        clientId: clientId || null,
        heroImageUrl: heroImageUrl || null,
        featured: featured || false,
        region: region || "",
        mapX: mapX || null,
        mapY: mapY || null,
      },
      include: { category: true, client: true, images: true },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("[Projects POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
