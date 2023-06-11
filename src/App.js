import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Journal from "./pages/Journal";
import AddStatement from "./pages/AddStatement";
import Container from "react-bootstrap/Container";

function App() {
    return (
        <div className="App">
            <Header/>
            <Container maxWidth="md" className="home-container">
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/statement"} element={<Journal/>}/>
                    <Route path={"/add/statement"} element={<AddStatement/>}/>
                    <Route path={"/map"} element={<Home/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
