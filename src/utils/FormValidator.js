import validador from 'validator';

class FormValidator{

    constructor(validacoes){
        this.validacoes = validacoes;
    }

    valida(state) {

        let validacao = this.valid();
    
        this.validacoes.forEach(regra => {
            const campoValor = state[regra.campo.toString()];
            const args = regra.args  || [];
            const metodoValidacao = typeof regra.metodo === 'string' ? validador[regra.metodo] : regra.metodo
        
            if(metodoValidacao(campoValor, ...args, state) !== regra.validoQuando){
                validacao[regra.campo] = {
                    isInvalid: true,
                    message: regra.mensagem
                }
                validacao.isValid = false;
            }
        });
    
        return validacao;
    }

    valid(){
        const validacao = {
    
        }
    
        this.validacoes.map(regra => (
            validacao[regra.campo] = {isInvalid: false, message: ''}
        ));
    
        return {isValid: true, ...validacao};
    }
}

export default FormValidator;