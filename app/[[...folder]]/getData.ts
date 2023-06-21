import fs from "fs";
import path from "path";
import config from '../../gallery-config.json';

/** Absolute root dir where the images are stored */
const rootDir = path.join(
  (config.sourceDir.startsWith('/') || config.sourceDir.indexOf(':') === 1) ? '' : process.cwd(),
  config.public ? 'public/' : '',
  config.sourceDir
);

/** List of content items within the currently-viewed folder */
type FolderData = Array<{
  name: string;
  isDirectory: boolean;
}>;

/**
 * Get data about items in a directory (sorted by name and type)
 */
export async function getFolderData(folderPath: string): Promise<FolderData> {
  const fullFolderPath = path.join(rootDir, folderPath);
  const folderList = fs.readdirSync(fullFolderPath, { withFileTypes: true })
    // Filter to only folders and approved file types
    .filter(item => {
      const ext = item.name.slice(item.name.lastIndexOf('.') + 1);
      return config.fileTypes.includes(ext) || item.isDirectory();
    })
    // Convert from fs.Dirent to client-usable objects
    .map(item => ({
      name: item.name,
      isDirectory: item.isDirectory(),
    }))
    .sort((a, b) => a.name < b.name ? -1 : 1)
    .sort((a, b) => a.isDirectory ? -1 : 1);

  return folderList;
}

/**
 * Get file image data
 * @returns Base64-encoded data URL for the requested file
 */
export async function getFileData(
  fileName: string,
  folderPath: string,
): Promise<string> {
  const fullFolderPath = path.join(rootDir, folderPath);
  const fullFilePath = path.join(fullFolderPath, fileName);
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const mimeType = `image/${extension}`;
  const base64Data = fs.readFileSync(fullFilePath).toString('base64');
  return `data:${mimeType};base64,${base64Data}`;
}
