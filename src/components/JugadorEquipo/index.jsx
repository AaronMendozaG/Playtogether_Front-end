import './jugadorequipo.scss'
import { Link } from 'react-router-dom'
import { photoAPI } from 'Constants/API'
const JugadorEquipo = ({player_data,order,organizer,positionOrg}) => {
  
  const user_noPicURL =`${photoAPI}avatar_default.png`
  const user_pic_URL=player_data.photo
  if (Object.keys(player_data).length === 0) {
    return (
      // <div className="d-flex flex-column justify-content-center align-items-center jugador mb-3">
      //   <div className="user-img" style={{backgroundImage: `url(${user_noPicURL})`}}></div>
      //   <h5 className="mt-1 mb-0">Únete</h5> 
      // </div>
      // <div className="d-flex flex-column  justify-content-around align-items-center jugador mb-3">
      //   <div className="user-img" style={{backgroundImage: `url(${user_noPicURL})`}}></div>
      //   <h5 className="mt-1 mb-0">Únete</h5> 
      // </div>
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center jugador mb-4">
        <div className={`${order} user-img`} style={{backgroundImage: `url(${user_noPicURL})`}}></div>
        <div className="d-flex flex-column mx-4">
        <h5 className="mt-1 mb-0 username">Disponible</h5> 
        <p className="position">Unete</p>
        </div>
        
      </div>
      
    )
  }else{
    
    return (
      
      // <div className="d-flex flex-column justify-content-center align-items-center jugador mb-3">
      //   <div className="user-img" style={{backgroundImage: `url(${user_pic_URL})`}}></div>
      //   <h5 className="mt-1 mb-0">{player_data.user_data.username}</h5>
      //   <p>{player_data.position}</p>
      // </div>
      
      <Link className="player-color" to={`/usuarios/${player_data.user_data.user_id}`}>
      
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center jugador mb-4">
        <div className={`${order} user-img`} style={{backgroundImage: `url(${user_pic_URL})`}}></div>
          {organizer === player_data.user_data.user_id ? <span className={`position-absolute top-0 start-100 bounce-top  badge rounded-pill badge-player${positionOrg}`}>Organizador</span> : <></>}
          <div className="d-flex flex-column mx-4 justify-content-center cont-text">
            <h5 className="mt-1 mb-0 username text-truncate">{player_data.user_data.username}</h5>
            <p className="position">{player_data.position}</p>
        </div>
      </div>
    </Link>
      
      
    )
  }
    
}

export default JugadorEquipo
