import React, { Component } from 'react';
import FormValidator from '../../utils/FormValidator';
import TextField  from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toast from '../../Toast/Toast';

class Formulario extends Component{

    constructor (props){
        super(props);

        this.validador = new FormValidator([
            {
                campo:'nome',
                metodo:'isEmpty',
                validoQuando:false,
                mensagem:'Entre com um nome'
            },
            {
                campo:'livro',
                metodo:'isEmpty',
                validoQuando:false,
                mensagem:'Entre com um livro'
            },
            {
                campo:'preco',
                metodo:'isInt',
                args: [{min:0, max:99999}],
                validoQuando:true,
                mensagem:'Entre com um valor númerico'
            }
        ]);

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valid(),
            mensagem:{
                open: true,
                texto: '',
                tipo: 'success'
            }
        }

        this.state = this.stateInicial;
    }

    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }

    submitFormulario = () => {

        const validacao = this.validador.valida(this.state);
    
        if(validacao.isValid) {
            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        }else{
            const {nome, livro, preco} = validacao;
            const campos = [nome, livro, preco];
    
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid;
            });
            
            const erros = camposInvalidos.reduce((texto, campo) => texto + campo.message + '. ', '');
            
            this.setState({
                mensagem:{
                    open: true,
                    texto: erros,
                    tipo: 'error'
                }
            })
        }
    }

    render(){

        const { nome, livro, preco} = this.state;

        return(
            <>
            <Toast  open={this.state.mensagem.open} 
                    handleClose={() => this.setState({mensagem: {open: false}})}
                    severity={this.state.mensagem.tipo}>
                    {this.state.mensagem.texto}
            </Toast>
            <form>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                        <TextField id='nome' 
                                   label='Nome' 
                                   name='nome' 
                                   value={nome} 
                                   onChange={this.escutadorDeInput} 
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField id='livro' 
                                   label='Livro' 
                                   name='livro' 
                                   value={livro} 
                                   onChange={this.escutadorDeInput} 
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid className="col s4">
                        <TextField id='preco' 
                                   label='Preço' 
                                   name='preco' 
                                   value={preco} 
                                   onChange={this.escutadorDeInput} 
                                   variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Button 
                            onClick={this.submitFormulario} 
                            type='button' 
                            color='primary'
                            variant='contained'>
                                Salvar
                        </Button>   
                    </Grid>
                </Grid>       
            </form>
            </>
        )
    }
}

export default Formulario;