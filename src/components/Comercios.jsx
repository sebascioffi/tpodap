import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import comercios from "../ejemploPromociones.js"

const screenWidth = Dimensions.get('window').width;

const Comercios = () => {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../imagenes/lupa.png')} // Asegúrate de tener esta imagen en tu carpeta de imágenes
            style={styles.icon}
          />
          <TextInput
            style={[styles.input]} // Agrega estilos específicos para la web
            placeholder="Buscar..."
            placeholderTextColor="darkgrey"
            selectionColor="transparent" // Esto elimina el borde amarillo al seleccionar el input
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        {comercios
          .filter(com => com.tipo.toLowerCase() === 'comercio') // Filtra los comercios cuyo tipo es "comercio"
          .map((com, index) => (
            <View key={index} style={styles.comercioContainer}>
              <Image
                source={{ uri: com.urlImagenes[0] }}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.tipo}>{com.tipo}</Text>
                <Text style={styles.nombre}>{com.nombre}</Text>
                <Text style={styles.horario}>{com.horario}</Text>
                <Text style={styles.descuento}>{com.descuento}</Text>
              </View>
            </View>
          ))}
      </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#d3d3d3',
      borderRadius: 25, 
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginTop: 100,
      marginBottom:20,
      width: 250, 
      position: 'relative', 
    },
    icon: {
      width: 20, 
      height: 20,
      position: 'absolute',
      left: 10, 
      zIndex: 1, 
    },
    input: {
      flex: 1,
      height: 40,
      color: 'black',
      fontSize: 16,
      paddingLeft: 40, 
      outlineStyle: 'none',
    },
    comercioContainer: {
      marginBottom: 20,
      position: 'relative',
    },
    image: {
      width: 350,
      height: 200,
      borderRadius: 10,
    },
    infoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(211, 211, 211, 0.8)',
      padding: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    tipo: {
        fontSize: 19,
        fontWeight: 'bold',
      },
      nombre: {
        fontSize: 17,
      },
      horario: {
        fontSize: 15,
      },
      descuento: {
        fontSize: 15,
        color: 'red',
      },

  });
  
  export default Comercios;