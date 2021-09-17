import 'bootstrap/dist/css/bootstrap.min.css';
import './card_admin.scss'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {useParams} from 'react-router-dom'
import {AUTH_ID, IMAGES_URL} from 'Constants/API'
import UpdateAdminModal from 'components/UpdateAdminModal';

// const background_img=Math.floor((Math.random() * 5)+1);
const CardAdmin = ({
    fieldAdminData,
    setFieldAdminData,
    toastParams, 
    setToastParams, 
    profileUpdated, 
    setProfileUpdated,
    modalShow,
    setModalShow,
    servicesObj,
    servicesList,
  }) => {
  
  //Params
  const {id} = useParams()
  // const [modalShow, setModalShow] = useState(false);
  const CARD_BACKGROUND_URL = `${IMAGES_URL}profile_card_back_admin.jpg`
  return (
    <div className="card-admin text-center mx-auto d-flex flex-column justify-content-end" style={{backgroundImage: `url(${CARD_BACKGROUND_URL})`}}>
      <div className="data-container px-4">
        <div className="head d-flex flex-column align-items-center">
          <div className="avatar mt" style={{backgroundImage: `url(${fieldAdminData.managers.photo})`}}></div>
          {
            id === AUTH_ID ? (<div className="edit-admin-icon">
            <IconButton onClick={() => setModalShow(true)}>
              <EditIcon/>
            </IconButton>
          </div>) :(<div className=" mb-4 edit-admin-icon"></div>)
          }
          
          <h5 className="text-capitalize">{fieldAdminData.first_name}</h5>
          <p>@ {fieldAdminData.username}</p>
        </div>
        
        <p className="date-joined-p">Compartiendo cancha desde: <strong>{fieldAdminData.date_joined.split("T")[0].split("-").reverse().join("/")}</strong></p>
        
      </div>

      <UpdateAdminModal
        fieldAdminData={fieldAdminData}
        setFieldAdminData={setFieldAdminData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        toastParams={toastParams}
        setToastParams={setToastParams}
        profileUpdated={profileUpdated}
        setProfileUpdated={setProfileUpdated}
        servicesObj={servicesObj}
        servicesList={servicesList}
      />
    </div>
  )
}

export default CardAdmin
