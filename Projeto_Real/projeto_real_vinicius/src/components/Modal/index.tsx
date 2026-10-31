import ExternalModal from "react-modal"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

ExternalModal.setAppElement('#root')

interface ExternalModalProps {
    closeModal: () => void;
    modalIsOpen: boolean;
    children: React.ReactNode;
}

export default function Modal({ closeModal, modalIsOpen, children }: ExternalModalProps) {
    return (
        <ExternalModal onRequestClose={closeModal} isOpen={modalIsOpen} style={customStyles}>
            {children}
        </ExternalModal>
    )
}