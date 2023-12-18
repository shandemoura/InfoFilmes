import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./favoritos.css"
import { toast } from "react-toastify"

export function Favoritos() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix")
    setFilmes(JSON.parse(minhaLista) || [])
  }, [])

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id
    })

    setFilmes(filtroFilmes)
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
    toast("Filme removido dos favoritos!")
  }

  return (
    <div className="meus-filmes">
      <h1>Meus Filmes Favoritos</h1>

      {filmes.length === 0 && <span>Você ainda não tem nenhum favorito!</span>}

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <div className="movie">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                />
                <div>
                  <h4>{item.title}</h4>
                  <span>({item.original_title})</span>
                </div>
              </div>
              <div className="buttons">
                <Link to={`/filme/${item.id}`}><button>Ver detalhes</button></Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
