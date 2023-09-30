import styles from "./Modal.module.css";
import { useState } from "react";

const Modal = (props) => {
  const [formData, setFormData] = useState(props.orderInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.modal}>
      <h2>Shipment Information</h2>

      <form>
        {Object.entries(formData).map((entry) => {
          return (
            <div key={entry[0]}>
              <label className={styles.textLabel} id={'label_' + entry[0]} htmlFor={entry[0]}>
                {entry[0] + ":"}
              </label>
              <br />
              <input
                id={'input_' + entry[0]}
                type="text"
                name={entry[0]}
                value={entry[1]}
                className={styles.textInput}
                onChange={handleInputChange}
              />
            </div>
          );
        })}

        <button
          type="button"
          className={styles.button}
          onClick={() => {
            props.updateOrder(props.orderInfo.orderNo, formData);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            props.deleteOrder(props.orderInfo.orderNo);
            props.closeModal();
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
};


export default Modal;
