import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadStudent = useCallback(() => {
    setLoading(true);
    setErrorMessage("");

    axios
      .get(`http://localhost:5000/student/${id}`)
      .then((response) => {
        const student = response.data;
        setName(student.Name || "");
        setEmail(student.EmailId || "");
        setPhone(student.MobileNo || "");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Unable to load student details right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    axios
      .put(`http://localhost:5000/update/${id}`, {
        name,
        email,
        phone,
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="student-page">
      <section className="student-shell">
        <div className="student-hero">
          <div>
            <p className="student-eyebrow">Edit Student</p>
            <h1>Update student details with a focused edit screen</h1>
            <p className="student-subtitle">
              Review the existing record, make your changes, and save the updated
              student information.
            </p>
          </div>
          <div className="student-stats-card create-side-card">
            <span className="student-stats-label">Record ID</span>
            <strong>#{id}</strong>
            <small>Editing the selected student entry</small>
          </div>
        </div>

        <section className="student-panel create-panel">
          <div className="student-panel-header">
            <div>
              <h2>Edit Student</h2>
              <p>Update the fields below and save when you're ready.</p>
            </div>
            <Link to="/" className="btn btn-outline-secondary student-back-btn">
              Back to List
            </Link>
          </div>

          {loading ? (
            <div className="student-loading-state">
              <div className="student-loading-card">
                <div className="student-loading-spinner" />
                <h3>Loading student details</h3>
                <p>Please wait while we fetch the current record.</p>
              </div>
            </div>
          ) : errorMessage ? (
            <div className="student-loading-state">
              <div className="student-loading-card student-error-card">
                <h3>Could not load this student</h3>
                <p>{errorMessage}</p>
                <button
                  type="button"
                  className="btn btn-primary student-add-btn"
                  onClick={loadStudent}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="create-form">
            <div className="create-form-grid">
              <div className="create-field">
                <label htmlFor="studentName">Student Name</label>
                <input
                  id="studentName"
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="create-field">
                <label htmlFor="studentMobile">Mobile Number</label>
                <input
                  id="studentMobile"
                  type="tel"
                  className="form-control"
                  placeholder="Enter mobile number"
                  required
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="create-field create-field-full">
                <label htmlFor="studentEmail">Email Address</label>
                <input
                  id="studentEmail"
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="create-form-footer">
              <button type="submit" className="btn btn-primary student-add-btn">
                Update Student
              </button>
            </div>
          </form>
          )}
        </section>
      </section>
    </main>
  );
}

export default EditStudent;
