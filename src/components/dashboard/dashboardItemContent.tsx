import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Box, Grid, useTheme } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import type { Item } from "./dashboardTypes";

export interface DashboardItemContentProps {
  item: Item;
  shadowOnly?: boolean;
  isSelected?: boolean;
  isMoving?: boolean;
  isDragging?: boolean;
  index?: number;
  style?: React.CSSProperties;
  listeners?: SyntheticListenerMap;
  attributes?: React.HTMLAttributes<HTMLElement>;
}

const DashboardItemContent = forwardRef<
  HTMLDivElement,
  DashboardItemContentProps
>(
  (
    {
      item,
      shadowOnly = false,
      isSelected = false,
      isMoving = false,
      isDragging = false,
      index,
      style,
      listeners,
      attributes,
    },
    ref,
  ) => {
    const theme = useTheme();
    const [animCycle, setAnimCycle] = useState(false);

    useEffect(() => {
      if (shadowOnly) {
        setAnimCycle((c) => !c);
      }
    }, [index, shadowOnly]);

    return (
      <Box
        // the duplicate animations are so we retrigger when shadowOnly changes
        sx={{
          "@keyframes fadeInA": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          "@keyframes fadeInB": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          animation: shadowOnly
            ? `${animCycle ? "fadeInA" : "fadeInB"} 0.6s ease-in`
            : "none",
          backgroundColor:
            isSelected && isMoving ? "rgba(0, 0, 0, 0.1)" : "transparent",
          transition: "background-color 0.3s",
          borderRadius: 2,
        }}
      >
        <Grid
          ref={ref}
          style={style}
          {...listeners}
          {...attributes}
          container
          alignItems={"center"}
          key={item.id}
          sx={{
            height: "120px",
            width: "260px",
            backgroundColor: shadowOnly
              ? "0 2px 4px rgba(0,0,0,0.1)"
              : isSelected
                ? theme.palette.background.paper
                : theme.palette.background.default,
            margin: 1,
            padding: 4,
            borderRadius: 2,
            //boxShadow: shadowOnly ? "none" : "0 2px 4px rgba(0,0,0,0.1)",
            cursor: !shadowOnly
              ? isDragging
                ? "grabbing"
                : "grab"
              : "default",
          }}
        >
          {!shadowOnly && (
            <span>
              {item.title} {item.id} ({item.id})
            </span>
          )}
        </Grid>
      </Box>
    );
  },
);

DashboardItemContent.displayName = "DashboardItemContent";

export default DashboardItemContent;
