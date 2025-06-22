import {React, useState, useEffect} from 'react'
import JobEntry from './JobEntry'
import JobsList from './JobsList'
import '../stylesheets/JobsBody.css'

const JobsBody = () => {
  // References the locally stored jobs
  const jobsSaved = localStorage.getItem("jobs");
  const preRefreshJobs = jobsSaved ? JSON.parse(jobsSaved) : [];
  const [jobs, setJobs] = useState(preRefreshJobs);
  // const [jobs, setJobs] = useState([{Name: "Example name", Type: "Send Emails", TypeStylised: "Send Emails", Status: "In Progress"}]);
  const [editAdd, setEditAdd] = useState("Add Job");
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState([]);
  const [jobTypeStylised, setJobTypeStylised] = useState("");
  const [jobStatus, setJobStatus] = useState("Idling");
  const [highlightedButtons, setHighlightedButtons] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState({"Read Emails": "", "Send Emails": "", "Web Parsing": ""});
  const [greyedOut, setGreyedOut] = useState(false);
  const [prevJob, setPrevJob] = useState([{}]);
  const [nukeRelief, setNukeRelief] = useState("");
  const [cancelState, setCancelState] = useState("");
  const [jobEditState, setJobEditState] = useState("");
  const [jobsListStatus, setJobsListStatus] = useState("");

  // Stores jobs in localStorage every time it's altered
  useEffect(() => localStorage.setItem("jobs", JSON.stringify(jobs)), [jobs]);

  // Updates jobs to include inputted data
  const addJob = (newJob) => {
    const updatedJobs = [...jobs, {createdAt: Date.now(), Name: newJob.jobName, Type: newJob.jobType, TypeStylised: newJob.jobTypeStylised, Status: newJob.jobStatus}]
    setJobs(updatedJobs);
  }
  // Updates job to remove selected job
  const deleteJob = (e) => {
    // Manually put a non-breaking space in so be careful not to delete
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) {
      return;
    }
    const jobName = e.target.closest("div").previousSibling.textContent.split(" (")[0].split(" ")[1];
    const updatedJobs = jobs.filter(job => job.Name!==jobName);
    setJobs(updatedJobs);
  };

  // Allows editing of a job
  const editJobPart1 = (e) => {
    // Manually put a non-breaking space in so be careful not to delete
    const jobName = e.target.closest("div").previousSibling.textContent.split(" (")[0].split(" ")[1];
    const jobEntry = e.target.closest("li");
    setJobEditState("jobEdit");
    jobEntry.id = {jobEditState};
    setNukeRelief("disabled");
    const editingJob = jobs.filter(job => job.Name === jobName)[0];
    setPrevJob(editingJob);
    setEditAdd("Update Job");
    // Applies disabled css
    setJobsListStatus("disabled");
    setGreyedOut("disabled");   
    // Sets all the input fields to be filled in from the job the user was editing
    setJobName(editingJob.Name);
    setJobStatus(editingJob.Status);
    // This gets the relevant buttons to select
    const buttonsToShow = selectedButtons;
    for (let i = 0; i < editingJob.Type.length; i++) {
      buttonsToShow[editingJob.Type[i]] = "selectedJobType";
    }
    setSelectedButtons(buttonsToShow);
    setHighlightedButtons(editingJob.Type);
    setJobType(editingJob.Type);
    setJobTypeStylised(editingJob.Type.join(", "));
    // Shows the cancel button
    setCancelState("editMode");
  }
  // Applies the changes for the edited job
  const editJobPart2 = (e) => {
    e.preventDefault();
    if (jobs.length>0) {
        for (let i=0; i<jobs.length; i++) {
            // If a job with that name already exists, don't add it. Allows it to be its own name
            if (jobs[i].Name === jobName && jobs[i].Name !== prevJob.Name) {
                alert("A job with that name already exists! Please alter the edited job's name.");
                return;
            };    
        }
        const updatedJobs = jobs.map(job => job.Name !== prevJob.Name ? job : {createdAt: prevJob.createdAt, Name: jobName, Type: jobType, TypeStylised: jobTypeStylised, Status: jobStatus});
        setJobs(updatedJobs);
        setEditAdd("Add Job");
        resetter();
    }   
  }

  // Highlights the selected buttons
  const highlightSelectedButton = (selectedButton) => {    
    let newHighlighted = "";
    // If button is already selected, remove it
    if (highlightedButtons.some(selected => selected===selectedButton.value)) {
      newHighlighted = highlightedButtons.filter(entry => entry !== selectedButton.value);
      newHighlighted.sort();
      setHighlightedButtons(newHighlighted);
      setJobType(newHighlighted);      
      const buttonsToShow = selectedButtons;
      buttonsToShow[selectedButton.value] = "";
      setSelectedButtons(buttonsToShow);      
    }
    else {
      newHighlighted = [...highlightedButtons, selectedButton.value];
      newHighlighted.sort();
      setHighlightedButtons(newHighlighted);
      setJobType(newHighlighted);
      const buttonsToShow = selectedButtons;
      buttonsToShow[selectedButton.value] = "selectedJobType";
      setSelectedButtons(buttonsToShow);      
    }    
    // Makes a tidy string of the job types for displaying  
    const tidiedTypes = newHighlighted.join(", ");
    setJobTypeStylised(tidiedTypes);
  }

  // Resets jobs to NOTHING
  const nuke = () => {
    setJobs([]);
    resetter();
    localStorage.removeItem('jobs');
  }
  
  // Resetter function
  const resetter = () => {
    setJobName("");
    setJobType([]);
    setJobStatus("Idling");    
    setSelectedButtons([{"Read Emails": "", "Send Emails": "", "Web Parsing": ""}]); 
    setHighlightedButtons([]);
    setGreyedOut("");    
    setJobsListStatus("");
    setNukeRelief(""); 
    setJobEditState("");
    setCancelState("");
  }

  return (
    <section className="jobsBody">
      <JobEntry addJob={addJob} editJobPart2={editJobPart2} editAdd={editAdd} jobs={jobs} jobName={jobName} setJobName={setJobName} jobType={jobType} jobTypeStylised={jobTypeStylised} jobStatus={jobStatus} setJobStatus={setJobStatus} highlightSelectedButton={highlightSelectedButton} greyedOut={greyedOut} resetter={resetter} selectedButtons={selectedButtons}/>
      <JobsList deleteJob={deleteJob} editJobPart1={editJobPart1} jobs={jobs} greyedOut={greyedOut} resetter={resetter} nuke={nuke} nukeRelief={nukeRelief} cancelState={cancelState} jobsListStatus={jobsListStatus}/>
    </section>
  )
}

export default JobsBody

// Figure out why it's not deselecting buttons