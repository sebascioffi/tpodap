import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Link, useNavigate, useParams } from 'react-router-native';

const ReclamosInspector = () => {

    const { legajo } = useParams();
    const [searchText, setSearchText] = useState('');
    const [dni, setDni] = useState('');
    const [reclamos, setReclamos] = useState([]);
    const [viewMode, setViewMode] = useState('all'); // 'all' or 'mine'
    const [rubroInspector, setRubroInspector] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDni = async () => {
            try {
              const storedDni = await AsyncStorage.getItem('userDni');
              console.log(storedDni);
              if (storedDni) {
                setDni(storedDni);
              }
            } catch (error) {
              console.error('Error retrieving DNI:', error);
            }
          };
          const fetchReclamos = async () => {
            try {
              const response1 = await fetch(`http://localhost:8080/api/reclamos/filtrarPorInspector/${legajo}`);
              const data1 = await response1.json();
        
              const response2 = await fetch(`http://localhost:8080/api/reclamosInspector/filtrarPorInspector/${legajo}`);
              const data2 = await response2.json();
        
              const combinedData = [...data1, ...data2];
        
              setReclamos(combinedData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
  
      fetchReclamos();
      fetchDni();
    }, []);

    useEffect(() => {
        const fetchInspectorData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/personal/${legajo}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const inspector = await response.json();
            setRubroInspector(inspector.sector);
          } catch (error) {
            console.error('Error al obtener los datos del inspector:', error);
          }
        };
    
        fetchInspectorData();
      }, [legajo]);

      const filteredReclamos = reclamos.length > 0 ? reclamos.filter(rec => {
        if (viewMode === 'mine') {
          return rec.legajo && rec.idReclamo && rec.legajo.toString() === legajo && rec.idReclamo.toString().includes(searchText);
        }
        return rec.idReclamo && rec.idReclamo.toString().includes(searchText);
      }) : [];

    
    return (
        <View style={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
        </Pressable>
        <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.buttonView, viewMode === 'all' && styles.selectedButton]}
          onPress={() => setViewMode('all')}
        >
          <Text>Ver todos</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonView, viewMode === 'mine' && styles.selectedButton]}
          onPress={() => setViewMode('mine')}
        >
          <Text>Ver mis reclamos</Text>
        </Pressable>
      </View>
      <Text style={styles.boldText}>Mi sector: {rubroInspector}</Text>
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
      {filteredReclamos.map((rec, index) => (
        <View key={index} style={styles.reclamoContainer}>
          <Text style={styles.reclamoText}>Reclamo: {rec.idReclamo}</Text>
          <Text style={styles.reclamoText}>Estado: {rec.estado}</Text>
          <Pressable style={styles.button}>
            <Link to={`/reclamo/${rec.idReclamo}`} component={Text} style={styles.buttonText}>
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
      backgroundColor: '#f5f5f5', // Softer background color
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
        backgroundColor: "#96B6CE",
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
        color: "#ffffff",
        fontWeight: "bold",
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:100,
      },
      selectedButton: {
        backgroundColor: '#9BA4FA', // Color de fondo para el botón seleccionado
      },
      boldText: {
        fontSize: 23,
        marginTop: 25,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',

      },
  });
  
  export default ReclamosInspector;

