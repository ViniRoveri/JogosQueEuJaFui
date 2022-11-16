import { useEffect } from 'react'
import ImagemNotFound from '../img/ImagemNotFound.png'

const NotFound = ()=>{
    useEffect(()=>{
        if(document.querySelector('a.nav-item-ativo')){
            document.querySelector('a.nav-item-ativo').classList.remove('nav-item-ativo')
        }
    },[])

    return(
        <main className="mainNotFound">
            <h2 className="notFound-titulo animaTexto1">*FÍÍÍÍÍÍÍÍ*</h2>
            <p className="notFound-texto animaTexto2">Nada por aqui!</p>
            <img src={ImagemNotFound} alt="Página não encontrada" className='notFound-imagem animaTexto3'/>
        </main>
    )
}

export default NotFound