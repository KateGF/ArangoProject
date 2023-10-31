import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles.js"


function AdminCuenta() {
    //Declaracion variables
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasenna, setContrasenna] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [genero, setGenero] = useState("");
    const [visible, setVisible] = useState(false);

    const handleVolver = () => {
        navigate('/menu', {});
    }

    return (
        <div >
            <div className='main-h-screen bg-black flex flex-col justify-center py-6'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='text-center text-3xl font-regular text-white'>
                        PROTOTIPO ARANGODB
                    </h2>
                    <br />
                </div>
                <div className='bg-darkGreen flex flex-col justify-center py-6 sm:px-6 lg:px-8'></div>
                <div class="bg-no-repeat bg-cover bg-center bg-fixed w-full">
                    <div className="my-10  sm:mx-auto sm:w-full sm:max-w-md">
                        <div className='bg-darkGreen bg-opacity-75 py-4 px-6 shadow sm:rounded-lg sm:px-10'>
                            <form className="space-y-6">
                                <div>
                                    <h1 className='mt-8 text-center text-4xl font-semibold text-white'>Administrar Cuenta</h1><br/>
                                </div>
                                <div className=''>
                                    <input
                                        name='nombre'
                                        type='text' placeholder="Nombre" 
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className= 'appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    <br />

                                    <input
                                        name='usuario' type='text' placeholder="Usuario"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    <br />

                                    <div className='mt-1'>
                                        <input
                                            type='text' placeholder="Correo Electrónico"  name='email'
                                            autoComplete='email'
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                            className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    </div>
                                    <br />
                                    
                                    <div className='mt-1 relative align-left'>
                                        <input
                                            name='password' placeholder='Contraseña'
                                            type={visible ? "text" : "password"}
                                            autoComplete='current-password'
                                            value={contrasenna}
                                            onChange={(e) => setContrasenna(e.target.value)}
                                            className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                        {
                                            visible ? (
                                                <AiOutlineEye
                                                    className='absolute right-2 top-2 cursor-pointer'
                                                    size={25}
                                                    onClick={() => setVisible(false)} />
                                            ) : (
                                                <AiOutlineEyeInvisible
                                                    className='absolute right-2 top-2 cursor-pointer'
                                                    size={25}
                                                    onClick={() => setVisible(true)} />
                                            )
                                        }
                                    </div>
                                    <br />

                                    <input
                                        name='fechaNacimiento'
                                        type='date'
                                        value={fechaNacimiento}
                                        onChange={(e) => setFechaNacimiento(e.target.value)}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    <br />

                                    <input
                                        placeholder='Telefono'
                                        name='telefono'
                                        type='number'
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    <br />

                                    <select id="genero" class="'appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm">
                                        <option selected genero={genero} onChange={(e) => setGenero(e.target.value)} >Seleccione un género</option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                    </select>
                                    <br />

                                    <div className={`${styles.noramlFlex} justify-between`}>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="mt-2 group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-green">
                                            Actualizar información
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="mt-2 group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-green">
                                            Eliminar Cuenta
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleVolver} 
                                            type="submit"
                                            className=" mt-2 group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-green">
                                            Volver
                                        </button>
                                    </div>



                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    )
}

export default AdminCuenta