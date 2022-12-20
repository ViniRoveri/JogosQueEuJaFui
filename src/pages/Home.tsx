import { useEffect } from "react"
import { useSetPaginaAtual, useSetPesquisaHome } from "../common/hooks"
import CampoPesquisa from "../components/campoPesquisa"

const Home = ()=>{
    const setPaginaAtual = useSetPaginaAtual()
    const setPesquisaHome = useSetPesquisaHome()

    useEffect(()=>{
        setPaginaAtual('home')
        setPesquisaHome('')
    },[])

    return(
        <main className="mainHome">
            <h1 className="titulo">
                <div className="animaTitulo1">Jogos </div>
                <div className="animaTitulo2">Que </div>
                <div className="animaTitulo3">Eu </div>
                <div className="animaTitulo4">Já </div>
                <div className="animaTitulo5">Fui</div>
            </h1>
            <h2 className="home-subtitulo animaSubtituloHome">Sobre o Projeto</h2>
            <section className="home-textos animaTextoHome1">
                <p>Bem-vindo!
                </p>
                <p>Essa página foi feita para servir como um acervo pessoal de todos os jogos de futebol que eu já fui e ainda irei na minha vida!
                </p>
                <p>Aqui há informações sobre todos os jogos, escalações, gols, campeonatos e tudo que você quiser ver!
                </p>
            </section>
            <section className="pesquisaHome">
                <h2 className='pesquisaHome-titulo animaTextoHome2'>Faça uma pesquisa no site:</h2>
                <p className='pesquisaHome-texto animaTextoHome3'>Pesquise por Times, Campeonatos, Estádios ou Datas!</p>
                <div className="animaTextoHome4">
                    <CampoPesquisa type="search" placeholder="Pesquise Aqui!"/>
                </div>
            </section>
        </main>
    )
}

export default Home