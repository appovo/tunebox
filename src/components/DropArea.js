import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Player } from "./Player";
import { MetaData } from "./MetaData";
import * as mm from "music-metadata-browser";
import "./DropArea.css";
// import * as MusicTempo from "music-tempo";

export function DropArea() {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileURL, setFileURL] = useState("");

  const [fileMetaData, setFileMetaData] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const fileName = file.name;
      const fileSize = (file.size / 1000000).toFixed(2);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents

        const objectURL = URL.createObjectURL(file);

        setFileLoaded(true);
        setFileName(fileName);
        setFileSize(fileSize);
        setFileURL(objectURL);
        (async () => {
          try {
            const metaData = await mm.fetchFromUrl(objectURL);
            setFileMetaData([metaData]);
          } catch (error) {
            console.error(error.message);
          }
        })();
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "audio/*"
  });

  return fileLoaded && fileURL && fileMetaData[0] ? (
    <>
      <Player loop audioUrl={fileURL} />
      <MetaData fileMetaData={fileMetaData[0]} />
      <div {...getRootProps()} className="Dropzone">
        <input {...getInputProps()} />
        <span>
          Filename: <span className="DropzoneFileName">{fileName}</span>
        </span>
        <div>File size: {fileSize} MB</div>
        <div>(Drop an audio file here, or click to upload)</div>
      </div>
    </>
  ) : (
    <div {...getRootProps()} className="Dropzone">
      <input {...getInputProps()} />
      <p>Drop an audio file here, or click to upload</p>
    </div>
  );
}
