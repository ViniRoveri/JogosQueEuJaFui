export interface intJogo{
    id: string,
    codigo: string,
    timeCasa: string,
    timeFora: string,
    golsCasa: number,
    golsFora: number,
    infoGols: Array<intInfoGols>,
    data: string,
    campeonato: string,
    estadio: string,
    escalacaoCasa: Array<string>,
    escalacaoFora: Array<string>,
    linkHighlights: string
}

interface intInfoGols{
    minuto: number,
    autor: string,
    time: string
}

export class claEstatisticasTime{
    jogosCasa:number = 0
    jogosFora:number = 0
    vitorias:number = 0
    empates:number = 0
    derrotas:number = 0
    golsPro:number = 0
    golsContra:number = 0
}