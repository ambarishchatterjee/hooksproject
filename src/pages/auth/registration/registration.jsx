import { Button, TextField, Typography, Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import axiosInstance from '../../../api/axios'
import { endPoints } from '../../../api/endPoints'

export default function Registration() {
    const [image, setImage] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()


    const ClickFuntion = async (data) => {
        const formData = new FormData()
        formData.append("first_name", data.first_name)
        formData.append("last_name", data.last_name)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("profile_pic", image)
        try {
            const { data } = await axiosInstance.post(endPoints.auth.register, formData)
            if(data.status === 200){
                toast.success(data.message)
                
              }else{
                toast.error(data.message)
              }
        } catch (error) {
            toast.error(data.message)
        }
    }
    return (
        <>
            <Box component="section" marginX={'auto'} marginTop={4} sx={{ p: 2, m: 2, maxWidth: '500px', border: '1px dashed grey' }}>
                <form autoComplete="off" >

                    <Typography color="text.primary" fontWeight="semiBold"
                        sx={{
                            p: 2,
                            mb: 2,
                            width: { xs: '100%', sm: 'auto' },
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            gap: 2,
                        }}>
                        Registration Form
                    </Typography>


                    <TextField
                        {...register("first_name", {
                            required: "First_name is required"
                        })}
                        label="first_name"
                        sx={{ mb: 2 }}
                        required
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="text"
                        error={errors.first_name}
                        helperText={errors.first_name && errors.first_name.message}
                    />
                    <TextField
                        {...register("last_name", {
                            required: "last_name is required"
                        })}
                        label="last_name"
                        required
                        sx={{ mb: 2 }}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        fullWidth
                        error={errors.last_name}
                        helperText={errors.last_name && errors.last_name.message}
                    />

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
                        sx={{ mb: 2 }}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="password"
                        error={errors.password}
                        helperText={errors.password && errors.password.message}

                    />

                    <TextField
                        {...register("profile_pic", {
                            required: "profile_pic is required",
                        })}
                        type="file"
                        variant='outlined'
                        inputProps={{ accept: 'image/*' }}
                        color='secondary'
                        onChange={(e) => setImage(e.target.files[0])}
                        error={!!errors.profile_pic}
                        helperText={errors.profile_pic && errors.profile_pic.message}
                        fullWidth
                        sx={{ backgroundColor: 'white', borderRadius: '5px', mb: 4 }}

                        slotProps={{
                            inputLabel: {
                                sx: {
                                    color: "#000",
                                }
                            },
                            input: {
                                sx: {
                                    backgroundColor: "white",
                                    color: "#000",
                                },
                            }
                        }}
                    />

                    <Stack direction={{ xs: "column-reverse", sm: "row" }} style={{ display: `${image ? 'flex' : 'none'}`, justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                        <img src={image && URL.createObjectURL(image)} height={100} width={"auto"} style={{ borderRadius: '10px' }} />
                        {image && (
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                Selected file: {image.name}
                            </Typography>
                        )}
                    </Stack>

                    <Button
                        type="submit"
                        variant="outlined"
                        color="info"
                        size="small"
                        disableElevation
                        fullWidth
                        sx={{ my: 2, py: 2 }}
                        onClick={handleSubmit(ClickFuntion)}
                    >
                        Registration
                    </Button>

                    <Link to="/">Login</Link>


                </form>
            </Box>
        </>
    )
}