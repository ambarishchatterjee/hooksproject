import { TextField, Typography, Button, Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../api/axios'
import { endPoints } from '../../api/endPoints'
import toast from 'react-hot-toast'

export default function AddProduct() {
    const [productImage, setProductImage] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const clickFunction = async (data) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("image", productImage)
        try {
            const { data } = await axiosInstance.post(endPoints.product.addProduct, formData)
            if (data.status === 200) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {

        }
    }

    return (
        <div>
            <Box width={600} marginX={'auto'} alignContent={'center'} alignItems={'center'} justifyContent={'center'} marginTop={4} bgcolor={'#f5f5f5'}>

                <div className="box-border border-l-green-200 border-l-4 py-8 px-4 ">
                    <Typography variant="h1" marginBottom={4} fontSize={40} color="initial">Add Product</Typography>
                    <form>

                        <TextField id="title"
                            label="title"
                            {...register("title", {
                                required: "Product Title is required"
                            })}
                            variant="outlined"
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

                            sx={{ mb: 2 }}
                            rows={4}
                            multiline
                            {...register("description", {
                                required: "Description is required"
                            })}
                            error={errors.description}
                            helperText={errors.description && errors.description.message}

                        />

                        <Stack direction={{ xs: "column-reverse", sm: "row" }}
                            style={{ display: `${productImage ? 'flex' : 'none'}`, justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: '16px' }}
                        >
                            <img src={productImage && URL.createObjectURL(productImage)} height={100} width={100}  />

                            {productImage && (
                                <Typography variant="h5" color="initial">
                                    Selected file: {productImage.name}
                                </Typography>
                            )}

                        </Stack>

                        <TextField
                            {...register("image", {
                                required: "Image is required"
                            })}
                            id="image"
                            label="image"
                            fullWidth
                            onChange={e => setProductImage(e.target.files[0])}
                            type='file'
                            error={!!errors.image}
                            helperText={errors.image && errors.image.message}

                        />



                        <Button type='submit' variant="outlined" color="primary" onClick={handleSubmit(clickFunction)}>
                            Add Product
                        </Button>


                    </form>

                </div>

            </Box>
        </div>
    )
}
