'use client'
import Styles from './page.module.css'
import RedimensionarImagen from './resolucion'
import { useEffect, useState } from 'react';
import { getresumen, getvideoHD, getvideoSinHD, getfotos, getcomentarios, getinfoperfil, getimgperfil, getcompletoperfil, getcompletoruc } from '../../api/perfil'; 

const perfil = () =>{
    const [resumen_texto, setresumen_texto] = useState('');
    const [video_link, setvideo_link] = useState("");
    const [video_link_sin_hd, setvideo_link_sin_hd] = useState("");
    const [imagenes, setimagenes] = useState([]);
    const [booleano, setbooleano] = useState(0);
    const [diccomentario, setdiccomentario] = useState([]);
    const [diccperfil, setdiccperfil] = useState([]);
    const [ diccperfilimg, setdiccperfilimg] = useState([]);
    const [loading, setLoading] = useState(true);//Verifica que los datos se esten cargando
    const [infocompleto, setinfocompleto] = useState({})
    const cambia_booleano = () => {
        setbooleano(booleano === 0 ? 1 : 0);
      };
    
    

    useEffect(() => {
        setresumen_texto(getresumen('671ac23dfdd3b7d8c1d73b9a'));
        const fetchVideo = async () => {
            const link = await getvideoHD("671ac23dfdd3b7d8c1d73b9a");
            const link2 = await getvideoSinHD("671ac23dfdd3b7d8c1d73b9a");
            setvideo_link(link);
            setvideo_link_sin_hd(link2);

            const listaimagenes = await getfotos("671ac23dfdd3b7d8c1d73b9a");
            setimagenes(listaimagenes);
            
            const {comentarios, calificaciones, fechas} = await getcomentarios("671ac23dfdd3b7d8c1d73b9a");
            
            setdiccomentario({ comentarios, calificaciones, fechas });
            
            const usuario0  = await getinfoperfil("673fb738d58e2f33e6fa866d");
            const usuario1  = await getinfoperfil("673faa82bef49fb874f44c29");
            const usuario2 = await getinfoperfil("673fb49ad58e2f33e6fa8667");
            const usuario3 = await getinfoperfil("673fb4d3d58e2f33e6fa8669");
            const usuario4 = await getinfoperfil("673fb6c3d58e2f33e6fa866b");
            setdiccperfil([usuario0, usuario1, usuario2, usuario3, usuario4]);
            
            const img0 = await getimgperfil("673fb738d58e2f33e6fa866d");
            const img1 = await getimgperfil("673faa82bef49fb874f44c29");
            const img2 = await getimgperfil("673fb49ad58e2f33e6fa8667");
            const img3 = await getimgperfil("673fb4d3d58e2f33e6fa8669");
            const img4 = await getimgperfil("673fb6c3d58e2f33e6fa866b");
            
            setdiccperfilimg([img0, img1, img2, img3, img4]);
            
            const actividad = await getcompletoperfil("673fb6c3d58e2f33e6fa866b");
            const ruc = await getcompletoruc("673fb6c3d58e2f33e6fa866b");
            setinfocompleto([ruc,actividad]);

            setLoading(false);
        }
        fetchVideo();

      }, []);
    
    return (
        <div className={Styles.render}>
            
        <div className={Styles.barra}>

            <div className={Styles.logo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16">
  <path d="M6.271 1.545c.17-.05.354.025.515.125v2.15c-.07.04-.146.08-.22.121v.38a.5.5 0 0 0 .5.5h1.387c.297-.152.614-.501.883-.917l1.085-2.272A1.25 1.25 0 0 0 9.921 1.545h-3.642zm1.5 0V3.85c.217-.119.433-.208.65-.269v-.848a.5.5 0 0 0-.5-.5h-1.27c-.314.074-.61.246-.864.511V1.545zm1.82.5c-.179.09-.375.217-.58.372v3.888c.083.074.173.14.27.195v.38a.5.5 0 0 0 .5.5h1.645c.314-.074.61-.246.864-.511V2.045zm-2.18 10.224a1.25 1.25 0 0 0 1.25 1.25h3.642c.66 0 1.23-.568 1.23-1.25v-3.643c0-.66-.568-1.23-1.23-1.23h-3.642a1.25 1.25 0 0 0-1.25 1.25v3.643z"/>
</svg>
A tu puerta
            </div>
            <div className={Styles.container}>
                <div className={Styles.botonesbr}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg>
                    Home
                    
                </div>
                <div className={Styles.botonesbr}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
</svg>
                Perfil
                    
                </div>
                <div className={Styles.botonesbr}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
  <path d="M6.271 1.545c.17-.05.354.025.515.125v2.15c-.07.04-.146.08-.22.121v.38a.5.5 0 0 0 .5.5h1.387c.297-.152.614-.501.883-.917l1.085-2.272A1.25 1.25 0 0 0 9.921 1.545h-3.642zm1.5 0V3.85c.217-.119.433-.208.65-.269v-.848a.5.5 0 0 0-.5-.5h-1.27c-.314.074-.61.246-.864.511V1.545zm1.82.5c-.179.09-.375.217-.58.372v3.888c.083.074.173.14.27.195v.38a.5.5 0 0 0 .5.5h1.645c.314-.074.61-.246.864-.511V2.045zm-2.18 10.224a1.25 1.25 0 0 0 1.25 1.25h3.642c.66 0 1.23-.568 1.23-1.25v-3.643c0-.66-.568-1.23-1.23-1.23h-3.642a1.25 1.25 0 0 0-1.25 1.25v3.643z"/>
</svg>
                    Trabajos
                    
                </div>
                <div className={Styles.botonesbr}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 1 .5.5v1.5H14a.5.5 0 0 1 0 1H5.5v1.5a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9z"/>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
</svg>
                    Mis Postulaciones
                    
                </div>
                <div className={Styles.botonesbr}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
  <path d="M2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-1z"/>
  <path d="M3 8a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H3.5a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H3.5a.5.5 0 0 1-.5-.5z"/>
</svg>
                    Historial
                </div>

            </div>
                
        </div>
        <div className={Styles.perfil}>
            <div className={Styles.perfilcontainer}>
            <div className={Styles.imagenperfil}>
            {
                booleano === 0 ? (
                    <img src={diccperfilimg[0]}/>
                ):
                (
                    <RedimensionarImagen imagenUrl={diccperfilimg[0]} ancho={100} alto={100} />  
                )
            }
                          
            </div>
                <div className={Styles.nombres}>
                    <div className={Styles.nombre}>
                    {diccperfil[0]}
                    </div>
                </div>
            </div>

            <div className={Styles.infopersonal}>
                <div className={Styles.titulo}>
                    Acerca de
                </div>
                <div className={Styles.infopersonalcontainer}>
                    <div className={Styles.icono}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cake-fill" viewBox="0 0 16 16">
  <path d="M7 4.029h2.283C9.353 2.11 8.8 1.5 8 1.5c-1.4 0-2.717.418-3.642 1.279h2.014A.5.5 0 0 0 7 4.029zM5 1.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2.15c-.07.04-.146.08-.22.121v.38a.5.5 0 0 0 .5.5h1.387c.297-.152.614-.501.883-.917l1.085-2.272A1.25 1.25 0 0 0 9.921 1.545h-3.642zm1.5 0V3.85c.217-.119.433-.208.65-.269v-.848a.5.5 0 0 0-.5-.5h-1.27c-.314.074-.61.246-.864.511V1.545zm1.82.5c-.179.09-.375.217-.58.372v3.888c.083.074.173.14.27.195v.38a.5.5 0 0 0 .5.5h1.645c.314-.074.61-.246.864-.511V2.045zm-2.18 10.224a1.25 1.25 0 0 0 1.25 1.25h3.642c.66 0 1.23-.568 1.23-1.25v-3.643c0-.66-.568-1.23-1.23-1.23h-3.642a1.25 1.25 0 0 0-1.25 1.25v3.643z"/>
</svg>
                    </div>
                    <div className={Styles.info}>
                    {infocompleto[0]}
                    </div>
                </div>
                <div className={Styles.infopersonalcontainer}>
                    <div className={Styles.icono}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 5.108-8c-1.696 2.343-5.108 8-5.108 8zm0-12.965C3.482 3.033 3 3.482 3 8s.482 4.967 1.054 7c.572-2.039 1.872-3.686 3.296-5z"/>
</svg>
                    </div>
                    <div className={Styles.info}>
                    {infocompleto[1]}
                    </div>
                </div>
            </div>
            <div className={Styles.titulo}>
                Video promocional
            </div>
            <br></br>
            <div>
                {
                    booleano === 0 ? (
                    <button className={Styles['category-button']} onClick={cambia_booleano}>Bajar la resolución</button>
                    ):
                    (
                    <button className={Styles['category-button']} onClick={cambia_booleano}>Subir la resolución</button>
                    )
                }
                
            </div>
            <br></br>
            <div>
                {typeof video_link === "string" && video_link !== "" ? (
                booleano === 0 ? (
                    <iframe
                key={video_link}
                src={video_link}
                width="920"
                height="500"
                allow="autoplay"
                ></iframe>
                ) : (
                    <iframe
                key={video_link_sin_hd}
                src={video_link_sin_hd}
                width="920"
                height="500"
                allow="autoplay"
                ></iframe>
                )
                ) : (
                    <p>Cargando video...</p>
                )}
            </div>
            <div className={Styles.titulo}>
                Resumen
            </div>
            <div className={Styles.resumen}>
                {resumen_texto}
            </div>
            <div className={Styles.solicitudes}>
                <div className={Styles.titulo}>
                Comentarios de otros usuarios
                </div>
                <div className={Styles.solicitudescontainer}>
                    <div className={Styles.solicitud}>
                        <div className={Styles.imagenperfil}>
                        {
                            booleano === 0 ? (
                                <img src={diccperfilimg[1]}/>
                            ):
                            (
                                <RedimensionarImagen imagenUrl={diccperfilimg[1]} ancho={100} alto={100} />  
                            )
                        }
                        </div>
                        <div className={Styles.nombres}>
                            <div className={Styles.nombre}>
                            {diccperfil[1]}
                            </div>
                            <div className={Styles.fecha}>
                                {loading ? (
                                    <p></p>
                                ) : Array.isArray(diccomentario.fechas) && diccomentario.fechas.length > 0 ? (
                                    
                                    <p>{diccomentario.fechas[0].trim().slice(0, 10)}</p>
                                ) : (
                                    <p>No hay fechas</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.imagensolicitud}>
                        {
                            booleano === 0 ? (
                                <img src={imagenes[0]}/>
                            ):
                            (
                                <RedimensionarImagen imagenUrl={imagenes[0]} ancho={100} alto={100} />  
                            )
                        }
                    </div>
                    <div className={Styles.puntuacion}>
                        {loading ? (
                            <p></p>
                        ) : Array.isArray(diccomentario.calificaciones) && diccomentario.calificaciones.length > 0 ? (
                            <p>{diccomentario.calificaciones[0]}</p>
                        ) : (
                            <p>No hay calificaciones</p>
                        )}
                    </div>
                    <div className={Styles.descripcion}>
                        {loading ? (
                            <p>Cargando comentarios...</p>
                        ) : Array.isArray(diccomentario.comentarios) && diccomentario.comentarios.length > 0 ? (
                            <p>{diccomentario.comentarios[0]}</p>
                        ) : (
                            <p>No hay comentarios</p>
                        )}
                    </div>
                </div>
                <div className={Styles.solicitudescontainer}>
                    <div className={Styles.solicitud}>
                        <div className={Styles.imagenperfil}>
                            {
                                booleano === 0 ? (
                                    <img src={diccperfilimg[2]}/>
                                ):
                                (
                                    <RedimensionarImagen imagenUrl={diccperfilimg[2]} ancho={100} alto={100} />  
                                )
                            }
                        </div>
                        <div className={Styles.nombres}>
                            <div className={Styles.nombre}>
                                {diccperfil[2]}
                            </div>
                            <div className={Styles.fecha}>
                                {loading ? (
                                    <p></p>
                                ) : Array.isArray(diccomentario.fechas) && diccomentario.fechas.length > 0 ? (
                                    
                                    <p>{diccomentario.fechas[1].trim().slice(0, 10)}</p>
                                ) : (
                                    <p>No hay fechas</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.imagensolicitud}>
                        {
                            booleano === 0 ? (
                                <img src={imagenes[1]}/>
                            ):
                            (
                                <RedimensionarImagen imagenUrl={imagenes[1]} ancho={100} alto={100} />  
                            )
                        }
                    </div>
                    <div className={Styles.puntuacion}>
                        {loading ? (
                            <p></p>
                        ) : Array.isArray(diccomentario.calificaciones) && diccomentario.calificaciones.length > 0 ? (
                            <p>{diccomentario.calificaciones[1]}</p>
                        ) : (
                            <p>No hay calificaciones</p>
                        )}
                    </div>
                    <div className={Styles.descripcion}>
                        {loading ? (
                            <p>Cargando comentarios...</p>
                        ) : Array.isArray(diccomentario.comentarios) && diccomentario.comentarios.length > 0 ? (
                            <p>{diccomentario.comentarios[1]}</p>
                        ) : (
                            <p>No hay comentarios</p>
                        )}
                    </div>
                </div>
                <div className={Styles.solicitudescontainer}>
                    <div className={Styles.solicitud}>
                        <div className={Styles.imagenperfil}>
                            {
                                booleano === 0 ? (
                                    <img src={diccperfilimg[3]}/>
                                ):
                                (
                                    <RedimensionarImagen imagenUrl={diccperfilimg[3]} ancho={100} alto={100} />  
                                )
                            }
                        </div>
                        <div className={Styles.nombres}>
                            <div className={Styles.nombre}>
                                {diccperfil[3]}
                            </div>
                            <div className={Styles.fecha}>
                                {loading ? (
                                    <p></p>
                                ) : Array.isArray(diccomentario.fechas) && diccomentario.fechas.length > 0 ? (
                                    
                                    <p>{diccomentario.fechas[2].trim().slice(0, 10)}</p>
                                ) : (
                                    <p>No hay fechas</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.imagensolicitud}>
                        {
                            booleano === 0 ? (
                                <img src={imagenes[2]}/>
                            ):
                            (
                                <RedimensionarImagen imagenUrl={imagenes[2]} ancho={100} alto={100} />  
                            )
                        }
                    </div>
                    <div className={Styles.puntuacion}>
                        {loading ? (
                            <p></p>
                        ) : Array.isArray(diccomentario.calificaciones) && diccomentario.calificaciones.length > 0 ? (
                            <p>{diccomentario.calificaciones[2]}</p>
                        ) : (
                            <p>No hay calificaciones</p>
                        )}
                    </div>
                    
                    <div className={Styles.descripcion}>
                        {loading ? (
                            <p>Cargando comentarios...</p>
                        ) : Array.isArray(diccomentario.comentarios) && diccomentario.comentarios.length > 0 ? (
                            <p>{diccomentario.comentarios[2]}</p>
                        ) : (
                            <p>No hay comentarios</p>
                        )}
                    </div>
                    
                </div>
                
                <div className={Styles.solicitudescontainer}>
                    <div className={Styles.solicitud}>
                        <div className={Styles.imagenperfil}>
                            {
                                booleano === 0 ? (
                                    <img src={diccperfilimg[4]}/>
                                ):
                                (
                                    <RedimensionarImagen imagenUrl={diccperfilimg[4]} ancho={100} alto={100} />  
                                )
                            }
                        </div>
                        <div className={Styles.nombres}>
                            <div className={Styles.nombre}>
                                {diccperfil[4]}
                            </div>
                            <div className={Styles.fecha}>
                                {loading ? (
                                    <p></p>
                                ) : Array.isArray(diccomentario.fechas) && diccomentario.fechas.length > 0 ? (
                                    
                                    <p>{diccomentario.fechas[3].trim().slice(0, 10)}</p>
                                ) : (
                                    <p>No hay fechas</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.imagensolicitud}>
                        {
                            booleano === 0 ? (
                                <img src={imagenes[3]}/>
                            ):
                            (
                                <RedimensionarImagen imagenUrl={imagenes[3]} ancho={100} alto={100} />  
                            )
                        }
                    </div>
                    <div className={Styles.puntuacion}>
                        {loading ? (
                            <p></p>
                        ) : Array.isArray(diccomentario.calificaciones) && diccomentario.calificaciones.length > 0 ? (
                            <p>{diccomentario.calificaciones[3]}</p>
                        ) : (
                            <p>No hay calificaciones</p>
                        )}
                    </div>
                    
                    <div className={Styles.descripcion}>
                        {loading ? (
                            <p>Cargando comentarios...</p>
                        ) : Array.isArray(diccomentario.comentarios) && diccomentario.comentarios.length > 0 ? (
                            <p>{diccomentario.comentarios[2]}</p>
                        ) : (
                            <p>No hay comentarios</p>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    );
    
}

export default perfil;