import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Journal from "./pages/Journal";
import Container from "react-bootstrap/Container";
import MapPage from "./pages/Map";

function App() {
    return (
        <div className="App">
            <Header/>
            <Container maxWidth="md" className="home-container">
                <Routes>
                    <Route path={"/statement/*"} element={<Journal/>}/>
                </Routes>
            </Container>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/map"} element={<MapPage/>}/>
                <Route path={"/map/:x/:y/:zoom"} element={<MapPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
