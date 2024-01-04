import { useContext, useEffect, useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { loadingContext } from "../context/MyContext";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import ModelComponents from "../components/ModelComponents";
import TableComp from "../components/TableComp";
import { getAllEntries } from "../api/expenses-api";
import { Pagination } from "../components/Pagination";
import { monthsData } from "../contstants/monthArray";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const { loading, setLoading } = useContext(loadingContext);
  const budget = localStorage.getItem("TotalBudget") || 0;
  const [totalBudget, setTotalBudget] = useState(budget);
  const [budgetInput, setBudgetInput] = useState("");
  const [showPerPage, setShowPerPage] = useState(4);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const fetchAllEntries = async () => {
    setLoading(true);
    const result = await getAllEntries();
    console.log(result);
    const error = result?.response?.data?.message;
    setLoading(false);
    result?.status === 200
      ? setEntries(result?.data?.allEntry)
      : error
      ? toast.error(error, { themee: "colored" })
      : toast.error(result?.message, { theme: "colored" });
  };
  useEffect(() => {
    fetchAllEntries();
  }, []);
  // filter by date
  let filterData = [...entries];

  filterData = filterData.filter((entry) => {
    if (selectedMonth === "") return filterData;
    const entryMonth = new Date(entry.date).getMonth() + 1; // Get the month (1-12)
    return entryMonth === parseInt(selectedMonth);
  });

  let totalExpenses = filterData.reduce((acc, currItem) => {
    return acc + parseInt(currItem.amount);
  }, 0);

  useEffect(() => {
    localStorage.setItem("TotalBudget", totalBudget);
  }, [totalBudget]);
  const budgetFormSubmit = (e) => {
    e.preventDefault();
    if (!budgetInput)
      return toast.error("Please add amount", { theme: "colored" });
    else if (isNaN(budgetInput))
      return toast.error("Please Provide valid amount numerical values", {
        theme: "colored",
      });
    setTotalBudget(budgetInput);
    setBudgetInput("");
  };

  const onPagination = (startValue, endValue) => {
    console.log(startValue, endValue);
    setPagination({ start: startValue, end: endValue });
  };
  return (
    <>
      <Box style={{ width: "80%" }} className="mt-36 mx-auto">
        <Box className="flex gap-3 justify-between items-center">
          <form className="flex gap-5" onSubmit={budgetFormSubmit}>
            <TextField
              type="text"
              size="small"
              value={budgetInput}
              label="Add Monthly budget"
              onChange={(e) => setBudgetInput(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              color="success"
              size="small"
            >
              ADD MONEY
            </Button>
          </form>
          <Box className=" h-24 text-left w-96 gap-3 flex flex-col justify-center items-center shadow-xl">
            <Typography>Total Budget : ₹ {totalBudget}</Typography>
            <Typography>Total Monthly Expenses : ₹ {totalExpenses}</Typography>
          </Box>
          <Box className="flex gap-8">
            <FormControl size="small" className="w-72">
              <InputLabel id="month">Select Months.....</InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                name="city"
                label="Select Months....."
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: "200px", // Adjust if needed to match the Select maxHeight
                    },
                  },
                }}
              >
                {monthsData?.map((elem) => {
                  return (
                    <MenuItem key={elem.id} value={elem.value}>
                      {elem.month}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              ADD ExPENSES
            </Button>
          </Box>
        </Box>
        <TableContainer className="border shadow-2xl p-6 pb-16 text-center mt-5">
          <Table sx={{ textAlign: "center" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "600" }}>DATE</TableCell>
                <TableCell sx={{ fontWeight: "600" }}>TITLE</TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "600" }}>
                  AMOUNT
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "600" }}>
                  CATEGORIES
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "600" }}>
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <Spinner />
              ) : filterData && filterData.length > 0 ? (
                <>
                  {filterData
                    .slice(pagination.start, pagination.end)
                    .map((elem) => (
                      <TableComp
                        key={elem._id}
                        elem={elem}
                        fetchAllEntries={fetchAllEntries}
                      />
                    ))}
                </>
              ) : (
                <img
                  src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703116800&semt=ais"
                  alt="404 Error"
                />
              )}
            </TableBody>
          </Table>
          {filterData?.length > 4 && !loading && (
            <Pagination
              showperPage={showPerPage}
              onPagination={onPagination}
              total={entries.length}
            />
          )}
        </TableContainer>
      </Box>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "30%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
            }}
          >
            <ModelComponents
              setIsOpen={setIsOpen}
              fetchAllEntries={fetchAllEntries}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};
export default Home;
