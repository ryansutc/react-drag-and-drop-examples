A small set of drag and drop UX examples based on the [react-dnd](https://github.com/react-dnd/react-dnd/) library.

### Summary

The dnd kit is the most popular tool for drag and drop functionality. It provides a react library, [react-dnd](https://github.com/react-dnd/react-dnd/) for easy usage. However combining drag and drop with sorting in multiple containers is a bit tricky.

Code exemplifies sortable multi container flow akin to their [storybook item here](https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/story/presets-sortable-multiple-containers--basic-setup).

Concepts:

**Sensors** (Pointer, Mouse, Touch, Keyboard) are an abstraction to detect different input methods. Sensors define **activator events**. Lifecycle:

- Activator Event Detected (a click, or touch!)
- Sensor attaches new listeners to input methods (dragging, moving, etc)
- Users motion finishes (mouseup, etc). Sensor is torn down.

The **DndContext** has `onDragStart`. Fires when event like mouseclick on a "Draggable" happens.
It has a `onDragMove`, fires continuously as the item is moved. Also `onDragOver` fires when item moves over a "Droppable" container.
Finally `onDragEnd` fires when a draggable item is dropped.
