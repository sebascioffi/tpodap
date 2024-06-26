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
import Reclamos from './src/rutas/Reclamos.jsx';
import Reclamo from './src/rutas/Reclamo.jsx';
import GenerarDenuncia from './src/rutas/GenerarDenuncia.jsx';
import Denuncias from './src/rutas/Denuncias.jsx';
import Denuncia from './src/rutas/Denuncia.jsx';
import GenerarPromocion from './src/rutas/GenerarPromocion.jsx';
import GenerarComercio from './src/rutas/GenerarComercio.jsx';
import GenerarServicio from './src/rutas/GenerarServicio.jsx';
import Perfil from './src/rutas/Perfil.jsx';
import Declaracion from './src/rutas/Declaracion.jsx';
import PerfilInspector from './src/rutas/PerfilInspector.jsx';
import Contraseña from './src/rutas/Contraseña.jsx';
import GenerarContraseña from './src/rutas/GenerarContraseña.jsx';
import VecinoRegistrado from './src/rutas/VecinoRegistrado.jsx';
import ReclamosInspector from './src/rutas/ReclamosInspector.jsx';
import GenerarReclamoInspector from './src/rutas/GenerarReclamoInspector.jsx';

export default function App() {
  return <>
  <NativeRouter>
    <Routes>
      <Route exact path='/' element={<Inicio />} />

      <Route path="/logininspector" element={<LoginInspector />} />
      <Route path="/loginvecino" element={<LoginVecino />} />
      <Route path="/introducirContraseña" element={<Contraseña />} />
      <Route path="/generarContraseña/:dni" element={<GenerarContraseña />} />
      <Route path="/vecinoRegistrado/:dni" element={<VecinoRegistrado />} />

      <Route path="/inspector/:legajo" element={<Inspector />} />
      <Route path="/vecino/:dni" element={<Vecino />} />

      <Route path="/declaracion" element={<Declaracion />} />

      <Route path="/buscarprom" element={<Promociones />} />
      <Route path="/comercios" element={<Comercios />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/reclamos" element={<Reclamos />} />
      <Route path="/denuncias" element={<Denuncias />} />
      <Route path="/reclamosInspector/:legajo" element={<ReclamosInspector />} />

      <Route path="/promocion/:id" element={<Promocion />} />
      <Route path="/reclamo/:id" element={<Reclamo />} />
      <Route path="/denuncia/:id" element={<Denuncia />} />

      <Route path="/generarclave" element={<GenerarClave />} />
      <Route path="/gendenuncia" element={<GenerarDenuncia />} />
      <Route path="/genreclamo" element={<GenerarReclamo />} />
      <Route path="/genpromocion" element={<GenerarPromocion />} />
      <Route path="/gencomercio" element={<GenerarComercio />} />
      <Route path="/genservicio" element={<GenerarServicio />} />    
      <Route path="/genreclamoInspector/:legajo" element={<GenerarReclamoInspector />} />    

      <Route path="/perfil/:dni" element={<Perfil />} />
      <Route path="/perfil/inspector/:legajo" element={<PerfilInspector />} />

    </Routes>
  </NativeRouter>
  </> 
}
