import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { FC } from 'react';


const Container = styled.div`
  width: 300px;
  height: 200px;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const PlusSign = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;  // Added margin for spacing
`;

const UploadButton = styled.button`
  background-color: transparent;  // Making the button transparent
  border: 1px solid black;  // Adding a border around the button
  border-radius: 5px;  // Adding a slight rounded corner
  padding: 5px 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d9d9d9;
  }
`;
interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onFileUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      onFileUpload(acceptedFiles);
    },
    multiple: true,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <PlusSign>+</PlusSign>
      <UploadButton>Upload your MSAs</UploadButton>
    </Container>
  );
};

export default FileUpload;