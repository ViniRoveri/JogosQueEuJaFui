import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'
import Estatisticas from './pages/Estatisticas'
import Home from './pages/Home'
import InfoJogo from './pages/InfoJogo'
import Jogos from './pages/Jogos'

const AppRouter = ()=>{
    return(
    <Router>
        <Header/>
        <Routes>
            <Route path='/JogosQueEuJaFui'>
                <Route index element={<Home/>}/>
                <Route path='jogos' element={<Jogos/>}/>
                <Route path='estatisticas' element={<Estatisticas/>}/>
                <Route path='infoJogo/:codigo' element={<InfoJogo/>}/>
            </Route>
        </Routes>
        <Footer/>
    </Router>
)}

export default AppRouter