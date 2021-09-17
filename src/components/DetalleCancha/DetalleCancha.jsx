import 'bootstrap/dist/css/bootstrap.min.css';
import './detallecancha.scss'
import Divider from '@material-ui/core/Divider';
import Btn from 'components/Buttons/CallActionBtn'
import {ICONS_URL, isAuthenticated, AUTH_STAFF} from 'Constants/API'




const DetalleCancha = (props) => {

  const {
    imgField,
    nameField,
    servicesField,
    typeField, 
    priceField, 
    directionField, 
    dateMatch, 
    timeMatch, 
    categoryMatch, 
    onClick,
    showButton,
    onClickLeave,
    isActivate,
    teamsFull, 
    inTeam,
    isAccepted
  } = props
  
  // const [showA, setShowA] = useState(true);
  // const toggleShowA = () => setShowA(!showA);
  // const services = ["Estacionamiento","Regadera",
  //   "Bebedero"
  // ]
  
  return (
    <div className="d-flex flex-column card-partido">
      <div className=" img-cancha-partido ">
        <img src={imgField} alt={nameField}/>
      </div>
      <div className="card-content p-2 p-md-4">
        <h5 className="text-center fs-3 fw-bold field-title mt-3">{nameField}</h5>
        <hr />
        <div className="d-flex justify-content-around flex-wrap mt-4">
          {servicesField}
        </div>
        <div className="d-flex justify-content-around justify-content-md-around align-items-center my-3">
          <h2 className="create-type fw-bold p-1 m-0">{typeField}</h2>
          <div className= "d-flex flex-row justify-content-center align-items-center price-container p-1">
              <h2 className="my-1 mx-1 ">{`$${priceField}`}</h2>
              <span className="my-1 mx-2 fw-light fs-6">Precio /<br/>Cancha</span>
          </div>
        </div>
        <Divider className="mb-4" variant="middle"/>
        <div className="d-flex justify-content-around align-items-center m-3">
          <img src={`${ICONS_URL}location.svg`} alt="address"/>
          <p className="mb-0 address">{directionField}</p>
        </div>
        <Divider className="mb-4" variant="middle"/>
        <div className="mx-3">
          <div className="date-container my-4 d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <img className="match-icon" src={`${ICONS_URL}calendar.svg`} alt="fecha"/>
              <h5 className="my-0 ms-3">Fecha:</h5>
            </div>
            <div>
              <p className="my-0">{dateMatch}</p>
            </div>
          </div>
          <div className="time-container my-4 d-flex justify-content-between  align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <img className="match-icon" src={`${ICONS_URL}clock.svg`} alt="hora"/>
              <h5 className="my-0 ms-3">Horario:</h5>
            </div>
            <div>
              <p className="my-0">{`${timeMatch} Hrs`}</p>
            </div>
          </div>
          <div className="genre-container my-4 d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <img className="match-icon" src={`${ICONS_URL}${categoryMatch.toLowerCase()}.svg`} alt="categoria"/>
              <h5 className="my-0 ms-3">Categoria:</h5>
            </div>
            <div>
              <p className="my-0 category">{categoryMatch}</p>
            </div>
          </div>
        </div>
        
        
      </div>

    <div className="d-flex justify-content-center px-3">
    {/* {
        isActivate === false ? (<div className="alert alert-warning flex-fill" style={{textAlign: "center"}}>Partido finalizado</div>) 
        : (teamsFull === true && inTeam !== "" ? (!isAuthenticated ? (<Btn className="mb-3" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) 
        : 
          (
          showButton === false ? <Btn className="mb-3"  text="Unirse" onClick={onClick}/> : <Btn className="mb-3" text="Dejar" onClick={onClickLeave}/>
          )) 
        :
        (
          teamsFull === true && !inTeam !== ""  ? <div className="alert alert-success flex-fill" style={{textAlign: "center"}}>Partido lleno</div> : (
          showButton === false ? <Btn className="mb-3"  text="Unirse" onClick={onClick}/> : <Btn className="mb-3" text="Dejar" onClick={onClickLeave}/>
          )
        )
        
         )
        
      } */}

      {
        isAccepted === false ? <div className="alert alert-warning flex-fill" style={{textAlign: "center"}}>Partido en espera de ser aceptado</div>
        :
        (isActivate === false ? (<div className="alert alert-secondary flex-fill" style={{textAlign: "center"}}>Partido finalizado</div>) 
        : 
        (teamsFull === true && inTeam !== "" ? ( !isAuthenticated ? (<Btn className="mb-3" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) : (showButton === false ? <Btn className={`${AUTH_STAFF === true ? 'd-none' : 'd-block' } mb-3`} text="Unirse" onClick={onClick}/> : <Btn className="mb-3" text="Dejar" onClick={onClickLeave}/>)) 
        :
        (teamsFull === true && !inTeam !== ""  ? <div className="alert alert-success flex-fill" style={{textAlign: "center"}}>Partido lleno</div> : ( !isAuthenticated ? (<Btn className="mb-3" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) : (showButton === false ? <Btn className={`${AUTH_STAFF === true ? 'd-none' : 'd-block' } mb-3`} text="Unirse" onClick={onClick}/> : <Btn className="mb-3" text="Dejar" onClick={onClickLeave}/>)) )
        ))
      } 
    </div>
      
      {/* {
        isActivate === false ? (<div className="alert alert-warning" style={{textAlign: "center"}}>Partido finalizado</div>) :
        (!isAuthenticated ? (<Btn className="mb-3" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) 
        : 
        (
        showButton === false ? <Btn className="mb-3" text="Unirse" onClick={onClick}/> :  <Btn className="mb-3" text="Dejar" onClick={onClickLeave}/>
      ))
      } */}



      
      {/* {
        (!isAuthenticated ? (<Btn className="mb-3" text="Unirse" onClick={()=>{window.location.href = `/login`;}}/>) 
        : 
        (
        showButton === false ? <Btn className="mb-3" text="Unirse" onClick={onClick}/> :  <Btn className="mb-3" text="Dejar" onClick={onClickLeave}/>
      ))
      } */}
      
      
    </div>
    
  )
}

export default DetalleCancha
