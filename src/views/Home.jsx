import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';

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
  date: "",
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
  const [selectedSpeciality, setSelectedSpeciality] = useState({
    spectiality: "",
    doctors: [],
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  useEffect(() => {
    if(formData.speticialities.spectiality) {
      const filteredSpeciality = speticialities.filter((item) => item.spectiality === formData.speticialities.spectiality)
      setSelectedSpeciality(filteredSpeciality[0]);
    }
  }, [formData.speticialities.spectiality]);

  // const spectial = speticialities.map((speticiality) => {
  //   console.log(speticiality)
  //   return speticiality.spectiality
  // })
  return (
    <main
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        paddingTop: "2rem",
      }}
    >
      <Stack>
        <Typography sx={{textAlign: "center"}} variant="h5">Cosultorio medico online</Typography>
        <Typography sx={{textAlign: "center"}}>Llena los siguientes datos para crear una cita</Typography>
      </Stack>
      <form
        action=""
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}
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
        />
        <TextField
          label="Teléfono"
          value={formData.phone}
          name="phone"
          onChange={handleOnChange}
        />
        <TextField
          label="Fecha"
          value={formData.date}
          name="date"
          onChange={handleOnChange}
        />
        <TextField
          label="Hora"
          value={formData.time}
          name="time"
          onChange={handleOnChange}
        />
        <TextField
          label="Motivo de la cita"
          value={formData.reason}
          name="reason"
          onChange={handleOnChange}
        />
        <FormControl>
          <InputLabel id="spectiality">Especialidad</InputLabel>
          <Select
            labelId="spectiality"
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
            inputProps={{
              name: "especiality",
              id: "especiality",
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
            <InputLabel id="doctor">Especialidad</InputLabel>
            <Select
            labelId="doctor"
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
              inputProps={{
                name: "doctor",
                id: "doctor",
              }}
            >
              {selectedSpeciality.doctors.map((doctor, index) => (
                <MenuItem key={index} value={doctor.name}>{doctor.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <LoadingButton loading={isSaving} variant="contained">Enviar</LoadingButton>
      </form>
    </main>
  );
}
