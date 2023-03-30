import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import React from "react";

const Shimmer = () => {
  return (
    <div>
      {Array(15)
        .fill("")
        .map((value, index) => (
          <ShimmerSimpleGallery key={index} card imageHeight={300} caption />
        ))}
    </div>
  );
};

export default Shimmer;
