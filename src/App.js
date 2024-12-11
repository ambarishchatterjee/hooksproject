import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/registration/registration";
import Profile from "./pages/auth/profiledetails/profile";
import ProductList from "./pages/product/ProductList";
import AddProduct from "./pages/product/AddProduct";
import ProductDetails from "./pages/product/ProductDetails";
import Wrapper from "./pages/layout/wrapper/Wrapper";
import toast from "react-hot-toast";
import UpdateProduct from "./pages/product/UpdateProduct";

const publicRoute = [
  {
    path: '',
    component: <Login /> 
  },
  {
    path: '/registration',
    component: <Registration />
  }
]
const protectedRoute = [
  {
    path: '/profile',
    component: <Profile />
  },
  {
    path: '/add-product',
    component: <AddProduct />
  },
  {
    path: '/products',
    component: <ProductList />
  },
  {
    path: '/product/:id',
    component: <ProductDetails />
  },
  {
    path: '/product/update/:id',
    component: <UpdateProduct />
  }
]

function Private_router( {children} ) {

  const token = localStorage.getItem("token")

  return token != null || token != undefined ? (
    children
  ): (
    <>
    <Navigate to={'/'} />
    {toast.error("Login first")}
    </>
  )
  
}

function App() {

  
  return (
    <Router>
      <Wrapper>
      <Routes>
        {publicRoute.map((route)=>{
          return(
            <>
            <Route path={route.path} element={route.component} />
            
            </>
          )
        })}
        
      </Routes>

      <Routes>
        {protectedRoute.map((route)=>{
          return(
            <>
            <Route path={route.path} element={<Private_router>{route.component}</Private_router>} />
            </>
          )
        })}
      </Routes>
      </Wrapper>
    </Router>
  )
}

export default App;
