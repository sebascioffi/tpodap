import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';

const Promocion = () => {
  const { id } = useParams();
  const [comercio, setComercio] = useState({});

  useEffect(() => {
    const fetchComercio = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/promociones/${id}`);
        const data = await response.json();
        setComercio(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchComercio();
  }, [id]);

  const navigate = useNavigate();

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backArrow}>
        <Image
          source={require('../imagenes/volver.png')} // Asegúrate de tener una imagen de flecha en tu proyecto
          style={styles.arrowImage}
        />
        </Pressable>

        {comercio.fotosPublicacion && comercio.fotosPublicacion.length > 0 && (
        <>
      <Image
        source={{ uri: comercio.fotosPublicacion[0].uri }}
        style={styles.mainImage}
      />
        </>
      )}

      <View style={styles.infoContainer}>
      {comercio.categoria === "servicio" ? (
        <>
        <Text style={styles.tipo}>{comercio.nombre}</Text>
        <Text style={styles.desc}>Categoría: Servicio</Text>
        <Text style={styles.desc}>Ofrece el servicio: {comercio.contacto? comercio.contacto.nombreapellido: "No hay datos"}</Text>
        <Text style={styles.desc}>Teléfono: {comercio.telefono}</Text>
        <Text style={styles.desc}>Horario: {comercio.contacto ? comercio.contacto.horarioComercio : 'Horario no disponible'}</Text>
        <Text style={styles.desc}>Rubro: {comercio.rubro}</Text>
        <Text style={styles.desc}>Descuento: {comercio.descuento}</Text>
        <Text style={styles.desc}>Detalles: {comercio.detalles}</Text>
        </>
      ): (
        <>
        <Text style={styles.tipo}>{comercio.nombre}</Text>
        <Text style={styles.desc}>Categoría: Comercio</Text>
        <Text style={styles.desc}>Teléfono: {comercio.telefono}</Text>
        <Text style={styles.desc}>Horario: {comercio.contacto ? comercio.contacto.horarioComercio : 'Horario no disponible'}</Text>
        <Text style={styles.desc}>Encargado/Dueño: {comercio.contacto? comercio.contacto.nombreapellido: "Sin dueño"}</Text>
        <Text style={styles.desc}>Descuento: {comercio.descuento}</Text>
        <Text style={styles.desc}>Detalles: {comercio.detalles}</Text>
        </>
      )}
      </View>


      
      {comercio.fotosPublicacion && comercio.fotosPublicacion.length > 1 && (
  <>
    <Text style={styles.desc}>Más imagenes:</Text>
    <ScrollView>
      {comercio.fotosPublicacion.slice(1).map((foto, index) => (
        <Image
          key={index}
          source={{ uri: foto.uri }}
          style={styles.image}
        />
      ))}
    </ScrollView>
  </>
)}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5', // Softer background color
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: 280,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    marginBottom: 5,
  },
  backArrow: {
    top: -10, // Ajusta según sea necesario para que esté bien alineado
    left: 5,
  },
  arrowImage: {
    width: 24, // Ajusta el tamaño de la flecha según sea necesario
    height: 24,
  },
});

export default Promocion;
