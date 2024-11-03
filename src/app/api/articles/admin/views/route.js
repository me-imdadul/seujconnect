export default async function GET(request) {
  const apiKey = request.headers.get("x-api-key");

  const data = await request.json();
  const { author_id, status } = data;

  if (apiKey !== SECRET_KEY) {
    return new Response(JSON.stringify({ messsage: "Unauthorized" }), {
      status: 401,
    });
  }
}
