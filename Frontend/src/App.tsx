import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import CreateList from "./pages/CreateList.tsx";
import GetList from "./pages/GetList.tsx";
import Layout from "./components/Layout"; // import the layout

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-list" element={<CreateList />} />
          <Route path="/lists" element={<GetList />} />
          {/* other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


