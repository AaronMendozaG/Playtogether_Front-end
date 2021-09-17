import {React, useState} from 'react'
import { Container, Row, Modal , Form} from 'react-bootstrap'
import Btn from 'components/Buttons/CallActionBtn'
import './ModalTeam.scss'
import {API_URL, AUTH_TOKEN, ICONS_URL} from 'Constants/API'
import Toast from 'components/Toast/Toast'
import {notifySuccess,notifyWarning} from 'Functions/toastFunc'

const ModalTeam = (props) => {
    const {matchId,nameBlack,nameWhite,show,onHide,teamFull} = props
    const teamBlack = `${ICONS_URL}teamBlack.svg`
    const teamWhite = `${ICONS_URL}teamWhite.svg`
    const [team, setTeam] = useState(nameBlack)
    const updateMatch = async (name) =>{
        try{
            const response = await fetch(`${API_URL}matches/${matchId}/`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${AUTH_TOKEN}`,
                },
                body: JSON.stringify({
                        "team": [
                            {
                                "name": name
                            }
                        ]
                })
            
            })
            return await response.json()
        }catch (error){
            console.log(error)
        }   
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (team === ""){
            notifyWarning("Debes de seleccionar un equipo")
            return
        }

        const response = await updateMatch(team)
        if (response[0]=== "No puedes unirte a esta categoria, intenta otro partido"){
            notifyWarning(`${response[0]}`,1500)
            setTimeout(function(){window.location.href="/partidos/"} , 1500); 
            
            return
        }else {
            setTimeout(function(){window.location.reload()} , 750); 
            notifySuccess("Te has unido con exito",750)
        }

        

    }
    return (
        <>
    <Modal
    //   {...props}
    show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Elige tu Equipo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-0 p-md-1">
        <Container>
            <Row>
            <div className="d-flex flex-column">
            <div className="d-flex align-items-center create-check justify-content-between justify-content-md-around mt-5 mb-4" onChange={(e)=>{setTeam(e.target.value)}} >
            
            {
                teamFull === '' ? (<><div className="d-flex align-items-center">
                    <Form.Check value={nameWhite} as='input' name="team" type="radio" id="black"  checked={team === nameWhite ? true : false}/>
                    <img className="me-2" src={teamWhite} alt="TeamW"/>
                    <p className="m-0  fw-bold team">Blanco</p>
                </div>
                <div className="d-flex align-items-center" >
                    <Form.Check value={nameBlack} as='input' name="team" type="radio" id="black" checked={team === nameBlack ? true : false} />
                    <img className="me-2" src={teamBlack} alt="teamB"/>
                    <p className="m-0 fw-bold team">Negro</p>
                </div></>)
                : 
                (
                     teamFull.includes("a") ? 
                     (<div className="d-flex align-items-center" >
                    <Form.Check value={nameBlack} as='input' name="team" type="radio" id="black" checked={team === nameBlack ? true : false} />
                    <img className="me-2" src={teamBlack} alt="teamB"/>
                    <p className="m-0 fw-bold team">Negro</p>
                </div>)
                
                :
                (<div className="d-flex align-items-center">
                    <Form.Check value={nameWhite} as='input' name="team" type="radio" id="black"  checked={team === nameWhite ? true : false}/>
                    <img className="me-2" src={teamWhite} alt="teamW"/>
                    <p className="m-0  fw-bold team">Blanco</p>
                </div>)
                )
            }
            </div>
            <Btn className="mb-4" text="Unirse" onClick={handleUpdate}/>
            </div>
            </Row>
        </Container>
      </Modal.Body>
    </Modal>
    <Toast/>
    </>
    )
}

export default ModalTeam
