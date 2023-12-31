import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './home.css'

export default function Home () {

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
              params: {
                api_key: "b514e947d353222bc96363f835bc2027",
                language: "pt-BR",
                page: 1
              },
            })

            setFilmes(response.data.results.slice(0, 14))
            setLoading(false)
        }

        loadFilmes()

    }, [])

    if(loading){
        <div className='loading'>
            <h2>Carregando Filmes...</h2>
        </div>
    }

    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return (
                      <article key={filme.id}>
                        {/* <strong>{filme.title}</strong> */}
                        
                        <Link to={`/filme/${filme.id}`}><img
                          src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title}
                        /></Link>
                      </article>
                    )
                })}
            </div>
            
        </div>
    )
} 