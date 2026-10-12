interface Props {
    color?: string
    title: string
    text?: string
    contador?: number
    incrementar?: () => void
    setContador?: React.Dispatch<React.SetStateAction<number>>
}

export default function Container({title, text, color,contador,incrementar,setContador }: Props) {
    return (
        <div style={{backgroundColor: color}}>
            <h1>{title}</h1>
            <p>{text ? text : "Nenhum texto disponível"}</p>
            <p>Contador: {contador}</p>
            {incrementar ? <button onClick={incrementar}>Incrementar</button> : null}
            {setContador ? <button onClick={() => setContador(contador! + 1)}>Incrementar com setContador</button> : null}
        </div>
    )
}



