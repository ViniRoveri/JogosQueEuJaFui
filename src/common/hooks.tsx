import { useRecoilValue, useSetRecoilState } from "recoil";
import { paginaAtualState, pesquisaHomeState } from "./atoms";

export function usePaginaAtual(){
    const paginaAtual = useRecoilValue(paginaAtualState)

    return paginaAtual
}

export function usePesquisaHome(){
    const pesquisaHome = useRecoilValue(pesquisaHomeState)

    return pesquisaHome
}

export function useSetPaginaAtual(){
    const setPaginaAtual = useSetRecoilState(paginaAtualState)

    return (novoItem:'home' | 'jogos' | 'estatisticas' | '')=>{
        return setPaginaAtual(novoItem)
    }
}

export function useSetPesquisaHome(){
    const setPesquisaHome = useSetRecoilState(pesquisaHomeState)

    return (novaPesquisa:string)=>{
        return setPesquisaHome(novaPesquisa)
    }
}