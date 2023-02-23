
import React from 'react'
import TextField from '@mui/material/TextField';
import { MenuItem,FormControl,InputLabel,Select } from '@mui/material'
import Router from 'next/router';



export const makeTitleUrl = (data, seprator) => {
  const mySentence = data.trim();
  const productName = mySentence.split(" ");
  const newProductName = productName.map((word) => {
    return word[0].toLowerCase() + word.substring(1);
  }).join(seprator);
  return newProductName;
}

// Reusable input component
export const InputField = ({ value, label, name, placeholder, type, onChange }) => {
  return (
    <TextField
      label={label}
      id="outlined-size-small"
      fullWidth
      size="small"
      name={name}
      value={value}
      onChange={onChange}
      type={type}
    />
  )
}

export const InputFile = ({ value, label, name, setFieldValue, type, onChange }) => {
  // console.log(name)
  return (
    <TextField
      label={label}
      id="outlined-size-small"
      fullWidth
      size="small"
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      type={type}
    />
  )
}


export const SelectBox = ({ value, label, name, placeholder, type, onChange, options }) => {
  return (


    <FormControl fullWidth>
      <InputLabel >{label}</InputLabel>
      <Select
        fullWidth
        select
        label={label}
        value={value}

        size="small"
        name={name}
        onChange={onChange}
      >
        {options.map((option,key ) => (

          <MenuItem key={key} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  )
}

export const formatDate = (dateString) => {
  const date = new Date(dateString).toLocaleDateString('en-US', {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return date;
};


export const setAccessToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("digitoken", JSON.stringify(token));
  }
}
export const setUserProfile = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("digiUser", JSON.stringify(token));
  }
}
export const getUserProfile = (token) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem("digiUser")
  }
}

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem("digitoken"))
  }
  return true
}


export const logoutUser = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem("digitoken");
    window.localStorage.removeItem("digiUser");

  }
  Router.push('/');
  return true
}
