import "./JobCard.css";

function JobCard({ id, company, role, status, removeJob, updateJobStatus, isNew, removing, delay }) {
  let statusClass = "";
  if (status === "Applied") statusClass = "status applied";
  else if (status === "OA") statusClass = "status oa";
  else if (status === "Interview") statusClass = "status interview";

  return (
    <div
      className={`job-card ${isNew ? "new" : ""} ${removing ? "removing" : ""}`}
      style={{ animationDelay: delay ? `${delay}s` : "0s" }}
    >
      <h3>{company}</h3>
      <p>Role: {role}</p>
      <p className={statusClass}>Status: {status}</p>
      <div className="job-actions">
        <button onClick={() => removeJob(id)}>Remove</button>
        {status !== "Applied" && <button onClick={() => updateJobStatus(id, "Applied")}>Applied</button>}
        {status !== "OA" && <button onClick={() => updateJobStatus(id, "OA")}>OA</button>}
        {status !== "Interview" && <button onClick={() => updateJobStatus(id, "Interview")}>Interview</button>}
      </div>
    </div>
  );
}

export default JobCard;
