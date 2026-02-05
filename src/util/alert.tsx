import Swal from 'sweetalert2'

const Alert = (texto: string, sucesso: boolean = true) => {
    Swal.fire({
        title: sucesso ? "" : "Atenção",
        html: texto,
        icon: sucesso ? "success" : "error"
    });
};

const Question = (texto: string, subtext: string = "") => {
    return new Promise((resolve) => {
        Swal.fire({
            title: texto,
            text: subtext,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SIM",
            cancelButtonText: "NÃO"
        }).then((result) => {
            resolve(result.isConfirmed);
        });
    });
};

const Info = (texto: string, title: string = "") => {
    Swal.fire({
        title: title,
        icon: "info",
        html: texto
    });
};


export { Alert, Question, Info };