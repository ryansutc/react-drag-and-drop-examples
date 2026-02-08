import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DashboardItemContent from "./dashboardItemContent";
import type { Item } from "./dashboardTypes";

export default function DashboardItem({
  item,
  isSelected = false,
  isMoving = false,
  shadowOnly = false,
  index,
}: {
  item: Item;
  isSelected?: boolean;
  isMoving?: boolean;
  shadowOnly?: boolean;
  index?: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <DashboardItemContent
      ref={setNodeRef}
      item={item}
      isSelected={isSelected}
      isMoving={isMoving}
      isDragging={isDragging}
      style={style}
      listeners={listeners}
      attributes={attributes}
      shadowOnly={shadowOnly}
      index={index}
    />
  );
}
