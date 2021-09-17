import React, { Fragment } from 'react'
//COMPONENTES
import Hero from 'components/Header/Header'
import Navbar from 'components/Navbar/Navbar'
import Footer from 'components/Footer/Footer'
import CardsLanding from 'components/CardLanding/CardsLanding'
//RECURSOS
import './landing.scss'
import { IMAGES_URL } from 'Constants/API'
const Landing = () => {
    return (
    <Fragment>
    <Navbar />
    <Hero/>
    <div className="d-flex justify-content-center mt-5 mb-5 align-items-center landing-text">
       
        <p className="mt-2  px-4 px-lg-0"><strong>PlayTogether!</strong> Surge de la necesidad de relacionarse y unir personas a través del deporte, facilitando el acceso a partidos y a la creación de estos.</p>
        
        </div>
    <div className="container-fluid container-text p-3 pb-4">
    
      <div className="container">
      
        <div className="row  mt-lg-5 mb-lg-5 ">
        
        
        <h1 className="cards-title">Crea tu cuenta y accede a beneficios.</h1>
        <CardsLanding className="transition-card" image={`${IMAGES_URL}find_games.png`} text="Encuentra partidos cerca de ti y conoce gente"/>
         
         <CardsLanding image={`${IMAGES_URL}perfil_example.svg`} text="Unete y podras crear partidos e invitar a tus amigos"/>
         
         <CardsLanding image={`${IMAGES_URL}meet_people.svg`} text="Accede a los perfiles de las personas con las que jugaste"/>  
           
        </div>
        
      </div>
    </div>
    <div className="container-fluid  p-3 pb-4">
    
      <div className="container">
      
        <div className="row  mt-lg-5 mb-lg-5 ">
        <h1 className="cards-title">Plataforma web intuitiva y disponible desde tu celular.</h1>
        <div className="col-12 mt-4  img-page">
          <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center">
            <img src={`${IMAGES_URL}pagina.gif`}  alt="..."/>
            <div className="d-flex justify-content-center align-items-center card-text">
              <p>Navega por los diferentes menus y busca la cancha y el partido ideal</p>
            </div>
          </div>
        </div>

        <div className="col-12  img-page">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
        <div className="order-2  d-flex justify-content-center align-items-center card-text">
              <p>Accede desde tu celular y arma partidos <br/> con tus amigos</p>
            </div>
            <img className="order-lg-2" src={`${IMAGES_URL}manos.gif`}  alt="..."/>
            
          </div>
        </div>
        
           
        </div>
        
      </div>
    </div>
   
    
    <Footer mt="mt-5"/>
    </Fragment>
    
    )
}

export default Landing
