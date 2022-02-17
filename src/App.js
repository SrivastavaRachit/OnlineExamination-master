// import logo from './logo.svg';
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./components/Login";
import signup from "./components/signup";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AddPaper from "./components/paper";
import ManagePaper from "./components/managepaper";
import SolvePaper from "./components/solvepaper";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Header></Header>
        <Route component={Login} path={"/login"}></Route>
        <Route component={Home} path={"/home"}></Route>
        <Route component={signup} path={"/signup"}></Route>
        <Route component={AddPaper} path={"/addpaper"}></Route>
        <Route component={ManagePaper} path={"/manage"}></Route>
        <Route component={SolvePaper} path={"/solve/:id"}></Route>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
