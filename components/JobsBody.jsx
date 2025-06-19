import {React, useState, useEffect} from 'react'
import JobEntry from './JobEntry'
import JobsList from './JobsList'
import '../stylesheets/JobsBody.css'

const JobsBody = () => {
  const [jobs, setJobs] = useState([{}]);
  // const [jobs, setJobs] = useState([{Name: "Example name", Type: "Send Emails", Status: "In Progress"}]);
  const [editAdd, setEditAdd] = useState("Add Job");
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobStatus, setJobStatus] = useState("Idling");
  const [highlightedButton, setHighlightedButton] = useState("");
  const [alreadySelected, setAlreadySelected] = useState("");
  const [greyedOut, setGreyedOut] = useState(false);
  const [prevJob, setPrevJob] = useState([{}]);
  const [nukeRelief, setNukeRelief] = useState("");

  useEffect(() => console.log(jobs), [jobs])

  // Updates jobs to include inputted data
  const addJob = (newJob) => {
    const updatedJobs = [...jobs, {Name: newJob.jobName, Type: newJob.jobType, Status: newJob.jobStatus}]
    setJobs(updatedJobs);
  }
  // Updates job to remove selected job
  const deleteJob = (e) => {
    // Manually put a non-breaking space in so be careful not to delete
    const jobName = e.target.closest("div").previousSibling.textContent.split(" (")[0].split(" ")[1];
    console.log(jobName);
    const updatedJobs = jobs.filter(job => job.Name!==jobName);
    setJobs(updatedJobs);
  };

  // Allows editing of a job
  const editJobPart1 = (e) => {
    // Manually put a non-breaking space in so be careful not to delete
    const jobName = e.target.closest("div").previousSibling.textContent.split(" (")[0].split(" ")[1];
    const jobEntry = e.target.closest("li");
    jobEntry.id = "jobEdit";
    setNukeRelief("disabled");
    const editingJob = jobs.filter(job => job.Name === jobName)[0];
    console.log(editingJob.Name);
    setPrevJob(editingJob.Name);
    setEditAdd("Update Job");
    // Applies disabled css
    document.getElementById("JobsListSection").className="disabled"; 
    setGreyedOut("disabled");   
    console.log(`Editing job: ${jobName}`);
    // Sets all the input fields to be filled in from the job the user was editing
    setJobName(editingJob.Name);
    // This gets the relevant button to select
    highlightSelectedButton(document.querySelector(`button[value="${editingJob.Type}"]`));
    setJobStatus(editingJob.Status);
    // Shows the cancel button
    const cancelButton = document.getElementById("cancelEdit");
    cancelButton.className = "editMode";
  }
  // Applies the changes for the edited job
  const editJobPart2 = (e) => {
    e.preventDefault();
    if (jobs.length>0) {
        for (let i=0; i<jobs.length; i++) {
            // If a job with that name already exists, don't add it. Allows it to be its own name
            if (jobs[i].Name === jobName && jobs[i].Name !== prevJob) {
                alert("A job with that name already exists! Please alter the edited job's name.");
                return;
            };    
        }
        const updatedJobs = jobs.map(job => job.Name !== prevJob ? job : {Name: jobName, Type: jobType, Status: jobStatus});
        setJobs(updatedJobs);
        resetter();
    }   
  }

  // Highlights the selected button
  const highlightSelectedButton = (selectedButton) => {
    setHighlightedButton(selectedButton);
    setJobType(selectedButton.value);
    console.log(alreadySelected);
    // Sets all three buttons to have no class
    for (let i=0; i<selectedButton.parentElement.children.length; i++) {
        selectedButton.parentElement.children[i].className="jobTypesButton";
    };
    // Adds 'selectedJobType' class to selected button. Handles deselecting button as well
    if (alreadySelected !== selectedButton) {
      selectedButton.className="jobTypesButton selectedJobType";
      setAlreadySelected(selectedButton);  
    }
    else {
      setAlreadySelected("");
      setJobType("");
    }      
  }

  // Resets jobs to NOTHING
  const nuke = () => {
    setJobs([{}]);
    resetter();
  }
  
  // Resetter function
  const resetter = () => {
    setJobName("");
    setJobType("");
    setJobStatus("Idling");
    if (highlightedButton) {
      for (let i=0; i<highlightedButton.parentElement.children.length; i++) {
          highlightedButton.parentElement.children[i].className="jobTypesButton";
      };
    }    
    setHighlightedButton("");
    setAlreadySelected("");  
    setGreyedOut("");    
    document.getElementById("JobsListSection").className="";
    setNukeRelief(""); 
    document.getElementById("nuclearOption").className=""; 
    if (document.getElementById("jobEdit")) {
      document.getElementById("jobEdit").id="";
    }
    const cancelButton = document.getElementById("cancelEdit");
    cancelButton.className="";
  }

  return (
    <section className="jobsBody">
      <JobEntry addJob={addJob} editJobPart2={editJobPart2} editAdd={editAdd} jobs={jobs} jobName={jobName} setJobName={setJobName} jobType={jobType} jobStatus={jobStatus} setJobStatus={setJobStatus} highlightSelectedButton={highlightSelectedButton} greyedOut={greyedOut} resetter={resetter}/>
      <JobsList deleteJob={deleteJob} editJobPart1={editJobPart1} jobs={jobs} greyedOut={greyedOut} resetter={resetter} nuke={nuke} nukeRelief={nukeRelief}/>
    </section>
  )
}

export default JobsBody