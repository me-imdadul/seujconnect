import { ArticleService } from "@/lib/services/articleService";
import { SECRET_KEY } from "@/utils/constants/api";

export async function GET(request) {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ messsage: "Unauthorized" }), {
      status: 401,
    });
  }
  const articles = await ArticleService.findAll();

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
export async function POST(request) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const data = await request.json();
    const newArticle = await ArticleService.create(data);
    return new Response(JSON.stringify(newArticle), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error adding article" }), {
      status: 500,
    });
  }
}
