import { TableCell, TableRow, Box, Modal } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import { deleteExpense } from "../api/expenses-api";
import { toast } from "react-toastify";
import { useState } from "react";
import ViewCard from "../pages/ViewExpense";
const TableComp = ({ elem, fetchAllEntries }) => {
  const { _id, date, title, amount, category } = elem;
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const deleteEntry = async () => {
    const result = await deleteExpense(_id);
    console.log(result);
    const error = result?.response?.data?.message;

    return result?.status === 200
      ? (toast.success("Entries successfull deleted", { theme: "colored" }),
        fetchAllEntries())
      : error
      ? toast.error(error)
      : toast.error(result?.message);
  };
  return (
    <>
      <TableRow>
        <TableCell>{date}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell sx={{ textAlign: "center", p: 0 }}>₹ {amount}</TableCell>
        <TableCell
          sx={{ textAlign: "center", textTransform: "capitalize", p: 0 }}
        >
          {category}
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
            p: 0,
          }}
        >
          <Box className="flex justify-center gap-4">
            <Fab
              size="small"
              color="success"
              aria-label="edit"
              onClick={handleChange}
            >
              <RemoveRedEyeIcon />
            </Fab>
            <Fab
              size="small"
              color="error"
              aria-label="add"
              onClick={deleteEntry}
            >
              <DeleteIcon />
            </Fab>
          </Box>
        </TableCell>
      </TableRow>
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
              // bgcolor: "background.paper",
              p: 4,
            }}
          >
            <ViewCard id={_id} setIsOpen={setIsOpen} />
          </Box>
        </Modal>
      )}
    </>
  );
};
export default TableComp;
