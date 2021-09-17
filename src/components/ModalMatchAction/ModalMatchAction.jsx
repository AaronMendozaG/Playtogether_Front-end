import React from 'react'
import { Container, Row, Modal} from 'react-bootstrap'
import Btn from 'components/Buttons/CallActionBtn'

import Toast from 'components/Toast/Toast'

const ModalMatchAction = (props) => {
    const {show,onHide, title, action, actionBtn,textBtn} = props
    return (
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
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-0 p-md-1">
        <Container>
            <Row>
            <div className="d-flex flex-column">
            <h1 className="text-leave">{action}</h1>
            <Btn className="mb-4" text={textBtn} style={{backgroundColor: "transparent",color: "#28804B"}} onClick={actionBtn}/>
            
            </div>
            
           
            </Row>
        </Container>
      </Modal.Body>
      <Toast/>
    </Modal>
    )
}

export default ModalMatchAction
