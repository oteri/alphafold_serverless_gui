import {  S3, S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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
        signatureVersion: 'v4', // Uncomment if necessary
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

    const ret = await s3Client.send(new PutObjectCommand(params));
    console.info(ret)
}



export async function uploadFilesToS3(acceptedFiles:File[]) {
    try {
        for (let file of acceptedFiles) {
            const response = await uploadFileToS3(file);
            console.log('Uploaded file:', response);
        }
    } catch (error) {
        console.error('Error uploading:', error);
        // Handle and notify user of the error
    }
};
