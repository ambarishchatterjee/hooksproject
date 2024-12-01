import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { endPoints } from "../../api/endPoints";


export default function ProductList() {
  const [list, setList] = useState()

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
        {list?.map((product)=>{
          return(
            <ListItem>
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
      </Box>

    </>
  )
}
