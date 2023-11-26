import styled from 'styled-components';
import { uploadFileToS3 } from './file_utils';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { submitJob, checkJobStatus } from './submission_utils'

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
    const [fileUrl, setFileUrl] = useState<string|null>(null)
    useEffect(() => {
        const upload = async () => {
            const uploadedFile = (url: string) => {
                console.log('Uploaded file URL:', url);
                setFileUrl(url)
            };

            const handleError = (error: Error) => {
                console.error(`Error uploading file ${file.name}: ${error.message}`);
            }

            try {
                const url = await uploadFileToS3(file);
                if (url !== null) {
                    uploadedFile(url);
                }
            } catch (error: any) { // Typed as any, or use a more specific type if known
                handleError(error);
            }
        };

        upload();
    }, [file]);

    useImperativeHandle(ref, () => ({
        handleSubmitEvent() {
            console.log('Submit file URL:', fileUrl);
            if(fileUrl!==null){
                const jobId = submitJob(fileUrl);
                console.log('JobId:', jobId);
            }
        }
    }));

    return <StyledFileItem>{file.name}</StyledFileItem>;
})