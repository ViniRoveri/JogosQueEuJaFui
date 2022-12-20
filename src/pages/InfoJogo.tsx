import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSetPaginaAtual } from "../common/hooks"
import { intJogo } from "../common/interfaces"

const InfoJogo = ()=>{
    const setPaginaAtual = useSetPaginaAtual()
    useEffect(()=>{
        setPaginaAtual('')
    },[])
    
    const [retorno,setRetorno] = useState(<></>)
    const params = useParams()
    const codigoUrl = params.codigo
    const [dataApi,setDataApi] = useState<Array<intJogo>>([])
    let jogoSelecionado:intJogo
    axios.get('https://viniroveri.github.io/MinhasAPIs/json/JogosQueEuJaFui.json')
    .then(res=>setDataApi(res.data))
    .then(()=>{jogoSelecionado = dataApi.filter(jogo=>jogo.codigo===codigoUrl)[0]})
    .then(()=>setRetorno(
    <main className="mainInfo">
        <section className="info-placar">
            <h2 className="placar-times animaSubtitulo">{jogoSelecionado.timeCasa} &nbsp;<b>{jogoSelecionado.golsCasa}</b> x <b>{jogoSelecionado.golsFora}</b>&nbsp; {jogoSelecionado.timeFora}</h2>
            <div className="placar-gols animaTexto1">
            {jogoSelecionado.infoGols.map(gol=>{
                if(gol.time==='casa'){return(
                    <p style={{textAlign:'left'}} key={`${gol.minuto} ${gol.autor}`}>{`${gol.autor} ${gol.minuto}'`}</p>
                )}else{return(
                    <p style={{textAlign:'right'}} key={`${gol.minuto} ${gol.autor}`}>{`${gol.minuto}' ${gol.autor}`}</p>
                )}
            })}
            </div>
        </section>
        <section className="info-infos animaTexto2">
            <p>{jogoSelecionado.data}</p>
            <p>{jogoSelecionado.campeonato}</p>
            <p>{jogoSelecionado.estadio}</p>
        </section>
        <section className="info-escalacoes animaTexto3">
            <h2 className="escalacoes-titulo">Escalações</h2>
            <div className="escalacoes-times">
                {jogoSelecionado.escalacaoCasa.map((jogador,index)=>{if(index!==11){return(
                    <p key={jogador} className='linha-jogadores'><b style={{textAlign:'left'}}>{jogador}</b><b style={{textAlign:'right'}}>{jogoSelecionado.escalacaoFora[index]}</b></p>
                    )}else{return(
                    <p key={jogador} className='linha-jogadores'><b style={{textAlign:'left'}}>Tec.: {jogador}</b><b style={{textAlign:'right'}}>Tec.:  {jogoSelecionado.escalacaoFora[index]}</b></p>
                    )}
                })}
            </div>
        </section>
        <section className="info-highlights animaTexto4">
            <h2 className="highlights-titulo">Melhores Momentos</h2>
            <div className="highlights-video">
                <iframe width="720" height="405" src={jogoSelecionado.linkHighlights} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                   
            </div>
        </section>
    </main>
    ))
    
    return retorno
}

export default InfoJogo