import { useRouter } from "next/router";
import Theme from "../../data/Theme";
import Centered from "../common/Centered";

interface ThumbnailCardProps {
  /** The name of the item this card represents */
  name: string;
  /** Whether this item is a folder */
  isDirectory: boolean;
  /** Relative path to the item this card represents */
  path?: string;
}

/**
 * A clickable display card showing a thumbnail and name for a folder item
 */
const ThumbnailCard = ({
  name,
  isDirectory,
  path,
}: ThumbnailCardProps) => {
  const router = useRouter();
  const thumbName = `${name.slice(0, name.lastIndexOf('.'))}.webp`;
  const imageSrc = isDirectory ? '/folder.svg' : `/.thumbs/${path}/${thumbName}`;

  /** Open the item this card represents (show image / enter folder) */
  const openItem = () => {
    const newPath = isDirectory ? `${path}/${name}` : path;
    const newFile = isDirectory ? undefined : name;
    router.push({
      pathname: router.pathname,
      query: { d: newPath, f: newFile }
    });
  }

  return (
    <div
      style={{
        display: 'inline-block',
        width: '160px',
        height: '170px',
        padding: '4px 12px',
        margin: '8px',
        backgroundColor: Theme.accent,
        borderRadius: '5px',
        verticalAlign: 'top',
        cursor: 'pointer',
      }}
      onClick={openItem}
    >
      <Centered>
        <img
          src={imageSrc}
          alt={name}
          style={{ width: '100px', height: '100px' }}
        />
      </Centered>
      <p style={{ textOverflow: 'ellipsis' }}>
        {name}
      </p>
    </div>
  );
}

export default ThumbnailCard;
