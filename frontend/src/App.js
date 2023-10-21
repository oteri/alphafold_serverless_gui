import React, { useState } from 'react';
import FileList from './FileList';
import FileUpload from './FileUpload';
import { filterFilesToUpload } from './file_utils';
function App() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = acceptedFiles => {
    const filteredFiles = filterFilesToUpload(acceptedFiles);
    setFiles(prevFiles => [...prevFiles, ...filteredFiles]);
  };

  const handleSubmit = () => {
    // Handle submit action here
    console.log('Files submitted:', files);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      <button onClick={handleSubmit}>Submit</button>
      <FileList files={files} />
    </div>
  );
}

export default App;
