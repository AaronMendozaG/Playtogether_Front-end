import './equipos.scss'
import JugadorEquipo from '../JugadorEquipo'
import { useEffect, useState } from 'react'
import Btn from 'components/Buttons/CallActionBtn'
import { isAuthenticated, AUTH_STAFF } from 'Constants/API'

const Equipos = (props) => {
  const { field, team } = props.match
  const {onClick,showButton,onClickLeave,isActivate,teamsFull, inTeam, organizer,isAccepted} = props

  const [teamW, setTeamW] = useState(team[0])
  const [teamB, setTeamB] = useState(team[1])
  // const [modalShow, setModalShow] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState(0)
  useEffect(()=>{
    if (team[0].name.includes("a")){
      setTeamW(team[0])
    }else{
      setTeamW(team[1])
    }

    if (team[1].name.includes("b")){
      setTeamB(team[1])
    }else{
      setTeamB(team[0])
    }
    setAvailablePlaces(field.football_type.max_players - team[0].players.length - team[1].players.length)
  },[props.match])

  const playersByTeam = field.football_type.max_players/2

  const setTeamPlayers = (playersList,order,positionOrg) =>{
    const players=[]
    if(playersList.length > 0 && playersList.length <= playersByTeam ){
      playersList.map((team_player)=>{
        players.push(
          <div className="">
            <JugadorEquipo player_data={team_player} order={order} organizer={organizer} positionOrg={positionOrg}/>
          </div>
        )
        return players
      })
      
    }
    for (let i = playersList.length; i < playersByTeam; i++) {
      players.push(
        <div className="">
          <JugadorEquipo player_data={{}} order={order} organizer={organizer} positionOrg={positionOrg}/>
        </div>
      )
      
    }
    return players
    
  }
  return (
    <div className="match-container px-1 px-lg-1 pb-2 pt-2">
      <h5 className="fs-3 fw-bolder my-4">
      {`${availablePlaces === 0 ? 'Partido lleno': (`${availablePlaces} ${availablePlaces !== 1 ? 'lugares disponibles':'lugar disponible'}`) }`}
      {/* {`${availablePlaces} ${availablePlaces != 1 ? 'lugares disponibles':'lugar disponible'}`} */}
      </h5>
      <div className="d-flex justify-content-around">
      <span className="team-name">Equipo blanco</span>
      <span className="versus">VS</span>
      <span className="team-name">Equipo negro</span>
      </div>
      <hr />
      {/* <div className="container">
        <div className="row">
          <div className="col-5">
            <span className="team-name">Equipo blanco</span>
            {
              setTeamPlayers(teamW.players)
            }
            </div>
          <div className="col-2">
            <span className="fs-5 mx-4"><strong>VS</strong></span>
          </div>
          <div className="col-5">
            <span className="team-name">Equipo negro</span>
            {
              setTeamPlayers(teamB.players)
            }
          </div>
        </div>
      </div> */}

      <div className="d-flex justify-content-around">
        
        <div className="d-flex flex-column justify-content-center">
        
            {
              setTeamPlayers(teamW.players,"order-lg-3","")
            }
        </div>
            
            
          
          <div className="d-flex flex-column justify-content-center">
          
            {
              setTeamPlayers(teamB.players,"","-right")
            }
          </div>
            
         
      </div>

      {/* {
        isActivate === false ? (<div className="alert alert-warning">Partido finalizado</div>) 
        : (teamsFull === true && inTeam !== "" ? (!isAuthenticated ? (<Btn className="mb-3" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) 
        
        : 
          (
          showButton === false ? <Btn text="Unirse" onClick={onClick}/> : <Btn text="Dejar" onClick={onClickLeave}/>
          )) 
        :
        (
          teamsFull === true && !inTeam !== ""  ? <div className="alert alert-success" >Partido lleno</div> : (<Btn className="mb-3" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) 
        )
        
         )
        
      } */}

      {
        isAccepted === false ? <div className="alert alert-warning flex-fill" style={{textAlign: "center"}}>Partido en espera de ser aceptado</div>
        :
        (isActivate === false ? (<div className="alert alert-secondary">Partido finalizado</div>) 
        : 
        (teamsFull === true && inTeam !== "" ? ( !isAuthenticated ? (<Btn className="mb-3 d-lg-none" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) : (showButton === false ? <Btn className={`${ AUTH_STAFF === true ? 'd-none' : 'd-lg-none' } `} text="Unirse" onClick={onClick}/> : <Btn className="d-lg-none" text="Dejar" onClick={onClickLeave}/>)) 
        :
        (teamsFull === true && !inTeam !== ""  ? <div className="alert alert-success" >Partido lleno</div> : ( !isAuthenticated ? (<Btn className="mb-3 d-lg-none" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) : (showButton === false ? <Btn className={`${AUTH_STAFF === true ? 'd-none' : 'd-lg-none' } `} text="Unirse" onClick={onClick}/> : <Btn className="d-lg-none" text="Dejar" onClick={onClickLeave}/>)) )
        ))
      } 

      
    </div>
  )
}

export default Equipos
