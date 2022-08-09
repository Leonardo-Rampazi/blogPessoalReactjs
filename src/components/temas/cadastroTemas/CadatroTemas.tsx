import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { useNavigate, useParams} from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import './CadastroTemas.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';


function CadastroTema() {
  let History = useNavigate();
  const { id } = useParams<{id: string}>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
    );

  const [temas,setTemas] = useState<Tema>({
	id: 0,
	descricao:''
})
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
			'authorization': token
		}
	})
     }
     function updatedTemas(e: ChangeEvent<HTMLInputElement>){
        setTemas({
            ...temas,
            [e.target.name]: e.target.value,
        })
      }
      async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        console.log("tema"+ JSON.stringify(temas))
    
        if(id!==undefined) {
            console.log(temas)
            put(`/temas`,temas,setTemas,{
                headers:{
                'authorization': token
                }
            })
            alert('tema atualizado com sucesso');
        }else{
            post(`temas`,temas,setTemas, {
                headers: {
                    'authorization': token
                }
            })
            alert('temas cadastrado com sucesso');
        }
        back()
    }
    function back(){
        History('/temas')
    }
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit ={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={temas.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTemas(e)}id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}
export default CadastroTema;