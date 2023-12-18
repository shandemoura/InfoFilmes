import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from '../../services/api'
import './filme-info.css'
import { toast } from "react-toastify"

export default function Filme() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "b514e947d353222bc96363f835bc2027",
          language: "pt-BR",
        },
      })
      .then((response)=>{
        setFilme(response.data)
        setLoading(false)
      })
      .catch(()=>{
        console.log("FILME NÃO ENCONTRADO")
        navigate("/", {replace:true})
        return
      })
    }

    loadFilme()

    return ()=>{
      console.log("COMPONENTE DESMONTADO")
    }
  }, [navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix")

    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some((filmesSalvo)=>filmesSalvo.id===filme.id)

    if(hasFilme){
      toast.warn("Estre filme já está na sua lista")
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem("@primeflix",JSON.stringify(filmesSalvos))
    toast.success("Filme adicionado à sua lista!")

  }

  if(loading){
    return( <div className="filme-info">Carregando dados do filme...</div>)
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`} alt={filme.title}/>      
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / {filme.vote_count} votos</strong>
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button><a target="blank" rel="external" href={`http://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
      </div>
    </div>
  )
}
