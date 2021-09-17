import React from 'react'
import {Modal} from 'react-bootstrap';
import {photoAPI} from 'Constants/API'
import './modalFollow.scss'

const ModalFollow = (props) => {
    const {followSection,list} = props
    return (
        <div>
            <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header className="border-0" closeButton />
      <Modal.Body>
      <Modal.Title id="contained-modal-title-vcenter" className="text-center  fw-bold mb-4">
        {followSection}
      </Modal.Title>
      <div className="d-flex flex-column followers-container">
        {
            list.length > 0 
            ?
            list.map(follower => (
            
            <div className="d-flex align-items-center mb-3">
                <div className="user-containerImg">
                <img src={`${photoAPI}user_${follower.id}/avatar`} alt={follower.username}/>
                </div>
                <p className="m-0 mx-2">@{follower.username}</p>
                <hr/>
            </div>
            
            
            
            ))
            :
            <></>
        }
        
        
      </div>
      </Modal.Body>
     
    </Modal>
        </div>
    )
}

export default ModalFollow
