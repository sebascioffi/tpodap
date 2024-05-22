import React from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useParams, useNavigate } from 'react-router-native';
import denuncias from "../ejemploDenuncias.js"

const Denuncia = () => {
  const { id } = useParams();
  const denuncia = denuncias.find(den => den.id === parseInt(id));

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
          <Text style={styles.text}>Numero de denuncia: {denuncia.id}</Text>
          <Text style={styles.text}>Estado de la denuncia: {denuncia.estado}</Text>
          <Text style={styles.text}>Nombre del {denuncia.tipo} denunciado: {denuncia.nombre}</Text>
          <Text style={styles.text}>Título: {denuncia.titulo}</Text>
          <Text style={styles.text}>Lugar del hecho: {denuncia.lugar}</Text>
          <Text style={styles.text}>Detalle: {denuncia.detalle}</Text>
          <Text style={styles.text}>Pruebas añadidas:</Text>
          
          {denuncia.pruebas && denuncia.pruebas.length > 0 ? (
            denuncia.pruebas.map((prueba, index) => (
              <View key={index} style={styles.pruebaContainer}>
                <Text style={styles.pruebaNombre}>{prueba.nombre}</Text>
                <Image
                  source={{ uri: prueba.uri }}
                  style={styles.pruebaImagen}
                />
              </View>
            ))
          ) : (
            <Text style={styles.text}>No hay pruebas añadidas.</Text>
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
    marginBottom: 20,
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
});

export default Denuncia;
