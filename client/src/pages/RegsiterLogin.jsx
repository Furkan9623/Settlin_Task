import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { loginUserApi, registerUserApi } from "../api/user-api";
import { loginContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { theme } from "flowbite-react";
const RegisterLogin = () => {
  const [toggle, setToggle] = useState("register");

  const initValue = {
    ...(toggle === "register" && { name: "" }),
    email: "",
    password: "",
  };
  const [formInput, setFormInput] = useState(initValue);
  const [file, setFile] = useState("");
  const { setLoginAuth } = useContext(loginContext);

  const { name, email, password } = formInput;
  useEffect(() => {
    setFormInput(initValue);
  }, [toggle]);
  const toggleForm = (toggleInput) => {
    setToggle(toggleInput);
  };
  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  // create form
  const formData = new FormData();
  formData.append("profile", file);
  formData.append("user", JSON.stringify(formInput));

  const alphaNumberic = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validation = (isLogin = false) => {
    console.log(isLogin);
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill all the details...", { theme: "colored" });
      return false;
    } else if (!email.match(alphaNumberic)) {
      toast.error("Email format is not correct", { theme: "colored" });
      return false;
    } else if (!isLogin && password?.length <= 4) {
      toast.error("Password should be greater than 5 digit", {
        theme: "colored",
      });
      return false;
    } else {
      return true;
    }
  };
  // register user
  const registerFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formInput);
    if (!validation()) return;
    console.log(file);
    console.log(Object.fromEntries(formData));
    const result = await registerUserApi(formData);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (toast.success("User register successfull", { theme: "colored" }),
        setToggle("login"),
        setFormInput(initValue))
      : error
      ? toast.error(error, { theme: "colored" })
      : toast.error(result?.message, { theme: "colored" });
  };
  // save on localStorage
  const saveOnLocalStorage = (key, value) => {
    console.log(key, value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  const navigate = useNavigate();
  // login user
  const loginFormSubmit = async (e) => {
    e.preventDefault();
    if (!validation(true)) return;
    const result = await loginUserApi(formInput);
    const { name, imageUrl } = result?.data?.user || "";
    const Token = result?.data?.token || "";
    let userData = { name, imageUrl, Token };
    console.log(result);
    const error = result?.response?.data?.message;
    return result?.status === 200
      ? (toast.success("user login successfull", { theme: "colored" }),
        setLoginAuth(true),
        saveOnLocalStorage("User", userData),
        navigate("/"))
      : error
      ? toast.error(error, { theme: "colored" })
      : toast.error(result?.message, { theme: "colored" });
  };
  return (
    <Box className="w-1/3 shadow-2xl p-12 m-auto mt-16 flex flex-col gap-4 text-center rounded">
      <Typography variant="h4" className="bg-black text-white py-2 ">
        {toggle === "register" ? "REGISTER USER" : "LOGIN USER"}
      </Typography>
      <Box className="flex gap-2">
        <Button
          type="button"
          size="small"
          variant={toggle === "register" ? "contained" : "outlined"}
          fullWidth
          sx={{ fontWeight: "600" }}
          onClick={() => toggleForm("register")}
        >
          REGISTER
        </Button>
        <Button
          type="button"
          size="small"
          variant={toggle === "login" ? "contained" : "outlined"}
          fullWidth
          onClick={() => toggleForm("login")}
          sx={{ fontWeight: "600" }}
        >
          LOGIN
        </Button>
      </Box>
      <form
        className="flex flex-col gap-4 mt-3"
        onSubmit={toggle === "login" ? loginFormSubmit : registerFormSubmit}
      >
        {toggle === "register" && (
          <TextField
            type="text"
            size="small"
            label="Enter name....."
            name="name"
            onChange={handleChange}
          />
        )}
        <TextField
          type="text"
          size="small"
          label="Enter email...."
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          type="text"
          size="small"
          label="Enter password..."
          onChange={handleChange}
          name="password"
          value={password}
        />
        {toggle === "register" && (
          <TextField size="small" type="file" onChange={handleFile} />
        )}
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="secondary"
          sx={{ fontWeight: "600" }}
        >
          {toggle === "register" ? "REGISTER USER" : "LOGIN USER"}
        </Button>
      </form>
      <Typography>
        {toggle === "register"
          ? "If Already have an Account"
          : "Create new User"}{" "}
        <Button
          color="warning"
          size="small"
          variant="contained"
          onClick={() =>
            toggle === "register" ? toggleForm("login") : toggleForm("register")
          }
        >
          {toggle === "register" ? "login" : "register"}
        </Button>{" "}
      </Typography>
    </Box>
  );
};

export default RegisterLogin;
