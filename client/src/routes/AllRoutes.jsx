import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegisterLogin from "../pages/RegsiterLogin";
import Home from "../pages/Home";

import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login-register" element={<RegisterLogin />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
