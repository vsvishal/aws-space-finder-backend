import { v4 } from "uuid";

async function showingtsLambda(event: any, content: any) {
  return {
    statusCode: 200,
    body: `Hello from typescript lamda ${v4}`,
  };
}

export { showingtsLambda };
