import Inicio from './src/components/Inicio.jsx';
import { NativeRouter, Route, Routes } from 'react-router-native';
import LoginInspector from './src/components/LoginInspector.jsx';
import LoginVecino from './src/components/LoginVecino.jsx';
import Invitado from './src/components/Invitado.jsx';
import GenerarClave from './src/components/GenerarClave.jsx';
import Comercios from './src/components/Comercios.jsx';
import Servicios from './src/components/Servicios.jsx';

export default function App() {
  return <>
  <NativeRouter>
    <Routes>
      <Route exact path='/' element={<Inicio />} />
      <Route path="/logininspector" element={<LoginInspector />} />
      <Route path="/loginvecino" element={<LoginVecino />} />
      <Route path="/invitado" element={<Invitado />} />
      <Route path="/generarclave" element={<GenerarClave />} />
      <Route path="/comercios" element={<Comercios />} />
      <Route path="/servicios" element={<Servicios />} />
    </Routes>
  </NativeRouter>
  </> 
}
