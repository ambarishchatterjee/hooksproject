import React, { useEffect, useState } from 'react'
import axiosInstance, { productImage } from '../../../api/axios'
import { endPoints } from '../../../api/endPoints'
import toast from 'react-hot-toast'

export default function Profile() {
  const [userData, setUserDetails] = useState()

  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get(endPoints.auth.profile)
      if (data.status === 200) {
        console.log(data.data)
        setUserDetails(data.data)
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {
    fetchData()
  }, [])



  return (
    <>
    <h1>{userData?.first_name} {userData?.last_name}</h1>
    <img src={productImage(userData?.profile_pic)} />

      
    </>
  )
}
