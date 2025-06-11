import Navigator from "./Navigator/Navigator";
import { Link } from "wouter";

function Home() {
    return (
        <div>
            <h3>Home</h3>
            <Link to="/about">go about</Link>
        </div>
    );
}

function About() {
    return (
        <div>
            <h3>About</h3>
            <button onClick={() => history.back()}>back</button>
        </div>
    );
}

const routes = [
    { path: "/about", component: About },
    { path: "/", component: Home },
];
function App() {
    return <Navigator routes={routes}></Navigator>;
}

export default App;
