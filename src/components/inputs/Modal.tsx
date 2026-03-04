import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

export type ModalRef = {
    openNew: (data?: any) => void;
    openEdit: (id: number, identifier: string) => void;
};

type ModalProps = {
    title?: string;
    hiddenButton?: boolean;
    children: React.ReactNode;
    buttonTitle?: string;
    funcNewItem?: () => void;
    funcEditItem?: (identifier: string) => void;
    onOpenEditCallBack?: (data: any) => void;
    onOpenNewItemCallBack?: (data?: any) => void;
    onViewCallBack?: (data: any) => void;
    onCloseCallBack?: () => void;
    isFullScreen?: boolean;
};

type ModalState = {
    show: boolean;
    isEdit: boolean;
    isView: boolean;
    identifier: string;
};

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -30 },
    visible: { opacity: 1, scale: 1, y: 0 },
};

class Modal extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = this.initialState;
    }

    initialState: ModalState = {
        show: false,
        isEdit: false,
        isView: false,
        identifier: "",
    };

    onOpenNew = (data?: any) => {
        this.setState({ show: true });
        this.props.onOpenNewItemCallBack?.(data);
    };

    onOpenEdit = (data: any) => {
        this.setState({ show: true, isEdit: true });
        this.props.onOpenEditCallBack?.(data);
    };

    onClose = () => {
        this.setState(this.initialState);
        this.props.onCloseCallBack?.();
    }

    onView = (data: any) => {
        this.setState({ show: true, isView: true });
        this.props.onViewCallBack?.(data);
    };

    render() {
        const { show, isEdit, identifier } = this.state;
        const { children, buttonTitle = "Salvar", funcNewItem, funcEditItem, hiddenButton = false, isFullScreen = false, title } = this.props;

        return (
            <AnimatePresence>
                {show && (
                    <motion.div
                        className="fixed h-screen inset-0 z-2000 flex items-center justify-center bg-black/50 bg-opacity-50"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={backdropVariants}
                    >
                        <motion.div
                            className={`overflow-y-auto max-h-[95vh] bg-white rounded-2xl shadow-xl ${!isFullScreen ? 'max-w-md w-full' : 'w-[90vw]'} p-6 relative`}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={modalVariants}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className={`flex items-center ${!title ? 'justify-end' : 'justify-between'}`}>
                                {title}
                                <Button variant="outline" onClick={this.onClose}>
                                    &times;
                                </Button>
                            </div>

                            <div className="mt-4">{children}</div>

                            {!this.state.isView && <div className="flex items-center justify-end mt-6">
                                {!hiddenButton && <Button variant="primary" onClick={() => isEdit ? funcEditItem?.(identifier) : funcNewItem?.()}>
                                    {buttonTitle}
                                </Button>}
                            </div>}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
}

export default Modal;
