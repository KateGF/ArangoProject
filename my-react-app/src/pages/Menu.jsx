import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles.js"

function Menu() {
    //Declaracion variables
    const navigate = useNavigate();

    const handleAdminCuenta = () => {
        navigate('/adminCuenta', {});
    }

    const handleAmigos = () => {
        navigate('/Amigos', {});
    }

    const handlePublicacion = () => {
        navigate('/publicacion', {});
    }

    const handleLogOut = () => {
        navigate('/', {});
    }

    return (
    <div >
        <div className='main-h-screen bg-black flex flex-col justify-center py-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='text-center text-3xl font-regular text-white'>
                    PROTOTIPO ARANGODB
                </h2>
                <br/>
            </div>
            <div className='bg-darkGreen flex flex-col justify-center py-8 sm:px-6 lg:px-8'></div>
            <div class="bg-[url('./RegistrarUsuario.png')] bg-no-repeat bg-cover bg-center bg-fixed w-full">
            <div className="my-40  sm:mx-auto sm:w-full sm:max-w-md">
                    <div className='bg-darkGreen py-4 px-6 shadow sm:rounded-lg sm:px-10'>
                        
                            <div>
                                <h1  className='mt-8 text-center text-4xl font-semibold text-white'>
                                    Menú
                                </h1>
                            </div>
                            <div className='bg-darkGreen py-8 px-6 shadow sm:rounded-lg sm:px-10'>
                                <div><br/>
                                    
                                    <button onClick={handleAdminCuenta} className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-green">
                                        Administrar Cuenta
                                    </button><br/> 

                                    

                            
                                
                                    <button onClick={handleLogOut} className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-green">
                                        Cerrar Sesión
                                    </button>
                                </div><br/>
                            </div>
                    </div>
            </div>        
        </div>               
    </div>

    </div>



    )
}

export default Menu