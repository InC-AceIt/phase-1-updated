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


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  return (
    <div className="w-screen h-screen flex flex-col ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      <Routes>

        <Route path="/" element= {<Home isLoggedIn={isLoggedIn}/>} />
        <Route path="/user/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/user/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/otp" element={<LoginOTPScreen  setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard/>
          </PrivateRoute>} />
        <Route path="/questsug" element = {
        <PrivateRoute isLoggedIn={isLoggedIn}>
            <QuestSug/>
        </PrivateRoute>} />
        <Route path="/interviewprep" element = {
        <PrivateRoute isLoggedIn={isLoggedIn}>
            <InterviewPrep/>
        </PrivateRoute>} />
        <Route path="/analyzeprof" element = {
        <PrivateRoute isLoggedIn={isLoggedIn}>
            <AnalyzeProf/>
        </PrivateRoute>} />
       
        

      </Routes>

    </div>
    )
}

export default App;
