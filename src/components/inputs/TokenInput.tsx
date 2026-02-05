import { useEffect, useRef, useState } from "react";

interface TokenInputProps {
    length?: number;
    label?: string;
    onComplete: (value: string) => void;
    onResend: () => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({ length = 6, onComplete, label, onResend }) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const [secondsLeft, setSecondsLeft] = useState(0);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // aceita letras e números
        if (!value) return;

        const chars = value.split("");

        // preenche os campos a partir do índice atual
        for (let i = 0; i < chars.length && index + i < length; i++) {
            const input = inputsRef.current[index + i];
            if (input) {
                input.value = chars[i].toUpperCase(); // opcional: transforma em maiúsculo
            }
        }

        const nextIndex = index + chars.length;
        if (nextIndex < length) {
            inputsRef.current[nextIndex]?.focus();
        } else {
            inputsRef.current[length - 1]?.blur(); // remove foco se terminou
        }

        checkComplete();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            const input = inputsRef.current[index];
            if (input && input.value === "") {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    const checkComplete = () => {
        const code = inputsRef.current.map(input => input?.value || "").join("");
        if (code.length === length) {
            onComplete(code);
        }
    };

    const handleResendClick = () => {
        if (secondsLeft === 0) {
            onResend();
            setSecondsLeft(180); // 3 minutos
        }
    };

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/[^a-zA-Z0-9]/g, "");
        const chars = pastedData.slice(0, length).split("");

        // Preenche os campos
        inputsRef.current.forEach((input, i) => {
            if (input) input.value = chars[i] || "";
        });

        if (chars.length === length) {
            inputsRef.current[length - 1]?.blur();
            checkComplete();
        } else {
            inputsRef.current[chars.length]?.focus();
        }
    }

    return (
        <div className="flex flex-col items-center  space-y-1">
            {label && (
                <label htmlFor="category" className="text-sm text-pink-500">
                    {label}
                </label>
            )}
            <div className="flex space-x-2">
                {Array.from({ length }).map((_, i) => (
                    <input
                        onPaste={onPaste}
                        key={i}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        ref={(el) => {
                            inputsRef.current[i] = el;
                        }}
                        onChange={(e) => handleInput(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className="w-12 h-12 text-center text-xl border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>

            {secondsLeft > 0 ? (
                <small className="text-pink-400">
                    Aguarde {formatTime(secondsLeft)} para reenviar
                </small>
            ) : (
                <small className="text-pink-400">
                    Não recebeu?{" "}
                    <button
                        onClick={handleResendClick}
                        className="cursor-pointer duration-500 hover:underline hover:text-pink-700"
                    >
                        clique aqui
                    </button>
                </small>
            )}
        </div>
    );
};