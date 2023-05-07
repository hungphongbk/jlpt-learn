import graphqlServer from "@/src/graphql/graphql";

export async function GET(request: Request) {
  const response: any = await graphqlServer.fetch(request, {});
  return new Response(await response.text(), response.options);
}

export async function POST(request: Request) {
  const response: any = await graphqlServer.fetch(request, {});
  return new Response(await response.text(), response.options);
}
