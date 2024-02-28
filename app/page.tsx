import PosterCarousel from "@/components/poster-carousel/poster-carousel";
import { GetWeeklyTrending } from "@/lib/tmbd";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth-options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const data = await GetWeeklyTrending();
  return (
    <main className='flex flex-col justify-center items-start gap-4 h-full'>
      <h1>Home</h1>
      {JSON.stringify(session)}
      <PosterCarousel items={data.results} />
    </main>
  );
}
