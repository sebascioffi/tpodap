import React from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useParams, useNavigate } from 'react-router-native';
import reclamos from "../ejemploReclamos.js"

const Reclamo = () => {
  const { id } = useParams();
  const reclamo = reclamos.find(com => com.id === parseInt(id));

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
          <Text style={styles.text}>Numero de Reclamo: {reclamo.id}</Text>
          <Text style={styles.text}>Estado del Reclamo: {reclamo.estado}</Text>
          <Text style={styles.text}>Desperfecto: {reclamo.desperfecto}</Text>
          <Text style={styles.text}>Lugar del hecho: {reclamo.lugar}</Text>
          <Text style={styles.text}>Detalles: {reclamo.detalles}</Text>
          <Text style={styles.text}>Pruebas añadidas:</Text>
          
          {reclamo.pruebas && reclamo.pruebas.length > 0 ? (
            reclamo.pruebas.map((prueba, index) => (
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

export default Reclamo;
