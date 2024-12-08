
import { Button, TextField, Typography, Box } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../api/axios'
import { endPoints } from '../../../api/endPoints'
import { Key, KeyTwoTone } from '@mui/icons-material';

export default function Login({userlogin}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

//  console.log(userlogin);
  



  const ClickFuntion = async (data) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    try {
      const { data } = await axiosInstance.post(endPoints.auth.login, formData)
      if (data.status === 200) {
        toast.success(data.message)
        localStorage.setItem("token", data.token)
        navigate("/products")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.error)
    }

  }
  return (
    <>
      <Box width={600} marginX={'auto'} marginTop={4} bgcolor={'#f5f5f5'} display={'flex'} flexDirection={'column'} gap={2} padding={4}>
        <form autoComplete="off" >

          <Typography color="text.primary"
            fontSize={40}
            fontWeight="semiBold"
            sx={{
              p: 2,
              mb: 2,
              width: { xs: '100%', sm: 'auto' },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 2,
            }}>
            Login Form
          </Typography>


          <TextField
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email format"

              }
            })}
            label="email"
            required
            sx={{ mb: 2 }}
            fullWidth
            variant="outlined"
            color="secondary"
            type="email"
            error={errors.email}
            helperText={errors.email && errors.email.message}
          />

          <TextField
            {...register("password", {
              required: "password is required"
            })}
            label="password"
            required
            fullWidth
            variant="outlined"
            color="secondary"
            type="password"
            error={errors.password}
            helperText={errors.password && errors.password.message}

          />
          <Button
            type="submit"
            variant="outlined"
            color="info"
            startIcon={<Key />}
            size="small"
            disableElevation
            fullWidth
            sx={{ my: 2, py: 1 }}
            onClick={handleSubmit(ClickFuntion)}
          >
            Login
          </Button>

          <Link to="/registration">
            <Button
              variant="contained"
              color="primary"
              startIcon={<KeyTwoTone />}
              fullWidth

            >
              Sign Up
            </Button>

          </Link>


        </form>
      </Box>
    </>
  )
}