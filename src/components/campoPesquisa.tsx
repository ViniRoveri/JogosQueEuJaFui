import { useEffect, useState } from 'react'
import {ReactComponent as Lupa} from '../img/Lupa.svg'
import { useNavigate } from "react-router-dom"
import { usePesquisaHome, useSetPesquisaHome } from '../common/hooks'

interface intProps{
    placeholder:string
    type:'text'|'search'
    setAtualizaAvisoEstatisticas?:React.Dispatch<React.SetStateAction<string>>
}

const CampoPesquisa = (props:intProps)=>{
    const navigate = useNavigate()
    const pesquisaHome = usePesquisaHome()
    const setPesquisaHome = useSetPesquisaHome()

    const [pesquisa,setPesquisa] = useState(pesquisaHome)

    function fazPesquisa(pesquisa:string){
        let regex = new RegExp(pesquisa,'i')

        document.querySelectorAll('.card-conteudo').forEach(card=>{
            if(pesquisa===''){
                card.parentElement.classList.remove('invisivel')
            }else{
                let visivel = false
                card.childNodes.forEach(paragrafo=>{
                    if(regex.test(paragrafo.textContent)){
                        card.parentElement.classList.remove('invisivel')
                        visivel = true
                    }
                })
                if(!visivel){card.parentElement.classList.add('invisivel')}
            }
        })

        document.querySelectorAll('tbody tr').forEach(tr=>{
            if(pesquisa === ''){
                tr.classList.remove('invisivel')
            }else{
                if(regex.test(tr.firstChild.textContent)){
                    tr.classList.remove('invisivel')
                }else{
                    tr.classList.add('invisivel')
                }
            }
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            fazPesquisa(pesquisa)
            
            setPesquisaHome('')
        },100)
    },[])
    
    useEffect(()=>{
        fazPesquisa(pesquisa)
    },[pesquisa])

    return(
        <form className='pesquisa-caixa' onSubmit={e=>{
            e.preventDefault()
            setPesquisaHome(pesquisa)
            navigate('/jogos')
        }}>
            <input type={props.type} placeholder={props.placeholder} className="pesquisa-campo" style={props.type==='text'?{borderBottomRightRadius: '22px',borderTopRightRadius: '22px'}:{}} onChange={e=>{
                setPesquisa(e.target.value)
                if(props.setAtualizaAvisoEstatisticas){props.setAtualizaAvisoEstatisticas(e.target.value)}
            }} value={pesquisa}/>
            {props.type==='search'?
            <button type="submit" className="pesquisa-botao">
                <Lupa/>
            </button>
            :<></>}
        </form>
    )
}

export default CampoPesquisa