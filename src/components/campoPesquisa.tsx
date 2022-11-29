import { useEffect, useState } from 'react'
import {ReactComponent as Lupa} from '../img/Lupa.svg'
import { useNavigate } from "react-router-dom"

interface intProps{
    placeholder:string
    type:'text'|'search'
    setAtualizaAvisoEstatisticas?:React.Dispatch<React.SetStateAction<string>>
}

const CampoPesquisa = (props:intProps)=>{
    const navigate = useNavigate()
    const [pesquisa,setPesquisa] = useState('')

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
            if(pesquisa===''){
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
        fazPesquisa(pesquisa)
    },[])

    useEffect(()=>{
        if(localStorage.getItem('pesquisa')){
            setPesquisa(localStorage.getItem('pesquisa'))
            setTimeout(()=>{
                fazPesquisa(localStorage.getItem('pesquisa'))
                window.scrollTo({top:83,behavior:'smooth'})
            },100)
            setTimeout(()=>{
                localStorage.clear()
            },110)
        }
    },[])

    return(
        <form className='pesquisa-caixa' onSubmit={e=>{
            e.preventDefault()
            localStorage.setItem('pesquisa',pesquisa)
            navigate('/#/jogos')
            document.querySelector('a.nav-item-ativo').classList.remove('nav-item-ativo')
        }}>
            <input type={props.type} placeholder={props.placeholder} className="pesquisa-campo" style={props.type==='text'?{borderBottomRightRadius: '22px',borderTopRightRadius: '22px'}:{}} onChange={e=>{
                setPesquisa(e.target.value)
                fazPesquisa(e.target.value)
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