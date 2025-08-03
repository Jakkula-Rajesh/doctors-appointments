
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import DoctorProfile from "./components/DoctorProfile";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold shadow">
        NirogGyan Appointment Booking
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={<DoctorList />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/confirmation" element={<div className="text-center p-8 text-green-700 text-xl font-bold">Appointment booked successfully!</div>} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
