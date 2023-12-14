import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="bg-light text-dark">
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-light">
            <a className="navbar-brand" href="#">CS 260 RPG</a>
                <menu>
                    <li className = "menu-item"><a className="nav-link" href="index.html">Home</a></li>
                    <li className = "menu-item"><a className="nav-link" href="user-page.html">Character Page</a></li>
                    <li className = "menu-item"><a className ="nav-link" href="adventure-page.html">Your Adventure</a></li>
                </menu>
            </nav>
        </header>
        <footer>
            <div>
            <span class="text-reset">Author Joshua Swartz</span>
            <a class="text-reset" href="https://github.com/js-RAM/startup">GitHub</a>
            </div>
      </footer>
    </div>
  );
}