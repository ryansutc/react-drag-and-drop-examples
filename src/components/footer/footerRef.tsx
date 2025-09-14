import React from "react";
import FooterBar from "./footerbar";

/**
 * A simple wrapper for the Footer component that provides a reference for scrolling.
 * @returns
 */
export default function FooterRef() {
  const scrollEndRef = React.useRef<HTMLDivElement>(null);
  return (
    <div>
      <div id="footerRef" ref={scrollEndRef}></div>
      <FooterBar scrollEndRef={scrollEndRef} />
    </div>
  );
}
