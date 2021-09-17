// const { default: MatchResume } = require("components/MatchResume")
import './admingames.scss'
import MatchResume from "components/MatchResume"
import {Tabs, Tab, Form, Row, Col} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {AUTH_TOKEN, API_URL} from 'Constants/API'
import { Link } from 'react-router-dom';
// import MomentUtils from '@date-io/moment';
// import DatePicker from 'react-datepicker';
import {TimePicker, DatePicker} from '@material-ui/pickers'
import Toast from 'components/Toast/Toast'
import moment from 'moment';
// import TimePicker from 'rc-time-picker';
import ActionBtn from 'components/ActionBtn';
import PendingGame from 'components/PendingGame/PendingGame';
import ModalMatchAction from 'components/ModalMatchAction/ModalMatchAction';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { notifySuccess, notifyWarning } from 'Functions/toastFunc';
import axios from 'axios';

const DateTimePickersTheme = createTheme({
  palette:{
    primary: {
      main:'#28804B',
    },
  }
})

const AdminGames = (props) => {
  const {field, setToastParams, profileUpdated, setProfileUpdated} = props
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle]= useState("")
  const [action, setAction] = useState("")
  const [textBtn, setTextBtn] = useState("")
  const [actionBtn, setActionBtn] = useState(()=>()=>{})
  const [updateDate, setUpdateDate] = useState(moment().add(1,'days'))
  const [updateTime, setUpdateTime] = useState(moment())

  
  const updateMatch = async (id,organizer,accepted) => {
    try{
      const response = await fetch(`${API_URL}match_update/${id}/`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          organizer,
          accepted,

        })
        
      })
      return response
    }catch (error){
      console.log(error)
    }
  }

  const deleteMatch = async (id) => {
    try{
      const response = await fetch(`${API_URL}match_update/${id}/`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${AUTH_TOKEN}`,
        }
      })
      return response
    }catch(error){
      console.log(error)
    }
  }

  const handleAccept = async (id,organizer) =>{
    let accepted = true
    const response = await updateMatch(id,organizer,accepted)
    setModalShow(false)
    setProfileUpdated(!profileUpdated)
    notifySuccess("Partido Aceptado",1000)
    
    
  }
  const handleDeny = async (id) =>{
    let accepted=false
    let organizer=""
    const response = await updateMatch(id,organizer,accepted)
    setModalShow(false)
    setProfileUpdated(!profileUpdated)
    notifySuccess("Partido Negado",1000)
    
  }
  const handleDelete = async (id) =>{
    const response = await deleteMatch(id)
    setModalShow(false)
    setProfileUpdated(!profileUpdated)
    notifySuccess("Partido Eliminado",1000)
    
  }
  const handleSelectedDate = (date) => {
    setUpdateDate(date)
  }
  const handleSelectedTime = (time_val) => {
    setUpdateTime(time_val)
    // const time_val && time_val.format('HH:mm'))
  }

  useEffect(()=>{
    
  },[field.managers.field.pending_matches])

  const createNewGame = (e) => {
    e.preventDefault()
    
    const selected_date_formatted = updateDate.format('DD-MM-YYYY')
    const selected_time_formatted = updateTime.format('HH:mm') 
    if(selected_date_formatted === '' || selected_time_formatted===''){
      setToastParams({
        type: 'warning',
        msg:'¡La fecha y/o la hora son incorrectos. Intentalo nuevamente!',
        time:1000,
        activate: true
      })
      notifyWarning('La fecha y/o hora son inválidos. Intentalo nuevamente')
      return
    }
    const postNewGame = async (date, time)=>{
      const response = await postGame(date,time)
    }
    !field.managers.field.show ? setToastParams({
      type: 'warning',
      msg:'¡Tu cancha no es visible. Activala para poder crear un partido!',
      time:1500,
      activate: true
    })
    :
    postNewGame(selected_date_formatted,selected_time_formatted)
  }
  const postGame = async (date,time) =>{
    const config = {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${AUTH_TOKEN}`
      },
    };
    const url =`${API_URL}field_manager/match_creation/`;
    const date_data = {
      'field': field.managers.field.id,
      'date': date,
      'time': time
    }
    try {

      const response = await axios.post(url,date_data,config)
      const data = response.data;
      setToastParams({
        type: 'success',
        msg:'¡Tu partido se creo con éxito!',
        time:1000,
        activate: true
      })
      setProfileUpdated(!profileUpdated)
      
    } catch (error) {
      console.log(error);
      if(error.response.data[0] === 'Ese horario en la cancha seleccionada ya esta ocupado, selecciona otro horario!'){
        setToastParams({
          type: 'warning',
          msg: error.response.data[0],
          time:2000,
          activate: true
        })
      }
    }
  }
  return (
    <div className="admin-games-container text-center py-4 px-2 mx-auto ">
      <Tabs
        defaultActiveKey="partidosCreados"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="partidosCreados" title="Administrar partidos">
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <Form className="d-flex justify-content-center flex-wrap" onSubmit={createNewGame}>
              <Row className="justify-content-center align-items-end">
                <Col xs={8} md={6} lg={4}>
                  {/* <Form.Label className="me-2">Fecha: </Form.Label> */}
                  {/* <DatePicker disabledKeyboardNavigation className="form-control"  dateFormat="dd-MMMM-yyyy" locale="es" minDate={new Date()} selected={updateDate} onChange={(date)=> handleSelectedDate(date)}/>  */}
                  <ThemeProvider theme={DateTimePickersTheme}>
                    <DatePicker 
                    label="Fecha:"
                      value={updateDate} 
                      onChange={(date)=> handleSelectedDate(date)}
                      format="DD/MM/YYYY"
                      minDate={moment().add(1,'days')}
                    />
                  </ThemeProvider>
                </Col>
                <Col xs={4} md={3} lg={3}>
                  {/* <Form.Label className="me-2">Hora: </Form.Label> */}
                  {/* <TimePicker placeholder="--:--" disabledHours={() => [0, 1, 2, 3, 4, 5]} showSecond={false} minuteStep={30} hideDisabledOptions inputReadOnly value={updateTime} onChange={(updateTime) => handleSelectedTime(updateTime)}/> */}
                  <ThemeProvider theme={DateTimePickersTheme}>
                    <TimePicker 
                      label="Hora:"
                      value={updateTime} 
                      onChange={(updateTime) => handleSelectedTime(updateTime)}
                    />

                  </ThemeProvider>
                </Col>
                <Col xs={12} md={12} lg={4}>
                  <ActionBtn 
                    action="Añadir partido" 
                    btn_type="submit" 
                    btn_disable={false} 
                    aria-controls="collapse-loader"
                    
                  />
                </Col>
              </Row>
            </Form>
          </div>
            
          <hr />
          
          <div className="matches-list-container text-center">
            { field.managers.field.pending_matches.length > 0 ? 
              field.managers.field.pending_matches.map((game,index)=>(
                  <PendingGame
                    key={index.toString()}
                    date={game.date}
                    time={game.time}
                    organizer={game.organizer}
                    accept={()=>{
                      setModalShow(true)
                      setTitle("Aceptar Partido")
                      setAction(`¿Aceptar el partido?`)
                      setTextBtn("Aceptar")
                      setActionBtn(()=>()=>handleAccept(game.id,game.organizer.id))
                      }}
                    deny={
                      ()=>{
                      setModalShow(true)
                      setTitle("Denegar Partido")
                      setAction(`¿Rechazar el partido?`)
                      setTextBtn("Rechazar")
                      setActionBtn(()=>()=>(handleDeny(game.id)))}}
                    elimn={()=>{
                      setModalShow(true)
                      setTitle("Eliminar Partido")
                      setAction(`¿Eliminar el partido?`)
                      setTextBtn("Eliminar")
                      setActionBtn(()=>()=>(handleDelete(game.id)))
                      }}
                    
                    
                  />
                ))
              :
              <>
              <p className="text-center fw-bold">Aún no has creado ningún partido</p>
              </>
            }
          </div>
        </Tab>
        <Tab eventKey="historialPartidos" title="Historial de Partidos">
        <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div className="d-flex flex-row justify-content-around align-items-center p-3 ">
            <h5 className="fw-bold">Historial de Partidos:</h5>
              <h4 className="mx-3">{field.managers.field.total_match_history}</h4>
            </div>
          </div> 
          <hr />
          <div className="history-match text-center">
            { field.managers.field.match_history.length > 0 ?
              field.managers.field.match_history.map((match, index) => (
                <Link key={index.toString()} id={match.id} to={`/partidos/${match.id}`} className="game-link">
                  <MatchResume  
                    date={match.date} 
                    field_name={match.field.name} 
                    match_type={match.field.football_type} 
                    category={match.category} 
                    
                  />
                </Link>
              ))
              :
              (<p className="text-center fw-bold">Aún no generas historial, da de alta partidos.</p>)
            }
           

          </div>
        </Tab>
      </Tabs>
      <Toast/>
      <ModalMatchAction show={modalShow} onHide={()=> setModalShow(false)} title={title} action={action} actionBtn={actionBtn} textBtn={textBtn}/>
    </div>
    
  )
}
export default AdminGames
