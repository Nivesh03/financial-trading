import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../db/drizzle";
import { session, user, wallet, type NewUser } from "../db/schema";
import type { SignIn } from "../types/user-schema";
const JWT_SECRET = process.env.JWT_SECRET || "awbeiqgsse98ryhzs";

export const register = async (data: NewUser) => {
  try {
    const newUser = await db.transaction(async (tx) => {
      console.log("----in transaction ----",data)
      const [newUser] = await tx.insert(user).values(data).returning();
      console.log(newUser)
      if (!newUser) throw new Error("Error creating new user");
      await tx.insert(wallet).values({
        userId: newUser.id,
      });
      return newUser;
    });
    if (!newUser) {
      throw new Error("Error creating User");
    }
    const token = jwt.sign(newUser.email, JWT_SECRET);
    await createSession(newUser.id, token);
    return { success: true, data: token };
  } catch (error) {
    return { success: false, data: null };
  }
};

export const signIn = async (data: SignIn) => {
  try {
    const { email, password } = data;
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    if (!existingUser) {
      return { success: false, data: null };
    }
    const validPassword = await Bun.password.verify(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return { success: false, data: null };
    }
    const token = jwt.sign(email, JWT_SECRET);
    await createSession(existingUser.id, token);
    return { success: true, data: token };
  } catch (error) {
    return { success: false, data: null };
  }
};

export const createSession = async (userId: string, token: string) => {
  try {
    await db.insert(session).values({
      token,
      userId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeSession = async (token: string) => {
  try {
    await db.delete(session).where(eq(session.token, token));
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (token: string) => {
  try {
    const sessionData = await db.query.session.findFirst({
      where: eq(session.token, token),
    });
    if (!sessionData) {
      return { success: false, data: null };
    }
    const userData = await db.query.user.findFirst({
      where: eq(user.id, sessionData.userId),
    });
    if (!userData) {
      return { success: false, data: null };
    }
    return { success: true, data: { ...userData, password: undefined } };
  } catch (error) {
    return { success: false, data: null };
  }
};
