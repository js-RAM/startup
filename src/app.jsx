import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { AdventurePage } from './adventurepage/adventurepage';
import { UserPage } from './userpage/userpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
    <div className="body bg-light text-dark">
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-light">
            <a className="navbar-brand" href="#">CS 260 RPG</a>
                <menu>
                    <li className = "menu-item"><NavLink className="nav-link" to='login'>Home</NavLink></li>
                    <li className = "menu-item"><NavLink className="nav-link" to='userpage'>Character Page</NavLink></li>
                    <li className = "menu-item"><NavLink className ="nav-link" to='adventurepage'>Your Adventure</NavLink></li>
                </menu>
            </nav>
        </header>
        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/userpage' element={<UserPage />} />
            <Route path='/adventurepage' element={<AdventurePage />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
        <footer>
            <div>
            <span className="text-reset">Author Joshua Swartz</span>
            <a className="text-reset" href="https://github.com/js-RAM/startup">GitHub</a>
            </div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}