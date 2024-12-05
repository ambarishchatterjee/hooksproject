import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/registration/registration";
import Profile from "./pages/auth/profiledetails/profile";
import ProductList from "./pages/product/ProductList";
import AddProduct from "./pages/product/AddProduct";
import ProductDetails from "./pages/product/ProductDetails";

const publicRoute = [
  {
    path: '',
    component: <Login /> 
  },
  {
    path: '/registration',
    component: <Registration />
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
  }

]
const protectedRoute = [
  {
    path: '/profile',
    component: <Profile />
  }
]

function App() {
  return (
    <Router>
      <Routes>
        {publicRoute.map((route)=>{
          return(
            <>
            <Route path={route.path} element={route.component} />
            
            </>
          )
        })}
        
      </Routes>
    </Router>
  )
}

export default App;
