import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.alternatif.findMany();

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
