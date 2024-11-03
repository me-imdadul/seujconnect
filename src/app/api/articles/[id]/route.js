import { ArticleService } from "@/lib/services/articleService";
import { SECRET_KEY } from "@/utils/constants/api";

export async function GET(request, { params }) {
  const { id } = params;
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const article = await ArticleService.findById(id);

  if (!article) {
    return new Response("Article not found", { status: 404 });
  }

  return new Response(JSON.stringify(article), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request, { params }) {
  const { id } = params;

  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const data = await request.json();

  const updatedArticle = await ArticleService.update(id, data);
  if (!updatedArticle) {
    return new Response(
      JSON.stringify({ message: "Article not updated", error: updatedArticle }),
      {
        status: 404,
      }
    );
  }
  return new Response(JSON.stringify(updatedArticle), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(request, { params }) {
  const { id } = params;

  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const success = await ArticleService.remove(id);

  if (!success) {
    return new Response(JSON.stringify({ message: "Article not found" }), {
      status: 404,
    });
  }
  return new Response(
    JSON.stringify({ message: "Article deleted successfully" }),
    { status: 200 }
  );
}
