import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const Denuncias = () => {

    const [searchText, setSearchText] = useState('');
    const [denuncias, setDenuncias] = useState([]);
    const [dni, setDni] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      const fetchDenuncias = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/denuncias');
          const data = await response.json();
          const storedDni = await AsyncStorage.getItem('userDni');

          // Filtrar las denuncias cuyo documento sea igual al dni
          const denunciasFiltradas = data.filter(denuncia => denuncia.documento === storedDni);
          
          setDenuncias(denunciasFiltradas);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchDenuncias();
    }, []);

    const filteredDenuncias = denuncias.filter(den => {
      return den.idDenuncia.toString().includes(searchText);
    });

    
    return (
        <View style={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
        </Pressable>
        <View style={styles.buttonContainer}>
      </View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../imagenes/lupa.png')} // Asegúrate de tener esta imagen en tu carpeta de imágenes
              style={styles.icon}
            />
            <TextInput
              style={styles.input} // Agrega estilos específicos para la web
              placeholder="Buscar..."
              placeholderTextColor="darkgrey"
              selectionColor="transparent" // Esto elimina el borde amarillo al seleccionar el input
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
      {filteredDenuncias.map((den, index) => (
        <View key={index} style={styles.reclamoContainer}>
          <Text style={styles.reclamoText}>Denuncia: {den.idDenuncia}</Text>
          <Text style={styles.reclamoText}>Estado: {den.estado}</Text>
          <Pressable style={styles.button}>
            <Link to={`/denuncia/${den.idDenuncia}`} component={Text} style={styles.buttonText}>
                <Text style={styles.seguimiento}>Ver Seguimiento</Text>
            </Link>
          </Pressable>
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
      marginTop: 20,
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
      backArrow: {
        position: 'absolute',
        top: 20, // Ajusta según sea necesario para que esté bien alineado
        left: 20,
      },
      arrowImage: {
        width: 24, // Ajusta el tamaño de la flecha según sea necesario
        height: 24,
      },
      scrollContainer: {
        padding: 10,
      },
      reclamoContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        width: 250,
      },
      reclamoText: {
        marginBottom: 5,
        fontSize: 16,
      },
      button: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
      },
      buttonView: {
        backgroundColor: '#293EFA',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
      seguimiento: {
        fontSize: 16,
        color: "#ffffff"
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:100,
      },
      selectedButton: {
        backgroundColor: '#9BA4FA', // Color de fondo para el botón seleccionado
      },
  });
  
  export default Denuncias;

