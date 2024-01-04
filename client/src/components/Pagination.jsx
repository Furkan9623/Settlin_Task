// chaild component
import { Button, Fab } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
export const Pagination = ({ showperPage, onPagination, total }) => {
  console.log(total);
  let totalValue = total;
  console.log(totalValue);

  const [counter, setCounter] = useState(1);
  // distructring
  //   const { showperPage } = props;
  //   console.log(showperPage);

  useEffect(() => {
    const value = showperPage * counter;
    // console.log("Start", value - showperPage);
    // console.log("End", value);
    const startValue = value - showperPage;
    const endValue = value;
    console.log("object");
    onPagination(startValue, endValue);
  }, [counter]);
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Fab
        size="small"
        color="success"
        aria-label="add"
        disabled={counter === 1 ? true : false}
        onClick={() => setCounter(counter - 1)}
      >
        <SkipPreviousIcon />
      </Fab>
      <h3>{counter}</h3>
      <Fab
        size="small"
        color="warning"
        aria-label="add"
        onClick={() => setCounter(counter + 1)}
        disabled={
          counter === Math.ceil(totalValue / showperPage) ? true : false
        }
      >
        <SkipNextIcon  />
      </Fab>
    </div>
  );
};
