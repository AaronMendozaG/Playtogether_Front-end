import React from 'react'
import { green } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core';
import { API_URL, AUTH_TOKEN } from 'Constants/API';

const GreenSwitch = withStyles((theme)=>({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: green[300],
    '&$checked': {
      transform: 'translateX(12px)',
      color: green[500],
    },
    '&$checked + $track': {
      backgroundColor: green[500],
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  checked: {},
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
}))(Switch);

const ToogleBtn = ({fieldId,fieldActive,setFieldActive}) => {

  const updateFieldStatus = async (field_val) => {
    try{
      const response = await fetch(`${API_URL}field_manager/field_show/${fieldId}/`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          "show": field_val   
        })
      })
      if (response.status === 200) {
        setFieldActive(field_val)
      }
    }catch (error){
        console.log(error)
    }   
  }
  const handleChange = (event) => {
    // console.log(state.checkedA)
    // setState({ ...state, [event.target.name]: event.target.checked });
    
    
    updateFieldStatus(event.target.checked)

  };
  return (
    
    <GreenSwitch checked={fieldActive} onChange={handleChange} name="checkedA" />
    
  )
}

export default ToogleBtn
