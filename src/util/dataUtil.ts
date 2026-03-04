export const Terms = [
    { label: "Termos e Condições", href: "/regulamento.pdf" },
    // { label: "Regulamento da Promoção Comercial", href: "/regulamento.pdf" },
    { label: "Aviso de Privacidade", href: "/termos-de-privacidade.pdf" },
]

export const normalizeTime = (value?: string | null) => {
    if (!value) return value;

    // já está HH:mm:ss
    if (/^\d{2}:\d{2}:\d{2}$/.test(value)) {
        return value;
    }

    // HH:mm → HH:mm:00
    if (/^\d{2}:\d{2}$/.test(value)) {
        return `${value}:00`;
    }

    return value; // deixa passar, backend valida
};