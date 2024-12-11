import { TextField, Typography, Button, Box, Stack, Avatar, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../api/axios'
import { endPoints } from '../../api/endPoints'
import toast from 'react-hot-toast'
import { Add, FormatListBulletedOutlined } from '@mui/icons-material'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UpdateProduct() {
    const [image, setImage] = useState();
    const [list, setList] = useState()

    const { id } = useParams()
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const navigate = useNavigate()


    const fetchData = async (data) => {

        try {
            const { data } = await axiosInstance.get(endPoints.product.productdetails + id)
            setList(data.data)
            console.log(data);

        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setValue("title", list?.title);
        setValue("description", list?.description);
        setValue("image", list?.image);
    }, [list]);



    const clickFunction = async (data) => {


        const formData = new FormData()
        formData.append("id", id)
        formData.append("title", data.title)
        formData.append("description", data.description)
        //formData.append("image", productImage)
        if (image) {
            formData.append("image", image);
        } else {
            formData.append("image", data.image);
        }

        try {
            const { data } = await axiosInstance.post(endPoints.product.productupdate, formData)
            

            if (data.status === 200) {
                toast.success(data.message)
                navigate("/products")
            } else {
                toast.error(data.message)
            }

        } catch (error) {

        }
    }



    return (
        <div>
            <Box width={600} marginX={'auto'} marginTop={4} bgcolor={'#f5f5f5'} display={'flex'} flexDirection={'column'} gap={2} padding={4}>


                <Typography variant="h1" fontSize={40} color="initial">Update Product</Typography>
                <form>

                    <TextField id="title"
                        label="title"
                        {...register("title", {
                            required: "Product Title is required"
                        })}
                        variant="standard"
                        fullWidth

                        type='text'
                        sx={{ mb: 2 }}
                        error={errors.title}
                        helperText={errors.title && errors.title.message}
                    />

                    <TextField
                        id="description"
                        label="Product Description"
                        fullWidth
                        variant='standard'

                        sx={{ mb: 2 }}
                        rows={4}
                        multiline
                        {...register("description", {
                            required: "Description is required"
                        })}
                        error={errors.description}
                        helperText={errors.description && errors.description.message}

                    />

<Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
              <Avatar
                alt="Product Picture"
                src={
                  image 
                    ? URL.createObjectURL(image) 
                    : list?.image 
                      ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${list.image}`
                      : ''
                }
                sx={{ width: 90, height: 90 }}
              />
              <label htmlFor="product-pic-upload">
                <Input
                  accept="image/*"
                  id="product-pic-upload"
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
                
              </label>
            </Stack>



                    <Button type='submit' fullWidth style={{ marginBottom: '16px', marginTop: '16px' }} variant="outlined" color="primary" startIcon={<Add />} onClick={handleSubmit(clickFunction)}>
                        Update Product
                    </Button>

                    <Link to={"/products"}>
                        <Button variant='outlined' fullWidth color='primary' startIcon={<FormatListBulletedOutlined />}>
                            Go to product List
                        </Button>
                    </Link>



                </form>



            </Box>
        </div>
    )
}
