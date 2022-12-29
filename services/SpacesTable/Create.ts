import { DynamoDB } from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { MissingFieldError, validateAsSpaceEntry } from "../Shared/InputValidator";
import { generateRandomId, getEventBody } from "../Shared/Utils";

const TABLE_NAME = process.env.TABLE_NAME;
const dbClient = new DynamoDB.DocumentClient({ region: "ap-south-1" });

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: "Hello from DynamoDB",
  };

  try {
    const item = getEventBody(event)
    item.spaceId = generateRandomId()
    validateAsSpaceEntry(item)
    await dbClient
      .put({
        TableName: TABLE_NAME!,
        Item: item,
      })
      .promise();
    result.body = JSON.stringify(`Created item with id: ${item.spaceId}`);
  } catch (error) {
    if (error instanceof Error) {
      result.statusCode = 403,
      result.body = error.message;
    }
  }
  return result;
}

export { handler };
