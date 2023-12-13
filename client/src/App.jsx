import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Create from './pages/Create';
import Buy from './pages/Buy';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home />}
        />
        <Route 
          path="/sign-in" 
          element={<SignIn />}
        />
        <Route 
          path="/sign-up" 
          element={<SignUp />}
        />
        <Route 
          path="/profile/:userName" 
          element={<Profile />}/>
        <Route 
          path="/feed" 
          element={<Feed />}/>
        <Route 
          path="/create" 
          element={<Create />}
        />
        <Route 
          path="/buy/:post_id" 
          element={<Buy />}
        />
         <Route 
          path="/buy" 
          element={<Buy />}
        />
      </Routes>
    </BrowserRouter>
  )
}
