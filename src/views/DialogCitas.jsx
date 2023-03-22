import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import Dialog from "../components/Dialog";
import { db } from "../firebase";
import format from "date-fns/format";
import { es } from "date-fns/locale";

export default function DialogCitas({ isOpen, onClose }) {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const getRegistros = async () => {
      await onSnapshot(collection(db, "appointments"), (querySnapshot) => {
        setRegistros(querySnapshot.docs.map((doc) => doc.data()));
      });
    };
    getRegistros();
  }, []);

  console.log(registros);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Citas creadas"
      content={
        <>
          {registros.map((registro, index) => (
            <div key={index}>
              <p>Nombre: {registro.name}</p>
              <p>Apellido: {registro.lastName}</p>
              <p>Correo: {registro.email}</p>
              <p>Teléfono: {registro.phone}</p>
              <p>
                Fecha de nacimiento:{" "}
                {format(
                  Number(registro.birthdate.seconds + "000"),
                  "d 'de' MMMM 'del' yyyy",
                  {
                    locale: es,
                  }
                )}
              </p>
              <p>Hora: {registro.time}:00 horas</p>
              <p>Razón: {registro.reason}</p>
              <p>Especialidad: {registro.speticialities.spectiality}</p>
              <p>Doctor: {registro.speticialities.doctor}</p>
              <hr />
            </div>
          ))}
        </>
      }
      Actions={<Button variant="contained" sx={{background: "#8cd600", fontWeight: 700}} onClick={onClose}>Cerrar</Button>}
    />
  );
}
