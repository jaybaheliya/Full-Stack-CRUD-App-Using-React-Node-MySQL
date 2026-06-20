import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Student = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const totalPages = Math.max(1, Math.ceil(students.length / studentsPerPage));
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = students.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handleDelete = (studentId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`http://localhost:5000/delete/${studentId}`)
      .then(() => {
        setStudents((currentStudents) =>
          currentStudents.filter((student) => student.ID !== studentId)
        );
        setCurrentPage((page) => {
          const nextCount = students.length - 1;
          const nextTotalPages = Math.max(
            1,
            Math.ceil(nextCount / studentsPerPage)
          );
          return Math.min(page, nextTotalPages);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => setStudents(response.data));
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5000/")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <main className="student-page">
      <section className="student-shell">
        <div className="student-hero">
          <div>
            <p className="student-eyebrow">Student Directory</p>
            <h1>Manage student records with a cleaner workspace</h1>
            <p className="student-subtitle">
              View, edit, and maintain the same student data with a more
              polished interface.
            </p>
          </div>
          <div className="student-stats-card">
            <span className="student-stats-label">Total Students</span>
            <strong>{students.length}</strong>
            <small>Live count from your existing API</small>
          </div>
        </div>

        <section className="student-panel">
          <div className="student-panel-header">
            <div>
              <h2>Student List</h2>
              <p>Browse, add, edit, and manage student records from one place.</p>
            </div>
            <Link to="/create" className="btn btn-primary student-add-btn">
              Add
            </Link>
          </div>

          <div className="student-table-wrap">
            <table className="table student-table align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mobile no</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => (
                  <tr key={student.ID}>
                    <td data-label="ID">
                      <span className="student-id-pill">{student.ID}</span>
                    </td>
                    <td data-label="Name" className="student-name-cell">
                      {student.Name}
                    </td>
                    <td data-label="Mobile no">{student.MobileNo}</td>
                    <td data-label="Email">{student.EmailId}</td>
                    <td data-label="Action">
                      <div className="student-action-group">
                        <Link
                          to={`/edit/${student.ID}`}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(student.ID)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {students.length > studentsPerPage && (
            <div className="student-pagination">
              <p className="student-pagination-summary">
                Showing {startIndex + 1}-
                {Math.min(startIndex + studentsPerPage, students.length)} of{" "}
                {students.length} students
              </p>

              <div className="student-pagination-controls">
                <button
                  type="button"
                  className="student-page-btn"
                  onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      className={`student-page-btn ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  type="button"
                  className="student-page-btn"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};
