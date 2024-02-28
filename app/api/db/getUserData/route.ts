import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const { userId } = data;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: `User not found with the id of: ${userId}` }),
      {
        status: 401,
      }
    );
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}
