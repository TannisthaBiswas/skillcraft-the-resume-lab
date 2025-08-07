import { canCreateResume } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CreateResumeButton from "./CreateResumeButton";
import ResumeItem from "./ResumeItem";

export const metadata: Metadata = {
  title: "Your resumes",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <div className="flex grow flex-col">
      <header className="bg-gradient-to-r from-purple-400 to-purple-600 px-6 py-6 text-center text-white shadow-lg sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your Creations
          </h1>
          <p className="mt-2 text-sm font-light opacity-90">
            You’ve created {totalCount} documents so far. Ready for the next one? ✨
          </p>
        </div>
      </header>
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <div className="space-y-1">
  <h1 className="text-3xl font-bold">Your Creations</h1>
  

  {totalCount > 0 ? (
    <p className="">You’ve created {totalCount} documents so far. Ready for the next one? ✨</p>
  ) : (
    <p>Welcome! It looks like you haven&apos;t created any documents yet. Let&apos;s start with your first one! ✨</p>
  )}
</div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CreateResumeButton
          canCreate={canCreateResume(subscriptionLevel, totalCount)}
        />
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
    </div>
  );
}