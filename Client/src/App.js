import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./Pages/admin/PageNotFound";
import { adminRoutes } from "./Routes/AdminRoutes";
import { userRoutes } from "./Routes/UserRoutes";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <div className="App">
      <TransactionProvider>
        <BrowserRouter>
          <Routes>
            {userRoutes}
            {adminRoutes}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </TransactionProvider>
    </div>
  );
}

export default App;
