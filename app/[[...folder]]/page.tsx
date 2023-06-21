import React from "react";
import HorizontalSection from "../../components/common/HorizontalSection";
import FolderView from "../../components/folder/FolderView";
import ImageView from "../../components/image/ImageView";
import { getData } from "./getData";

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

  const data = await getData(folderPath, fileName);

  return (
    <>
      <HorizontalSection width='90%'>
        <FolderView
          folderPath={folderPath}
          list={data.folderList}
        />
      </HorizontalSection>
      {data.fileData && (
        <ImageView
          fileName={fileName}
          fileData={data.fileData}
        />
      )}
    </>
  );
}
