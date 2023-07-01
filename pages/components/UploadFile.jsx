import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
      const addedFile = await ipfs.add(file);
      const hash = addedFile.cid.toString();
      setFileHash(hash);
      console.log('File uploaded to IPFS:', hash);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {fileHash && <p>File Hash: {fileHash}</p>}
    </div>
  );
};

export default UploadFile;
