import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

const Comercios = () => {

    const [searchText, setSearchText] = useState('');
    const [comercios, setComercios] = useState([]);

    const navigate = useNavigate();

      useEffect(() => {
    const fetchComercios = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/promociones');
        const data = await response.json();
        setComercios(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchComercios();
  }, []);

  
    const filteredComercios = comercios.filter(com =>
      com.categoria.toLowerCase() === "comercio" && com.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
    
    return (
        <View style={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
        </Pressable>
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
            {filteredComercios.map((com, index) => (
            <Link key={index} to={`/promocion/${com._id}`} component={View} style={styles.comercioContainer}>
                <>
                <Image
                  source={{ uri: com.fotosPublicacion[0] }}
                  style={styles.image}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.tipo}>{com.categoria}</Text>
                  <Text style={styles.nombre}>{com.nombre}</Text>
                  <Text style={styles.horario}>{com.contacto.horarioComercio}</Text>
                  <Text style={styles.descuento}>{com.descuento}</Text>
                </View>
                </>
            </Link>
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
  
  export default Comercios;