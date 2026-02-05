export interface ICustomerRegister {
    razaoSocial: string,
    cnpj: string,
    diasFuncionamento: string[],
    horarioFuncionamentoInicio: string,
    horarioFuncionamentoFim: string,
    tipoRestaurante: string,
    tipoRestauranteOutro: string,
    nomeResponsavel: string,
    cpfResponsavel: string,
    whatsapp: string,
    email: string,
    senha: string,
    confirmaSenha: string,
    terms: boolean
}