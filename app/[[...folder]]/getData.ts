import fs from "fs";
import path from "path";
import config from '../../gallery-config.json';

interface Data {
  /** List of content items within the currently-viewed folder */
  folderList: Array<{
    name: string;
    isDirectory: boolean;
  }>;
  /** Base64-encoded data URL for the currently-requested file */
  fileData?: string;
}

/** Get directory and file data */
export async function getData(folderPath: string, fileName: string): Promise<Data> {
  // Absolute root dir where the images are stored
  const rootDir = path.join(
    (config.sourceDir.startsWith('/') || config.sourceDir.indexOf(':') === 1) ? '' : process.cwd(),
    config.public ? 'public/' : '',
    config.sourceDir
  );

  // Get folder data
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

  // Get file data
  let fileData;
  if (fileName.length > 0 && folderList.find(f => !f.isDirectory && f.name === fileName)) {
    const fullFilePath = path.join(fullFolderPath, fileName);
    const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
    const mimeType = `image/${extension}`;
    const base64Data = fs.readFileSync(fullFilePath).toString('base64');
    fileData = `data:${mimeType};base64,${base64Data}`;
  }

  return {
    folderList,
    fileData,
  };
}
