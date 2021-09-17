import 'bootstrap/dist/css/bootstrap.min.css';
import './cardperfil.scss'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from 'react-bootstrap';
import { useState } from 'react';
import {useParams} from 'react-router-dom'
import ModalPerfil from 'components/PerfilModal/PerfilModal'
import {AUTH_ID, IMAGES_URL} from 'Constants/API'

const background_img=Math.floor((Math.random() * 5)+1);
const CardPerfil = ({avatar, user_first_name, user_last_name, user_username, user_position, user_dominant_foot, user_date_joined, toastParams, setToastParams, profileUpdated, setProfileUpdated,teammateList, followers, follow,onClick,handleFollowers,handleFollowings}) => {
  //Params
  const id = useParams().id
  const [modalShow, setModalShow] = useState(false);

 
  const CARD_BACKGROUND_URL = `${IMAGES_URL}profile_card_back${background_img}.jpg`
  
 

  return (
    <div className="card-perfil text-center mx-auto d-flex flex-column justify-content-end" style={{backgroundImage: `url(${CARD_BACKGROUND_URL})`}}>
      <div className="data-container px-4">
        <div className="head d-flex flex-column align-items-center position-relative">
          <div className="avatar mt" style={{backgroundImage: `url(${avatar})`}}>

          </div>
          {
            id === AUTH_ID ? (<div className="edit-profile-icon">
            <IconButton onClick={() => setModalShow(true)}>
              <EditIcon/>
            </IconButton>
          </div>) :(<div className=" mb-4 edit-profile-icon">
            
          </div>)
          }
          
          <h5 className="text-capitalize">{user_first_name} {user_last_name}</h5>
          <p>@ {user_username}</p>
          {
          id !== AUTH_ID ? 
          (<div className="mb-3">
            <Button className={`${follow === false ? 'follow' : 'unfollow'} `} onClick={onClick}> {follow === false ? 'Seguir' : 'Siguiendo'}</Button>
          </div>)
          :
          <></>
        }
          <div className="d-flex mb-4">
            <div className="d-flex mx-1 flex-column  align-items-center followers" >
                <p className="m-0 text-secondary follow-text">Seguidores</p>
                <p className="mx-2 mb-0 p-0 total-follow" onClick={handleFollowers}>{teammateList.total_followers}</p>
            </div>
            <div className="d-flex flex-column mx-1  align-items-center followers" >
                <p className="m-0 text-secondary follow-text">Seguidos</p>
                <p className="mx-2 mb-0 p-0 total-follow" onClick={handleFollowings}>{teammateList.total_followings}</p>
            </div>
        </div>
        
          
        </div>
        <div className="d-flex justify-content-around position-container">
          <p>Posición:</p> <h6 className="text-capitalize">{user_position}</h6>
        </div>
        {/* <div className="d-flex justify-content-around foot-container">
          <p>Perfil:</p> <h6 className="text-capitalize">{user_dominant_foot}</h6>
        </div> */}
        <p className="date-joined-p">Jugando fútbol desde: <strong>{user_date_joined}</strong></p>
      </div>

      <ModalPerfil
        show={modalShow}
        onHide={() => setModalShow(false)}
        toastParams={toastParams}
        setToastParams={setToastParams}
        profileUpdated={profileUpdated}
        setProfileUpdated={setProfileUpdated}
      />
    </div>
  )
}

export default CardPerfil
