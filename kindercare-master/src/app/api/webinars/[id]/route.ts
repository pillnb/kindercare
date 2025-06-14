import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const revalidate = 3600;

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  // --- Perbaikan di sini: Explicitly await context.params ---
  // Meskipun secara konseptual 'params' di API Routes seharusnya langsung tersedia,
  // error ini menunjukkan bahwa di lingkungan Anda, ia diperlakukan sebagai Promise.
  // Menggunakan Promise.resolve().then() atau await Promise.resolve() adalah cara aman.
  const resolvedParams = await Promise.resolve(context.params);
  const { id } = resolvedParams;
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