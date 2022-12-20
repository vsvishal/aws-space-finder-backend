import { v4 } from "uuid";
import { S3 } from "aws-sdk";

const s3Client = new S3();

async function handler(event: any, content: any) {
  const buckets = await s3Client.listBuckets().promise();

  console.log("GOT AN EVENT: ");
  console.log(event);

  console.log("CONTENT: ");
  console.log(content);

  return {
    statusCode: 200,
    body: "HERE ARE YOUR BUCKETS: " + JSON.stringify(buckets.Buckets),
  };
}

export { handler };
