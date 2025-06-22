import {React, useState, useEffect} from 'react'
import '../stylesheets/JobEntry.css'

const JobEntry = ({addJob, editJobPart2, jobs, editAdd, jobName, setJobName, jobType, jobTypeStylised, jobStatus, setJobStatus, highlightSelectedButton, greyedOut, resetter, selectedButtons}) => {
  const [fieldsFilled, setFieldsFilled] = useState("disabled");

  // Calls addJob with the values set
  const newJob = (e) => {
    e.preventDefault();
      if (jobs.length>0) {
          for (let i=0; i<jobs.length; i++) {
              // If a job with that name already exists, don't add it
              if (jobs[i].Name === jobName) {
                  alert("A job with that name already exists! Please alter the new job's name.");
                  return;
              };    
          }
          jobType.sort();
          const newJobEntry = {jobName, jobType, jobTypeStylised, jobStatus};
          addJob(newJobEntry);
          // Resets everything ready for next job
          resetter();
          return;
      }
      // Just so it runs the first time when the object is empty
      jobType.sort();
      const newJobEntry = {jobName, jobType, jobTypeStylised, jobStatus};
      addJob(newJobEntry);
      resetter();
      return;
  };

  // Disables the add job button unless all fields have info
  useEffect(() => {
    if (jobName.trim() === "" || jobType.length===0) {
      setFieldsFilled("disabled");
      return
    }
    setFieldsFilled("");
    }, [jobName, jobType]);

  return (
    <div id="jobEntrySection">
      {/*If adding a new job run one function, if editing run another*/}
      <form onSubmit={greyedOut ? (e) => editJobPart2(e) : (e) => newJob(e)}>
        <label htmlFor="jobNameInput">Enter job name: </label><br />
        <input type="text" name="jobNameInput" id="jobNameInput" placeholder="What is your job called?" value={jobName} onChange={(e)=>setJobName(e.target.value)}></input>
        <div id="jobTypes">
            <p>What type of job is it?</p>
            <div id="jobTypesInner">
                <div id="jobTypeButtons">
                    <button value="Read Emails" type="button" className={`jobTypesButton ${selectedButtons["Read Emails"]}`} onClick={(e) => highlightSelectedButton(e.target)}>Read Emails</button>
                    <button value="Send Emails" type="button" className={`jobTypesButton ${selectedButtons["Send Emails"]}`} onClick={(e) => highlightSelectedButton(e.target)}>Send Emails</button>
                    <button value="Web Parsing" type="button" className={`jobTypesButton ${selectedButtons["Web Parsing"]}`} onClick={(e) => highlightSelectedButton(e.target)}>Web Parsing</button>
                </div>
                <div> 
                <select value={jobStatus} id="jobProgressSelection" onChange={(e) => setJobStatus(e.target.value)}>
                    <option>Idling</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
                <button id="addJobButton" disabled={fieldsFilled}>{editAdd}</button>
            </div>
            </div>           
        </div>
      </form>
    </div>
  )
}

export default JobEntry
