import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const { userId } = data;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: true,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 401,
    });
  }

  const posts = user.posts;

  return new Response(JSON.stringify({ posts, user }), { status: 200 });
}
