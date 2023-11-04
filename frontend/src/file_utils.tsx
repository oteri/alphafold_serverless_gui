import AWS from 'aws-sdk';

export function filterFilesToUpload(acceptedFiles: File[]): File[] {
    const acceptedExtensions = ['fasta', 'a3m'];
    const filteredFiles = acceptedFiles.filter(file =>
      acceptedExtensions.includes(file.name.split('.').pop() as string)
    );
    return filteredFiles;
  }

function uploadFileToS3(file:File) {
    const s3 = new AWS.S3({
        endpoint: `http://${process.env.MINIO_SERVER_URL}`, // Update if your MinIO is on a different endpoint
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
        s3ForcePathStyle: true, // Set this to true for MinIO compatibility
        signatureVersion: 'v4',
    });

    const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.MINIO_BUCKET_NAME as string,
        Key: file.name,
        Body: file,
        ContentType: file.type
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, function (error:Error, data:AWS.S3.ManagedUpload.SendData) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
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
