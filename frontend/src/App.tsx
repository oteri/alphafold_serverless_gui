import React, { useRef, useState } from 'react';
import ProgressBar from 'react-progressbar';
import FileList from './FileList';
import { FileItemHandle } from './FileItem';
import FileUpload from './FileUpload';
import { filterFilesToUpload } from './file_utils';

type CallbackType = (arg: File[]) => void;

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRefs = useRef<Map<string, React.RefObject<FileItemHandle>>>(new Map());

  function handleFileUpload(acceptedFiles: File[]): void {
    const filteredFiles = filterFilesToUpload(acceptedFiles);
    setFiles(prevFiles => [...prevFiles, ...filteredFiles]);

    filteredFiles.forEach(file => {
      if (!fileRefs.current.has(file.name)) {
        fileRefs.current.set(file.name, React.createRef());
      }
    });

  };

  const handleSubmit = () => {
    fileRefs.current.forEach(ref => {
      ref.current?.handleSubmitEvent();
    });
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload as CallbackType} />
      <button onClick={handleSubmit}>Submit Computations</button>
      <ProgressBar completed={uploadProgress} />
      <FileList files={files} fileRefs={fileRefs.current} />
    </div>
  );
}

export default App;
