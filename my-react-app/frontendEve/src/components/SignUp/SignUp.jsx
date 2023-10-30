import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js"

function SignUp() {
    //Declaracion variables
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [genero, setGenero] = useState("");
    const [visible, setVisible] = useState(false);

    return (
        <div >
            <div className='main-h-screen bg-black flex flex-col justify-center py-4'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='text-center text-3xl font-regular text-white'>
                        PROTOTIPO ARANGODB
                    </h2>
                    <br />
                </div>
                <div className='bg-darkGreen flex flex-col justify-center py-4 sm:px-6 lg:px-8'></div>
                <div class="bg-[url('https://images7.alphacoders.com/132/1324769.png')] bg-no-repeat bg-cover bg-center bg-fixed w-full">
                    <div className="my-10  sm:mx-auto sm:w-full sm:max-w-md">
                        <div className='bg-darkGreen bg-opacity-75 py-4 px-6 shadow sm:rounded-lg sm:px-10'>
                            <form className="space-y-6">
                                <div>
                                    <h1 className='mt-4 text-center text-4xl font-semibold text-white'>Registro</h1>
                                </div>
                                <div className=''>
                                    <label htmlFor='text' className='block text-sm text-gray-100'>Nombre</label>
                                    <input
                                        name='nombre'
                                        type='text'
                                        required value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    <br />

                                    <label htmlFor='text' className='block text-sm text-gray-100'>Apellidos</label>
                                    <input
                                        name='apellidos'
                                        type='text'
                                        required value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    <br />

                                    <label htmlFor='email' className='block text-sm text-gray-100'>
                                        Correo Electrónico
                                    </label>
                                    <div className='mt-1'>
                                        <input
                                            name='email'
                                            type='email'
                                            autoComplete='email'
                                            required value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    </div>
                                    <br />

                                    <label htmlFor='password' className='block text-sm text-gray-100'>
                                        Contraseña
                                    </label>
                                    <div className='mt-1 relative align-left'>
                                        <input
                                            name='password'
                                            type={visible ? "text" : "password"}
                                            autoComplete='current-password'
                                            required value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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

                                    <label htmlFor='text' className='block text-sm text-gray-100'>Fecha Nacimiento</label>
                                    <input
                                        name='fechaNacimiento'
                                        type='date'
                                        required value={fechaNacimiento}
                                        onChange={(e) => setFechaNacimiento(e.target.value)}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    <br />

                                    <label htmlFor='number' className='block text-sm text-gray-100'>Teléfono</label>
                                    <input
                                        name='telefono'
                                        type='number'
                                        required value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm' />
                                    <br />

                                    <label htmlFor='text' className='block text-sm text-gray-100'>Género</label>
                                    <select id="genero" class="'appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green focus:border-green sm:text-sm">
                                        <option selected>Seleccione un género</option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                    </select>
                                    <br />

                                    <div className={`${styles.noramlFlex} justify-between`}>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-green">
                                            Registrarse
                                        </button>
                                    </div>
                                    <div className={`${styles.noramlFlex} text-white w-full justify-center`}>
                                        <h2>Ya tienes cuenta?</h2>
                                        <Link to="/" className="text-green pl-2">
                                            Iniciar Sesión
                                        </Link>
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

export default SignUp