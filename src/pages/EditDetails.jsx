import React from 'react'
import Navbar from '../components/Navbar'
import Registration from '../components/Registration'
function EditDetails() {


  return (
    <div>
        <Navbar/>
        <Registration api={'/edit'} edit={true} />
    </div>
  )
}

export default EditDetails