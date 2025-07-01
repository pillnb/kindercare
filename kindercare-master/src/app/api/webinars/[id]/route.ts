import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 3600;

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  // --------------------------------------------------------

  const webinarId = parseInt(id, 10);

  if (isNaN(webinarId)) {
    return NextResponse.json(
      { error: "Invalid webinar ID" },
      { status: 400 } // Bad Request
    );
  }

  try {
    const webinar = await prisma.webinar.findUnique({
      where: { id: webinarId },
    });

    if (!webinar) {
      return NextResponse.json(
        { error: `Webinar with ID ${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(webinar);
  } catch (err) {
    console.error(`API Error: Failed to fetch webinar with ID ${id} from Prisma:`, err);
    return NextResponse.json(
      { error: "Failed to fetch webinar details" },
      { status: 500 }
    );
  }
}