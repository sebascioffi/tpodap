import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import denuncias from "../ejemploDenuncias.js"

const Denuncias = () => {

    const [searchText, setSearchText] = useState('');

    const navigate = useNavigate();

    const filteredDenuncias = denuncias.filter(den =>
      den.id.toString().includes(searchText)
    );
    
    return (
        <View style={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')}
          style={styles.arrowImage}
        />
        </Pressable>
          <View style={styles.inputContainer}>
            <Image
              source={require('../imagenes/lupa.png')} 
              style={styles.icon}
            />
            <TextInput
              style={styles.input} 
              placeholder="Buscar..."
              placeholderTextColor="darkgrey"
              selectionColor="transparent" 
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
      {filteredDenuncias.map((den, index) => (
        <View key={index} style={styles.reclamoContainer}>
          <Text style={styles.reclamoText}>Denuncia: {den.id}</Text>
          <Text style={styles.reclamoText}>Estado: {den.estado}</Text>
          <Pressable style={styles.button}>
            <Link to={`/denuncia/${den.id}`} component={Text} style={styles.buttonText}>
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
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
      seguimiento: {
        fontSize: 16,
        color: "#ffffff"
      }
  });
  
  export default Denuncias;

