import axios from "axios"
import { useEffect, useState } from "react"
import CampoPesquisa from "../components/campoPesquisa"
import { claEstatisticasTime, intJogo } from "../interfaces"

const Estatisticas = () => {
	let dataApi:Array<intJogo> = []
	const [totalJogos,setTotalJogos] = useState(0)

	let arrayTimes:Array<string> = []
	const [timesFiltrados, setTimesFiltrados] = useState([])

	let estatisticasTimes: { [key: string]: claEstatisticasTime } = {}
	const [estatisticasFinais,setEstatisticasFinais] = useState(estatisticasTimes)

	const [avisoInvisivel, setAvisoInvisivel] = useState('invisivel')
	const [atualizaAvisoEstatisticas,setAtualizaAvisoEstatisticas] = useState('')

	const [retornoTabela, setRetornoTabela] = useState(<></>)
	const [retornoTotais, setRetornoTotais] = useState(<></>)

	function calculaTotalGols() {
		let total = 0
		Object.values(estatisticasFinais).forEach(time => total += time.golsPro)
		return total
	}

	useEffect(()=>{
		axios.get('https://viniroveri.github.io/MinhasAPIs/json/JogosQueEuJaFui.json')
		.then(res => {
			dataApi = res.data
			setTotalJogos(dataApi.length)
		})
		.then(() => {
			dataApi.forEach((jogo) => {
				if (!arrayTimes.includes(jogo.timeCasa)) { arrayTimes = [...arrayTimes, jogo.timeCasa] }
				if (!arrayTimes.includes(jogo.timeFora)) { arrayTimes = [...arrayTimes, jogo.timeFora] }
			})
		})
		.then(() => {
			arrayTimes.forEach(time => estatisticasTimes[time] = new claEstatisticasTime())
			
			dataApi.forEach(jogo => {
				let vitoriaCasa = jogo.golsCasa > jogo.golsFora
				let empate = jogo.golsCasa === jogo.golsFora
				let vitoriaFora = jogo.golsCasa < jogo.golsFora
				
				estatisticasTimes[jogo.timeCasa].jogosCasa += 1
				estatisticasTimes[jogo.timeCasa].vitorias += vitoriaCasa ? 1 : 0
				estatisticasTimes[jogo.timeCasa].empates += empate ? 1 : 0
				estatisticasTimes[jogo.timeCasa].derrotas += vitoriaFora ? 1 : 0
				estatisticasTimes[jogo.timeCasa].golsPro += jogo.golsCasa
				estatisticasTimes[jogo.timeCasa].golsContra += jogo.golsFora
				
				estatisticasTimes[jogo.timeFora].jogosFora += 1
				estatisticasTimes[jogo.timeFora].vitorias += vitoriaFora ? 1 : 0
				estatisticasTimes[jogo.timeFora].empates += empate ? 1 : 0
				estatisticasTimes[jogo.timeFora].derrotas += vitoriaCasa ? 1 : 0
				estatisticasTimes[jogo.timeFora].golsPro += jogo.golsFora
				estatisticasTimes[jogo.timeFora].golsContra += jogo.golsCasa
			})
			setEstatisticasFinais(estatisticasTimes)

			setTimesFiltrados(arrayTimes.splice(0)
			.sort((a, b) =>
			(
				(estatisticasTimes[a].jogosCasa + estatisticasTimes[a].jogosFora)
				-
				(estatisticasTimes[b].jogosCasa + estatisticasTimes[b].jogosFora)
				) * -1
				)
				.sort((a, b) => {
					if (estatisticasTimes[a].jogosCasa + estatisticasTimes[a].jogosFora === estatisticasTimes[b].jogosCasa + estatisticasTimes[b].jogosFora) {
						if (estatisticasTimes[a].vitorias === estatisticasTimes[b].vitorias) {
							if (estatisticasTimes[a].empates === estatisticasTimes[b].empates) {
								if (estatisticasTimes[a].derrotas === estatisticasTimes[b].derrotas) {
									if (estatisticasTimes[a].golsPro === estatisticasTimes[b].golsPro) {
										if (estatisticasTimes[a].golsContra - estatisticasTimes[b].golsContra) {
											if ((estatisticasTimes[a].golsPro - estatisticasTimes[a].golsContra) === (estatisticasTimes[b].golsPro - estatisticasTimes[b].golsContra)) {
												if (a < b) { return 1 }
											}
											
											return ((estatisticasTimes[a].golsPro - estatisticasTimes[a].golsContra) - (estatisticasTimes[b].golsPro - estatisticasTimes[b].golsContra)) * -1
										}
										
										return estatisticasTimes[a].golsContra - estatisticasTimes[b].golsContra
									}
									
									return (estatisticasTimes[a].golsPro - estatisticasTimes[b].golsPro) * -1
								}
								
								return estatisticasTimes[a].derrotas - estatisticasTimes[b].derrotas
							}
							
							return (estatisticasTimes[a].empates - estatisticasTimes[b].empates) * -1
						}
						
						return (estatisticasTimes[a].vitorias - estatisticasTimes[b].vitorias) * -1
					}
				}))
			}
		)
	},[])

	useEffect(() => {
		if (document.querySelectorAll('tr.invisivel').length === timesFiltrados.length) {
			setAvisoInvisivel('')
		} else {
			setAvisoInvisivel('invisivel')
		}
	},[atualizaAvisoEstatisticas,timesFiltrados,estatisticasFinais])

	useEffect(()=>{
		setTimeout(()=>{
			setRetornoTabela(
			<table className="tabela animaTexto3">
				<thead>
					<tr>
						<th className="time-titulo">Time</th>
						<th>Jogos (Casa/Fora)</th>
						<th>Vitórias</th>
						<th>Empates</th>
						<th>Derrotas</th>
						<th>Gols Pró</th>
						<th>Gols Contra</th>
						<th>Saldo de Gols</th>
					</tr>
				</thead>
				<tbody>
					{timesFiltrados.map(time => {
						if (time !== 'gremio') return (
							<tr key={time}>
								<td className="time-nome">{time}</td>
								<td>{`${estatisticasFinais[time].jogosCasa + estatisticasFinais[time].jogosFora} (${estatisticasFinais[time].jogosCasa}/${estatisticasFinais[time].jogosFora})`}</td>
								<td>{estatisticasFinais[time].vitorias}</td>
								<td>{estatisticasFinais[time].empates}</td>
								<td>{estatisticasFinais[time].derrotas}</td>
								<td>{estatisticasFinais[time].golsPro}</td>
								<td>{estatisticasFinais[time].golsContra}</td>
								<td>{estatisticasFinais[time].golsPro - estatisticasFinais[time].golsContra}</td>
							</tr>
						)
					})}
					<tr key='gremio'>
						<td className="time-nome">gremio</td>
						<td>{`${estatisticasFinais['gremio'].jogosCasa + estatisticasFinais['gremio'].jogosFora} (${estatisticasFinais['gremio'].jogosCasa}/${estatisticasFinais['gremio'].jogosFora})`}</td>
						<td>{estatisticasFinais['gremio'].vitorias}</td>
						<td>{estatisticasFinais['gremio'].empates}</td>
						<td>{estatisticasFinais['gremio'].derrotas}</td>
						<td>{estatisticasFinais['gremio'].golsPro}</td>
						<td>{estatisticasFinais['gremio'].golsContra}</td>
						<td>{estatisticasFinais['gremio'].golsPro - estatisticasFinais['gremio'].golsContra}</td>
					</tr>
				</tbody>
			</table>
			)

			setRetornoTotais(
			<section className="estatisticas-total animaTexto4">
				<h1 className="total-titulo">Total:</h1>
				<div className="total-texto">
					<p>{`${totalJogos} Jogos,`}</p>
					<p>{`${timesFiltrados.length} Times,`}</p>
					<p>{`${calculaTotalGols()} Gols.`}</p>
				</div>
			</section>
			)
		},100)
	},[timesFiltrados,estatisticasFinais])

	return (
		<main className="mainEstatisticas">
			<h1 className="estatisticas-titulo animaSubtitulo">Estatísticas</h1>
			<div className="estatisticas-textos animaTexto1">
				<p>Aqui você vai encontar dados sobre quantos jogos eu já fui, quantos gols eu já vi, quantos times e tudo sobre seus aproveitamentos!</p>
				<p>Você pode pesquisar um time aqui:
				</p>
			</div>
			<div className="animaTexto2 estatisticas-pesquisa">
				<CampoPesquisa type="text" placeholder="Pesquise por um Time!" setAtualizaAvisoEstatisticas={setAtualizaAvisoEstatisticas}/>
			</div>

			{retornoTabela}

			<p className={`estatisticas-aviso ${avisoInvisivel}`}>Nenhum resultado encontrado.</p>

			{retornoTotais}

		</main>
	)
}

export default Estatisticas