import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axiosInstance, { productImage } from '../../../api/axios';
import { endPoints } from '../../../api/endPoints';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const privateMenu = [
  {
    text: 'products',
    link: '/products'
  }
]

const publicMenu = [
  {
    text: 'Sign Up',
    link: '/registration'
  },
  {
    text: 'Login',
    link: '/'
  }
]




export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userData, setUserDetails] = React.useState()
  const [isLogin, setIsLogin] = React.useState(false)


  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get(endPoints.auth.profile)
      if (data.status === 200) {
        setUserDetails(data.data)
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error);

    }

  }
  React.useEffect(() => {
    fetchData()
    const token = localStorage.getItem("token")
    if( token != null || token != undefined){
      setIsLogin(true)
    }
  }, [])

  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);

  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
    handleCloseUserMenu()

  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {privateMenu.map((page) => (
              <Link to={page.link} key={page.index}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.text}
                </Button>
              </Link>

            ))}

          </Box>
          {userData && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userData && userData.first_name} src={userData && productImage(userData.image)} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem key={'profile'}>
                  <Link to='/profile'><Typography sx={{ textAlign: 'center' }}>Profile </Typography></Link>
                </MenuItem>
                <MenuItem onClick={handleLogout} key={'logout'}>
                  <Typography sx={{ textAlign: 'center' }}>Logout </Typography>
                </MenuItem>

              </Menu>

            </Box>
          )}


          {!isLogin && (
            <Link to="/" >
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            </Link>
          )

          }


        </Toolbar>
      </Container>
    </AppBar>
  );
}