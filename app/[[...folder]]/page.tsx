import React from "react";
import HorizontalSection from "../../components/common/HorizontalSection";
import FolderView from "../../components/folder/FolderView";
import ImageView from "../../components/image/ImageView";
import { getFileData, getFolderData } from "./getData";

interface FolderPageProps {
  params: {
    folder?: string[],
  },
  searchParams: {
    view?: string,
  }
}

export default async function FolderPage({ params, searchParams }: FolderPageProps) {
  const folderPath = params.folder?.length
    ? `/${params.folder.join('/')}`
    : '';
  const fileName = searchParams.view || '';

  const folderData = await getFolderData(folderPath);
  let fileData;
  if (fileName.length > 0 && folderData.find(f => !f.isDirectory && f.name === fileName)) {
    fileData = await getFileData(fileName, folderPath);
  }

  return (
    <>
      <HorizontalSection width='90%'>
        <FolderView
          folderPath={folderPath}
          folderData={folderData}
        />
      </HorizontalSection>
      {fileData && (
        <ImageView
          fileName={fileName}
          fileData={fileData}
        />
      )}
    </>
  );
}
