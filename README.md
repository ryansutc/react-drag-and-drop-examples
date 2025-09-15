A small set of drag and drop UX examples

### Summary

The dnd kit is the most popular tool for drag and drop functionality. It provides a react library, [react-dnd](https://github.com/react-dnd/react-dnd/) for drag and drop.

Concepts:

**Sensors** (Pointer, Mouse, Touch, Keyboard) are an abstraction to detect different input methods. Sensors define **activator events**. Lifecycle:

- Activator Event Detected (a click, or touch!)
- Sensor attaches new listeners to input methods (dragging, moving, etc)
- Users motion finishes (mouseup, etc). Sensor is torn down.

The **DndContext** has `onDragStart`. Fires when event like mouseclick on a "Draggable" happens.
It has a `onDragMove`, fires continuously as the item is moved. Also `onDragOver` fires when item moves over a "Droppable" container.
Finally `onDragEnd` fires when a draggable item is dropped.
