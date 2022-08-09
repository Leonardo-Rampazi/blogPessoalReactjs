import React, { useEffect } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import {Box} from '@mui/material'
import './Home.css';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/modalPostagem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { Link } from 'react-router-dom';

function home() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let History = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
        );
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (token == "") {
          alert("Você precisa estar logado")
          History("/login")
  
      }
  }, [token])
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <ModalPostagem/>
                        <Box marginRight={1}>
                        </Box>
                        <Link to ="/postagens" className='text-decoration-none'>
                            <Button variant="outlined" className='botao'>Ver Postagens</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://png.pngtree.com/illustrations/20190321/ourlarge/pngtree-office-jobs-cartoon-vector-png-image_32123.jpg" alt=""style={{width:"400px", height:"400px", marginLeft:"35%" , padding:"20px",borderRadius:"10%"}}/>
                </Grid>
                <Grid xs={12} className='postagens'>
                <TabPostagem/>
                </Grid>
            </Grid>
        </>
    );
}
export default home;