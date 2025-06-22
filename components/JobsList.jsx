import React from 'react'
import JobsListBlocks from './JobsListBlocks'
import '../stylesheets/JobsList.css'
import idlingImg from '../Images/queued.jpg'
import inProgImg from '../Images/inProgress.jpg'
import completedImg from '../Images/completed.jpg'

const JobsList = ({jobs, deleteJob, editJobPart1, greyedOut, resetter, nuke, nukeRelief, cancelState, jobsListStatus}) => {
  return (
    <div id="JobsListSectionContainer">
      <div id="JobsListSection" className={jobsListStatus}>
        <JobsListBlocks jobs={jobs} sectionName="Idling" imageSource={idlingImg} imageAlt="Queue icon" deleteJob={deleteJob} editJobPart1={editJobPart1} greyedOut={greyedOut}/>
        <JobsListBlocks jobs={jobs} sectionName="In Progress" imageSource={inProgImg} imageAlt="Loading icon" deleteJob={deleteJob} editJobPart1={editJobPart1} greyedOut={greyedOut}/>
        <JobsListBlocks jobs={jobs} sectionName="Completed" imageSource={completedImg} imageAlt="Done icon" deleteJob={deleteJob} editJobPart1={editJobPart1} greyedOut={greyedOut}/>
      </div>      
      <button id="nuclearOption" onClick={nuke} disabled={nukeRelief}>Wipe EVERYTHING</button>
      <button id="cancelEdit" onClick={resetter} className={cancelState}>Cancel edit</button>
    </div>
  )
}

export default JobsList