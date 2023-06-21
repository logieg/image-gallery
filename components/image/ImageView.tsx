"use client";
import { usePathname, useRouter } from "next/navigation";
import Centered from "../common/Centered";
import Theme from "../../data/Theme";

interface ImageViewProps {
  /** The filename of the image */
  fileName: string;
  /** The base64-encoded image data URL to display */
  fileData: string;
}

/** Shows a fixed-position modal to display an image */
const ImageView = ({ fileName, fileData }: ImageViewProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClose = () => {
    router.replace(pathname, { shallow: true, scroll: false });
  };

  return (
    <div style={{ position: 'fixed', inset: '0 0 0 0' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        zIndex: '100'
      }}>
        <div style={{
          padding: '6px',
          borderRadius: '3px',
          backgroundColor: Theme.accent,
        }}>
          <div
            onClick={onClose}
            style={{
              float: 'left',
              padding: '2px',
              color: '#ddd',
              fontWeight: '800',
            }}
          >
            X
          </div>
          <div style={{ textAlign: 'center' }}>
            {fileName}
          </div>
        </div>
        <Centered>
          <img
            src={fileData}
            alt={fileName}
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
          />
        </Centered>
      </div>
      <div
        style={{
          position: 'fixed',
          inset: '0 0 0 0',
          backgroundColor: 'rgba(0,0,0,0.75)',
          zIndex: '10'
        }}
        onClick={onClose}
      />
    </div>
  );
}

export default ImageView;
