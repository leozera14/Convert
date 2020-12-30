import React from 'react';
import { Link } from 'react-router-dom';
import './header-style.css'
import headerLogo from '../../images/header.jpg'

export default function Header() {

  return(
    <header className="header-container">
      <nav className="header-nav-container">
        <ul>

          <li>
           <Link to="/">
              <figure>
                <img src={headerLogo} alt="A"/>
              </figure> 
           </Link>    
          </li>

          <li>
            <Link to="/">
              Consulta por Arquivo
            </Link>  
          </li>

          <div className="separator"></div>

          <li>
            <Link to="/consulta">
              Consulta Unitária
            </Link>  
          </li>

        </ul>
      </nav>
    </header>
  )
}