import { useEffect } from "react"
import { useSetPaginaAtual } from "../common/hooks"
import CampoPesquisa from "../components/campoPesquisa"
import ListaJogos from "../components/listaJogos"

const Jogos = ()=>{
    const setPaginaAtual = useSetPaginaAtual()
    useEffect(()=>{
        setPaginaAtual('jogos')
    },[])

    return(
        <main className="mainJogos">
            <h1 className="jogos-titulo animaSubtitulo">Jogos</h1>
            <div className="jogos-textos animaTexto1">
                <p>Aqui você encontra todos os jogos e seus respectivos detalhes!
                </p>
                <p>Para saber mais sobre cada jogo basta clicar nele.                    
                </p>
                <p>Você também pode pesquisar por Times, Campeonatos, Estádios e Datas por aqui:
                </p>
            </div>
            <div className="jogos-pesquisa animaTexto2">
            <CampoPesquisa type="text" placeholder="Pesquise Aqui!"/>
            </div>
            <section className="jogos-cards animaTexto3">
                <ListaJogos/>
            </section>
        </main>
    )
}

export default Jogos