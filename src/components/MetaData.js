export function MetaData({ fileMetaData }) {
  return (
    <div className="Metadata">
      <div>
        Artist: <span>{fileMetaData.common.artist}</span>
      </div>
      <div>
        Track name: <span> {fileMetaData.common.title}</span>
      </div>
      <div>
        Album: <span> {fileMetaData.common.album}</span>
      </div>
      <div>
        BPM according to metadata: <span> {fileMetaData.common.bpm}</span>
      </div>
      <div>
        BPM according to findBPM: <span> {fileMetaData.common.bpm}</span>
      </div>
      <div>
        Duration: <span> {Math.round(fileMetaData.format.duration)} s</span>
      </div>
      <div>
        Sample Rate: <span> {fileMetaData.format.sampleRate} Hz</span>
      </div>
      <div>
        Bits per Sample: <span> {fileMetaData.format.bitsPerSample}</span>
      </div>
      <div>
        Bitrate: <span> {fileMetaData.format.bitrate}</span>
      </div>
      <div>
        Lossless: <span> {fileMetaData.format.lossless}</span>
      </div>
      <div>
        Channels number: <span> {fileMetaData.format.numberOfChannels}</span>
      </div>
      <div>
        Creation time: <span> {fileMetaData.format.creationTime}</span>
      </div>
    </div>
  );
}
