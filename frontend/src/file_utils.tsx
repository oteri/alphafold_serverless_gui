import {  S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
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
        accessKeyId: process.env.MINIO_ACCESS_KEY as string,
        secretAccessKey: process.env.MINIO_SECRET_KEY as string,
    };
    const awsConfig = {
        region: process.env.MINIO_REGION ,
        credentials: credentials,
        endpoint: process.env.MINIO_SERVER_URL,
        s3ForcePathStyle: true,
        forcePathStyle: true,
        signatureVersion: 'v4',
      };
    const s3Client = new S3Client(awsConfig);

    const contentType = file.type || 'application/octet-stream'; // Use the file's MIME type or a default
    const arrayBuffer = await file.arrayBuffer()
    const content = new Blob([arrayBuffer], { type: contentType });

    const params = {
    Bucket: process.env.MINIO_BUCKET_NAME as string,
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


export async function uploadFilesToS3(
    acceptedFiles: File[],
    uploadFile: (file: File) => Promise<string>,
    action: (url: string) => void,
    handleError: (file: File, error: Error) => void
  ): Promise<void> {
    for (let file of acceptedFiles) {
      try {
        const url = await uploadFile(file);
        if (url !== null) {
          action(url);
        }
      } catch (error) {
        handleError(file, error);
      }
    }
  }


