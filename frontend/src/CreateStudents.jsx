import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateStudents() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate form
    if (!name || !email || !phone) {
      alert("Please fill in all required fields");
      return;
    }

    axios
      .post("http://localhost:5000/create", {
        name,
        email,
        phone,
      })
      .then((response) => {
        console.log(response.data);
        // Navigate to the student list page after successful submission
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });

    // Send a POST request to your backend API
    // fetch('http://localhost:5000/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     phone,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    // Reset form fields
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <main className="student-page">
      <section className="student-shell">
        <div className="student-hero">
          <div>
            <p className="student-eyebrow">Create Student</p>
            <h1>Add a new student with a cleaner form layout</h1>
            <p className="student-subtitle">
              This screen is ready for your existing create functionality and
              now has a more polished, readable form design.
            </p>
          </div>
          <div className="student-stats-card create-side-card">
            <span className="student-stats-label">Form Status</span>
            <strong>New</strong>
            <small>UI only, no form behavior changed yet</small>
          </div>
        </div>

        <section className="student-panel create-panel">
          <div className="student-panel-header">
            <div>
              <h2>Student Details</h2>
              <p>Fill in the fields below to prepare a new student record.</p>
            </div>
            <Link to="/" className="btn btn-outline-secondary student-back-btn">
              Back to List
            </Link>
          </div>

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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* <div className="create-field create-field-full">
                <label htmlFor="studentNotes">Notes</label>
                <textarea
                  id="studentNotes"
                  className="form-control"
                  rows="4"
                  placeholder="Optional notes about the student"
                />
              </div> */}
            </div>

            <div className="create-form-footer">
              <button
                type="button"
                className="btn btn-light create-secondary-btn"
              >
                Reset
              </button>
              <button type="submit" className="btn btn-primary student-add-btn">
                Save Student
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

export default CreateStudents;
