import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { uploadFileToS3 } from './file_utils';
import { checkJobStatus, submitJob } from './submission_utils';


const StyledFileItem = styled.li`
    margin: 10px 0;
`;

export interface FileItemHandle {
    handleSubmitEvent: () => void;
  }

interface FileItemProps {
file: File;
}

export const FileItem = React.forwardRef<FileItemHandle, FileItemProps>(({ file }, ref) => {
    const [fileName, setFileName] = useState<string|null>(null);
    const [jobId, setJobId] = useState<string|null>(null);
    const [jobStatus, setJobStatus] = useState<string|null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const upload = async () => {
            const uploadedFile = (name: string, url:string) => {
                console.log('Uploaded file URL:', url);
                setFileName(name)
            };

            const handleError = (error: Error) => {
                console.error(`Error uploading file ${file.name}: ${error.message}`);
            }

            try {
                const url = await uploadFileToS3(file);
                if (url !== null) {
                    uploadedFile(file.name,url);
                }
            } catch (error: any) { // Typed as any, or use a more specific type if known
                handleError(error);
            }
        };

        upload();
    }, [file]);

    useEffect(() => {
        // Check Job Status
        const checkStatus = async () => {
            if (jobId) {
                const status = await checkJobStatus(jobId);
                console.log(`Job status for ${jobId}: ${status}`);
                setJobStatus(status); // Update the job status state

                // Stop the interval if the job is completed or failed
                if (status === 'COMPLETED' || status === 'FAILED'|| status === 'CANCELLED') {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            }
        };

        if (jobId) {
            intervalRef.current = setInterval(checkStatus, 5000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [jobId]);


    useImperativeHandle(ref, () => ({
        async handleSubmitEvent() {
            console.log('Submit file URL:', fileName);
            if (process.env.BUCKET_NAME!==undefined && fileName !== null) {
                const newJobId = await submitJob(process.env.BUCKET_NAME,fileName);
                if(newJobId!==null){
                    console.log('JobId:', newJobId);
                    setJobId(newJobId);
                }
            }
        }
    }));

    return (
        <StyledFileItem>
            {file.name} {jobStatus && `(${jobStatus})`}
        </StyledFileItem>
    );
})