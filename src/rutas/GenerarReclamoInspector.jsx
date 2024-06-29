import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Pressable, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigate, useParams } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadFile } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';


const GenerarReclamoInspector = () => {
  const { legajo } = useParams();
  const [rubroInspector, setRubroInspector] = useState('');
  const [desperfecto, setDesperfecto] = useState('');
  const [desperfectos, setDesperfectos] = useState([]);
  const [sitios, setSitios] = useState([]);
  const [lugar, setLugar] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [detalles, setDetalles] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalExitoVisible, setModalExitoVisible] = useState(false);
  const [numReclamo, setNumReclamo] = useState(0);

  const navigate = useNavigate();

  const getLegajo = async () => {
    try {
      const legajo = await AsyncStorage.getItem('legajoInspector');
      if (legajo !== null) {
        return legajo;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error recuperando el legajo:', error);
      return null;
    }
  };

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

  useEffect(() => {
    const fetchDesperfectos = async () => {
      try {
        // Obtener todos los desperfectos
        const desperfectosResponse = await fetch('http://localhost:8080/api/desperfectos');
        const desperfectosData = await desperfectosResponse.json();
  
        // Obtener todos los rubros
        const rubrosResponse = await fetch('http://localhost:8080/api/rubros');
        const rubrosData = await rubrosResponse.json();
  
        // Filtrar desperfectos relacionados con el sectorInspector
        const filteredDesperfectos = desperfectosData.filter(desperfecto => {
          const rubro = rubrosData.find(r => r.idRubro === desperfecto.idRubro);
          return rubro && rubro.descripcion === rubroInspector;
        });
  
        setDesperfectos(filteredDesperfectos);
      } catch (error) {
        console.error('Error fetching desperfectos:', error);
      }
    };
  
    if (rubroInspector) {
      fetchDesperfectos();
    }
  }, [rubroInspector]);
  
  useEffect(() => {
    const fetchSitios = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/sitios');
        const data = await response.json();
  
        // Agregar el sitio especial "Otro" con value null al final de la lista
        const sitiosConOtro = [
          ...data,
          { idSitio: null, calle: "Otro", numero: "" }  // Asegúrate de ajustar 'numero' según tus necesidades
        ];
  
        setSitios(sitiosConOtro);
      } catch (error) {
        console.error('Error fetching sitios:', error);
      }
    };
  
    fetchSitios();
  }, []);

  const handleImagePress = (archivo) => {
    setSelectedImage(archivo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleArchivo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false, // Si necesitas la imagen en base64 por alguna razón
        quality: 0.4,
      });
      if (!result.canceled) {
        const asset = result.assets[0];
        setArchivos(prevArchivos => [...prevArchivos, asset]);
      }
    } catch (err) {
      console.error("Error al seleccionar archivos:", err);
    }
  };


  const handleSubmit = async(event) => {
    if (desperfecto == "" || ((lugar === "" || lugar === "Otro" )&& (calle == "" || numero == "")) || detalles == ""){
      setModalErrorVisible(true)
    } else{
      console.log("Cargando Reclamo");
      let fotos = [];
      if (archivos.length > 0) {
        fotos = await Promise.all(archivos.map(async (archivo) => {
          const url = await uploadFile(archivo);
          return { uri: url, name: archivo.fileName };
        }));
      }
      const legajo = await getLegajo();
      let detallesActualizados = detalles;
      let lugarActualizado = lugar;
      if (lugar === "Otro") {
        lugarActualizado = null;
        detallesActualizados += ` Calle: ${calle}, Número: ${numero}`;
      }
      try {
        console.log(lugarActualizado);
        const response = await fetch('http://localhost:8080/api/reclamosInspector', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({legajo:legajo,idSitio:lugarActualizado, idDesperfecto:desperfecto,descripcion:detallesActualizados,estado:"Iniciado"})
        });
            const responseData = await response.json();
            setNumReclamo(responseData.id);
            const response2 = await fetch('http://localhost:8080/api/reclamosmultimediainspector', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({idReclamo:responseData.id, fotos})
          });
          const responseData2 = await response2.json();
            setModalExitoVisible(true);
    }  catch (error) {
    console.error("Error:", error);
}
  };

  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>
      <Text style={styles.boldText}>Generación de Reclamo - Sector: {rubroInspector}</Text>
      <Text style={styles.label}>Desperfecto: *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={desperfecto}
          onValueChange={(itemValue) => setDesperfecto(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar..." value="" />
          {desperfectos.map((item) => (
            <Picker.Item key={item.idDesperfecto} label={item.descripcion} value={item.idDesperfecto} />
          ))}
        </Picker>
      </View>


      <Text style={styles.label}>Lugar del Hecho: *</Text>
<View style={styles.pickerContainer}>
  <Picker
    selectedValue={lugar}
    onValueChange={(itemValue) => setLugar(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Seleccionar..." value="" />
    {sitios.map((item) => (
      <Picker.Item
        key={item.idSitio}
        label={item.calle + " " + item.numero}
        value={item.idSitio}
      />
    ))}
  </Picker>
</View>
{lugar === "Otro" && (
  <>
    <Text style={styles.label}>Calle: *</Text>
    <TextInput
      style={[styles.input]}
      placeholderTextColor="darkgrey"
      value={calle}
      onChangeText={setCalle}
    />
    <Text style={styles.label}>Numero: *</Text>
    <TextInput
      style={[styles.input]}
      placeholderTextColor="darkgrey"
      value={numero}
      onChangeText={setNumero}
    />
  </>
)}
      <Text style={styles.label}>Detalles: *</Text>
      <TextInput
        style={[styles.input, styles.detallesInput]}
        placeholderTextColor="darkgrey"
        value={detalles}
        onChangeText={setDetalles}
        multiline={true}
      />

<Text style={styles.label}>Adjuntar pruebas:</Text>
      <Pressable style={styles.input} onPress={handleArchivo}>
        <Text style={styles.uploadButtonText}>Seleccionar Archivo</Text>
      </Pressable>

      {archivos.length > 0 && (
        <ScrollView style={styles.filesContainer}>
          <Text>Pruebas subidas:</Text>
          {archivos.map((archivo, index) => (
            <Pressable key={index} style={styles.fileItem} onPress={() => handleImagePress(archivo)}>
              <Text>{archivo.name}</Text>
              {archivo.mimeType && archivo.mimeType.startsWith('image/') && (
                <Image
                  source={{ uri: archivo.uri }}
                  style={styles.imagePreview}
                />
              )}
            </Pressable>
          ))}
        </ScrollView>
      )}

      <Modal
        visible={modalVisible}
        transparent={false}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Pressable onPress={handleCloseModal} style={styles.closeButton}>
            <Image source={require('../imagenes/cerrar.png')} style={styles.closeIcon} tintColor={'black'} />
          </Pressable>
          <Image source={{ uri: selectedImage?.uri }} style={styles.fullImage} resizeMode="contain" />
        </View>
      </Modal>

      <Modal
        visible={modalErrorVisible}
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalErrorContainer}>
          <View style={styles.redModal}>
            <Text style={styles.modalErrorText}>Debes completar todos los datos obligatorios</Text>
          </View>
          <Pressable onPress={() => setModalErrorVisible(false)} style={styles.closeErrorButton}>
            <Image source={require('../imagenes/cerrar.png')} style={styles.closeIcon} />
          </Pressable>
        </View>
      </Modal>

      <Modal
        visible={modalExitoVisible}
        transparent={false}
      >
        <View style={styles.modalExitoContainer}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
        </Pressable>
          <Image source={require("../imagenes/correcto.png")} resizeMode="contain" />
          <Text style={styles.labelExito}>El Reclamo se cargó correctamente</Text>
          <Text style={styles.boldText}>Tu numero de reclamo es #{numReclamo}</Text>
        </View>
      </Modal>


      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#f5f5f5', // Softer background color
      },
      label: {
        fontSize: 16,
        marginVertical: 10,
        alignSelf: "start",
      },
      input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        fontSize: 16,
        outlineStyle: 'none',
        width: '100%', // Ajustar el ancho para un mejor diseño
        height: 40, // Aumentar la altura para una mejor accesibilidad
        borderColor: '#6BAADB', // Color de borde que combina con los botones
        borderRadius: 10, // Bordes redondeados para un aspecto moderno
        color: 'black', // Color del texto
        backgroundColor: '#fff', // Fondo blanco para contraste
        shadowColor: '#000', // Sombra para profundidad
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        outlineStyle: 'none',
      },
      textArea: {
        height: 100,
      },
      submitButton: {
        padding: 9,
        alignItems: 'center',
        width: 70,
        marginTop: 10,
        backgroundColor: '#6BAADB', // Softer, more appealing color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25, // More rounded corners for a modern look
        shadowColor: '#000', // Adding shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
      submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
      },
      pickerContainer: {
        marginBottom: 20,
        width: '100%', // Asegura que el contenedor tome el ancho completo
        outlineStyle: 'none',
      },     
      picker: {
        borderWidth: 1,
        borderColor: '#6BAADB',
        borderRadius: 5,
        padding: 10,
        width: "100%",
        fontSize: 16,
        outlineStyle: 'none',
        shadowColor: '#000', // Sombra para profundidad
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        outlineStyle: 'none',
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
      filesContainer: {
        flex: 1,
      },
      fileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      imagePreview: {
        width: 50,
        height: 50,
        marginLeft: 10,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Softer background color
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
      },
      closeIcon: {
        width: 24,
        height: 24,
      },
      fullImage: {
        width: '100%',
        height: '100%',
      },
      redModal: {
        backgroundColor: '#EC5454', // Fondo rojo semi-transparente
        width: '80%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
      },
      modalErrorContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 22,
      },
      modalErrorText: {
        color: 'white',
        fontSize: 16,
      },
      closeErrorButton: {
        position: 'absolute',
        top: 20,
        right: 50,
        zIndex: 1,
      },
      modalExitoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      labelExito: {
        fontSize: 16,
        marginVertical: 10,
      },
      detallesInput:{
        height: 55,
      }
});

export default GenerarReclamoInspector;
