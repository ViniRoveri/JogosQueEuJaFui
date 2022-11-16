import { Link } from 'react-router-dom'
import Logo from '../img/Logos/Logo-Vini-Roveri-100.png'
import {ReactComponent as ArrowDown} from '../img/Arrows/Arrow-Down.svg'
import {ReactComponent as ArrowUp} from '../img/Arrows/Arrow-Up.svg'
import { useEffect, useState } from 'react'

const Header = ()=>{
    const [aberturaHeader,setAberturaHeader] = useState('fechado')
    const [itemAtivo,setItemAtivo] = useState(window.location.pathname)
    useEffect(()=>{
        setItemAtivo(window.location.hash)
    })

    return(
        <header className="header" style={aberturaHeader==='aberto'?{height:'218px'}:{}}>
            <div className="header-topo">
                <img src={Logo} alt="Logo Vini Roveri" className='header-logo'/>
            </div>
            <nav className={`nav nav-${aberturaHeader}`}>
                <Link to='/' className={`nav-item ${itemAtivo==='#/'?'nav-item-ativo':''}`} onClick={()=>{
                    setAberturaHeader('fechado')
                    setItemAtivo('#/')
                }}>Home</Link>
                <Link to='/jogos' className={`nav-item ${itemAtivo==='#/jogos'?'nav-item-ativo':''}`} onClick={()=>{
                    setAberturaHeader('fechado')
                    setItemAtivo('#/jogos')
                }}>Jogos</Link>
                <Link to='/estatisticas' className={`nav-item ${itemAtivo==='#/estatisticas'?'nav-item-ativo':''}`} onClick={()=>{
                    setAberturaHeader('fechado')
                    setItemAtivo('#/estatisticas')
                }}>Estatísticas</Link>
                <div className="nav-seta" onClick={()=>setAberturaHeader(aberturaHeader==='fechado'?'aberto':'fechado')}>
                    <ArrowDown className={aberturaHeader==='aberto'?'invisivel':''}/>
                    <ArrowUp className={aberturaHeader==='aberto'?'':'invisivel'}/>
                </div>
            </nav>
        </header>
    )
}

export default Header