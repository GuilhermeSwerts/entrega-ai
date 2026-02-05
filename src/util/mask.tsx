export function maskValue(price: number) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function maskCpf(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
}

export function maskCnpj(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 18);
}


export function maskCep(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
}

export function maskPhone(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
}

export function onlyNumbersInput(value: string) {
    return value.replace(/\D/g, '');
}

export function maskDate(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 10);
}

export function maskDateTime(value: string) {
    const date = value.split('T')[0];
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

export const formatDateForApi = (dateOfBirth: string) => {
    const [day, month, year] = dateOfBirth.split('/');
    return `${year}-${month}-${day}`;
};
