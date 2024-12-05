import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Button, IconButton, Grid, Grid2, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance, { productImage } from "../../api/axios";
import { endPoints } from "../../api/endPoints";
import { Link, useNavigate } from "react-router-dom";
import { Add, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";
import SweetAlertComponent from "../../ui/SweetAlert";


export default function ProductList() {
  const [list, setList] = useState()
  const [modal, setModal] = useState()
  const [delete1, setDelete] = useState("")

  const navigate = useNavigate()

  const handleDelete = async () => {
    //setModal(true)
    // if (window.confirm("Do you really want to delete the product?")) {
    console.log(delete1);
    //setDelete(id)
    const formData = new FormData()
    formData.append("id", delete1)
    try {
      const { data } = await axiosInstance.post(endPoints.product.removeProduct, formData)
      console.log(data);

      if (data.status === 200) {
        // setDelete(delete1)
        //setModal(true)
        toast.success(data.message)
        setModal(false)
        fetchData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);

    }
    //}
  }

  const handleDeletep = () => {

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
      <Box marginX={'auto'} padding={4} bgcolor={'#f5f5f5'} display={"flex"} flexDirection={"column"} gap={2}>
        <Typography variant="h1" color="initial" fontSize={40}>Products</Typography>
        <Grid2 container spacing={2}>


          {list?.map((product) => {
            //console.log(product._id)
            return (
              <Grid2 size={4} key={product._id}>
                <Card>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={productImage(product.image)}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => { navigate(`/product/${product._id}`) }}>Learn More</Button>

                  </CardActions>
                  <button onClick={() => ((setDelete(product._id), setModal(true)))}>delete</button>
                </Card>
              </Grid2>
              // <ListItem
              //   key={product._id}
              //   secondaryAction={
              //     // <IconButton aria-label="delete" onClick={() => handleDelete(product._id)}>
              //     <IconButton aria-label="delete" onClick={() => handleDelete(product._id)}>
              //       <Delete />
              //     </IconButton>
              //   }
              // >
              //   <ListItemAvatar>
              //     <Avatar>
              //       <img src={productImage(product.image)} />
              //     </Avatar>
              //   </ListItemAvatar>
              //   <ListItemText primary={product.title} secondary={product.description} />
              // </ListItem>
            )
          })}
        </Grid2>
        <Link to="/add-product">
          <Button variant="outlined" startIcon={<Add />} color="primary">
            Add New Product
          </Button>

        </Link>

      </Box>

      {modal &&
        <SweetAlertComponent
          confirm={handleDelete}
          cancle={() => setModal(false)}
          title="Are You Sure?"
          subtitle="You Will Not Be Able To Recover This Product"
          type="warning"

        />
      }

    </>
  )
}
