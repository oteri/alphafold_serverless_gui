import React, { useState } from 'react';
import FileList from './FileList';
import FileUpload from './FileUpload';

function App() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  const handleSubmit = () => {
    // Handle submit action here
    console.log('Files submitted:', files);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} acceptedExtensions={['fasta', 'a3m']} />
      <button onClick={handleSubmit}>Submit</button>
      <FileList files={files} />
    </div>
  );
}

export default App;
