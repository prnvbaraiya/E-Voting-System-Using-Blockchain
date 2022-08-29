import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./Pages/admin/PageNotFound";
import { adminRoutes } from "./Routes/AdminRoutes";
import { userRoutes } from "./Routes/UserRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {userRoutes}
          {adminRoutes}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
