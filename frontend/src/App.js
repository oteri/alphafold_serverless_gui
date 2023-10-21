import React, { useState } from 'react';
import ProgressBar from 'react-progressbar';
import FileList from './FileList';
import FileUpload from './FileUpload';
import { filterFilesToUpload, uploadFilesToS3 } from './file_utils';
function App() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async acceptedFiles => {
    const filteredFiles = filterFilesToUpload(acceptedFiles);
    await uploadFilesToS3(filteredFiles)
    setFiles(prevFiles => [...prevFiles, ...filteredFiles]);
    setUploadProgress(100); // Assuming all files uploaded successfully
  };

  const handleSubmit = () => {
    // Handle submit action here
    console.log('Files submitted:', files);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      <button onClick={handleSubmit}>Submit</button>
      <ProgressBar completed={uploadProgress} />
      <FileList files={files} />
    </div>
  );
}

export default App;
