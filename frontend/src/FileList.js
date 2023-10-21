import React from 'react';
import styled from 'styled-components';

const FileListWrapper = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const FileItem = styled.li`
    margin: 10px 0;
`;

function FileList({ files }) {
    return (
        <FileListWrapper>
            {files.map(file => (
                <FileItem key={file.path}>{file.path}</FileItem>
            ))}
        </FileListWrapper>
    );
}

export default FileList;
