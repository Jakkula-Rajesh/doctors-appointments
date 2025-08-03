import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctorsData from "../data/doctors.json";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  profileImage: string;
  availability: string;
  schedule: string[];
}

const DoctorList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDoctors(doctorsData as Doctor[]);
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold">Doctors</h2>
        <input
          type="text"
          placeholder="Search by name or specialization"
          className="border rounded px-3 py-2 w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search doctors"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            tabIndex={0}
            aria-label={`Doctor ${doctor.name}, ${doctor.specialization}, ${doctor.availability}`}
          >
            <img
              src={doctor.profileImage}
              alt={`Profile of ${doctor.name}`}
              className="w-20 h-20 rounded-full mb-3 object-cover"
            />
            <div className="text-lg font-medium">{doctor.name}</div>
            <div className="text-gray-600">{doctor.specialization}</div>
            <div
              className={`mt-2 px-2 py-1 rounded text-xs font-semibold ${
                doctor.availability === "Available Today"
                  ? "bg-green-100 text-green-700"
                  : doctor.availability === "Fully Booked"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {doctor.availability}
            </div>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring"
              onClick={() => navigate(`/doctor/${doctor.id}`)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorList;
