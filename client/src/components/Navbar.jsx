import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Avatar,
  CardMedia,
} from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginContext } from "../context/MyContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { loginAuth, setLoginAuth } = useContext(loginContext);
  const { name, imageUrl } = JSON.parse(localStorage.getItem("User")) || "";
  const URL = "http://localhost:8080";
  const logoutUser = () => {
    localStorage.clear();
    setLoginAuth(false);
  };
  return (
    <>
      <AppBar>
        <Toolbar className="flex justify-between text-black bg-gray-300">
          <Link className="font-semibold  uppercase ml-11" to="/">
            Home
          </Link>

          {loginAuth ? (
            <Box className="flex gap-6 items-center mr-11  ">
              <Typography variant="p" className="font-semibold uppercase">
                {name}
              </Typography>
              {imageUrl ? (
                <div class="relative">
                  <img
                    className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-green-500"
                    src={`${URL}/profile/${imageUrl}`}
                    alt=""
                  />
                  <span className="absolute bottom-0 left-8 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              ) : (
                <Avatar className="uppercase">{name[0]}</Avatar>
              )}

              <button
                type="button"
                onClick={logoutUser}
                className="text-white bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </Box>
          ) : (
            <Button
              variant="contained"
              size="small"
              sx={{ fontWeight: "600", mr: 10 }}
              onClick={() => navigate("/login-register")}
            >
              Register / Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
