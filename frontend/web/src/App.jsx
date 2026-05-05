import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "./layout/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";  
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import VerifyOTP from "./pages/VerifyOTP";
import Contact from "./pages/Contact";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Orders = lazy(() => import("./pages/Orders"));
const Distribution = lazy(() => import("./pages/Distribution"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));



function App() {
  return (
    <Routes>

      <Route path="/" element={<Landing />} /> 
      <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login/>} />  
        <Route path="/verify" element={<VerifyOTP />} />
       <Route path="/contact" element={<Contact />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/distribution" element={<Distribution />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        

      </Route>

    </Routes>
  );
}

export default App;