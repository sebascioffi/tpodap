import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Modal, Opacity, Pressable } from 'react-native';
import { Link, useNavigate, useParams } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const Perfil = () => {
  const { dni } = useParams();

  const [nombreVecino, setNombreVecino] = useState("");
  const [apellidoVecino, setApellidoVecino] = useState("");
  const [direccion, setDireccion] = useState("");


  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/usuario/buscarPorDni/${dni}`);
        const data = await response.json();
        setNombreVecino(data.nombre);
        setDireccion(data.direccion);
        setApellidoVecino(data.apellido);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsuario();
  }, []);
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>

      <View style={styles.userContainer}>
        <Image
          source={require('../imagenes/user.png')} // Asegúrate de tener una imagen de usuario en tu proyecto
          style={styles.userImage}
        />
        <Text style={styles.desc}>{nombreVecino} {apellidoVecino}</Text>
      </View>

      <Text style={styles.boldText}>Vecino registrado del barrio</Text>
      <Text style={styles.boldText}>{dni}</Text>
      <Text style={styles.boldText}>Dirección: {direccion}</Text>

      <Image
        source={require('../imagenes/barrio.png')}
        style={styles.image}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: screenWidth,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  menuIcon: {
    position: 'absolute',
    top: 20, // Ajusta según sea necesario para que esté bien alineado
    left: 20,
  },
  iconImage: {
    width: 24, // Ajusta el tamaño del icono según sea necesario
    height: 24,
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 40, // Ajusta el tamaño del icono de usuario según sea necesario
    height: 40,
    marginBottom: 10,
  },
  desc: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boldText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 20, // Ajusta según sea necesario para que esté bien alineado
    left: 20,
  },
  arrowImage: {
    width: 24, // Ajusta el tamaño de la flecha según sea necesario
    height: 24,
  },
});

export default Perfil;
