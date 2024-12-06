export async function GET() {
  return new Response(JSON.stringify({ message: "Test API is working!" }), {
    status: 200,
  });
}
