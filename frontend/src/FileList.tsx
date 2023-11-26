import styled from 'styled-components';
import { FileItem, FileItemHandle } from './FileItem';
const FileListWrapper = styled.ul`
    list-style-type: none;
    padding: 0;
`;
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
