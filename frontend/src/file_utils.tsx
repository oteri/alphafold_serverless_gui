import {  S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export function filterFilesToUpload(acceptedFiles: File[]): File[] {
    const acceptedExtensions = ['fasta', 'a3m'];
    const filteredFiles = acceptedFiles.filter(file =>
      acceptedExtensions.includes(file.name.split('.').pop() as string)
    );
    return filteredFiles;
  }

async function uploadFileToS3(file:File) {
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
    try {
        const ret = await s3Client.send(putCommand);
        console.info(ret)
    } catch (error) {
        console.error('Error uploading:', error, 'File name:', file.name);
        throw error;
    }

    const command = new GetObjectCommand(params);

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
        return url;
      } catch (error) {
        console.error('Error generating pre-signed URL:', error, 'File name:', file.name);
        throw error;
      }
}



export async function uploadFilesToS3(acceptedFiles:File[]) {
    for (let file of acceptedFiles) {
        try {
            const url = await uploadFileToS3(file);
            if(url !== null){
                console.log('Pre-signed URL:', url)
            }
        } catch (error) {
            console.error('Error uploading:', error);
        }
    }
}
