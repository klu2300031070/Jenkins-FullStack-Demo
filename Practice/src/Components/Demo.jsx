import { useState } from "react";
import axios from "axios";
import config from "./config";

export default function Demo() {
  const [faculty, setfaculty] = useState({ id: "", name: "", dept: "", age: "", mobileno: "" });
  const [facultydata, setfacultydata] = useState(null);
  const [id, setid] = useState("");
  const [allfaculty, setallfaculty] = useState([]); // for storing all faculty

  // Add faculty
   const baseUrl = `${config.url}`;
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/add`, faculty);
      alert("Faculty Added");
      setfaculty({ id: "", name: "", dept: "", age: "", mobileno: "" });
    } catch (err) {
      console.log("error", err);
    }
  };

  // Handle change for form inputs
  const hc = (e) => {
    setfaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  // View all faculty
  const handleViewAll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/viewall`);
      setallfaculty(res.data);
    } catch (err) {
      console.log("Error fetching all faculty", err);
    }
  };

  // Delete faculty
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      alert(`Faculty with id ${id} deleted`);
      // Refresh the table
      handleViewAll();
    } catch (err) {
      console.log("Error deleting faculty", err);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">CI/CD</h1>
      <h2 className="title">Faculty Management</h2>

      {/* Add Faculty Form */}
      <form className="form-container" onSubmit={handleAdd}>
        <h3 className="form-title">Add Faculty</h3>
        <input
          type="number"
          placeholder="Enter Id"
          name="id"
          value={faculty.id}
          onChange={(e) => setfaculty({ ...faculty, id: Number(e.target.value) })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={faculty.name}
          onChange={hc}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Department"
          name="dept"
          value={faculty.dept}
          onChange={hc}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Enter Age"
          name="age"
          value={faculty.age}
          onChange={hc}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Mobile Number"
          name="mobileno"
          value={faculty.mobileno}
          onChange={hc}
          className="input-field"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      {/* View Faculty Form */}
      <form
        className="form-container"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.get(
              `${baseUrl}/view?s=${id}`
            );
            setfacultydata(res.data);

            if (!res.data) {
              alert("Not Found");
            } else {
              alert("Found");
            }

            setid("");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <h3 className="form-title">View Faculty</h3>
        <input
          type="number"
          value={id}
          onChange={(e) => setid(e.target.value)}
          className="input-field"
          placeholder="Enter Id"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {/* Display Single Faculty Data */}
      {facultydata && (
        <div className="faculty-card">
          <p>
            <span>Id:</span> {facultydata.id}
          </p>
          <p>
            <span>Name:</span> {facultydata.name}
          </p>
          <p>
            <span>Department:</span> {facultydata.dept}
          </p>
          <p>
            <span>Age:</span> {facultydata.age}
          </p>
          <p>
            <span>Mobile:</span> {facultydata.mobileno}
          </p>
        </div>
      )}

      {/* View All Faculty */}
      <div className="form-container">
        <h3 className="form-title">View All Faculty</h3>
        <button onClick={handleViewAll} className="btn">
          Load All Faculty
        </button>
      </div>

      {/* Display All Faculty in Table */}
      {allfaculty.length > 0 && (
        <table border="1" className="faculty-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Dept</th>
              <th>Age</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allfaculty.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.name}</td>
                <td>{f.dept}</td>
                <td>{f.age}</td>
                <td>{f.mobileno}</td>
                <td>
                  <button
                    className="btn"
                    style={{ background: "red" }}
                    onClick={() => handleDelete(f.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
