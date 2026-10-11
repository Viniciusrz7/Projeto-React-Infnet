import "./app.css"

export default function App() {
    let nome = "Infnet"
    nome = "Infnet 2.0"
    return (
        <div className="container">
           <p style={{ color: 'white' }}>Hello {nome}</p>
        </div>
    )
}

export const App2 = () => {
    let nome = "Vinicius"
    return (
        <div className="vinicius">
           <p style={{ color: 'blue' }}>Hello {nome}</p>
        </div>
    )
}

