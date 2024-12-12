import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const refreshToken = cookies().get("refreshToken");

    const data = await prisma.user.findMany({
      where: {
        refreshToken: refreshToken?.value,
      },
    });

    if (data.length === 0) {
      return Response.json(
        {
          status: "error",
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const id = data[0].id;
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        refreshToken: null,
      },
    });

    cookies().set("refreshToken", "", {
      httpOnly: true,
      maxAge: -1,
      path: "/",
    });

    return Response.json(
      {
        status: "Success",
        message: "Logout successfully",
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
