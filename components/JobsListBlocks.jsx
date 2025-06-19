import React from 'react'
import '../stylesheets/JobsListBlocks.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

const JobsListBlocks = ({jobs, sectionName, imageSource, imageAlt, deleteJob, editJobPart1, greyedOut}) => {
  const isEmpty = jobs.filter(job => job.Status === sectionName);

  return (
    <div className={`jobsBlock ${sectionName.replace(" ", "")}`}>
      <div className="jobsBlockTitle">
        <h2>{sectionName}</h2>
        <img src={imageSource} alt={imageAlt}></img>
      </div>
      <div className="jobsBlockList">
        {isEmpty.length > 0 ? (
          <ul>
            {isEmpty.map(job => (
              <li className="listElement" key={job.Name}>
                <div><span>•&nbsp;{job.Name}</span> ({job.Type})</div>
                <div className="faIcons">
                  {/*If disabled, do not allow editing / deleting*/}
                  <FontAwesomeIcon icon={faPencil} onClick={(e) => greyedOut ? "" : editJobPart1(e)}/>
                  <FontAwesomeIcon icon={faTrashCan} onClick={(e) => greyedOut ? "" : deleteJob(e)} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs of this status!</p>
        )}
      </div>
    </div>
  )
}

export default JobsListBlocks