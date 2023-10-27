"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "@/components/CustomDragLayer";
import useCollapse from "@/hooks/useCollapse";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const { isCollapse } = useCollapse();
  const onPlay = useOnPlay(songs);

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div
        className={`
          grid
          gap-4
          mt-4
          ${
            !isCollapse
              ? `
                  grid-cols-2
                  sm:grid-cols-2
                  md:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                  2xl:grid-cols-5
                `
              : `
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-5
                  2xl:grid-cols-6
                `
          }
          
        `}
      >
        {songs.map((item, index) => (
          <SongItem key={index} song={item} songs={songs} />
        ))}
      </div>
    </DndProvider>
  );
};

export default PageContent;
