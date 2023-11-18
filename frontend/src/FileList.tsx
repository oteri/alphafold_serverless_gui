import styled from 'styled-components';
import { uploadFileToS3 } from './file_utils';
import React, { useEffect } from 'react';

const FileListWrapper = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const StyledFileItem = styled.li`
    margin: 10px 0;
`;

interface FileItemProps {
    file: File;
}

function FileItem({ file }: FileItemProps) {
    useEffect(() => {
        const upload = async () => {
            const uploadedFile = (url: string) => {
                console.log('Uploaded file URL:', url);
            };

            const handleError = (error: Error) => {
                console.error(`Error uploading file ${file.name}: ${error.message}`);
            }

            try {
                const url = await uploadFileToS3(file);
                if (url !== null) {
                    uploadedFile(url);
                }
            } catch (error) {
                handleError(error);
            }
        };

        upload();
    }, [file]);

    return <StyledFileItem>{file.name}</StyledFileItem>; // Assuming you want to display the file name
}

interface FileListProps {
    files: File[];
}

function FileList({ files }: FileListProps) {
    return (
        <FileListWrapper>
            {files.map(file => (
                <FileItem key={file.name} file={file} />
            ))}
        </FileListWrapper>
    );
}

export default FileList;
