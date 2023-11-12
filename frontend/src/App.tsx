import { useState } from 'react';
import ProgressBar from 'react-progressbar';
import FileList from './FileList';
import FileUpload from './FileUpload';
import { filterFilesToUpload, uploadFileToS3, uploadFilesToS3 } from './file_utils';

type CallbackType = (arg: File[]) => void;

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleFileUpload(acceptedFiles: File[]): void {
    const filteredFiles = filterFilesToUpload(acceptedFiles);
    setFiles(prevFiles => [...prevFiles, ...filteredFiles]);
    setUploadProgress(100); // Assuming all files uploaded successfully

    const displayUrl = (url: string) => {
      console.log('Uploaded file URL:', url);
    };

    const handleError = (file: File, error: Error)=> {
      console.error(`Error uploading file ${file.name}: ${error.message}`);
    }

    uploadFilesToS3(filteredFiles, uploadFileToS3, displayUrl, handleError)

  };




  const handleSubmit = () => {
    // Handle submit action here
    console.log('Files submitted:', files);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload as CallbackType} />
      <button onClick={handleSubmit}>Submit Computations</button>
      <ProgressBar completed={uploadProgress} />
      <FileList files={files} />
    </div>
  );
}

export default App;
