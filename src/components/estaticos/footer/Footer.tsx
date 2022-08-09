import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material'
import './Footer.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
function footer() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
        );
        var footerComponent;
if(token!==""){
	footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
    <Grid alignItems="center" item xs={12}>
        <Box className='box1'>
            <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h5" align="center" gutterBottom className='textos'>Siga-nos nas redes sociais </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <a href="https://www.facebook.com/leonardo.luizrampazi/" target="_blank" rel="noreferrer">
                    <FacebookIcon className='redes' />
                </a>
                <a href="https://www.instagram.com/leorampazi/" target="_blank" rel="noreferrer">
                    <InstagramIcon className='redes' />
                </a>
                <a href="https://www.linkedin.com/in/leonardo-rampazi-159838230/" target="_blank" rel="noreferrer">
                    <LinkedInIcon className='redes' />
                </a>
            </Box>
        </Box>
        <Box className='box2'>
            <Box paddingTop={1}>
                <Typography variant="subtitle2" align="center" gutterBottom className='textos' >© 2022 Copyright:</Typography>
            </Box>
            <Box>
                <a target="_blank" href="https://brasil.generation.org" rel="noreferrer" className='text-decoration-none'>
                    <Typography variant="subtitle2" gutterBottom className='textos' align="center">Leo Turma 54 brasil.generation.org</Typography>
                </a>
            </Box>
        </Box>
    </Grid>
</Grid>

}
    return (
        <>
           {footerComponent} 
        </>
    )
}
export default footer;