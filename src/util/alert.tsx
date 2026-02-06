import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

export const Alert = (title: string = 'Sucesso!', text: string = '', success: boolean = true, toastAlert: boolean = true, info: boolean = false) => {
    info && Swal.fire({
        title: title,
        text: text,
        icon: "info"
    });
    success && !info && toastAlert && toast.success(<div>
        <p className="font-bold text-green-600">{title}</p>
        <p>{text}</p>
    </div>)
    success && !info && !toastAlert &&
        Swal.fire({
            title: title,
            html: text.replace(/\n/g, '<br>'),
            icon: "success"
        });
    !success && !info && toastAlert && toast.error(<div>
        <p className="font-bold text-green-600">{title}</p>
        <p>{text}</p>
    </div>)
    !success && !info && !toastAlert &&
        Swal.fire({
            title: title === '' ? "Atenção" : title,
            html: text.replace(/\n/g, '<br>'),
            icon: "error"
        });
};

type iconQuestion = 'success' | 'error' | 'warning' | 'info' | 'question'

export const Question = (
    title: string,
    text: string = '',
    confirmButtonText = 'SIM',
    cancelButtonText = 'NÃO',
    icon: iconQuestion = 'warning',
    confirmButtonColor = '#3085d6',
    cancelButtonColor = '#d33',
) => {
    return new Promise((resolve) => {
        Swal.fire({
            title: title,
            text: text,
            icon,
            showCancelButton: true,
            confirmButtonColor,
            cancelButtonColor,
            confirmButtonText,
            cancelButtonText,
        }).then((result) => {
            resolve(result.isConfirmed);
        });
    });
};
