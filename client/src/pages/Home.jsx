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

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState(null);
  const { loading, setLoading } = useContext(loadingContext);
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

  return (
    <>
      <Box style={{ width: "80%" }} className="mt-36 mx-auto">
        <Box className="flex gap-3 justify-between items-center">
          <form className="flex gap-5">
            <TextField type="text" size="small" label="Add Monthly budget" />
            <Button variant="contained" color="success" size="small">
              ADD MONEY
            </Button>
          </form>

          <Box className="flex gap-8">
            <FormControl size="small" className="w-72">
              <InputLabel id="city">Select Categories.....</InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                name="city"
                label="Select Categories....."
                // value={filter}
                // onChange={handleFilter}
              >
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="transp">Transportation</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              ADD ExPENSES
            </Button>
          </Box>
        </Box>
        <TableContainer
          sx={{
            textAlign: "center",
            boxShadow: "0 0 3px grey",
            mt: "3rem",
          }}
        >
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
              ) : entries && entries.length > 0 ? (
                <>
                  {entries.map((elem) => (
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
