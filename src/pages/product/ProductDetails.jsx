import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance, { productImage } from '../../api/axios'
import { endPoints } from '../../api/endPoints'
import { Box, Typography, Button } from '@mui/material'

export default function ProductDetails() {
    const [list, setList] = useState()

    const { id } = useParams()
    //const formData = new FormData()
    //formData.append("id", id)

    const fetchData = async (data) => {

        try {
            const { data } = await axiosInstance.get(endPoints.product.productdetails + id)
            setList(data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData()
    },[])
    return (
        <>
            <Box width={600} padding={2} bgcolor={'#f5f5f5'} marginX={'auto'} >
                <Typography variant="h1" color="initial" fontSize={40}>{list?.title}</Typography>
                <img src={productImage(list?.image)} alt={list?.title} />
                <Typography variant="body1" color="initial" fontSize={16}>
                    {list?.description}
                </Typography>

                <Link to="/products" style={{marginTop: '16px'}}>
                    <Button variant="contained" color="secondary">
                        All Products
                    </Button>
                </Link>

            </Box>

        </>
    )
}
