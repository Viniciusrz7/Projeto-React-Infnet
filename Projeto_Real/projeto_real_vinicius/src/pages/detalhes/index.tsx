import Container from "../../templates/container"
import { useParams } from "react-router"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import type { ProdutoResponse } from "../home/types"
import "./styles.css"
import { FiEdit, FiTrash } from "react-icons/fi"
import Modal from "react-modal"
import { useState } from "react"

Modal.setAppElement('#root')

export default function Detalhes() {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const params = useParams()

    async function getProdutoDetalhe() {
        return axios.get<ProdutoResponse>(`http://localhost:3001/public/produtos/${params.id}`)
    }

    function openModal() {
        setModalIsOpen(true)
    }
    function closeModal() {
        setModalIsOpen(false)
    }

    const query = useQuery({ queryKey: ['produto', params.id], queryFn: getProdutoDetalhe, staleTime: 1000 * 60 * 5 })

    return (
        <Container>
            <div className="detalhes-content">
                <FiEdit className="detalhes-edit" size={30} />
                <FiTrash className="detalhes-delete" size={30} onClick={openModal} />
                <h1 className="detalhes-titulo">Detalhes do produto {params.id}</h1>
                {query.isFetching ? <p className="detalhes-carregando">Carregando detalhes do produto</p> : (
                    <div className="detalhes-produto">
                        <img className="image" src={query.data?.data.imagem} alt={query.data?.data.nome} />
                        <h2 className="detalhes-nome">{query.data?.data.nome}</h2>
                        <p className="detalhes-fabricante">{query.data?.data.fabricante}</p>
                        <p className="detalhes-preco">R$ {query.data?.data.preco.toFixed(2).replace('.', ',')}</p>
                    </div>
                )}
            </div>
            <Modal onRequestClose={closeModal} isOpen={modalIsOpen} className="modal-content">
                <h3 className="modal-titulo">Tem certeza que deseja excluir este produto?</h3>
                <div className="modal-botoes">
                    <button className="modal-botao modal-botao-sim" onClick={closeModal}>Sim</button>
                    <button className="modal-botao modal-botao-nao" onClick={closeModal}>Não</button>
                </div>
            </Modal>
        </Container>
    )
}