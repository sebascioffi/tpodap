import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useParams, useNavigate } from 'react-router-native';

const Reclamo = () => {
  const { id } = useParams();

  const [reclamo, setReclamo] = useState({});
  const [desperfectoDescripcion, setDesperfectoDescripcion] = useState('');
  const [sitio, setSitio] = useState('');
  const [vecino, setVecino] = useState('');
  const [movimientos, setMovimientos] = useState([]);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const fetchReclamo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reclamos/${id}`);
        const data = await response.json();
        setReclamo(data.reclamo);
        setMovimientos(data.movimientosReclamo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReclamo();
  }, [id]);
  

  useEffect(() => {
    const fetchDesperfecto = async (idDesperfecto) => {
      try {
        const response = await fetch(`http://localhost:8080/api/desperfectos/${idDesperfecto}`);
        const data = await response.json();
        setDesperfectoDescripcion(data.descripcion);
      } catch (error) {
        console.error('Error fetching desperfecto data:', error);
      }
    };

    if (reclamo.idDesperfecto) {
      fetchDesperfecto(reclamo.idDesperfecto);
    }
  }, [reclamo.idDesperfecto]);

  useEffect(() => {
    const fetchSitio = async (idSitio) => {
      try {
        const response = await fetch(`http://localhost:8080/api/sitios/${idSitio}`);
        const data = await response.json();
        setSitio(`${data.calle} ${data.numero}`);
      } catch (error) {
        console.error('Error fetching desperfecto data:', error);
      }
    };

    if (reclamo.idSitio) {
      fetchSitio(reclamo.idSitio);
    }
  }, [reclamo.idSitio]);

    useEffect(() => {
    const fetchVecino = async (documento) => {
      try {
        const response = await fetch(`http://localhost:8080/api/usuario/buscar/${documento}`);
        const data = await response.json();
        setVecino(`${data.nombre} ${data.apellido}`);
      } catch (error) {
        console.error('Error fetching desperfecto data:', error);
      }
    };

    if (reclamo.documento) {
      fetchVecino(reclamo.documento);
    }
  }, [reclamo.documento]);

  useEffect(() => {
    const fetchVecino = async (documento) => {
      try {
        const response = await fetch(`http://localhost:8080/api/usuario/buscar/${documento}`);
        const data = await response.json();
        setVecino(`${data.nombre} ${data.apellido}`);
      } catch (error) {
        console.error('Error fetching desperfecto data:', error);
      }
    };

    if (reclamo.documento) {
      fetchVecino(reclamo.documento);
    }
  }, [reclamo.documento]);

  useEffect(() => {
    const fetchReclamoFotos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reclamosmultimedia/${id}`);
        const data = await response.json();
        setFotos(data.fotos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReclamoFotos();
  }, [id]);

  const navigate = useNavigate();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')}
          style={styles.arrowImage}
        />
      </Pressable>
      
      {reclamo && (
        <>
          <Text style={styles.text}>Numero de Reclamo: {reclamo.idReclamo}</Text>
          <Text style={styles.text}>Generado por: {vecino}</Text>
          <Text style={styles.text}>Estado del Reclamo: {reclamo.estado}</Text>
          <Text style={styles.text}>Desperfecto: {desperfectoDescripcion}</Text>
          <Text style={styles.text}>Lugar del hecho: Calle {sitio}</Text>
          <Text style={styles.text}>Detalles: {reclamo.descripcion}</Text>

          {movimientos && movimientos.length > 0 ? (
            movimientos.map((mov, index) => (
              <View key={index}>
                <Text style={styles.boldText}>Movimiento {index + 1}:</Text>
                <Text style={styles.text}>Responsable: {mov.responsable}</Text>
                <Text style={styles.text}>Causa: {mov.causa}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.boldText}>No hay movimientos añadidos.</Text>
          )}
          
          {fotos && fotos.length > 0 ? (
  <>
    <Text style={styles.boldText}>Pruebas adjuntas:</Text>
    {fotos.map((prueba, index) => (
      <Image
        key={index}
        source={{ uri: prueba.uri }}
        style={styles.image}
      />
    ))}
  </>
) : (
  <Text style={styles.boldText}>No hay pruebas añadidas.</Text>
)}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  backArrow: {
    marginBottom: 60,
  },
  arrowImage: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  pruebaContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  pruebaNombre: {
    fontSize: 14,
    marginBottom: 5,
  },
  pruebaImagen: {
    width: 100,
    height: 100,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default Reclamo;
