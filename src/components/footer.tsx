import Logo from '../img/Logos/Logo-Vini-Roveri-100.png'

const Footer = ()=>{
    return(
        <footer className="footer">
            <img src={Logo} alt="Logo Vini Roveri" className='footer-logo'/>
            <p className="footer-texto">Copyright - Vinícius Roveri - 2022</p>
        </footer>
    )
}

export default Footer