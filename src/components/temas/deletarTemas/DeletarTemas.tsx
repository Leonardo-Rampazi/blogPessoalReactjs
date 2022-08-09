import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import { Box } from '@mui/material';
import './DeletarTemas.css';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';


function DeletarTemas() {
  let History = useNavigate();
  const { id } = useParams<{id: string}>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
    );

  const [temas,setTemas] = useState<Tema>()
useEffect(() =>{
	if(token==""){
	alert("Você precisa estar logado")
	History("/login")
	}
},[token])
useEffect(()=>{
	if(id !== undefined){
	findById(id)
	}	
}, [id])
async function findById(id: string){
	buscaId(`/temas/${id}`,setTemas, {
		headers: {
			'Authorization': token
		}
	})
     }
  
     function sim(){
      History('/temas')
      deleteId(`/temas/${id}`,{
      headers:{
        'Authorization':token
      }
    });
      alert('Tema deletado com sucesso');
      }
      function nao(){
      History('/temas')
      }
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">
                {temas?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim}variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao}variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTemas;