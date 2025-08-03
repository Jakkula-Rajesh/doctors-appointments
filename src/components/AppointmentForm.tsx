import React, { useState } from "react";

interface AppointmentFormProps {
  doctorName: string;
  onSubmit: (data: { patientName: string; email: string; dateTime: string }) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctorName, onSubmit }) => {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ patientName, email, dateTime });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center p-4">
        <div className="text-green-700 font-semibold mb-2">Appointment booked successfully!</div>
        <div>Thank you, {patientName}. Your appointment with {doctorName} is confirmed.</div>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Patient Name</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Date & Time</label>
        <input
          type="datetime-local"
          className="border rounded px-3 py-2 w-full"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring"
      >
        Confirm Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
