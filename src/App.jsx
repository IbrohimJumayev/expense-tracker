import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import ExpenceTracker from "./pages/expence-tracker";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Auth />}/>
        <Route path="/expence-tracker" element={<ExpenceTracker />}/>
      </Routes>
    </>
  );
}

export default App;
