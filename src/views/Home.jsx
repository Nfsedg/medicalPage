import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AdapterDateFns from "@date-io/date-fns";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import DialogCitas from "./DialogCitas";

const speticialities = [
  {
    spectiality: "Cardiologia",
    doctors: [
      {
        name: "Dr. Juan Perez",
        id: 1,
      },
      {
        name: "Dr. Omar Gomez",
        id: 2,
      },
      {
        name: "Dr. Freddy Martinez",
        id: 3,
      },
    ],
  },
  {
    spectiality: "Traumatologia",
    doctors: [
      {
        name: "Dr. Mary Chavez",
        id: 1,
      },
      {
        name: "Dr. Pablo Gutiérrez",
        id: 2,
      },
      {
        name: "Dr. Blas Jimenez",
        id: 3,
      },
    ],
  },
  {
    spectiality: "Cirugia",
    doctors: [
      {
        name: "Dr. Itzel Flores",
        id: 1,
      },
      {
        name: "Dr. Susana Cervantes",
        id: 2,
      },
      {
        name: "Dr. Pedro Alvarado",
        id: 3,
      },
    ],
  },
  {
    spectiality: "Infectologia",
    doctors: [
      {
        name: "Dr. Vernan Diaz",
        id: 1,
      },
      {
        name: "Dr. Jaime Hernandez",
        id: 2,
      },
      {
        name: "Dr. Isaac Nava",
        id: 3,
      },
    ],
  },
  {
    spectiality: "Ginecologia",
    doctors: [
      {
        name: "Dr. Yumi Diaz",
        id: 1,
      },
      {
        name: "Dr. Fernanda Bautista",
        id: 2,
      },
      {
        name: "Dr. Luis Sandoval",
        id: 3,
      },
    ],
  },
];

const INITIAL_STATE = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  birthdate: null,
  time: "",
  reason: "",
  speticialities: {
    spectiality: "",
    doctor: "",
  },
};

export default function Home() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSaving, setIsSaving] = useState(false);
  const [registros, setRegistros] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState({
    spectiality: "",
    doctors: [],
  });

  useEffect(() => {
    if (formData.speticialities.spectiality) {
      const filteredSpeciality = speticialities.filter(
        (item) => item.spectiality === formData.speticialities.spectiality
      );
      setSelectedSpeciality(filteredSpeciality[0]);
    }
  }, [formData.speticialities.spectiality]);

  useEffect(() => {
    const getRegistros = async () => {
      await onSnapshot(collection(db, "appointments"), (querySnapshot) => {
        setRegistros(querySnapshot.size);
      });
    };
    getRegistros();
  }, [])

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleCloseDialog (){
    setOpenDialog(false);
  }
  async function handleOnSubmit(e) {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.birthdate ||
      !formData.time ||
      !formData.reason ||
      !formData.speticialities.spectiality ||
      !formData.speticialities.doctor
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    setIsSaving(true);
    try {
      await addDoc(collection(db, "appointments"), {
        ...formData,
      });
      setIsSaving(false);
      setFormData(INITIAL_STATE);
      Swal.fire({
        icon: "success",
        title: "Cita creada",
        text: "Tu cita ha sido creada con exito",
      });
    } catch (e) {
      console.log(e);
      setIsSaving(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error",
      });
    }
  }

  console.log(formData);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <main
        style={{
          width: "100%",
        }}
      >
        <DialogCitas
          onClose={handleCloseDialog}
          isOpen={openDialog}
        />
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            gap: "2rem",
            margin: "0 auto",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Stack>
            <Typography sx={{ textAlign: "center" }} variant="h5">
              Cosultorio medico online
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              Llena los siguientes datos para crear una cita
            </Typography>
          </Stack>
          <Stack sx={{
            display: "flex",
            gap: "2rem",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography>Registros realizados: {registros}</Typography>
            <Button onClick={() => setOpenDialog(prev => !prev)} variant="outlined">Ver registros</Button>
          </Stack>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              margin: "0 auto",
            }}
            onSubmit={handleOnSubmit}
          >
            <TextField
              label="Nombre"
              value={formData.name}
              name="name"
              onChange={handleOnChange}
            />
            <TextField
              label="Apellido"
              value={formData.lastName}
              name="lastName"
              onChange={handleOnChange}
            />
            <TextField
              label="Correo"
              value={formData.email}
              name="email"
              onChange={handleOnChange}
              type="email"
            />
            <TextField
              label="Teléfono"
              value={formData.phone}
              name="phone"
              onChange={handleOnChange}
              type="number"
            />
            <DatePicker
              label="Fecha de nacimiento"
              value={formData.birthdate}
              onChange={(e) => {
                setFormData({ ...formData, birthdate: e });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              label="Motivo de la cita"
              value={formData.reason}
              name="reason"
              onChange={handleOnChange}
            />
            <FormControl>
              <InputLabel id="hour">Horario</InputLabel>
              <Select
                labelId="hour"
                label="Horario"
                value={formData.time}
                onChange={(e) => {
                  setFormData({ ...formData, time: e.target.value });
                }}
              >
                {new Array(3).fill(null).map((data, index) => (
                  <MenuItem key={index} value={(7 + index).toString()}>
                    {7 + index}:00 horas
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="spectiality">Especialidad</InputLabel>
              <Select
                labelId="spectiality"
                label="Especialidad"
                id="spectiality-id"
                value={formData.speticialities.spectiality}
                onChange={(e) => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      speticialities: {
                        spectiality: e.target.value,
                        doctor: "",
                      },
                    };
                  });
                }}
              >
                {speticialities.map((speticiality, index) => (
                  <MenuItem key={index} value={speticiality.spectiality}>
                    {speticiality.spectiality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData.speticialities.spectiality && (
              <FormControl>
                <InputLabel id="doctor">Doctor tratante</InputLabel>
                <Select
                  labelId="doctor"
                  label="Doctor tratante"
                  value={formData.speticialities.doctor}
                  onChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        speticialities: {
                          spectiality: prev.speticialities.spectiality,
                          doctor: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  {selectedSpeciality.doctors.map((doctor, index) => (
                    <MenuItem key={index} value={doctor.name}>
                      {doctor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <LoadingButton type="submit" loading={isSaving} variant="contained">
              Enviar
            </LoadingButton>
          </form>
        </Box>
      </main>
    </LocalizationProvider>
  );
}
