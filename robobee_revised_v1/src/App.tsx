import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Grid from "@mui/material/Grid2";
import Page404 from "./components/Page404";
import Home from "./pages/orders/Home";
import Customers from "./pages/customers/Customers";
import TopNavBar from "./components/TopNavBar";
import OrdersAll from "./pages/orders/OrdersAll";

function App() {


  return (
    <Router>
      <Grid container spacing={2} padding={1}>
        <Grid size="grow">
          <TopNavBar />
          <Routes>
            <Route path="*" element={<Page404 />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/ordersAll" element={<OrdersAll />}></Route>
          </Routes>
        </Grid>
      </Grid>
    </Router>
  )
}

export default App
