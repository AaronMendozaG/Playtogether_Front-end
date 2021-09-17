
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin_cancha.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import {AUTH_TOKEN, API_URL, BACKGROUNDS_URL, AUTH_ID} from 'Constants/API'
import Toast from 'components/Toast/Toast';
import { notifySuccess, notifyWarning } from 'Functions/toastFunc';
import CardAdmin from 'components/CardAdmin';
import CanchaAdmin from 'components/CanchaAdmin';
import AdminGames from 'components/AdminGames/AdminGames';
import axios from 'axios';


const admin = 
  {
    "username": "",
    "first_name": "",
    "date_joined": "",
    "managers": {
      "photo":"",
      "field":{
        "name":"",
        "rent_cost":0,
        "address":{},
        "football_type":1,
        "photo":"",
        "fields_services":[],
        "show":false,
        "total_match_history":0,
        "match_history":[],
        "pending_matches":[]
      }
    }
  }

const AdministradorCancha = () => {
  const {id} = useParams();
  const [fieldAdminData, setFieldAdminData] = useState(admin);
  const [profileUpdated,setProfileUpdated] = useState(false);
  const [matchUpdate, setMatchUpdate] = useState(false)
  const [fieldActive,setFieldActive]=useState(false)
  // const [userCreatedMatch , setUserCreatedMatch] = useState({})
  // const [totalMatchCreated, setTotalMatchCreated] = useState({})
  
  const [servicesList, setServicesList]=useState([])
  const [servicesObj,setServicesObj] = useState({})
  useEffect(()=>{
    const getServicesObj = async () => {
      const dataFromServer = await getServicesData()
      setServicesObj(Object.fromEntries(dataFromServer.map((item)=>[item.id,item.service])))
      setServicesList(dataFromServer)
    } 
    getServicesObj()
    
  },[])
  //Peticion a la API para obtener los tipos de servicios
  const getServicesData = async () =>{
    try {
      const response = await axios(`${API_URL}service/`)
      const data = await response.data;
      return data
      
    } catch (error) {
      console.log(error);
    }
  }

  //Se declara el estado para almacenar tipos de futbol
  const [footballTypes,setFootballTypes] = useState([])
  useEffect(()=>{
    const getFieldTypes = async () => {
      const dataFromServer = await getFieldTypesData()
      const types_names = Object.fromEntries(dataFromServer.map(item=>[item.id,item.name])) 
      setFootballTypes(types_names)
      

    } 
    getFieldTypes()
  },[])
  //Hace la peticion a la API de los tipos de partidos
  const getFieldTypesData = async () =>{
    try {
      const response = await axios(`${API_URL}footballtypes/`)
      const data = await response.data;
      return data
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getFieldAdminData = async () => {
      const dataFromServer = await getFieldAdmin()
      setTimeout(() => {
        setFieldAdminData(dataFromServer)
        setFieldActive(dataFromServer.managers.field.show)
      }, 1000);
    }
    
    getFieldAdminData()
    
  },[profileUpdated, matchUpdate, fieldActive])
  // },[profileUpdated,id])
  const getFieldAdmin = async () => {
    try {
      const response = await fetch(`${API_URL}field_manager/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${AUTH_TOKEN}`,
        },
      });
      const data = await response.json();
      return data
      
    } catch (error) {
      console.log(error);
    }
  }

  //SE DECLARAN PARAMETROS INCIALES PARA LA ACTIVACION DEL TOAST
  const [toastParams, setToastParams] = useState({
    type:'success',
    msg:"",
    time: 0,
    activate:false
  })
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (toastParams.activate && toastParams.type === 'success') {
      notifySuccess(toastParams.msg, toastParams.time)
    }
    if (toastParams.activate && toastParams.type === 'warning') {
      notifyWarning(toastParams.msg, toastParams.time)
    }
  }, [toastParams])


  return (
    <>
      {/* <Navbar profilePic={fieldAdminData.managers.photo}/> */}
      <Navbar/>
      <Container fluid={true} className="vista-perfil-container pt-2 pb-4" style={{background:`linear-gradient(129deg, rgba(2,0,36,0.8883928571428571) 0%, rgba(61,99,19,0.5578606442577031) 100%), url(${BACKGROUNDS_URL}background_6.jpg), no-repeat,fixed, center`}}>
        <Container>
          <Row className="gy-3 justify-content-center pb-5">
            {id === AUTH_ID ?
              <>
                <h1 className="py-3 mb-2 title-page tracking-in-contract-bck-top">Administrador de cancha</h1>
                <p className="mt-4 p-create"></p>
                <Col sm={12} md={5} lg={4} className="p-0 p-md-1 p-lg-3">
                  <CardAdmin 
                    fieldAdminData={fieldAdminData}
                    setFieldAdminData={setFieldAdminData}
                    toastParams={toastParams}
                    setToastParams = {setToastParams}
                    modalShow = {modalShow}
                    setModalShow = {setModalShow}
                    profileUpdated={profileUpdated}
                    setProfileUpdated={setProfileUpdated}
                    servicesObj={servicesObj}
                    servicesList={servicesList}
                    
                  />
                  <hr/>
                  <CanchaAdmin 
                    fieldAdminData={fieldAdminData}
                    name={fieldAdminData.managers.field.name}
                    cost={fieldAdminData.managers.field.rent_cost}
                    address={fieldAdminData.managers.field.address}
                    type={footballTypes[fieldAdminData.managers.field.football_type]}
                    img={fieldAdminData.managers.field.photo}
                    services={fieldAdminData.managers.field.fields_services}
                    // show_field={fieldAdminData.managers.field.show}
                    fieldActive={fieldActive}
                    setFieldActive={setFieldActive}
                    servicesObj={servicesObj}
                    setModalShow={setModalShow}
                  />
                </Col>
                <Col sm={12} md={7} lg={8} className="p-0 p-md-1 p-lg-3">
                  <AdminGames 
                    field={fieldAdminData} 
                    matchUpdate={matchUpdate} 
                    setMatchUpdate={setMatchUpdate}
                    toastParams={toastParams}
                    setToastParams = {setToastParams}
                    profileUpdated={profileUpdated}
                    setProfileUpdated = {setProfileUpdated}
                  />
                </Col>
              </>
            :
              <>
                <Col sm={12} md={7} lg={7} className="p-0 p-md-1 p-lg-3">
                  <h1 className="d-block my-5 py-5 h-75">No tienes permiso para acceder a esta página</h1>
                </Col>
              </>

            }
          </Row>
        </Container>
      </Container>
      <Footer/>
      <Toast/>
    </> 
    
  )
}



export default AdministradorCancha
