import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Pressable, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigate } from 'react-router-native';

const GenerarServicio = () => {
  const [nombre, setNombre] = useState('');
  const [medioContacto, setMedioContacto] = useState('');
  const [rubro, setRubro] = useState('');
  const [promociones, setPromociones] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalExitoVisible, setModalExitoVisible] = useState(false);

  const navigate = useNavigate();

  const handleImagePress = (archivo) => {
    setSelectedImage(archivo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleArchivo = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.type != "cancel") {
        console.log(result.assets[0]);
        setArchivos(prevArchivos => [...prevArchivos, result.assets[0]]);
      }
    } catch (err) {
      console.error("Error al seleccionar archivos:", err);
    }
  };


  const handleSubmit = () => {
    if (nombre == "" || medioContacto == "" || promociones == "" || rubro == "" || detalles == ""){
      setModalErrorVisible(true)
    } else{
      console.log({ nombre, medioContacto, rubro, promociones, detalles, archivos });
      setModalExitoVisible(true)
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>
      <Text style={styles.boldText}>Solicitud para Servicio</Text>

      <Text style={styles.label}>Nombre: *</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="darkgrey"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Medio de contacto: *</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="darkgrey"
        value={medioContacto}
        onChangeText={setMedioContacto}
      />


    <Text style={styles.label}>Rubro: *</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="darkgrey"
        value={rubro}
        onChangeText={setRubro}
      />

    <Text style={styles.label}>Promociones: *</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="darkgrey"
        value={promociones}
        onChangeText={setPromociones}
      />

      <Text style={styles.label}>Detalles: *</Text>
      <TextInput
        style={[styles.input, styles.detallesInput]}
        placeholderTextColor="darkgrey"
        value={detalles}
        onChangeText={setDetalles}
        multiline={true}
      />

      <Text style={styles.label}>Adjuntar Pruebas:</Text>
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
            <Image source={require('../imagenes/cerrar.png')} style={styles.closeIcon} tintColor={'white'} />
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
          source={require('../imagenes/volver.png')} 
          style={styles.arrowImage}
        />
        </Pressable>
          <Image source={require("../imagenes/correcto.png")} resizeMode="contain" />
          <Text style={styles.boldText}>La solicitud de servicio se envió correctamente</Text>
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
        alignItems: "center"
      },
      label: {
        fontSize: 16,
        marginVertical: 5,
        alignSelf: "start",
      },
      input: {
        borderWidth: 1,
        borderColor: '#AEAEAE',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: "100%",
        fontSize: 16,
        outlineStyle: 'none',
      },
      textArea: {
        height: 100,
      },
      submitButton: {
        backgroundColor: 'black',
        padding: 9,
        alignItems: 'center',
        borderRadius: 5,
        width: 70,
        marginTop: 10,
      },
      submitButtonText: {
        color: 'white',
        fontSize: 16,
      },
      pickerContainer: {
        marginBottom: 10,
        width: '100%', // Asegura que el contenedor tome el ancho completo
        outlineStyle: 'none',
      },
      picker: {
        borderWidth: 1,
        borderColor: '#AEAEAE',
        borderRadius: 5,
        padding: 10,
        width: "100%",
        fontSize: 16,
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
        backgroundColor: 'black',
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
      }
});

export default GenerarServicio;
