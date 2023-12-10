import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Create from './pages/Create';
import Header from './components/Header';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element = {<Home />}/>
        <Route path ="/sign-in" element = {<SignIn />}/>
        <Route path ="/sign-up" element = {<SignUp />}/>
        <Route path ="/profile" element = {<Profile />}/>
        <Route path ="/feed" element = {<Feed />}/>
        <Route path ="/create" element = {<Create />}/>
      </Routes>
    </BrowserRouter>
  )
}
