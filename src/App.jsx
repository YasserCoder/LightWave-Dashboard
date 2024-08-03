import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to="home" />} />
                    <Route path="home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
