import React , {useState, useEffect, ChangeEvent } from 'react';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import {Box} from '@mui/material'
import { Link,useNavigate } from 'react-router-dom';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

function CadastroUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [navigate, userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
       // Estrutura Condicional que verifica se as senhas batem e se a Senha tem mais de 8 caracteres
       if (confirmarSenha === user.senha && user.senha.length >= 8) {

        //Tenta executar o cadastro
        try {
            await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            toast.success('Usuario cadastrado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
                progress: undefined,
                });

        //Se houver erro, pegue o Erro e retorna uma msg
        } catch (error) {
            console.log(`Error: ${error}`)
            //Pode modificar a msg de acordo com o erro 
             toast.error('Usu??rio j?? existente. Favor verificar as informa????es de cadastro.', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
                progress: undefined,
                });
        }

    } else {
        toast.error('Dados inconsistentes(minimo 8 caracteres). Favor verificar as informa????es de cadastro.', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
            progress: undefined,
            });    // Mensagem que indica a quantidade minima de caracteres

        setUser({ ...user, senha: "" }) // Reinicia o campo de Senha
        setConfirmarSenha("")           // Reinicia o campo de Confirmar Senha
    }
}

/*
    = : atribui????o (valor = 9)
    == : op. aritmetico (valor == 9.0)
    === : op. id??ntico (valor === 9.0)
*/
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='background-image2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth placeholder='digite no minimo 5 caracteres'/>
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal'fullWidth placeholder='digite um email' />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth placeholder='digite uma senha minimo 8 caracteres'/>
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth placeholder='confirme a senha que digitou encima'/>
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                    Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>



        </Grid>
    );
}

export default CadastroUsuario;