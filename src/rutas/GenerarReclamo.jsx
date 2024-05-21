import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigate } from 'react-router-native';

const screenWidth = Dimensions.get('window').width;

const GenerarReclamo = () => {
  const [desperfecto, setDesperfecto] = useState('');
  const [lugar, setLugar] = useState('');
  const [detalles, setDetalles] = useState('');
  const [archivos, setArchivos] = useState([]);

  const navigate = useNavigate();


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
    // Lógica para enviar el formulario
    console.log({ desperfecto, lugar, detalles, archivos });
  };

  return (
    <View style={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
      </Pressable>
      <Text style={styles.boldText}>Generación de Reclamo</Text>
      <Text style={styles.label}>Desperfecto</Text>
      <View style={styles.pickerContainer}>
        <Picker
            selectedValue={desperfecto}
            onValueChange={(itemValue) => setDesperfecto(itemValue)}
            style={styles.picker}
        >
        <Picker.Item label="Seleccionar..." value=""/>
        <Picker.Item label="Bache" value="Bache"  />
        <Picker.Item label="Reparación" value="Reparación" />
        <Picker.Item label="Desuso" value="Desuso" />
        <Picker.Item label="Vandalismo" value="Vandalismo"/>
        </Picker>
    </View>


      <Text style={styles.label}>Lugar del Hecho</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="darkgrey"
        value={lugar}
        onChangeText={setLugar}
      />

      <Text style={styles.label}>Detalles</Text>
      <TextInput
        style={[styles.input, styles.detallesInput]}
        placeholderTextColor="darkgrey"
        value={detalles}
        onChangeText={setDetalles}
        multiline={true}
      />

      <Text style={styles.label}>Adjuntar Pruebas</Text>
      <Pressable style={styles.input} onPress={handleArchivo}>
        <Text style={styles.uploadButtonText}>Seleccionar Archivo</Text>
      </Pressable>

      {archivos.length>0 &&(
        <>
        <Text>Pruebas agregadas:</Text>
        <ScrollView style={styles.filesContainer}>
        {archivos.map((archivo, index) => (
          <View key={index} style={styles.fileItem}>
            <Text>{archivo.name}</Text>
          </View>
        ))}
      </ScrollView>
        </>
      )}

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar</Text>
      </Pressable>
    </View>
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
        marginVertical: 10,
        alignSelf: "start",
      },
      input: {
        borderWidth: 1,
        borderColor: '#AEAEAE',
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        width: "100%",
        fontSize: 16,
        outlineStyle: 'none',
      },
      textArea: {
        height: 100,
      },
      filesContainer: {
        marginVertical: 5,
        width: "100%"
      },
      fileItem: {
        width: "100%"
      },
      imagePreview: {
        width: 200,
        height: 200,
        marginTop: 10,
      },
      submitButton: {
        backgroundColor: 'black',
        padding: 9,
        alignItems: 'center',
        borderRadius: 5,
        width: 70,
      },
      submitButtonText: {
        color: 'white',
        fontSize: 16,
      },
      pickerContainer: {
        marginBottom: 20,
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
      }
});

export default GenerarReclamo;
