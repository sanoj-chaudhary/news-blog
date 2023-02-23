import React, { useState, useEffect } from "react";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-between">
      <span className="cursor-pointer" onClick={() => onButtonClick("prev")}>
      <i className="fas fa-angle-left" />
      </span>

      &nbsp;  &nbsp;  &nbsp;
      <span className="cursor-pointer" onClick={() => onButtonClick("next")}>
      <i className="fas fa-angle-right" />
      </span>
    </div>
  );
};

export default Pagination;