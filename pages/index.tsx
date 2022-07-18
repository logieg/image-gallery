import fs from "fs";
import path from "path";
import HorizontalSection from "../components/common/HorizontalSection";
import MainLayout from "../components/common/layout/MainLayout";
import FolderView from "../components/folder/FolderView";
import config from '../gallery-config.json';

interface HomeProps {
  /** Relative path to the currently-viewed folder */
  folderPath: string;
  /** List of content items within the currently-viewed folder */
  folderList: Array<{
    name: string;
    isDirectory: boolean;
  }>;
  /** Name of the currently-requested file */
  fileName: string;
  /** Base64-encoded data URL for the currently-requested file */
  fileData: string | null;
}

export default function Home({ folderPath, folderList, fileName, fileData }) {
  return (
    <MainLayout>
      <HorizontalSection>
        <h4>Very much a work in progress!</h4>
      </HorizontalSection>
      <HorizontalSection width='90%'>
        <FolderView path={folderPath} list={folderList} />
        {fileData ? (
          <img src={fileData} alt={fileName} style={{ maxWidth: '800px' }} />
        ) : ''}
      </HorizontalSection>
    </MainLayout>
  );
}

export async function getServerSideProps(context): Promise<{props: HomeProps}> {
  // Absolute root dir where the images are stored
  const rootDir = path.join(process.cwd(), config.public ? 'public/' : '', config.sourceDir);

  // Get folder data
  const folderPath = context.query.d as string ?? '';
  const fullFolderPath = path.join(rootDir, folderPath);
  const folderList = fs.readdirSync(fullFolderPath, { withFileTypes: true });

  // Get file data
  const fileName = context.query.f as string ?? '';
  let fileData = null;
  if (fileName.length > 0) {
    const fullFilePath = path.join(fullFolderPath, fileName);
    const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
    const mimeType = `image/${extension}`;
    const base64Data = fs.readFileSync(fullFilePath).toString('base64');
    fileData = `data:${mimeType};base64,${base64Data}`;
  }

  return { props: {
    folderPath,
    // Convert folderList from fs.Dirent to client-usable objects
    folderList: folderList
      .map(item => ({
        name: item.name,
        isDirectory: item.isDirectory()
      }))
      .sort((a, b) => a.name < b.name ? -1 : 1)
      .sort((a, b) => a.isDirectory ? -1 : 1),
    fileName,
    fileData,
  } };
}
