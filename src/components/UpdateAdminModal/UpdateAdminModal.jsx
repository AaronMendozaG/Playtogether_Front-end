import { Collapse, Modal } from 'react-bootstrap';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './update_admin_modal.scss'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ActionBtn from 'components/ActionBtn';
import axios from 'axios';
import { useRef } from 'react';
import {AUTH_TOKEN, API_URL, AUTH_ID} from 'Constants/API'
import Toast from 'components/Toast/Toast'
import {notifyWarning} from 'Functions/toastFunc'
import { BeatLoader } from 'react-spinners';

const UpdateAdminModal = ({fieldAdminData,setFieldAdminData, onHide, show, toastParams, setToastParams, profileUpdated, setProfileUpdated}) => {
  const inputAdminFile = useRef()
  const inputFieldFile = useRef()
  const [open, setOpen] = useState(false);
  
  const [adminData, setAdminData] = useState({...fieldAdminData})
  useEffect(()=>{
    setAdminData(fieldAdminData)
  },[show])

  const [adminUpdateData, setAdminUpdateData]= useState()
  useEffect(()=>{
    const getAdminData = async () => {
      const dataFromServer = await getUpdateData()
      setAdminUpdateData(dataFromServer)
    }
    getAdminData();
  },[])
  
  
  const getUpdateData = async () => {
    try {
      const response = await fetch(`${API_URL}field_manager/update/${AUTH_ID}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${AUTH_TOKEN}`,
        },
      });
      const data = await response.json();
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  //Se declara el estado para almacenar tipos de futbol
  const [footballTypes,setFootballTypes] = useState([])
  useEffect(()=>{
    const getFieldTypes = async () => {
      const dataFromServer = await getFieldTypesData()
      setFootballTypes(dataFromServer)
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
  //Estado para almacenar los servicios
  const [services,setServices] = useState([])
  useEffect(()=>{
    const getServicesList = async () => {
      const dataFromServer = await getServicesData()
      setServices(dataFromServer)
    } 
    getServicesList()
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
  
  
  const [adminImg, setAdminImg] = useState(adminData.managers.photo)
  useEffect(()=>{
    setAdminImg(adminData.managers.photo)
  },[adminData])

  const [fieldImg, setFieldImg] = useState(adminData.managers.field.photo)
  useEffect(()=>{
    setFieldImg(adminData.managers.field.photo)
    console.log(fieldImg)
  },[adminData])

  
  const handleAdminImageChange = (e) => {
    
    setAdminUpdateData({
      ...adminUpdateData,
      managers:{
        ...adminUpdateData.managers,
        [e.target.name]:e.target.files
      }
    })
    if(e.target.files.length !== 0){
      setAdminImg(URL.createObjectURL(e.target.files[0]))
    }
  }
  const handleFieldImageChange = (e) => {
    setAdminUpdateData({
      ...adminUpdateData,
      managers:{
        ...adminUpdateData.managers,
        field:{
          ...adminUpdateData.managers.field,
          [e.target.name]:e.target.files
        }
      }
    })
    if(e.target.files.length !== 0){
      setFieldImg(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleAdminNameInputChange = (e) => {
    setAdminUpdateData({
      ...adminUpdateData,
      [e.target.name]:e.target.value
        
    })
  }
  const handleFieldInputChange = (e) => {
    if (e.target.name === 'rent_cost' || e.target.name === 'football_type'){
      setAdminUpdateData({
        ...adminUpdateData,
        managers:{
          ...adminUpdateData.managers,
          field:{
            ...adminUpdateData.managers.field,
            [e.target.name]:parseFloat(e.target.value)
          }
        }
          
      })
    }else{
      setAdminUpdateData({
        ...adminUpdateData,
        managers:{
          ...adminUpdateData.managers,
          field:{
            ...adminUpdateData.managers.field,
            [e.target.name]:e.target.value
          }
        }
          
      })
    }
  }
  const handleFieldAddressInputChange = (e) => {
    setAdminUpdateData({
      ...adminUpdateData,
      managers:{
        ...adminUpdateData.managers,
        field:{
          ...adminUpdateData.managers.field,
          address:{
            ...adminUpdateData.managers.field.address,
            [e.target.name]: e.target.value
          }
        }
      }
        
    })
  }

  //Creamos un objeto y funcion para manejar los checkboxes de servicios
  const [services_CheckedItems, setServices_CheckedItems] = useState([])
  const setServicesCheckObject = (services_list) => {
    const services_val_list = services_list.map(service_name=>[service_name,false])
    setServices_CheckedItems(Object.fromEntries(services_val_list))
  }
  const handleServicesCheckboxItems =  (e) => {
    const checkboxValue = e.target.value
    setServices_CheckedItems({
      ...services_CheckedItems,
      [e.target.value]: !services_CheckedItems[`${checkboxValue}`]
    })
    Object.entries(services_CheckedItems)
  }
  const handlePlayerInputChange = (e) => {
    // if (e.target.name === "position") {
    //   setPlayerData({
    //     ...playerData,
    //     [e.target.name]: parseInt(e.target.value)
    //   })
    // } else{
    //   setPlayerData({
    //     ...playerData,
    //     [e.target.name]: e.target.value
    //   })
    // }
    console.log(e.target)
  }

  // FETCH PARA ACTUALIZAR LOS DATOS DEL USUARIO
  const updateUserProfile = (event) => {
    event.preventDefault();
    setOpen(true)
    const updateProfile = async (id)=>{
      
    //VALIDAR CAMPOS VACIOS
    if (adminData.username === '' || adminData.first_name === ''){
      //ALERTA
      notifyWarning("Por favor no dejes campos vacios")
      setOpen(false)
      return
    }
    if(adminData.managers.photo[0].size > 1048576){
      notifyWarning("Solo se permite el uso de imagenes menores a 1MB",2000)
      setOpen(false)
      return
    }
    
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${AUTH_TOKEN}`
        }
      };
      const url =`${API_URL}admin/update/${id}/`;
      const formdata = new FormData();

      if (adminData.username !== ''){
        formdata.append('user_data.username', adminData.username)
      }
      if (adminData.first_name !== ''){
        formdata.append('user_data.first_name', adminData.first_name)
      }
      if (typeof adminData.managers.photo[0] === "object") {
        formdata.append('player_data.photo', adminData.managers.photo[0])
      }
      
      axios
        .patch(url, formdata, config)
        .then((res) =>{
          
          onHide()
          setToastParams({
            type: 'success',
            msg:'¡Tus datos se actualizaron correctamente!',
            time:1000,
            activate: true
          })
          setProfileUpdated(true)
          setOpen(false)
          // notifySuccess("¡Tu perfil se actualizó correctamente!",2000)
          window.location.reload()
          
        })
        .catch((error) => {
          if (error.response.data[0] === "Ese nombre de usuario ya fue tomado. Intenta nuevamente!"){
            //ALERTA
            notifyWarning(error.response.data[0])
          }
        });
      
      
    }
    updateProfile(AUTH_ID)
  }
  return (
    
    <Modal
      show={show}
      onHide={onHide}
      // user_data={props.user_data}
      
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-perfil-admin"
      backdrop="static"
    >
      
      <Modal.Header className="border-0" closeButton />
      <Modal.Title id="contained-modal-title-vcenter" className="text-center">
        Edita tu perfil y da de alta tu cancha
      </Modal.Title>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
            {/* <hr/> */}
              <Form className="form-user-profile" onSubmit={updateUserProfile}>
                {/* <h5>Datos de usuario</h5> */}
                <Form.Group controlId="formFileSm" className="profile-pic mb-0 d-flex flex-column justify-content-center align-items-center">
                 <div className="avatar my-2" onClick={()=>inputAdminFile.current.click()} style={{backgroundImage: `url(${adminImg})`}}></div>
                 <input type="file" hidden={true} size="sm" ref={inputAdminFile} name="photo" className="align-self-center" onChange={handleAdminImageChange}/>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  {/* <Form.Label className="text-secondary mb-0">Correo electrónico</Form.Label> */}
                  <Form.Control  className="text-muted text-center fst-italic" size="sm" name="username" defaultValue={adminData.username} plaintext readOnly/>
                </Form.Group>
                <Form.Group className="mb-2" >
                  <Form.Label className="text-secondary mb-0 fw-bold">Nombre del administrador:</Form.Label>
                  <Form.Control className="text-success" size="sm" type="text" name="manager_name" placeholder="Nombre" defaultValue={adminData.first_name} onChange={handleAdminNameInputChange}/>
                </Form.Group>
                <hr/>
                <div className="field-data-container p-3">
                  <h5>Datos de la cancha</h5>
                  <div className="d-flex flex-wrap align-items-center justify-content-center">
                    <Form.Group controlId="formFileSm" className="field-pic-group mb-3 d-flex flex-column justify-content-center align-items-center w-100">
                      <div className="field-img my-2" onClick={()=>inputFieldFile.current.click()} style={{backgroundImage: `url(${fieldImg})`}}></div>
                      <input type="file" hidden={true} size="sm" ref={inputFieldFile} name="photo" className="align-self-center" onChange={handleFieldImageChange}/>
                    </Form.Group>
                    <div className="d-flex flex-wrap flex-row justify-content-between align-items-center ms-md- w-100">
                      <Form.Group className="mb-2 w-100" >
                        <Form.Label className="text-secondary mb-0 fw-bold">Nombre de la cancha:</Form.Label>
                        <Form.Control className="text-success" size="sm" type="text" name="name" placeholder="Nmbre de la cancha" defaultValue={adminData.managers.field.name} onChange={handleFieldInputChange}/>
                      </Form.Group>
                      <Form.Group className="mb-2 w-100" >
                        <Form.Label className="text-secondary mb-0 fw-bold">Calle:</Form.Label>
                        <Form.Control className="text-success" size="sm" type="text" name="street" placeholder="Calle" defaultValue={adminData.managers.field.street} onChange={handleFieldAddressInputChange}/>
                      </Form.Group>
                      <Form.Group className="mb-2 w-100" >
                        <Form.Label className="text-secondary mb-0 fw-bold">Número:</Form.Label>
                        <Form.Control className="text-success" size="sm" type="text" name="street_number" placeholder="Número" defaultValue={adminData.managers.field.street_number} onChange={handleFieldAddressInputChange}/>
                      </Form.Group>
                      <Form.Group className="mb-2 w-100" >
                        <Form.Label className="text-secondary mb-0 fw-bold">Municipio/Localidad:</Form.Label>
                        <Form.Control className="text-success" size="sm" type="text" name="town" placeholder="Municipio" defaultValue={adminData.managers.field.town} onChange={handleFieldAddressInputChange}/>
                      </Form.Group>
                      <Form.Group className="mb-2 w-100" >
                        <Form.Label className="text-secondary mb-0 fw-bold">Estado:</Form.Label>
                        <Form.Control className="text-success" size="sm" type="text" name="city" placeholder="Estado" defaultValue={adminData.managers.field.city} onChange={handleFieldAddressInputChange}/>
                      </Form.Group>
                      <Form.Group className="mb-2" >
                        <Form.Label className="text-secondary mb-0 fw-bold">Costo:</Form.Label>
                        <Form.Control className="text-success" size="sm" type="number" name="rent_cost" placeholder="Precio por partido" defaultValue={adminData.managers.field.address} onChange={handleFieldInputChange}/>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-secondary mb-0 fw-bold">Tipo de cancha:</Form.Label>
                        <Form.Select size="sm" name="football_type" defaultValue={0} onChange={handleFieldInputChange}>
                          <option value='0'>Elige el tipo de cancha...</option>
                          {footballTypes.map((type, index)=>{
                            return (<option key={index.toString()} value={type.id} >{type.name}</option>)
                          })}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-2 w-100" controlId="formG">
                        <Form.Label className="text-secondary mb-1 fw-bold">Servicios:</Form.Label>
                        <div className="mb-3 d-flex flex-wrap justify-content-around w-100">
                          {services.map((item,index)=>(
                            <Form.Check
                              key={index.toString()}
                              inline
                              label={item.service}
                              name="services"
                              type="checkbox"
                              id={`check-${item.service}`}
                              value={item.id}
                              checked={services_CheckedItems[`${item.id}`] || false}
                              onChange={handleServicesCheckboxItems}
                            />
                          ))}
                          
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                
                <div className="w-100 text-center">
                  <ActionBtn 
                    action="Actualizar" 
                    btn_type="submit" 
                    btn_disable={false} 
                    aria-controls="collapse-loader"
                    aria-expanded={open}
                  />
                  
                </div>
                
              </Form>
              
            </Col>
            
          </Row>
        </Container>
      </Modal.Body>
      <Toast/>
      <Collapse in={open}>
        <div className="loader-container text-center" id="collapse-loader">
          <div className="beatloader-container">
            <BeatLoader />
            <p>Actualizando...</p>
          </div>
        </div>
      </Collapse>
      
      
    </Modal>
  )
}

export default UpdateAdminModal
