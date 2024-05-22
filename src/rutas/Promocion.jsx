import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';
import comercios from '../ejemploPromociones.js'; // Asegúrate de tener el array de comercios en este archivo

const Promocion = () => {
  const { id } = useParams();
  const comercio = comercios.find(com => com.id === parseInt(id));

  const navigate = useNavigate();

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
        </Pressable>
      <Image
        source={{ uri: comercio.urlImagenes[0] }}
        style={styles.mainImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.tipo}>{comercio.tipo}</Text>
        <Text style={styles.desc}>{comercio.nombre}</Text>
        <Text style={styles.desc}>Horario: {comercio.horario}</Text>
        <Text style={styles.desc}>Descuento/Promocion: {comercio.descuento}</Text>
        <Text style={styles.desc}>Teléfono: {comercio.telefono}</Text>
        <Text style={styles.desc}>Encargado: {comercio.encargado}</Text>
        <Text style={styles.desc}>Descripción: {comercio.descripcion}</Text>
        <Text style={styles.desc}>Dirección: {comercio.direccion}</Text>
      </View>
      {comercio.urlImagenes.length > 1 && (
        <>
      <Text style={styles.desc}>Más imagenes:</Text>
      <ScrollView>
        {comercio.urlImagenes.slice(1).map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={styles.image}
          />
        ))}
      </ScrollView>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: 280,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    marginBottom: 5,
  },
  backArrow: {
    top: -10, // Ajusta según sea necesario para que esté bien alineado
    left: 5,
  },
  arrowImage: {
    width: 24, // Ajusta el tamaño de la flecha según sea necesario
    height: 24,
  },
});

export default Promocion;
