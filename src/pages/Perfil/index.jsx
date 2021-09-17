
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import CardPerfil from 'components/CardPerfil';
import UserMatches from 'components/UserMatches';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import {AUTH_TOKEN, API_URL, BACKGROUNDS_URL, AUTH_ID} from 'Constants/API'
import Toast from 'components/Toast/Toast';
import { notifySuccess, notifyWarning } from 'Functions/toastFunc';
import ModalFollow from 'components/ModalFollow/ModalFollow.jsx'


const user = 
  {
    "username": "",
    "first_name": "",
    "last_name": "",
    "date_joined": "",
    "players": {
        "dominant_foot": "",
        "position": "",
        "matches": [],
        "matches_count": 0,
        "fields_count": 0
    }
  }

const PerfilUsuario = () => {
  
  const {id} = useParams();
  const [userData, setUserData] = useState(user);
  const [profileUpdated,setProfileUpdated] = useState(false);
  const [userCreatedMatch , setUserCreatedMatch] = useState({})
  const [totalMatchCreated, setTotalMatchCreated] = useState({})
  const [teammateList,setTeamMatesList] = useState({})
  const [modalShow, setModalShow] = useState(false);
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [list, setList] = useState([])
  const [followSection, setfollowSection] = useState("")
  // const [profileImgLs, setProfileImgLs]= useState(window.localStorage.getItem('player_photo'))
  let follow = false
  useEffect(() => {
    const getUserData = async () => {
      const dataFromServer = await getUser()
      setUserData(dataFromServer)

      // localStorage.setItem("player_photo",dataFromServer.players.photo.split(".com/")[1])
    }
    const getUserMatches = async () =>{
      const matchesCreated = await getUserCreatedMatches()
      setTotalMatchCreated(matchesCreated.shift())
      setUserCreatedMatch(matchesCreated)
      
    }

    const getTeamMates = async () => {
      const matesList = await getUserTeamMates()
      setTeamMatesList(matesList)
      setFollowers(matesList.list_followers)
      setFollowings(matesList.list_followings)
    }
    getUserMatches()
    getUserData()
    getTeamMates()
  },[profileUpdated,id])

  //SE DECLARAN PARAMETROS INCIALES PARA LA ACTIVACION DEL TOAST
  const [toastParams, setToastParams] = useState({
    type:'success',
    msg:"",
    time: 0,
    activate:false
  })
  useEffect(() => {
    if (toastParams.activate && toastParams.type === 'success') {
      notifySuccess(toastParams.msg, toastParams.time)
    }
    if (toastParams.activate && toastParams.type === 'warning') {
      notifyWarning(toastParams.msg, toastParams.time)
    }
  }, [toastParams])

  const getUser = async ()=>{
    try {
      const response = await fetch(`${API_URL}players/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${AUTH_TOKEN}`,
        },
      });
      const data = await response.json();
      console.log(data)
      return data
      
    } catch (error) {
      console.log(error);
    }
  }
  const getUserCreatedMatches = async ()=>{
    try {
      const response = await fetch(`${API_URL}players/organized/${id}/`, {
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
  const getUserTeamMates = async ()=>{
    try {
      const response = await fetch(`${API_URL}players/teammates_list/${id}/`, {
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

  const getUserTeamMatesPatch = async ()=>{
    try {
      const response = await fetch(`${API_URL}players/teammates/${id}/`, {
        method:"PATCH",
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

  if (followers !== undefined){
    followers.forEach(item => {
      if (item.id === AUTH_ID){
          follow = true
          
      }else{
        follow = false
        
      }
  })
  }
  
  const handleFollow = (e) => {
    e.preventDefault()
    const response = getUserTeamMatesPatch()
    setProfileUpdated(!profileUpdated)
  }

  const handleFollowers = () => {
    setList(followers)
    setfollowSection("Seguidores")
    setModalShow(true)
  }

  const handleFollowings = () => {
    setList(followings)
    setfollowSection("Seguidos")
    setModalShow(true)
  }

  
  
  return (
    <>
      {/* <Navbar profilePic = {userData.players.photo}/> */}
      <Navbar />
      <Container fluid={true} className="vista-perfil-container pt-2 pb-4" style={{background:`linear-gradient(129deg, rgba(2,0,36,0.8883928571428571) 0%, rgba(61,99,19,0.5578606442577031) 100%), url(${BACKGROUNDS_URL}background_3.jpg), no-repeat,fixed, center`}}>
        <Container>
        <Row className="gy-3 justify-content-center pb-5">
          <h1 className="py-3 mb-2 title-page tracking-in-contract-bck-top">Perfil de usuario</h1>
          <p className="mt-4 p-create"></p>
            <Col sm={12} md={5} lg={5} className="p-0 p-md-1 p-lg-3">
              <CardPerfil 
                avatar={`${userData.players.photo}`} 
                user_first_name={userData.first_name}
                user_last_name={userData.last_name}
                user_username={userData.username}
                user_position={userData.players.position}
                user_dominant_foot={userData.players.dominant_food}
                teammateList={teammateList}
                user_date_joined={userData.date_joined.split("T")[0].split("-").reverse().join("/")}
                profileUpdated = {profileUpdated}
                setProfileUpdated = {setProfileUpdated}
                toastParams={toastParams}
                setToastParams = {setToastParams}
                followers={followers}
                follow={follow}
                onClick={handleFollow}
                handleFollowers={handleFollowers}
                handleFollowings={handleFollowings}
              />
            </Col>
            <Col sm={12} md={7} lg={7} className="p-0 p-md-1 p-lg-3">
              <UserMatches matches={userData.players.matches} fields={userData.players.fields_count} num_matches={userData.players.matches_count} matchCreated={userCreatedMatch} numOfMatchCreated={totalMatchCreated.total_matches_organized}/>
            </Col>
        </Row>
        </Container>
      </Container>
      <Footer/>
      <Toast />
      <ModalFollow show={modalShow} onHide={() => setModalShow(false)} followSection={followSection} list={list}/>
    </>
  )
}



export default PerfilUsuario
