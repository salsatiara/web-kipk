import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const username: FormDataEntryValue =
      (formData.get("username") as string) || "";
    const password: FormDataEntryValue =
      (formData.get("password") as string) || "";
    const role: FormDataEntryValue = (formData.get("role") as string) || "";

    if (username === null || username === "") {
      return Response.json(
        {
          status: "error",
          message: "username cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (password === null || password === "") {
      return Response.json(
        {
          status: "error",
          message: "password cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (role === null || role === "") {
      return Response.json(
        {
          status: "error",
          message: "role cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (password.length < 8) {
      return Response.json(
        {
          status: "error",
          message: "password must be at least 8 characters",
        },
        {
          status: 400,
        }
      );
    }
    if (!validator.isAlphanumeric(username)) {
      return Response.json(
        {
          status: "error",
          message: "username must be alphanumeric",
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        username: username,
        role: role,
      },
    });

    if (!data) {
      return Response.json(
        {
          status: "error",
          message: "username not found",
        },
        {
          status: 404,
        }
      );
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return Response.json(
        {
          status: "error",
          message: "password incorrect",
        },
        {
          status: 401,
        }
      );
    }

    const accessToken = jwt.sign(
      {
        username: data.username,
        nisn: data.nisn,
        role: data.role,
      },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      {
        username: data.username,
        nisn: data.nisn,
        role: data.role,
      },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: "1d" }
    );

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      path: "/",
    });

    return Response.json(
      {
        status: "success",
        message: "login success",
        accessToken: accessToken,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          status: "error",
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
