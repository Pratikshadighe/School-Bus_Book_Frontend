import { createSlice } from "@reduxjs/toolkit";
import { createStudent, getAllStudent, addPayment, getStudentDetails, updateStudentDetails, deleteStudent } from "../actions/student"; // Import your async action for creating a student and adding payment

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.loading = false;
        const { studentId, payment } = action.payload;
        const students = state.students.find(student => student.id === studentId);
        if (students) {
          students.payments = students.payments || [];
          students.payments.push(payment);
        }
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStudentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStudentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentDetails.fulfilled, (state, action) => {
        state.loading = false;
        const updatedStudent = action.payload;
        state.students = state.students.map((student) =>
          student._id === updatedStudent._id ? updatedStudent : student
        );
      })
      .addCase(updateStudentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(student => student._id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
