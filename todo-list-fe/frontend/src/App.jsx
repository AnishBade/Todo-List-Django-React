import Navbar from "./views/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./views/Dashboard";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/login' element={<LoginPage />}> </Route>
          <Route path='/register' element={<RegisterPage />}></Route>
        </Routes>
      </AuthProvider>

    </Router>

  )
}

export default App;