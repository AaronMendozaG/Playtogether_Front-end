import { ICONS_URL } from 'Constants/API';
import React from 'react'
import './matchresume.scss'

const MatchResume = ({date, time, field_name, match_type, category, available, displayC="d-block",accepted=true, index}) => {
  let formatted_time=""
  if(time !== '' && time !== undefined){
    const time_array = time.split(':')
    time_array.pop()
    formatted_time = time_array.join(':')
  }
  
  const monthNames = ["ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic"];
  let [year,month,day] = date.split("-")
  return (
    <div tabIndex={index} className="match-resume-cont d-flex justify-content-start align-items-center mt-2 mb-3 mx-auto">
      <div className="d-flex align-items-center justify-content-center  w-25 date-container py-1">
        <h2 className="text-wrap text-center p-2 mt-2 mb-0 px-0 px-sm-2 fs-5">{`${day} ${monthNames[parseInt(month)-1]}`} {`${year}`}</h2>
      </div>
      <div className="d-flex flex-column w-75 ms-2 pe-2 justify-content-center match-details-container position-relative">
        {available !== undefined ?
          (<span className={`badge bg-${available<=3 ? 'danger ':'secondary'} position-absolute top-0 start-0 translate-middle-x ${available<=3 ? 'blink-1':''} `}>{available} {available===1?'lugar disponible':'lugares disponibles'}</span>):(<></>)
        }
        {accepted === false ?
          (<span className={`badge bg-warning secondary position-absolute top-0 start-0 translate-middle-x  `}>Partido en aprobacion</span>):(<></>)
        }
        

        <div className="d-flex flex-row justify-content-center align-items-center mt-4 mb-1 w-100">
          <img src={`${ICONS_URL}pitch.svg`} alt="cancha" className="icons-cancha field" />
          <h5 className="ms-2 my-0 overflow-hidden field">{field_name}</h5>
        </div>
        <hr className="my-1" />
        <div className="d-flex flex-row justify-content-around align-items-center my-1 w-100">
          {(time !== '' && time !== undefined) ? (<div className="time d-flex flex-column justify-content-center align-items-center me-1 flex-wrap">
            <img src={`${ICONS_URL}clock.svg`} alt="hora" className="icons-cancha time mb-1" />
            <h5 className="my-0">{formatted_time}</h5>
          </div>) : (<></>)}
          <div className={`category d-flex ${displayC} flex-column justify-content-center align-items-center me-1 flex-wrap`}>
            <img 
              src={`${ICONS_URL}${category.toLowerCase()}.svg`} 
              alt="tipo-partido" 
              className="icons-cancha category mb-1" 
            />
            <h5 className="my-0">{category}</h5>
          </div> 
          <div className="type d-flex flex-column justify-content-center align-items-center me-1 flex-wrap">
            <img src={`${ICONS_URL}vs.svg`} alt="VS" className="icons-cancha type mb-1" />
            <h5 className="my-0">{match_type}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchResume
