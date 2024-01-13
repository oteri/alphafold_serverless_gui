import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export function filterFilesToUpload(acceptedFiles: File[]): File[] {
    const acceptedExtensions = ['fasta', 'a3m'];
    const filteredFiles = acceptedFiles.filter(file =>
      acceptedExtensions.includes(file.name.split('.').pop() as string)
    );
    return filteredFiles;
  }

export async function uploadFileToS3(file:File) {
    const credentials = {
        accessKeyId: process.env.BUCKET_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY as string,
    };
    const awsConfig = {
        region: process.env.BUCKET_REGION ,
        credentials: credentials,
        endpoint: process.env.BUCKET_ENDPOINT_URL,
        s3ForcePathStyle: true,
        forcePathStyle: true,
        signatureVersion: 'v4',
      };
    const s3Client = new S3Client(awsConfig);

    const contentType = file.type || 'application/octet-stream'; // Use the file's MIME type or a default
    const arrayBuffer = await file.arrayBuffer()
    const content = new Blob([arrayBuffer], { type: contentType });

    const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: file.name,
    Body: content,
    };

    const putCommand = new PutObjectCommand(params)
    await s3Client.send(putCommand);

    const getCommand = new GetObjectCommand(params);

    try {
        const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 }); // URL expires in 1 hour
        return url;
      } catch (error) {
        throw error;
      }
}