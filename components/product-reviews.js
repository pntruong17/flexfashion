import * as React from "react";
import cc from "classcat";

import { ChevronDownSmallIcon } from "@/icons";

function ProductReviews({ product }) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const toggleExpanded = () => setIsExpanded((expanded) => !expanded);

  return (
    <div className="pt-6">
      <div className="border-b-2 pb-4">
        <button
          className="text-lg text-left w-full flex justify-between items-start text-gray-400"
          onClick={toggleExpanded}
        >
          <span className="font-flexrow font-medium text-gray-900">
            Reviews{" "}
          </span>
          <span className="ml-6 h-7 flex items-center">
            <ChevronDownSmallIcon
              className={cc([
                "h-6 w-6 transform",
                isExpanded ? "-rotate-180" : "rotate-0",
              ])}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
      {isExpanded && <div className="pt-4">Review Form</div>}
    </div>
  );
}

export default ProductReviews;
