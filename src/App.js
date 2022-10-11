import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component"
import './App.css';

const Home = () => {
  return <h1>HOME</h1>
}
const Shop = () => {
  return <h1>SHOP</h1>
}
const SignIn = () => {
  return <h1>SignIn</h1>
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Navigation /> }>
        <Route index element={ <Home /> } />
        <Route path="shop" element={ <Shop /> } />
        <Route path="sign-in" element={ <SignIn /> } />
      </Route>
    </Routes>
  );
}

export default App;
