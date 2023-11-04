import styled from 'styled-components';

const FileListWrapper = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const FileItem = styled.li`
    margin: 10px 0;
`;

function FileList(files: File[]) {
    return (
        <FileListWrapper>
            {files.map(file => (
                <FileItem key={file.name}>{file.name}</FileItem>
            ))}
        </FileListWrapper>
    );
}

export default FileList;
