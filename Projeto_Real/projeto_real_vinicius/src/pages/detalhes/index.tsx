import Container from "../../templates/container"
import { useNavigate, useParams } from "react-router"
import { api } from "../../service/api"
import { useQuery, useMutation } from "@tanstack/react-query"
import type { ProdutoResponse } from "../home/types"
import "./styles.css"
import { FiEdit, FiTrash } from "react-icons/fi"
import { useState } from "react"
import Modal from "../../components/Modal"
import { toastError, toastSuccess } from "../../utils/toast"

export default function Detalhes() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    async function getProdutoDetalhe() {
        return (await api.get<ProdutoResponse>(`/produtos/${params.id}`)).data
    }

    function openModal() {
        setModalIsOpen(true)
    }
    function closeModal() {
        setModalIsOpen(false)
    }

    async function removeProduct() {
        return await api.delete(`/produtos/${params.id}`)
    }

    const deleteMutation = useMutation({
        mutationFn: removeProduct,
        onSuccess: () => {
            toastSuccess("Produto deletado com sucesso")
            closeModal()
            navigate(-1)
        }, onError: () => {
            toastError("Erro ao deletar produto")
        },
        retryDelay: 3000,
    })
    
    const query = useQuery({ queryKey: ['produto', params.id], queryFn: getProdutoDetalhe, staleTime: 1000 * 60 * 5 })

    return (
        <Container>
            <div className="detalhes-content">
                <FiEdit className="detalhes-edit" />
                <FiTrash className="detalhes-delete" onClick={openModal} />
                <h1 className="detalhes-titulo">Detalhes do produto {params.id}</h1>
                {query.isFetching ? <p className="detalhes-carregando">Carregando detalhes do produto</p> : (
                    <div className="detalhes-produto">
                        <img className="image" src={query.data?.imagem} alt={query.data?.nome} />
                        <h2 className="detalhes-nome">{query.data?.nome}</h2>
                        <p className="detalhes-fabricante">{query.data?.fabricante}</p>
                        <p className="detalhes-preco">R$ {query.data?.preco.toFixed(2).replace('.', ',')}</p>
                    </div>
                )}
            </div>
            <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
                <h3 className="modal-titulo">Tem certeza que deseja excluir este produto?</h3>
                <div className="modal-botoes">
                    {deleteMutation.isPending ? (<p>Apagando...</p>) : (<button className="modal-botao modal-botao-sim" onClick={()=>{deleteMutation.mutate()}}>Sim</button>)}
                    <button className="modal-botao modal-botao-nao" onClick={closeModal}>Não</button>
                </div>
            </Modal>
        </Container>
    )
}