import { Routes, Route } from 'react-router-dom'
import Registrate from './pages/Registrate/Registrate'
import Account from './pages/Account/Account'
import People from './pages/People/People'
import Authenticate from './pages/Authenticate/Authenticate'

function App() {
    return <Routes>
    <Route path="/" element={<Registrate />} />
    <Route path="/authenticate" element={<Authenticate />} />
    <Route path="/account" element={<Account />} />
    <Route path="/people" element={<People />} />
  </Routes>
}

export default App;
