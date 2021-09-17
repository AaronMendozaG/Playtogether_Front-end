import {React, Fragment, useRef} from 'react'
//COMPONENTES
import Form from 'react-bootstrap/Form'
import Card from 'components/Cards/Card'
import Nav from 'components/Navbar/Navbar'
import Footer from 'components/Footer/Footer'
import { Col, Container, Row, Button } from 'react-bootstrap'
//NOTIFICACIONES
import Toast from 'components/Toast/Toast'
import {notifyWarning} from 'Functions/toastFunc'
import {Tabs, Tab} from 'react-bootstrap';
//RUTAS
import { Link } from 'react-router-dom'
//API
import {API_URL} from 'Constants/API'

const SignUp = () => {
    //REFERECIA DE LOS INPUTS
const usernRef = useRef()
const nameRef = useRef()
const lastnRef = useRef()
const emailRef = useRef()
const pwdRef = useRef()

const userManagerRef = useRef()
const nameManagerRef = useRef()
const emailManagerRef = useRef()
const pwdManagerRef = useRef()

//FUNCION PARA HACER REGISTRO A LA API (POST)
const SignUpPlayer = async(username,first_name,last_name,email,password) => {
    try{
      const response = await fetch(`${API_URL}signup_player/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          first_name,
          last_name,
          email,
          password
        }),
      });
      return await response.json();
    } catch (error){
      console.log(error)
    }
    
  }
const SignUpField = async(username,first_name,email,password) => {
    try{
      const response = await fetch(`${API_URL}signup_field_manager/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          first_name,
          email,
          password
        }),
      });
      return await response.json();
    } catch (error){
      console.log(error)
    }
    
  }

  const handleSubmitPlayer = async(e) => {
    e.preventDefault();
    //INPUTS
    const username = usernRef.current.value 
    const name = nameRef.current.value 
    const lastName = lastnRef.current.value 
    const email = emailRef.current.value 
    const password = pwdRef.current.value 
  
    //VALIDAR CAMPOS VACIOS
    if (username === '' || name === '' || lastName === '' || email === '' || password === ''){
      //ALERTA
      notifyWarning("Campos Vacios")
      return
    }
  

      //Se pasan los valores de los inputs a la funcion del POST
      const response = await SignUpPlayer(username,name,lastName,email,password);

      //VALIDAR SI SE RECIBE UN USUARIO EXISTENTE
        if (response.username[0] === "A user with that username already exists.") {
          notifyWarning("El nombre de usuario ya existe, intenta con otro")
          usernRef.current.value = null
        } else if (response.username === username) {
          //SE REDIRIGE A LA PAGINA DE LOGIN
            window.location.href = "/login";
         }
  
    }
    const handleSubmitField = async(e) => {
      e.preventDefault();
      //INPUTS
      const username = userManagerRef .current.value 
      const name = nameManagerRef.current.value 
      const email = emailManagerRef.current.value 
      const password = pwdManagerRef.current.value 
    
      //VALIDAR CAMPOS VACIOS
      if (username === '' || name === '' || email === '' || password === ''){
        //ALERTA
        notifyWarning("Campos Vacios")
        return
      }
    
  
        //Se pasan los valores de los inputs a la funcion del POST
        const response = await SignUpField(username,name,email,password);
  
        //VALIDAR SI SE RECIBE UN USUARIO EXISTENTE
          if (response.username[0] === "A user with that username already exists.") {
            notifyWarning("El nombre de usuario ya existe, intenta con otro")
            usernRef.current.value = null
          } else if (response.username === username) {
            //SE REDIRIGE A LA PAGINA DE LOGIN
              window.location.href = "/login";
           }
    
      }
    return (
        <div>
        <Nav/>
        <Container fluid className="container-login" style={{height:"100%"}}>
            <Row>
            <Container>
            <Row>
            <Col md="3" lg="4" xl="4" className="d-none d-md-block"></Col>
                <Col md="6" lg="4" xl="4" >
                  <Card className="flex-column p-3 mt-5 mb-5" content={
                    <Fragment>
                      <h1 className="h1-login mt-4 mb-4">Registrate como...</h1>

                      <Tabs 
                      defaultActiveKey="userPlayer"
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-3">
                        <Tab eventKey="userPlayer" title="Jugador">
                          <p style={{color:"#8a8e92"}}><small>* Todos los campos son requeridos</small></p>
                          <Form className="d-flex flex-column" onSubmit={handleSubmitPlayer} >
                            <Form.Group className="mb-4" controlId="formBasicEmail">
                              <Form.Label className="text-secondary">Nombre de Usuario:</Form.Label>
                              <Form.Control className="text-success" ref={usernRef}  type="text" placeholder="Nombre de usuario" maxLength="20" />
                              </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                              <Form.Label className="text-secondary">Nombre:</Form.Label>
                              <Form.Control className="text-success" ref={nameRef}  type="text" placeholder="Nombre" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                              <Form.Label className="text-secondary">Apellido:</Form.Label>
                              <Form.Control className="text-success" ref={lastnRef}  type="text" placeholder="Apellido" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                              <Form.Label className="text-secondary">Correo Electronico:</Form.Label>
                              <Form.Control className="text-success" ref={emailRef}  type="email" placeholder="Correo electronico" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                              <Form.Label className="text-secondary">Contraseña:</Form.Label>
                              <Form.Control className="text-success" ref={pwdRef}  type="password" placeholder="Contraseña" />
                            </Form.Group>
                            <Button className="align-self-center mt-4 btn-login" type="submit" >
                              Unete
                            </Button>
                          </Form> 
                          <p className="mt-4 p-login">Ya tienes cuenta?, Inicia Sesión <Link to='/login' style={{color:"#28804B"}}><strong>aqui</strong></Link></p>
                        </Tab>
                        <Tab eventKey="userField" title="Administrador de Cancha">
                          <p style={{color:"#8a8e92"}}><small>* Todos los campos son requeridos</small></p>
                          <Form className="d-flex flex-column" onSubmit={handleSubmitField} >
                            <Form.Group className="mb-4" controlId="formBasicEmail">
                              <Form.Label className="text-secondary">Nombre de Usuario:</Form.Label>
                              <Form.Control className="text-success" ref={userManagerRef}  type="text" placeholder="Nombre de usuario" maxLength="20" />
                              </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                              <Form.Label className="text-secondary">Nombre de Administrador:</Form.Label>
                              <Form.Control className="text-success" ref={nameManagerRef}  type="text" placeholder="Nombre" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                              <Form.Label className="text-secondary">Correo Electronico:</Form.Label>
                              <Form.Control className="text-success" ref={emailManagerRef}  type="email" placeholder="Correo electronico" />
                            </Form.Group>
                            <Form.Group className="mb-5" controlId="formBasicPassword">
                              <Form.Label className="text-secondary">Contraseña:</Form.Label>
                              <Form.Control className="text-success" ref={pwdManagerRef}  type="password" placeholder="Contraseña" />
                            </Form.Group>
                            
                            <Button className="align-self-center mt-5 btn-login" type="submit" >
                              Unete
                            </Button>
                          </Form> 
                          <p className="mt-4 p-login">Ya tienes cuenta?, Inicia Sesión <Link to='/login' style={{color:"#28804B"}}><strong>aqui</strong></Link></p>
                        </Tab>
                      </Tabs>
                        
                    </Fragment>
                  }/>
                </Col>
                <Col md="3" lg="4" xl="4" className="d-none d-md-block"></Col>
            </Row>
        </Container>
            </Row>

        </Container>
        
            <Footer/>
            <Toast/>
            
        </div>
    )
}

export default SignUp
