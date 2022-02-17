import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">ExamPaper</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/Home">Home</Link>

              </li>
              <li class="nav-item">

                <Link class="nav-link" to="/login">Login</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/addpaper">Paper</Link>

              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/manage">Manage Papers</Link>

              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/signup">SignUp</Link>

              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
