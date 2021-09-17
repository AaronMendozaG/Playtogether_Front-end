import InitialDateFilter from 'components/InitialDateFilter'
import FinalDateFilter from 'components/FinalDateFilter'
import { useRef, useState, useEffect } from 'react'
import './buscar.scss'
import { Col, Container, Form, Row } from 'react-bootstrap'
import ActionBtn from 'components/ActionBtn'
import axios from 'axios'

const Buscar = ({searchParams, setSearchParams}) => {
  //Referencias a los campos de fecha
  const initialValue = useRef();
  const finalValue = useRef();
  const [dateInit,setDateInit] = useState(true);
  //Almacena las fechas conforme se van seleccionando
  const [selected_dates, setSelected_dates] = useState({'start_date': '','end_date': ''})
  const [badgeDisplay, setBadgeDisplay]=useState('d-none')
  //Estado para almacenar los datos del formulario para filtrar
  const [formData,setFormData]=useState({})

  
  const [football_type_list,setFootball_type_list] = useState([])
  const [football_typeCheckedItems, setFootball_typeCheckedItems] = useState({})
  const [field_names_list,setField_name_list] = useState([])
  const [field_name_CheckedItems, setField_name_CheckedItems] = useState({})
  

  
  useEffect(() => {
    const getFields = async () => {
      const dataFromServer = await getFieldsList()
      const football_types = setFootballTypes(dataFromServer)
      const field_names = setFieldNames(dataFromServer)

      // setFieldsList(dataFromServer)
      
      setFootball_type_list(football_types)
      setFootballTypesCheckObject(football_types)

      setField_name_list(field_names)
      setFieldNamesCheckObject(football_types)
    }
    getFields()
  }, [])
  const getFieldsList = async ()=> {
    try {
      const res = await axios.get(`fields/`);
      return res.data
      
    } catch (error) {
      console.log(error);
    }
  }

  // CREA LA LISTA DE TIPOS DE PARTIDOS SIN REPETICIONES
  const setFootballTypes = (list) => {
    const football_types = [...new Set(list.map((match) => match.football_type))]
    return football_types
  }

  // CREA LA LISTA DE NOMBRES DE CANCHAS SIN REPETICIONES
  const setFieldNames = (list) => {
    const field_names = [...new Set(list.map((match) => match.name))]
    return field_names
  }

  // CREAMOS EL OBJETO QUE NOS SERVIRA PARA VERIFICAR LOS CHECKBOX DE TIPO DE PARTIDO SELECCIONADOS PARA FILTRAR
  const setFootballTypesCheckObject = (types_list) => {
    const types_val_list = types_list.map(type=>[type,false])
    setFootball_typeCheckedItems(Object.fromEntries(types_val_list))
  }

  // CREAMOS EL OBJETO QUE NOS SERVIRA PARA VERIFICAR LOS CHECKBOX DE NOMBRES DE CANCHAS SELECCIONADOS PARA FILTRAR
  const setFieldNamesCheckObject = (names_list) => {
    const names_val_list = names_list.map(field_name=>[field_name,false])
    setField_name_CheckedItems(Object.fromEntries(names_val_list))
  }

  const [categoryCheckedItems, setCategoryCheckedItems] = useState(
    {'femenil': false,'varonil': false,'mixto': false}
  )
  const handleCategoryCheckboxItems =  (e) => {
    setBadgeDisplay('d-flex')
    const checkboxValue = e.target.value
    setCategoryCheckedItems({
      ...categoryCheckedItems,
      [e.target.value]: !categoryCheckedItems[`${checkboxValue}`]
    })
  }

  const handleTypeCheckboxItems =  (e) => {
    setBadgeDisplay('d-flex')
    const checkboxValue = e.target.value
    setFootball_typeCheckedItems({
      ...football_typeCheckedItems,
      [e.target.value]: !football_typeCheckedItems[`${checkboxValue}`]
    })
  }

  const handleFieldNameCheckboxItems =  (e) => {
    setBadgeDisplay('d-flex')
    const checkboxValue = e.target.value
    setField_name_CheckedItems({
      ...field_name_CheckedItems,
      [e.target.value]: !field_name_CheckedItems[`${checkboxValue}`]
    })
  }
  
  const handleDateChange = () => {
    let initial_date=''
    let final_date=''
    setBadgeDisplay('d-flex')
    if (initialValue.current.props.value[0] === '' || initialValue.current.props.value[0] === undefined || finalValue.current.props.value[0] === '' || finalValue.current.props.value[0] === undefined){
      setSelected_dates({
        'start_date': '',
        'end_date': ''
      }) 
    }else{
      initial_date = new Date(initialValue.current.props.value[0])
      final_date = new Date(finalValue.current.props.value[0])

      setSelected_dates({
        'start_date': `${initial_date.getFullYear()}-${initial_date.getMonth()+1}-${initial_date.getDate()}`,
        'end_date': `${final_date.getFullYear()}-${final_date.getMonth()+1}-${final_date.getDate()}`
      })  
    }
    
    
      
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const queryParams = new URLSearchParams();
    for (var key_c of Object.keys(categoryCheckedItems)) {
      if(categoryCheckedItems[key_c]){
        queryParams.append('category', key_c)
      }
    }
    for (var key_t of Object.keys(football_typeCheckedItems)) {
      if(football_typeCheckedItems[key_t]){
        queryParams.append('football_type', key_t)
      }
    }
    for (var key_n of Object.keys(field_name_CheckedItems)) {
      if(field_name_CheckedItems[key_n]){
        queryParams.append('field', key_n)
      }
    }
    for (var key_d of Object.keys(selected_dates)) {
      queryParams.append(key_d, selected_dates[key_d])
    }
    setSearchParams(queryParams)
  }

  const cleanFilters = () => {
    // window.location.reload()
    setBadgeDisplay('d-none')
    setDateInit(!dateInit)
    setSearchParams({})
    setSelected_dates({
      'start_date': '',
      'end_date': ''
    })
    setFootball_typeCheckedItems({})
    setCategoryCheckedItems({'femenil': false,'varonil': false,'mixto': false})
    setField_name_CheckedItems({})
    setSearchParams({})

  }

  return (
    <Form className="filter-games p-3 mx-auto" onSubmit={(e)=>handleSubmit(e)}>
      <h3 className="text-start">Filtrar por:</h3>
      <hr />
      <Container fluid className="d-flex justify-content-center">
        <Row>
          <Col >
            <div className="position-relative">
              <span onClick={() => cleanFilters()}  className={`badge-limpiar-filtros badge text-secondary fst-italic ${badgeDisplay} align-items-center position-absolute translate-middle`}>
                Limpiar filtros  
                <button type="button" className="btn-close btn-close" aria-label="Close" ></button>
              </span>
            </div>
            
          
            <Form.Group controlId="formG">
              <Form.Label className="mb-0 fw-bold">Fecha:</Form.Label>
              <div className="d-flex flex-column flex-xl-row justify-content-center align-items-center justify-content-xl-between">
                <div className="date-picker-container p-1 mb-3 start">
                  <p className="text-start m-1">Desde:</p>
                  <InitialDateFilter init_value={dateInit} toValue={finalValue} fromValue={initialValue} name="start_date" formData={formData} setFormData={setFormData} handleDateChange={handleDateChange}/>
                  
                </div>
                <div className="date-picker-container p-1 mb-3 mx-sm-0 mx-lg-1 end">
                  <p className="text-start m-1">Hasta:</p>
                  <FinalDateFilter init_value={dateInit} toValue={finalValue} fromValue={initialValue} name="end_date" formData={formData} setFormData={setFormData} handleDateChange={handleDateChange}/>
                </div>
              </div>
              
            </Form.Group>
            
          {/* </div> */}
            <div className="type-category-filter-container d-flex flex-column flex-wrap justify-content-between align-items-stretch mb-2">
              <div className="type-filter-container mb-2">
                <Form.Group className="mb-2" controlId="formG">
                  <Form.Label className="mb-1 fw-bold">Tipo de partido:</Form.Label>
                  <div className="mb-3 d-flex flex-wrap justify-content-between w-100">
                  {football_type_list.map((type, index) => (
                    
                    <Form.Check
                      inline
                      key={index.toString()}
                      label={type}
                      name="football_type"
                      type="checkbox"
                      id={`check-${type}`}
                      value={type}
                      checked={football_typeCheckedItems[`${type}`] || false}
                      onChange={handleTypeCheckboxItems}
                    />
                  ))}
                  </div>
                </Form.Group>
              </div>
              <div className="category-filter-container mb-2">
                <Form.Group className="mb-2" controlId="formG">
                  <Form.Label className="mb-1 fw-bold">Categoria:</Form.Label>
                  <div className="mb-3 d-flex flex-wrap justify-content-between w-100">
                    <Form.Check
                      inline
                      label="Varonil"
                      name="category"
                      type="checkbox"
                      id={`radio-male`}
                      value="varonil"
                      checked={categoryCheckedItems.varonil}
                      onChange={handleCategoryCheckboxItems}
                    />
                    <Form.Check
                      inline
                      label="Femenil"
                      name="category"
                      type="checkbox"
                      id={`radio-female`}
                      value="femenil"
                      checked={categoryCheckedItems.femenil}
                      onChange={handleCategoryCheckboxItems}
                    />
                    <Form.Check
                      inline
                      label="Mixto"
                      name="category"
                      type="checkbox"
                      id={`radio-mixed`}
                      value="mixto"
                      checked={categoryCheckedItems.mixto}
                      onChange={handleCategoryCheckboxItems}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="field-container mb-2">
              <h6 className="text-start w-100 fw-bold">Nombre de la Cancha:</h6>
              {field_names_list.map((field_name, index) => (
                    
                <Form.Check
                  key={index.toString()}
                  label={field_name}
                  name="field"
                  type="checkbox"
                  id={`check-${field_name}`}
                  value={field_name}
                  checked={field_name_CheckedItems[`${field_name}`] || false}
                  onChange={handleFieldNameCheckboxItems}
                />

              ))}
            </div> 
            <div className="w-100 text-center">
              <ActionBtn action="Filtrar" btn_type="submit" btn_disable={false} />
            </div>
          </Col>
        </Row>
      </Container>
      {/* <div className="date-filter-container text-center d-flex flex-wrap justify-content-start w-100 mb-2"> */}
        {/* <h6 className="text-start">Fecha:</h6> */}
        
      
    </Form>
    
    
    
  )
}

export default Buscar
