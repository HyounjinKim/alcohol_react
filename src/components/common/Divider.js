import React from "react";
import { Common } from "../../styles/CommonCss";

const Divider = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        background: `${Common.color.p900}`,
      }}
    ></div>
  );
};

export default Divider;
