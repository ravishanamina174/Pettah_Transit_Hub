
// import { r2 } from "@/lib/r2";
// import { PutObjectCommand } from "@aws-sdk/client-s3";

// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get("file");

//   const buffer = Buffer.from(await file.arrayBuffer());

//   const fileName = `hero/${Date.now()}-${file.name}`;

//   await r2.send(
//     new PutObjectCommand({
//       Bucket: process.env.R2_BUCKET_NAME,
//       Key: fileName,
//       Body: buffer,
//       ContentType: file.type,
//     })
//   );

//   const imageUrl = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${fileName}`;

//   return Response.json({ url: imageUrl });
// }