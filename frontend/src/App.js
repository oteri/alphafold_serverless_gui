import React, { useState } from 'react';
import FileList from './FileList';
import FileUpload from './FileUpload';

function App() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} acceptedExtensions={['fasta', 'a3m']} />
      <FileList files={files} />
    </div>
  );
}

export default App;
