import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import QuestSug from "./pages/QuestSug";
import { useEffect, useState } from 'react'
import PrivateRoute from "./components/PrivateRoute";
import InterviewPrep from "./pages/InterviewPrep";
import AnalyzeProf from "./pages/AnalyzeProf";
import LoginOTPScreen from "./pages/LoginOTPScreen";
import Resume from "./pages/Resume";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {



    const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem("EMAIL")?.length > 0 ? true : false));

    useEffect(() => {
        console.log(isLoggedIn)
        fetch('https://phase-1-updated.onrender.com/user/refetch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('EMAIL')
            })
        }).then(response => {
            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false)

            }
        })
    }, [isLoggedIn, setIsLoggedIn]);


    return (
        <div className="w-screen h-screen flex flex-col ">
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <Routes>

                <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                <Route path="/user/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/user/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/otp" element={<LoginOTPScreen setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/about" element={<About setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/contact" element={<Contact setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/dashboard" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <Dashboard />
                    </PrivateRoute>} />
                <Route path="/questsug" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <QuestSug />
                    </PrivateRoute>} />
                <Route path="/profile/interviewprep" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <InterviewPrep />
                    </PrivateRoute>} />
                <Route path="/analyzeprof" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <AnalyzeProf />
                    </PrivateRoute>} />
                <Route path="/resume" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <Resume />
                    </PrivateRoute>} />



            </Routes>

        </div>
    )
}

export default App;
