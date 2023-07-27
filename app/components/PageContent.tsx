"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "@/components/CustomDragLayer";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
    "
      >
        {songs.map((item, index) => (
          <SongItem key={index} data={item} />
        ))}
      </div>
    </DndProvider>
  );
};

export default PageContent;
