import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useParams, useNavigate } from 'react-router-native';

const Denuncia = () => {
  const { id } = useParams();

  const [denuncia, setDenuncia] = useState({});
  const [sitio, setSitio] = useState('');
  const [vecino, setVecino] = useState('');
  const [movimientos, setMovimientos] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [verDenunciante, setVerDenunciante] = useState(true);

  useEffect(() => {
    const fetchDenuncia = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/denuncias/${id}`);
        const data = await response.json();
        setDenuncia(data.denuncia);
        setMovimientos(data.movimientosDenuncia);
        const dni = await AsyncStorage.getItem('userDni');
        console.log(dni);
        const responseVecinos = await fetch(`http://localhost:8080/api/denuncias/vecinosDenunciados/${dni}`);
      const dataVecinos = await responseVecinos.json();
      console.log(dataVecinos);
      // Verifica si alguna denuncia tiene el mismo idDenuncia
      const idNumber = parseInt(id, 10); // Convertir id a entero usando parseInt con base 10

const hayDenuncia = dataVecinos.some(denuncia => denuncia.idDenuncia === idNumber);


      if (hayDenuncia) {
        setVerDenunciante(false);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDenuncia();
  }, [id]);

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

    if (denuncia.idSitio) {
      fetchSitio(denuncia.idSitio);
    }
  }, [denuncia.idSitio]);


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

    if (denuncia.documento) {
      fetchVecino(denuncia.documento);
    }
  }, [denuncia.documento]);

  useEffect(() => {
    const fetchDenunciaFotos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/denunciasmultimedia/${id}`);
        const data = await response.json();
        setFotos(data.fotos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDenunciaFotos();
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
      {denuncia && (
        <>
          <Text style={styles.text}>Numero de Denuncia: {denuncia.idDenuncia}</Text>
          {verDenunciante ? (
  <Text style={styles.text}>Generado por: {vecino}</Text>
): (
  <Text style={styles.text}>No puedes ver quien hizo la denuncia</Text>
)}
          <Text style={styles.text}>Estado del Reclamo: {denuncia.estado}</Text>
          {sitio && <Text style={styles.text}>Lugar del hecho: {sitio}</Text>}
          <Text style={styles.text}>Detalles: {denuncia.descripcion}</Text>

          {movimientos && movimientos.length > 0 ? (
            movimientos.map((mov, index) => (
              <View key={index}>
                <Text style={styles.boldText}>Movimiento {index + 1}:</Text>
                <Text style={styles.text}>Responsable: {mov.responsable}</Text>
                <Text style={styles.text}>Causa: {mov.causa}</Text>
                <Text style={styles.text}>Fecha: {mov.fecha}</Text>
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
    backgroundColor: '#f5f5f5', // Softer background color
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

export default Denuncia;
