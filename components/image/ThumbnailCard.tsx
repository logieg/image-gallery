import Link from "next/link";
import Theme from "../../data/Theme";
import Centered from "../common/Centered";

interface ThumbnailCardProps {
  /** Relative path to the folder containing the item this card represents */
  folderPath: string;
  /** The file name of the item this card represents */
  fileName: string;
  /** Whether this item is a folder */
  isDirectory: boolean;
}

/** A clickable display card showing a thumbnail and name for a folder item */
const ThumbnailCard = ({
  folderPath,
  fileName,
  isDirectory,
}: ThumbnailCardProps) => {
  const imageSrc = isDirectory
    ? '/folder.svg'
    : `/.thumbs/${folderPath}/${
        `${fileName.slice(0, fileName.lastIndexOf('.'))}.webp`
      }`;
  const newPath = isDirectory ? `${folderPath}/${fileName}` : folderPath;
  const newFile = isDirectory ? undefined : fileName;

  return (
    <Link
      href={`${newPath}${newFile ? `?view=${newFile}` : ''}`}
      replace={!isDirectory}
      shallow={!isDirectory}
      prefetch={isDirectory}
      scroll={isDirectory}
      style={{
        display: 'inline-block',
        width: '160px',
        height: '170px',
        padding: '4px 12px',
        margin: '8px',
        backgroundColor: Theme.accent,
        borderRadius: '5px',
        verticalAlign: 'top',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <Centered>
        <img
          src={imageSrc}
          alt={fileName}
          style={{ width: '100px', height: '100px' }}
        />
      </Centered>
      <p style={{ textOverflow: 'ellipsis' }}>
        {fileName}
      </p>
    </Link>
  );
}

export default ThumbnailCard;
