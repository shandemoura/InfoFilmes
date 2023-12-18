import './header.css'
import { Link } from 'react-router-dom'

export function Header () {
    return (
        <header>
            <Link className='logo' to="/">Info Filmes</Link>
            <Link className='favoritos' to="/favoritos">Meus Favoritos</Link>
        </header>
    )
}