import "./App.css";
import { Routes, Route } from "react-router-dom";
import CoinDetails from "./components/CoinDetails";
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Exchanges />} />
      <Route path="/coin/:id" element={<CoinDetails />} />
      <Route path="/coins" element={<Coins />} />
    </Routes>
  );
}

export default App;
