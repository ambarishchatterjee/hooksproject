import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { endPoints } from "../../api/endPoints";
import { Link } from "react-router-dom";
import { Add, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";


export default function ProductList() {
  const [list, setList] = useState()

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete the product?")) {
      const formData = new FormData()
      formData.append("id", id)
      try {
        const { data } = await axiosInstance.post(endPoints.product.removeProduct, formData)
        if (data.status === 200) {
          toast.success(data.message)
          fetchData()
        } else {
          toast.error(data.message)
        }
      } catch (error) {

      }
    }
  }

  const fetchData = async (data) => {

    try {
      const { data } = await axiosInstance.post(endPoints.product.productList)
      //console.log(data.data)
      setList(data.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <>
      <Box width={600} marginX={'auto'} marginTop={4} padding={4} bgcolor={'#f5f5f5'} display={"flex"} flexDirection={"column"} gap={2}>
        <Typography variant="h1" color="initial" fontSize={40}>Products</Typography>
        <List>
          {list?.map((product) => {
            //console.log(product._id)
            return (
              <ListItem
                key={product._id}
                secondaryAction={
                  <IconButton aria-label="delete" onClick={() => handleDelete(product._id)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    {product.image}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={product.title} secondary={product.description} />
              </ListItem>
            )
          })}
        </List>
        <Link to="/add-product">
          <Button variant="outlined" startIcon={<Add />} color="primary">
            Add New Product
          </Button>

        </Link>

      </Box>

    </>
  )
}
