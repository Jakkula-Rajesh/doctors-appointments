import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import doctorsData from "../data/doctors.json";
import AppointmentForm from "./AppointmentForm";

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = (doctorsData as any[]).find((d) => d.id === Number(id));

  if (!doctor) {
    return <div className="text-center text-red-600">Doctor not found.</div>;
  }

  const [showForm, setShowForm] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState<string | null>(null);
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto mt-8">
      <button className="mb-4 text-blue-600 underline" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <img
        src={doctor.profileImage}
        alt={`Profile of ${doctor.name}`}
        className="w-24 h-24 rounded-full mb-4 mx-auto object-cover"
      />
      <h2 className="text-2xl font-bold text-center mb-2">{doctor.name}</h2>
      <div className="text-center text-gray-600 mb-2">{doctor.specialization}</div>
      <div className={`text-center mb-4 px-2 py-1 rounded text-xs font-semibold ${
        doctor.availability === "Available Today"
          ? "bg-green-100 text-green-700"
          : doctor.availability === "Fully Booked"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}>
        {doctor.availability}
      </div>
      <div className="mb-4">
        <strong>Schedule:</strong>
        {doctor.schedule && doctor.schedule.length > 0 ? (
          <ul className="list-disc ml-6 mt-2">
            {doctor.schedule.map((slot: string) => (
              <li key={slot}>{slot.replace("T", " ")}</li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No available slots.</div>
        )}
      </div>
      {doctor.availability === "Available Today" && !showForm && !confirmation && (
        <button
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring"
          onClick={() => setShowForm(true)}
        >
          Book Appointment
        </button>
      )}
      {showForm && !confirmation && (
        <div className="mt-6">
          {/* @ts-ignore */}
          <AppointmentForm
            doctorName={doctor.name}
            onSubmit={({ patientName }) => {
              setConfirmation(`Appointment booked successfully! Thank you, ${patientName}. Your appointment with ${doctor.name} is confirmed.`);
              setShowForm(false);
            }}
          />
        </div>
      )}
      {confirmation && (
        <div className="text-center p-4 text-green-700 font-semibold mt-6">{confirmation}</div>
      )}
    </div>
  );
};

export default DoctorProfile;
