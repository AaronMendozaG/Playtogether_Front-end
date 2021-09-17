
import { ICONS_URL, photoAPI } from 'Constants/API';
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import './pending_game.scss'

const PendingGame = ({date, time, game_id, organizer,accept,deny,elimn}) => {
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
    
    <Container fluid className="px-0 mb-3">
      {organizer !== null ? (
        <Row className="pending-game-container mt-2 mb-3 gx-0">
          <Col xs={4}>
            <div className="d-flex flex-column align-items-center justify-content-center user-container">
              <h5 className="text-wrap text-center mt-2 mb-0 px-0 px-sm-2 ">Solicitando:</h5>
              <div className="d-flex flex-column justify-content-center align-items-center mb-2 jugador">
                <div className={`user-img`} style={{backgroundImage: `url(${photoAPI}user_${organizer.id}/avatar)`}}></div>
                <p className="mt-1 mb-0 username text-truncate ">{organizer.username}</p>
              </div>
            </div>
          </Col>
          <Col xs={8} className="match-details-container align-self-center">
            <div className="d-flex justify-content-center flex-wrap">
              <div className="d-flex flex-row flex-wrap justify-content-center justify-content-md-around align-items-center schedule-container">
                <div className="date d-flex flex-column flex-md-row justify-content-center align-items-center me-2 mt-1 flex-wrap">
                  <img src={`${ICONS_URL}calendar.svg`} alt="fecha-partido" className="icons-cancha date mb-1 mb-md-0 me-md-2" />
                  <div>
                    <p className="d-none d-md-block">Fecha:</p>
                    <h5 className="my-0">{`${day} ${monthNames[parseInt(month)-1]}`} {`${year}`}</h5>
                  </div>
                </div>
                <div className="time d-flex flex-column flex-md-row justify-content-center align-items-center me-2 mt-1 flex-wrap">
                  <img src={`${ICONS_URL}clock.svg`} alt="hora-partido" className="icons-cancha time mb-1 mb-md-0 me-md-2" />
                  <div>
                    <p className="d-none d-md-block">Hora:</p>
                    <h5 className="my-0">{formatted_time}</h5>
                  </div>
                </div>
              </div>
              <div className="btns-container d-flex flex-column flex-md-row align-items-center justify-content-around my-sm-1">
                <Button className="accept mb-1 mb-md-0 " size="sm" onClick={accept}>Aceptar</Button>
                <Button className="cancel mb-1 mb-md-0 " size="sm" onClick={deny}>Rechazar</Button>
                <Button className="delete mb-1 mb-md-0 " size="sm" onClick={elimn}>Eliminar</Button>
                
              </div>
            </div>
          </Col>
          <Col xs={4}></Col>
        </Row>
      ):(
        <Row className="pending-game-container gx-0">
          <Col xs={4}>
            <div className="d-flex align-items-center justify-content-center user-container nouser">
              <h5 className="text-wrap text-center p-2 mb-0 px-0 px-sm-2 fs-6">Sin reservar</h5>
            </div>
          </Col>
          <Col xs={8} className="match-details-container align-self-center">
            <div className="d-flex justify-content-center flex-wrap">
              <div className="d-flex flex-row flex-wrap justify-content-center justify-content-md-around align-items-center schedule-container">
                <div className="date d-flex flex-column flex-md-row justify-content-center align-items-center me-2 mt-1 flex-wrap">
                  <img src={`${ICONS_URL}calendar.svg`} alt="fecha-partido" className="icons-cancha date mb-1 mb-md-0 me-md-2" />
                  <div>
                    <p className="d-none d-md-block">Fecha:</p>
                    <h5 className="my-0">{`${day} ${monthNames[parseInt(month)-1]}`} {`${year}`}</h5>
                  </div>
                </div>
                <div className="time d-flex flex-column flex-md-row justify-content-center align-items-center me-2 mt-1 flex-wrap">
                  <img src={`${ICONS_URL}clock.svg`} alt="hora-partido" className="icons-cancha time mb-1 mb-md-0 me-md-2" />
                  <div>
                    <p className="d-none d-md-block">Hora:</p>
                    <h5 className="my-0">{formatted_time}</h5>
                  </div>
                </div>
              </div>
              <div className="btns-container d-flex align-items-center justify-content-around my-md-1">
                <Button className="delete" size="sm" onClick={elimn}>Eliminar</Button>
                
              </div>
            </div>
          </Col>
          
        </Row>
      )}
      
    </Container>
    // <div className="pending-game-container d-flex justify-content-start align-items-center mt-2 mb-3 mx-auto">
    
    //   {/* <div className="d-flex align-items-center justify-content-center  w-25 user-container py-1">
    //   </div> */}
          
          
    //   <div className="d-flex flex-column w-75 ms-2 pe-2 justify-content-center match-details-container position-relative">
    //     <div className="date d-flex flex-column justify-content-center align-items-center me-1 flex-wrap">
    //       <img src={`${ICONS_URL}clock.svg`} alt="tipo-partido" className="icons-cancha time mb-1" />
    //       <h5 className="my-0">{formatted_time}</h5>
    //     </div>
    //     <div className="time d-flex flex-column justify-content-center align-items-center me-1 flex-wrap">
    //       <img src={`${ICONS_URL}clock.svg`} alt="tipo-partido" className="icons-cancha time mb-1" />
    //       <h5 className="my-0">{formatted_time}</h5>
    //     </div>
      
    //   </div>
    // </div>
  )
}

export default PendingGame
