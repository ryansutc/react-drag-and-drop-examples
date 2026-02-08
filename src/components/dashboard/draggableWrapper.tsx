import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import type { Item } from "./dashboardTypes";

export default function DraggableWrapper({
  item,
  Element = "div",
  children = null,
  shadowOnly = false,
  isSelected = false,
  isMoving = false,
}: {
  item: Item;
  Element: React.ElementType;
  children?: React.ReactNode;
  shadowOnly?: boolean;
  isSelected?: boolean;
  isMoving?: boolean;
}) {
  const {
    attributes,
    listeners,
    setDraggableNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });
  return (
    <Element
      ref={setDraggableNodeRef}
      attributes={attributes}
      transform={transform}
      transition={transition}
      isDragging={isDragging}
      shadowOnly={shadowOnly}
      isSelected={isSelected}
      isMoving={isMoving}
      {...listeners}
      id={item.id}
      item={item}
      listeners={listeners}
    >
      {children}
    </Element>
  );
}
