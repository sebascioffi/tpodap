import Inicio from './src/rutas/Inicio.jsx';
import { NativeRouter, Route, Routes } from 'react-router-native';
import LoginInspector from './src/rutas/LoginInspector.jsx';
import LoginVecino from './src/rutas/LoginVecino.jsx';
import GenerarClave from './src/rutas/GenerarClave.jsx';
import Comercios from './src/rutas/Comercios.jsx';
import Servicios from './src/rutas/Servicios.jsx';
import Promocion from './src/rutas/Promocion.jsx';
import Promociones from './src/rutas/Promociones.jsx';
import Inspector from './src/rutas/Inspector.jsx';
import Vecino from './src/rutas/Vecino.jsx';
import GenerarReclamo from './src/rutas/GenerarReclamo.jsx';

export default function App() {
  return <>
  <NativeRouter>
    <Routes>
      <Route exact path='/' element={<Inicio />} />
      <Route path="/logininspector" element={<LoginInspector />} />
      <Route path="/loginvecino" element={<LoginVecino />} />
      <Route path="/buscarprom" element={<Promociones />} />
      <Route path="/generarclave" element={<GenerarClave />} />
      <Route path="/comercios" element={<Comercios />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/promocion/:id" element={<Promocion />} />
      <Route path="/inspector/:id" element={<Inspector />} />
      <Route path="/vecino/:id" element={<Vecino />} />
      <Route path="/genreclamo" element={<GenerarReclamo />} />
    </Routes>
  </NativeRouter>
  </> 
}
