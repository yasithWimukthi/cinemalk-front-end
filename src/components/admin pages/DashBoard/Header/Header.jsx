import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import "./Header.scss"




const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();

    const logOut = () =>{
        localStorage.clear();
        window.location.href="/login"
    }

    return (
        <>

            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>

                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.warning.main,
                            color: theme.palette.warning.light,
                            '&:hover': {
                                background: theme.palette.warning.dark,
                                color: theme.palette.warning.main
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="theme.palette.warning.main"
                    >
                        <MenuIcon stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>



            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 2 }} />

            <button  className="logBtn" onClick={logOut}>Logout</button>

        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
