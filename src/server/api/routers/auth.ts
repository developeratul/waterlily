import { db } from "@/server/db";
import { user as userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    const rows = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, String(userId)))
      .limit(1);

    return rows[0] ?? null;
  }),
});
