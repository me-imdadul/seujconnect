import { ArticleService } from "@/lib/services/articleService";
import { SECRET_KEY } from "@/utils/constants/api";

export async function POST(request) {
  const apiKey = request.headers.get("x-api-key");

  const data = await request.json();
  const { id, like } = data;
  console.log(like);

  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ messsage: "Unauthorized" }), {
      status: 401,
    });
  }
  const articles = await ArticleService.addLike(id, like);

  try {
    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error getting article" }), {
      status: 500,
    });
  }
}
