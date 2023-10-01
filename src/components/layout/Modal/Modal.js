import styles from "./Modal.module.css";
import { useState } from "react";

import {Button, TextField, InputLabel, Typography, Box} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";



const Modal = (props) => {
  const [formData, setFormData] = useState(props.orderInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box >
    <div className={styles.modal}>
    <Typography variant="h5" component="h1">Shipment Information</Typography>

      <form>
        {Object.entries(formData).map((entry) => {
          return (
            <div key={entry[0]}>
              <InputLabel
                sx={{ m: 1 }}
                className={styles.textLabel}
                id={"label_" + entry[0]}
                htmlFor={entry[0]}
              >
                {entry[0] + ":"}
              </InputLabel>
              <br />
              <TextField
                variant="standard"
                id={"input_" + entry[0]}
                type="text"
                name={entry[0]}
                value={entry[1]}
                className={styles.textInput}
                onChange={handleInputChange}
              />
            </div>
          );
        })}

        <Button
          sx={{ m: 2 }}
          variant="contained"
          color="success"
          startIcon={<EditSharpIcon />}
          className={styles.button}
          onClick={() => {
            props.updateOrder(props.orderInfo.orderNo, formData);
          }}
        >
          Edit
        </Button>
        <Button
          sx={{ m: 2 }}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          className={styles.button}
          onClick={() => {
            props.deleteOrder(props.orderInfo.orderNo);
            props.closeModal();
          }}
        >
          Delete
        </Button>
      </form>
    </div>
    </Box>
  );
};

export default Modal;
