import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Fake API
  const fetchJobs = () =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve([
          { id: 1, company: "Google", role: "SDE Intern", status: "Applied" },
          { id: 2, company: "Amazon", role: "Backend Intern", status: "OA" },
          { id: 3, company: "Microsoft", role: "Software Engineer", status: "Interview" },
        ]);
      }, 1000)
    );

  useEffect(() => {
    fetchJobs().then((data) => {
      // Mark all initial jobs as "new" for animation
      const jobsWithNewFlag = data.map(job => ({ ...job, isNew: true }));
      setJobs(jobsWithNewFlag);
      setLoading(false);

      // Remove "new" flag after animation
      setTimeout(() => {
        setJobs(prev => prev.map(job => ({ ...job, isNew: false })));
      }, 500);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addJob = (company, role, status) => {
    const newJob = { id: Date.now(), company, role, status, isNew: true };
    setJobs([...jobs, newJob]);
    setTimeout(() => {
      setJobs(prev => prev.map(job => job.id === newJob.id ? { ...job, isNew: false } : job));
    }, 300);
  };

  const removeJob = (id) => {
    setJobs(prevJobs => prevJobs.map(job => job.id === id ? { ...job, removing: true } : job));
    setTimeout(() => {
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    }, 300);
  };

  const updateJobStatus = (id, status) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status } : job));
  };

  const filteredJobs = jobs
    .filter(job => filter === "ALL" || job.status === filter)
    .filter(job => job.company.toLowerCase().includes(search.toLowerCase()));

  const counts = {
    Applied: jobs.filter(j => j.status === "Applied").length,
    OA: jobs.filter(j => j.status === "OA").length,
    Interview: jobs.filter(j => j.status === "Interview").length,
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className="header">
        <h1>Job Application Tracker</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <AddJobForm addJob={addJob} />

      <div className="filters">
        <button onClick={() => setFilter("ALL")}>All</button>
        <button onClick={() => setFilter("Applied")}>Applied</button>
        <button onClick={() => setFilter("OA")}>OA</button>
        <button onClick={() => setFilter("Interview")}>Interview</button>
        <input
          type="text"
          placeholder="Search by company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="counts">
        <span>Applied: {counts.Applied}</span> |{" "}
        <span>OA: {counts.OA}</span> |{" "}
        <span>Interview: {counts.Interview}</span>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        filteredJobs.map((job, index) => (
          <JobCard
            key={job.id}
            {...job}
            removeJob={removeJob}
            updateJobStatus={updateJobStatus}
            delay={index * 0.2} // staggered animation for initial cards
          />
        ))
      )}
    </div>
  );
}

export default App;

// -----------------
// AddJobForm Component
function AddJobForm({ addJob }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !role) return;
    addJob(company, role, status);
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <form className="add-job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Applied">Applied</option>
        <option value="OA">OA</option>
        <option value="Interview">Interview</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
}
