import Theme from "../../data/Theme";
import ThumbnailCard from "../image/ThumbnailCard";
import ParentFolderButton from "./ParentFolderButton";

interface FolderViewProps {
  /** The relative path to the folder to view */
  folderPath: string;
  /** An array representing the folder's contents */
  list: Array<{
    name: string,
    isDirectory: boolean
  }>;
}

/** Shows a collection of items representing the folder's contents */
const FolderView = ({
  folderPath,
  list
}: FolderViewProps) => {
  return (
    <div style={{
      padding: '10px',
      border: `1px solid ${Theme.border}`,
      borderRadius: '3px',
    }}>
      <h2>
        {folderPath.length > 0 ? folderPath : 'Main Folder'}
      </h2>
      {folderPath.length > 0 ? <ParentFolderButton /> : ''}
      {list.map(file => (
        <ThumbnailCard
          folderPath={folderPath}
          fileName={file.name}
          isDirectory={file.isDirectory}
          key={file.name}
        />
      ))}
    </div>
  );
}

export default FolderView;
