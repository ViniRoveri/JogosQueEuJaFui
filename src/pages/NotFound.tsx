import { useEffect } from 'react'
import { useSetPaginaAtual } from '../common/hooks'
import ImagemNotFound from '../img/ImagemNotFound.png'

const NotFound = ()=>{
    const setPaginaAtual = useSetPaginaAtual()
    useEffect(()=>{
        setPaginaAtual('')
    },[])

    return(
        <main className="mainNotFound">
            <h2 className="notFound-titulo animaTexto1">*FÍÍÍÍÍÍÍÍ*</h2>
            <p className="notFound-texto animaTexto2">Nada por aqui, jogador!</p>
            <img src={ImagemNotFound} alt="Página não encontrada" className='notFound-imagem animaTexto3'/>
        </main>
    )
}

export default NotFound