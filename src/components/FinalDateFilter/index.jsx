import './finaldatefilter.scss'
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { useState, useEffect } from "react";

const FinalDateFilter = ({init_value, fromValue, toValue, handleDateChange}) => {
  const [date, setDate] = useState('')
  useEffect(() => {
    setDate('')
  }, [init_value])
  return (
    <Flatpickr 
      value={date}
      name="end_date"
      ref={toValue}
      placeholder='Elige una fecha...'
      onChange={(selected_date) => {
        setDate(selected_date)
        if(toValue.current.props.value[0] < fromValue.current.props.value[0]){
          setDate([fromValue.current.props.value[0]])
        }else{
          setDate(selected_date)
        }
        handleDateChange(toValue.current.props.name,toValue.current.props.value)
      }} 
      className="date-pick w-100"
      options={{
        dateFormat:"d-m-Y",
        minDate: 'today'
      }}
    />
  )
}

export default FinalDateFilter