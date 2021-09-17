import {React, useState,useEffect} from 'react'
import {Col, Form,Modal, Row} from 'react-bootstrap';

//API
import {API_URL,ICONS_URL,AUTH_TOKEN,AUTH_ID, imgField} from 'Constants/API'
import MatchResume from 'components/MatchResume'
//elementos del FORM
import Divider from '@material-ui/core/Divider';
import DatePicker,{registerLocale} from "react-datepicker";
import TimePicker from 'rc-time-picker';
import moment from 'moment';
//NOTIFICACIONES
import Toast from 'components/Toast/Toast'
import {notifyWarning,notifySuccess} from 'Functions/toastFunc'
import 'react-toastify/dist/ReactToastify.css'
import Btn from 'components/Buttons/CallActionBtn'
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import './ModalPartido.scss'
import 'rc-time-picker/assets/index.css';
registerLocale("es", es)


const ModalPartido = (props) => {
  //CONSTANTES
  const {id,show} = props
  const [field,setField] = useState({
    "id": 2,
    "name": "Planeta gol",
    "rent_cost": 1000,
    "address": "  ",
    "football_type": {
        "id": 1,
        "name": "Fut5",
        "duration": 40,
        "max_players": 16,
        "min_players": 10
    },
    "services": [
        "Bebederos",
        "Estacionamiento",
        "Arbitraje"
    ],
    "matches": [
        {
            "id": 1,
            "field": {
                "name": "Planeta gol",
                "football_type": "Fut5"
            },
            "date": "2021-12-26",
            "time": "08:00:00",
            "category": "mixto",
            "places_available": 16,
            "active": true,
            "organizer": null,
            "accepted": true
        }
    ]
})
  const [services, setServices] = useState([])
  const [idMatch, setId] = useState("")
  const [matches, setMatches] = useState([])
  const [category,setCategory] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const organizeMatch = async (id,organizer,category) => {
    try{
      const response = await fetch(`${API_URL}match_update/${id}/`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
          'Authorization': `Token ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          organizer,
          category
        })
      })
      return response
    }catch(error){
      console.log(error)
    }
  }
  
  const handleOrganize= async (e) =>{
    e.preventDefault()

    if(idMatch === "" || category === ""){
      notifyWarning("Selecciona el partido y la categoria")
      return
    }

    const response = await organizeMatch(idMatch,AUTH_ID,category)
  //   console.log(idMatch)
  // console.log(category)
  notifySuccess("Partido organizado con exito",1000)
  setTimeout(function(){window.location.href=`/partidos/${idMatch}`} , 1000); 


  }
  const getFieldDetail = async () => {
    try {
      const response = await fetch(`${API_URL}fields/${id}/`);
      const field = await response.json();
      
      setField(field)
      setServices(field.services)
      setMatches(field.matches)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if (show){
      getFieldDetail()
      setCategory("")
      setId("")
      setDate("")
      setTime("")
      
    }
  },[show])

  let formatted_time=""
  if(time !== '' && time !== undefined){
    const time_array = time.split(':')
    time_array.pop()
    formatted_time = time_array.join(':')
  }
  let [year,month,day] = date.split("-")
 
  return (
    <div>
            <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-0" closeButton />
      <Modal.Body>
      <Modal.Title id="contained-modal-title-vcenter" className="text-center  fw-bold mb-4">
        Selecciona alguno de los partidos disponibles
      </Modal.Title>
      <div>
        <Row>
          <Col lg="5" className="col-img p-0 p-md-3 ">
          <div className="card-modal">
            <div className="mt-2 img-modal">
              <img src={`${imgField}_${id}/img`} alt="..."/>
            </div>
            <div className="p-3">
              <h1 className="text-center fs-5 mt-2 mb-4 fw-bold">{field.name}</h1>
              <div className="d-flex justify-content-around flex-wrap mt-5">
                {services.map(item=>(
                <div className="d-flex flex-column flex-wrap justify-content-center align-items-center icon-container">
                  <img className="match-icon mb-1" src={`${ICONS_URL}${item.toLowerCase()}.svg`} alt="arbitraje" />
                  <p className="p-services mx-1">{item}</p>
                </div>
              ))}
              </div>
              <div className="d-flex justify-content-between justify-content-md-around align-items-center mt-3 mb-3">
                <h2 className="create-type fw-bold">{field.football_type.name}</h2> 
                <div className= "d-flex flex-row justify-content-center align-items-center price-container">
                  <h2 className="my-1 mx-1 ">{`$${field.rent_cost}`}</h2>
                  <span className="my-1 mx-2 fw-light fs-6">Precio /<br/>Cancha</span>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
                <img src={`${ICONS_URL}location.svg`} alt="..." />
                <p className="mb-0 address">{field.address}</p>
              </div>
            </div>
          </div>
          </Col>
          <Col lg="7" className="p-0 p-md-3">
        <div className="d-flex flex-column mt-5 mt-md-0 card-modal px-2 pt-2">
        <h5 className="text-center mt-1 fw-bold" style={{color:"#32A77A"}}>Partidos disponibles: {matches.length}</h5>
        <p className="text-secondary fst-italic indication">Da click para elegir el partido.</p>
        {
          date !== "" && time !== ""  ?
          <p className="text-secondary fst-italic indication">Patido seleccionado: {`Fecha: ${day}-${month}-${year}  Hora: ${formatted_time}` }</p>
          :
          <></>
        }
        
        <div className="match-list-modal mb-4">
        {
          matches.length > 0 ? 
          matches.map((match,index) => (
            <div onClick={(e)=>{
              setId(match.id) 
              setDate(match.date)
              setTime(match.time)
              }}>
                <MatchResume 
                key={index.toString()}
                index={index.toString()}
                date={match.date} 
                field_name={match.field.name} 
                match_type={match.field.football_type} 
                category={""} 
                displayC={"d-none"}
                time={match.time}
                
              />
            </div>
          ))
          :
          <div><p className="text-center">No hay partidos disponibles</p></div>
        }
        </div>
        <hr/>
        <Form.Label>Selecciona la categoria:</Form.Label>
        <Form.Select aria-label="Default select example" as="select" onChange={(e)=>(setCategory(e.target.value))}>
          <option value="" >Elegir categoria</option>
          <option value="varonil" selected={category === "varonil" ? true:false}>Varonil</option>
          <option value="femenil" selected={category === "femenil" ? true:false}>Femenil</option>
          <option value="mixto" selected={category === "mixto" ? true:false}>Mixto</option>
        </Form.Select>
        <Btn text="Organizar" className=" mb-1" onClick={handleOrganize}/>
        </div>
        
          </Col>
        </Row>
        
      </div>

     
        
      <Toast/>
      </Modal.Body>
     
    </Modal>
        </div>

        
    )
}

export default ModalPartido
