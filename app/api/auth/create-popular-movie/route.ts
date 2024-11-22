import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { popularMovies } = await req.json();

  if (
    !popularMovies ||
    !Array.isArray(popularMovies) ||
    popularMovies.length === 0
  ) {
    return new NextResponse("Movie data is required", { status: 400 });
  }

  try {
    const createdPopularMovies = await Promise.all(
      popularMovies.map(async (popularMovie) => {
        const {
          id,
          title,
          movieVideo,
          trailerVideo,
          thumbnailUrl,
          genre,
          age,
          duration,
          ranking,
        } = popularMovie;

        if (
          !title ||
          !movieVideo ||
          !trailerVideo ||
          !thumbnailUrl ||
          !genre ||
          !age ||
          !duration ||
          !ranking
        ) {
          throw new Error("Missing data for movie: ", title);
        }

        return await db.popularMovie.create({
          data: {
            id,
            title,
            movieVideo,
            trailerVideo,
            thumbnailUrl,
            genre,
            age,
            duration,
            ranking,
            createdAt: new Date(),
          },
        });
      })
    );

    return NextResponse.json(createdPopularMovies, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
