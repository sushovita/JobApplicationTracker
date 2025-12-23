// src/fakeApi.js
export const fetchJobs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, company: "Google", role: "SDE Intern", status: "Applied" },
        { id: 2, company: "Amazon", role: "Backend Intern", status: "OA" },
        { id: 3, company: "Microsoft", role: "Software Engineer", status: "Interview" },
      ]);
    }, 1000); // simulate 1 second network delay
  });
};
