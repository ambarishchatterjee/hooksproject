import { Box, Typography, Button, Grid2, Card, CardMedia, CardContent, CardActions, IconButton, Pagination, ButtonGroup, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance, { productImage } from "../../api/axios";
import { endPoints } from "../../api/endPoints";
import { Link, useNavigate } from "react-router-dom";
import { Add, Delete, DeleteOutline, EditOutlined, GridOnOutlined, LinkOutlined, ListAltOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import SweetAlertComponent from "../../ui/SweetAlert";


export default function ProductList({ userlogin }) {
  const [list, setList] = useState()
  const [modal, setModal] = useState()
  const [delete1, setDelete] = useState("")
  const [totalpages, setTotalpages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [listview, setListview] = useState(false)

  const navigate = useNavigate()


  const handleDelete = async () => {
    console.log(currentPage);
    setCurrentPage()

    //setModal(true)
    // if (window.confirm("Do you really want to delete the product?")) {

    const formData = new FormData()
    formData.append("id", delete1)
    try {
      const { data } = await axiosInstance.post(endPoints.product.removeProduct, formData)

      if (data.status === 200) {
        setTotalpages(data.totalPages)

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

  const fetchData = async (data) => {

    const formData = new FormData()
    formData.append("page", currentPage)
    formData.append("perpage", 10)

    try {
      const { data } = await axiosInstance.post(endPoints.product.productList, formData)
      if (data.status === 201) {
        setCurrentPage(data.totalPages)
      }

      setList(data.data)
      setTotalpages(data.totalPages)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }


  return (
    <>
      <Box marginX={'auto'} padding={4} bgcolor={'#f5f5f5'} display={"flex"} flexDirection={"column"} gap={2}>
        <Typography variant="h1" color="initial" fontSize={40}>Products</Typography>

        <Link to="/add-product">
          <Button variant="outlined" startIcon={<Add />} color="primary">
            Add New Product
          </Button>
        </Link>

        <ButtonGroup color="secondary" aria-label="" >
          <Button variant={!listview ? "contained" : "outlined"} startIcon={<GridOnOutlined />} onClick={() => setListview(false)}>Grid</Button>
          <Button variant={listview ? "contained" : "outlined"} startIcon={<ListAltOutlined />} onClick={() => setListview(true)}>List</Button>

        </ButtonGroup>


        <Grid2 container spacing={2}>


          {list?.map((product) => {
            //console.log(product._id)
            return (
              <>
                {!listview && (
                  <Grid2 size={2.4} key={product._id}>
                    <Card>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={productImage(product.image)}
                        title={product.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title}
                        </Typography>

                      </CardContent>
                      <CardActions>
                        <Button size="small" color="secondary" onClick={() => { navigate(`/product/${product._id}`) }}>
                          <LinkOutlined />
                        </Button>

                        <Button size="small" color="primary" onClick={() => { navigate(`/product/update/${product._id}`) }}>
                          <EditOutlined />
                        </Button>

                        <Button size="small" onClick={() => ((setDelete(product._id), setModal(true)))}><DeleteOutline /></Button>
                      </CardActions>

                    </Card>
                  </Grid2>
                )}
                {listview && (
                  <>
                    <ListItem
                      key={product._id}
                      secondaryAction={
                        // <IconButton aria-label="delete" onClick={() => handleDelete(product._id)}>
                        <>
                          <IconButton aria-label="details" onClick={() => { navigate(`/product/${product._id}`) }}>
                            <LinkOutlined />
                          </IconButton>
                          <IconButton aria-label="edit" onClick={() => { navigate(`/product/update/${product._id}`) }}>
                            <EditOutlined />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={() => ((setDelete(product._id), setModal(true)))}>
                            <DeleteOutline />
                          </IconButton>
                        </>

                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <img src={productImage(product.image)} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={product.title} secondary={product.description} />
                    </ListItem>
                  </>
                )}


              </>
            )
          })}
        </Grid2>

        <Box display={"flex"} justifyContent={"center"} padding={4} bgcolor={'#fff'}>
          {totalpages > 0 && (
            <Pagination count={totalpages} page={currentPage} onChange={handlePageChange} shape="rounded" />
          )}
        </Box>
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
