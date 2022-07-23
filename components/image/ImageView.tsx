import Theme from "../../data/Theme";

interface ImageViewProps {
  /** The filename of the image */
  fileName: string;
  /** The base64-encoded image data URL to display */
  fileData: string;
  /** Callback function for closing the image view */
  onClose?: () => void;
}

/** Shows a fixed-position modal to display an image */
const ImageView = ({ fileName, fileData, onClose }: ImageViewProps) => {
  return (
    <div style={{ position: 'fixed', inset: '0 0 0 0' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '90%',
        maxWidth: '90%',
        overflow: 'auto',
        padding: '6px',
        borderRadius: '3px',
        backgroundColor: Theme.accent,
        zIndex: '100'
      }}>
        <button onClick={onClose} style={{ float: 'left', backgroundColor: '#111', color: '#ddd' }}>
          Close
        </button>
        <div style={{ textAlign: 'center', paddingBottom: '8px' }}>
          {fileName}
        </div>
        <img
          src={fileData}
          alt={fileName}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
      <div
        style={{
          position: 'fixed',
          inset: '0 0 0 0',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: '10'
        }}
        onClick={onClose}
      />
    </div>
  );
}

export default ImageView;
