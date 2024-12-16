import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const sort = searchParams.get("sort") || "terlama";
    const limit = searchParams.get("limit") || "100";
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";

    const count = await prisma.alternatif.count();

    const data = await prisma.alternatif.findMany({
      where: {
        nama: {
          contains: search,
        },
      },
      orderBy:
        sort == "terbaru"
          ? { id: "desc" }
          : sort == "terlama"
          ? { id: "asc" }
          : sort == "tertinggi"
          ? { preferensi: "desc" }
          : sort == "terendah"
          ? { preferensi: "asc" }
          : { id: "asc" },
      take: limit == "seleksi" ? count * 0.6 : parseInt(limit),
      skip: limit == "seleksi" ? 0 : parseInt(limit) * (page - 1),
    });

    return Response.json(
      {
        status: "Success",
        message: "Data found successfully",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({
        status: "Error",
        error: error.message,
      });
    }
  }
}
