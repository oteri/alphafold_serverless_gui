import styled from 'styled-components';
import { FileItem, FileItemHandle } from './FileItem';
const FileListWrapper = styled.ul`
    list-style-type: none;
    padding: 0;
`;
interface FileListProps {
    files: File[];
    fileRefs: Map<string, React.RefObject<FileItemHandle>>; // Add this line
}

function FileList({ files, fileRefs }: FileListProps) {
    return (
        <FileListWrapper>
            {files.map(file => (
                <FileItem
                    key={file.name}
                    file={file}
                    ref={fileRefs.get(file.name)} // Pass the ref here
                />
            ))}
        </FileListWrapper>
    );
}

export default FileList;
