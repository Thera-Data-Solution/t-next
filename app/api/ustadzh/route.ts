import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const ustadz = await prisma.ustadzh.findMany();
    return Response.json({
      message: "Success",
      data: ustadz,
    });
  } catch (error) {
    console.error("Error fetching ustadz data:", error);
    return Response.json(
      {
        message: "Failed to fetch ustadz data",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, bio } = body;

    const newUstadz = await prisma.ustadzh.create({
      data: {
        nama,
        bio,
      },
    });

    return Response.json(
      {
        message: "Ustadz created successfully",
        data: newUstadz,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating ustadz:", error);
    return Response.json(
      {
        message: "Failed to create ustadz",
      },
      { status: 500 }
    );
  }
}
