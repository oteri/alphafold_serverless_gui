import React, { useState } from 'react';
import FileList from './FileList';
import FileUpload from './FileUpload';

function App() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = acceptedFiles => {
    const acceptedExtensions = ['fasta', 'a3m']
    const filteredFiles = acceptedFiles.filter(file =>
      acceptedExtensions.includes(file.name.split('.').pop())
    );
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
