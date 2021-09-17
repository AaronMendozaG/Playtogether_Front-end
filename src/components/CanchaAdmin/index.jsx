import { Card, Col, Row } from 'react-bootstrap'
import './cancha_admin.scss'
import { ICONS_URL} from 'Constants/API'
import ToogleBtn from 'components/ToogleBtn/ToogleBtn'
import ActionBtn from 'components/ActionBtn'
import { useEffect} from 'react'


const CanchaAdmin = ({fieldAdminData, fieldActive, setFieldActive, name,cost,address,type,img,services,setModalShow, servicesObj, show_field}) => {
  // const [fieldActive,setFieldActive]=useState(show_field)
  
  useEffect(()=>{
    setFieldActive(fieldAdminData.managers.field.show)
  },[fieldAdminData])

  return (
    <>
      <Card className="bg-white">
          <Row className="g-0">
            <Col sm={12}>
              <Card.Header className="text-start pt-3">
                <h3>Mi cancha</h3>
                <img 
                  className="img-fluid rounded-top card-img-bottom field-img" 
                  src={img} alt="..."/>
                  
                {name === "" ? 
                  (<></>)
                :
                  <>
                    <Card.Text className="activate-field-msg text-success mb-0">
                      {fieldActive ? 'Puedes desactivar tu cancha si quieres evitar recibir solicitudes de juego en ella.' : 'Habilita tu cancha para que los jugadores puedan organizar partidos en ella.'}
                       
                    </Card.Text>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="mx-2">Off</span>
                      <ToogleBtn fieldId={fieldAdminData.managers.field.id} fieldActive={fieldActive} setFieldActive={setFieldActive}/>
                      <span className="mx-2">On</span>
                    </div>
                  </>
                  
                }
              </Card.Header>
            </Col>

            <Col sm={12}>
              
              
              <Card.Body className={`d-flex flex-column justify-content-start card-body h-auto ${fieldActive ? '':'inactive'}`}>
                  {name === '' || name === null ?
                    <>
                      <h5> Aun no das de alta tu cancha.</h5>
                      <p>Edita tu perfil para agregarla.</p>
                    </>
                    
                    
                    :
                    
                    <>
                      <Card.Title className="fw-bold mb-4" >{name}</Card.Title>
                      <div className="field-data d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <Card.Subtitle className="fw-bold">Dirección</Card.Subtitle>
                        <Card.Text className="text-wrap">
                            {`${address.street} ${address.street_number}, ${address.town}, ${address.city}`}
                        </Card.Text>

                      </div>
                      <div className="field-data d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <Card.Subtitle className="fw-bold">Precio de renta por partido:</Card.Subtitle>
                        <Card.Text className="text-truncate fw-bold">
                            {`$ ${cost}`}
                        </Card.Text>

                      </div>
                      <div className="field-data d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <Card.Subtitle className="fw-bold">Tipo de cancha: </Card.Subtitle>
                        <Card.Text className="text-truncate">
                            {type}
                        </Card.Text>

                      </div>
                      <div className="field-data d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <Card.Subtitle className="fw-bold mb-2">Servicios:</Card.Subtitle>
                        <div className="text-truncate d-flex flex-wrap justify-content-around align-items-center">
                          {services.map((item,index)=>(
                            <div key={index.toString()} className="d-flex flex-column flex-wrap justify-content-center align-items-center icon-container">
                              <img className="match-icon mb-1" src={`${ICONS_URL}${servicesObj[`${item}`].toLowerCase()}${fieldActive ? '' : '_inactive'}.svg`} alt="arbitraje" />
                              <span className="p-services mx-1">{servicesObj[`${item}`]}</span>
                            </div>
                          ))}
                        </div>

                      </div>
                      {/* <div className={`field-inactive ${fieldActive ? 'd-none':''}`}></div> */}
                    </>
                  }
                  <ActionBtn 
                    action="Editar" 
                    btn_type="button" 
                    btn_disable={false} 
                    aria-controls="collapse-loader"
                    clic_func = {()=>{setModalShow(true)}}
                  />
              </Card.Body>
            </Col>
            
          </Row>
          
      </Card>
    </>
  )
}

export default CanchaAdmin
