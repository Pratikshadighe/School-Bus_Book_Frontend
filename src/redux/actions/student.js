import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async ({
    name,
    mobileNumber,
    amount,
  }) => {
   
    try {
      const response = await api.post(`/create-student`, {
        name,
        mobileNumber,
        amount,
      });
      console.log("Created student:", response.data);

      return response.data.student; // Assuming response.data contains the created student details
    } catch (err) {
      console.error("Error creating student:", err.response.data);
      throw err; // Throwing the error to be handled by the UI or store
    }
  }
);

export const addPayment = createAsyncThunk(
  "students/addPayment",
  async ({ studentId, paid,
    paymentDate, // Date object is already set
    paymentMethod, }) => {
    try {
      const response = await api.put(`/payments/${studentId}`, { paid,
        paymentDate, // Date object is already set
        paymentMethod });
      console.log("Created payment:", response.data);

      return { studentId, payment: response.data.payment }; // Adjust this according to your API response structure
    } catch (err) {
      console.error("Error creating payment:", err.response.data);
      throw err; // Throwing the error to be handled by the UI or store
    }
  }
);

export const updateStudentDetails = createAsyncThunk(
  "students/updateStudentDetails",
  async ({ studentId, name, mobileNumber, amount }) => {
    try {
      const response = await api.put(`/update/${studentId}`, { name, mobileNumber, amount });
      console.log("Updated student:", response.data);
      return response.data.student; // Adjust this according to your API response structure
    } catch (err) {
      console.error("Error updating student:", err.response.data);
      throw err; // Throwing the error to be handled by the UI or store
    }
  }
);
export const getStudentDetails = createAsyncThunk(
  "students/getstudentDetails",
  async ( studentId ) => {
    console.log("studentId",studentId)
    try {
      const response = await api.get(`/student/${studentId}`);
      console.log("getstudentDetails:", response.data);

      return response.data.student // Adjust this according to your API response structure
    } catch (err) {
      console.error("getstudentDetails:", err.response.data);
      throw err; // Throwing the error to be handled by the UI or store
    }
  }
);
export const getAllStudent = createAsyncThunk("students/getAllStudent", async () => {
  try {
    const response = await api.get(`/students`);
console.log("res",response.data)
    const student = response.data.students;

    return student;
  } catch (err) {
    console.error("Error", err.response.data);
    return err.response.data;
  }
});

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    console.log("studentO",studentId)
    try {
      const response = await api.delete(`/students/${studentId}`);
      console.log("Deleted student:", response.data);
      return studentId;
    } catch (err) {
      console.error("Error deleting student:", err.response.data);
      throw err;
    }
  }
);