import { ArticleService } from "@/lib/services/articleService";
import { SECRET_KEY } from "@/utils/constants/api";

export async function GET(request) {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const article = await ArticleService.findPopular();
    if (!article) {
      return new Response(JSON.stringify({ message: "Articles not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(article), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: e }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
