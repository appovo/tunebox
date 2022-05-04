import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./DropArea.css";
import { SongPlayer } from "./SongPlayer";
import * as mm from "music-metadata-browser";

// import * as MusicTempo from "music-tempo";

export function DropArea() {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [fileMetaData, setFileMetaData] = useState({});
  const [audioCtx, setAudioCtx] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const fileName = file.name;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents

        // const content = reader.result;
        const objectURL = URL.createObjectURL(file);
        setFileLoaded(true);
        setFileName(fileName);
        setFileURL({ audioUrl: objectURL });
        (async () => {
          try {
            const metadata = await mm.fetchFromUrl(objectURL);
            setFileMetaData([metadata]);
            setAudioCtx(audioContext);
            console.log(metadata);
            console.log(audioContext);
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

  return fileLoaded ? (
    <>
      <SongPlayer loop song={fileURL} audioContext={audioCtx} />
      {fileMetaData[0] ? (
        <div className="Metadata">
          <div>
            Artist: <span>{fileMetaData[0].common.artist}</span>
          </div>
          <div>
            Track name: <span> {fileMetaData[0].common.title}</span>
          </div>
          <div>
            BPM according to metadata:{" "}
            <span> {fileMetaData[0].common.bpm}</span>
          </div>
          <div>
            BPM according to findBPM: <span> {fileMetaData[0].common.bpm}</span>
          </div>
          <div>
            Duration:{" "}
            <span> {Math.round(fileMetaData[0].format.duration)} s</span>
          </div>
          <div>
            Sample Rate: <span> {fileMetaData[0].format.sampleRate} Hz</span>
          </div>
          <div>
            Bits per Sample:{" "}
            <span> {fileMetaData[0].format.bitsPerSample}</span>
          </div>
          <div>
            Bitrate: <span> {fileMetaData[0].format.bitrate}</span>
          </div>
          <div>
            Lossless: <span> {fileMetaData[0].format.lossless}</span>
          </div>
          <div>
            Channels number:{" "}
            <span> {fileMetaData[0].format.numberOfChannels}</span>
          </div>
          <div>
            Creation time: <span> {fileMetaData[0].format.creationTime}</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div {...getRootProps()} className="Dropzone">
        <input {...getInputProps()} />
        <span>
          Filename: <span className="DropzoneFileName">{fileName}</span>
        </span>
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
