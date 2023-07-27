import { Song } from "@/types";
import { useEffect, useState } from "react";
import { XYCoord, useDragLayer } from "react-dnd";

const CustomDragLayer = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseMove, setIsMouseMove] = useState(false);
  const [initialCoordinate, SetInitialCoordinate] = useState({ x: 0, y: 0 });

  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType,
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  const dragLayerStyle = (
    initialCoordinate: XYCoord | null,
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null
  ) => {
    if (!initialCoordinate || !initialOffset || !currentOffset) {
      return;
    }

    let { x: initial_X, y: initial_Y } = initialCoordinate;
    let { x: initialOffset_X, y: initialOffset_Y } = initialOffset;
    let { x: currentOffset_X, y: currentOffset_Y } = currentOffset;
    let translate_X = currentOffset_X - initialOffset_X;
    let translate_Y = currentOffset_Y - initialOffset_Y;

    const transform = `
    translate(${initial_X - 50 + translate_X}px
      ,${initial_Y - 15 + translate_Y}px)`;
    return {
      transform,
    };
  };

  // MouseEventListener
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsMouseDown(true);
      setIsMouseMove(false);
      SetInitialCoordinate({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseMove = () => {
      if (isMouseDown) {
        setIsMouseMove(true);
        setIsMouseDown(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseDown]);

  // useEffect(() => {
  //   console.log(songData);
  // }, [songData]);

  if (!isDragging) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <div
        style={dragLayerStyle(initialCoordinate, initialOffset, currentOffset)}
        className="
        bg-red-800/80
        flex
        w-fit
        max-w-[100px]
        p-2
        rounded-md
      "
      >
        <p className="truncate text-sm">{item.data.title}</p>
      </div>
    </div>
  );
};

export default CustomDragLayer;
