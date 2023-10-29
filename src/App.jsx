import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import TambahProduk from "./pages/TambahProduk"
import Akun from "./pages/Akun"
export default function App(){
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/tambahproduk" element={<TambahProduk/>}/>
          <Route path="/akun" element={<Akun/>}/>
        </Routes>
      </Router>
    </div>
  )
}