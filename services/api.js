import axios from "axios";

const API_URL = "http://192.168.2.118:5000/api/appointments"; // Change to your backend URL

export const requestAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error requesting appointment:", error);
    return null;
  }
};

export const fetchStudentAppointments = async (studentEmail) => {
  try {
    const response = await axios.get(`${API_URL}/student/${studentEmail}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/${appointmentId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return null;
  }
};
