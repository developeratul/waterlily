import { fullSchema } from "@/schemas/onboarding";
import { notificationSettings, user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const onboardingRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(fullSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, user: authedUser } = ctx;
      if (!authedUser) throw new Error("Unauthorized");

      // Update user core fields
      await db
        .update(user)
        .set({
          fullName: input.fullName,
          bio: input.bio,
          role: input.role,
          interests: input.interests,
          username: input.username,
          website: input.website,
          isOnboarded: true,
        })
        .where(eq(user.id, authedUser.id));

      // Upsert notification settings
      // Upsert notification settings (unique on userId)
      await db
        .insert(notificationSettings)
        .values({
          id: crypto.randomUUID(),
          userId: authedUser.id,
          frequency: input.frequency,
          channels: input.channels,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: notificationSettings.userId,
          set: {
            frequency: input.frequency,
            channels: input.channels,
            updatedAt: new Date(),
          },
        });

      return { success: true } as const;
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const { db, user } = ctx;

    const onboardingData = await db.query.user.findFirst({
      where: (t, { eq }) => eq(t.id, user.id),
      columns: {
        fullName: true,
        bio: true,
        role: true,
        interests: true,
        username: true,
        website: true,
      },
    });

    return onboardingData;
  }),
});
