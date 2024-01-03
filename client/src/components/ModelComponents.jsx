import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { addExpenses } from "../api/expenses-api";
import { toast } from "react-toastify";
const initValue = {
  date: "",
  title: "",
  amount: "",
  category: "",
};
const ModelComponents = ({ setIsOpen, fetchAllEntries }) => {
  const [formInput, setFormInput] = useState(initValue);
  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(formInput);
    const result = await addExpenses(formInput);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (toast.success("Entry add Successfull", { theme: "colored" }),
        setIsOpen(false),
        fetchAllEntries())
      : error
      ? toast.error(error, { theme: "colored" })
      : toast.error(result?.message, { theme: "colored" });
    console.log(result);
  };
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            {/* <h1 className="text-2xl font-semibold">
                {isEdit ? "UPDATE USER" : "ADD NEW USER"}
              </h1> */}
            <h1 className="text-2xl font-semibold mb-9">ADD EXPENSES</h1>
            <form className="flex flex-col gap-8 mt-3" onSubmit={formSubmit}>
              <TextField
                type="date"
                size="small"
                name="date"
                onChange={handleChange}
              />

              <TextField
                type="text"
                size="small"
                label="Enter title..."
                name="title"
                onChange={handleChange}
              />
              <TextField
                type="number"
                size="small"
                onChange={handleChange}
                label="Enter amount..."
                name="amount"
              />
              <FormControl size="small">
                <InputLabel id="category">Select Categories...</InputLabel>
                <Select
                  sx={{ textAlign: "left" }}
                  name="category"
                  label="Select Categories..."
                  // value={filter}
                  onChange={handleChange}
                >
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="transportation">Transportation</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="secondary"
                sx={{ fontWeight: "600" }}
              >
                ADD EXPENSES
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComponents;
