import React, { useState } from "react";
import styles from "./opciones.module.css";

const Opciones = () => {
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(null);

  const ubicaciones = ["Lima", "Arequipa", "Cusco", "Trujillo", "Piura"];

  const abrirMenu = (menu) => {
    setMenuAbierto(menuAbierto === menu ? null : menu);
  };

  const seleccionarOpcion = (menu, valor) => {
    if (menu === "hora") setHora(valor);
    if (menu === "fecha") setFecha(valor);
    if (menu === "ubicacion") setUbicacion(valor);
    setMenuAbierto(null);
  };

  return (
    <div className={styles.container}>
      {/* Botón Hora */}
      <div className={styles.opcion}>
        <button onClick={() => abrirMenu("hora")} className={styles.boton}>
          <span role="img" aria-label="hora">⏰</span> {hora || "hora"}
        </button>
        {menuAbierto === "hora" && (
          <div className={styles.menu}>
            {["08:00", "09:00", "10:00", "11:00", "12:00"].map((h) => (
              <div
                key={h}
                className={styles.opcionMenu}
                onClick={() => seleccionarOpcion("hora", h)}
              >
                {h}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botón Fecha */}
      <div className={styles.opcion}>
        <button onClick={() => abrirMenu("fecha")} className={styles.boton}>
          <span role="img" aria-label="fecha">📅</span> {fecha || "day"}
        </button>
        {menuAbierto === "fecha" && (
          <div className={styles.menu}>
            {["2024-11-18", "2024-11-19", "2024-11-20"].map((f) => (
              <div
                key={f}
                className={styles.opcionMenu}
                onClick={() => seleccionarOpcion("fecha", f)}
              >
                {f}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botón Ubicación */}
      <div className={styles.opcion}>
        <button onClick={() => abrirMenu("ubicacion")} className={styles.boton}>
          <span role="img" aria-label="ubicacion">📍</span> {ubicacion || "lugar"}
        </button>
        {menuAbierto === "ubicacion" && (
          <div className={styles.menu}>
            {ubicaciones.map((u) => (
              <div
                key={u}
                className={styles.opcionMenu}
                onClick={() => seleccionarOpcion("ubicacion", u)}
              >
                {u}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botón Añadir al carrito */}
      <button className={styles.carrito}>Añadir al carrito</button>
    </div>
  );
};

export default Opciones;
