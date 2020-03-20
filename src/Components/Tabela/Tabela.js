import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CellDeleta = ({removeDados, id}) => {
    if(!removeDados){
        return null;
    }

    return(
        <TableCell>
            <Button onClick={() => { removeDados(id) }} variant="contained" color="primary">Remover</Button>
        </TableCell>    
    )
};

const TituloDeleta = ({removeDados}) => {
    if(!removeDados){
        return null;
    }

    return <TableCell>Remover</TableCell>
}

const Tabela = props => {
    const { campos, dados, removeDados } = props;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {
                        campos.map((campo, index) => (
                            <TableCell key={index}>{campo.titulo}</TableCell>
                        ))
                    }
                    <TituloDeleta removeDados={removeDados}/>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    dados.map(dados => (
                        <TableRow key={dados.id}>
                            {
                                campos.map((campo, index) => (
                                    <TableCell key={index}>{dados[campo.dado]}</TableCell>
                                ))
                            }                            
                            <CellDeleta id={dados.id} removeDados={removeDados}/>                            
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default Tabela;