import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import logo from './logo.png';


const pages = ['Home', 'Visualize', 'History','Likes','My Account'];


function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" sx={{

      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(24,24,27, 0.8)",
    }}>
      
      <Container maxWidth="xl">
        
        <Toolbar disableGutters>


          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Inter',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              justifyContent: 'center',
            }}
          >
            <img src={logo} style={{width:"130px"}}></img>
          </Typography>


          
          <Box sx={{ justifyContent:"center", flexGrow: 1, display: { xs: 'none', md: 'flex'}, position:'relative',}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',
                fontFamily: 'Inter',
                fontWeight: 700,
                size: '.875rem',
              lineHeight: '1.25rem',
              }}
              >
                {page}
              </Button>
            ))}
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Devpost">

              
            <Button variant="contained" sx={{background:'linear-gradient(90deg, #283593 0%, #3949AB 100%)', color:'white', fontFamily: 'Inter',fontWeight:'700',
            }}>Devpost</Button>
            
            </Tooltip>
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;