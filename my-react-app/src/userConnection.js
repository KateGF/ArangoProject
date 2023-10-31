import axios from 'axios';

const baseURL = 'http://localhost:8529/_db/_system'; // Reemplaza 'your_database_name' con el nombre de tu base de datos ArangoDB

// Función para crear un usuario en ArangoDB
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/_api/users`, userData);

    if (response.status === 201) {
      return true; // Usuario creado exitosamente
    } else {
      return false; // Ocurrió un error al crear el usuario
    }
  } catch (error) {
    console.log("Error al registrar el usuario", error);
    return false;
  }
}


export { createUser };