import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import cookie from "cookie";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const refreshToken = cookies().get("refreshToken");

    if (!refreshToken) {
      return Response.json(
        {
          status: "error",
          message: "Token not found",
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.user.findMany({
      where: {
        refreshToken: refreshToken.value,
      },
    });

    if (data.length === 0) {
      cookies().set("refreshToken", "", {
        httpOnly: true,
        maxAge: -1,
        path: "/",
      });

      return Response.json(
        {
          status: "error",
          message: "Token not same with database",
        },
        {
          status: 400,
        }
      );
    }

    jwt.verify(
      refreshToken.value,
      process.env.REFRESH_TOKEN_SECRET || "",
      (error) => {
        if (error) {
          cookies().set("refreshToken", "", {
            httpOnly: true,
            maxAge: -1,
            path: "/",
          });

          return Response.json(
            {
              status: "error",
              message: "Token has been modified",
            },
            {
              status: 400,
            }
          );
        }
      }
    );
    const accessToken = jwt.sign(
      {
        id: data[0].id,
        username: data[0].username,
        nisn: data[0].nisn,
        role: data[0].role,
      },
      process.env.REFRESH_TOKEN_SECRET || "",
      { expiresIn: "15s" }
    );

    return Response.json({
      status: "success",
      message: "token refreshed",
      accessToken: accessToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({
        status: "Error",
        error: error.message,
      });
    }
  }
}
