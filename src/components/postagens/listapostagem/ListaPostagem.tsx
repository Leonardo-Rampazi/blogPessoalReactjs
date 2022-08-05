import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import {Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import {Box} from '@mui/material'
import './ListaPostagem.css';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom'

function ListaPostagem() {
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const [token] = useLocalStorage('token');
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      navigate("/login")

    }
  }, [navigate, token])

  async function getPostagens() {
    await busca("/postagens", setPostagens, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPostagens()

  }, [getPostagens, postagens.length])

  return (
    <>
      {
        postagens.map(postagens => (
          <Box m={2} >
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Postagens
                </Typography>
                <Typography variant="h5" component="h2">
                  {postagens.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {postagens.texto}
                </Typography>
                <Typography variant="body2" component="p">
                  {postagens.data}
                </Typography>
                <Typography variant="body2" component="p">
                  {postagens.tema?.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${postagens.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${postagens.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }
    </>
  )
}

export default ListaPostagem;