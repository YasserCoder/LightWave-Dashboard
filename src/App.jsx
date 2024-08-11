import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to="home" />} />
                    <Route path="home" element={<Home />} />
                </Route>
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
