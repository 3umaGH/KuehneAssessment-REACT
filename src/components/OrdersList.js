import LOCAL_DATA from "../data/Shipments.json";

import { useState } from "react";
import * as React from "react";
import { useTable } from "react-table";

import styles from "./OrdersList.module.css";
import Modal from "./layout/Modal/Modal";
import Backdrop from "./layout/Modal/Backdrop";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";

const OrdersList = () => {
  const apiUrl = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";
  const [data, setData] = useState(LOCAL_DATA);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewingOrderID, setViewingOrderID] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  React.useEffect(() => {
    const dataFetch = async () => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((result) => {
          setData(Array.isArray(result) ? result : LOCAL_DATA);
          setLoaded(true);
        })
        .catch((e) => {
          setData(LOCAL_DATA);
          console.log(e.message, "FETCHING ERROR");
          console.log("Using local data");
          setLoaded(true);
        });
    };
    dataFetch();
  }, []);

  const closeModal = () => {
    setViewingOrderID(null);
    setModalIsOpen(false);
  };

  const openModal = (index) => {
    setViewingOrderID(index);
    setModalIsOpen(true);
  };

  const updateOrder = (orderNo, newOrderInfo) => {
    if (orderNoExists(newOrderInfo.orderNo)) {
      alert("Duplicate order number is not allowed!");
      return;
    }

    const newData = data.map((order) => {
      if (order.orderNo === orderNo) return newOrderInfo;
      return order;
    });

    setData(newData);
    closeModal();
  };

  const orderNoExists = (orderNo) => {
    for (let order of data) {
      if (orderNo === order.orderNo) return true;
    }
    return false;
  };

  const deleteOrder = (orderNo) => {
    setData((current) => current.filter((i) => i.orderNo !== orderNo));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Order Number",
        accessor: "orderNo",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Customer",
        accessor: "customer",
      },
      {
        Header: "Tracking Number",
        accessor: "trackingNo",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Consignee",
        accessor: "consignee",
      },
      {
        Header: "Actions",
        Cell: ({ cell }) => (
          <div className="actions">
            <Button
              style={{ maxWidth: "36px", minWidth: "36px" }}
              sx={{ m: 0.5 }}
              variant="contained"
              color="success"
              size="small"
              startIcon={<EditSharpIcon style={{ marginLeft: 9 }} />}
              className={styles.button}
              onClick={() => openModal(cell.row.id)}
            ></Button>

            <Button
              style={{ maxWidth: "36px", minWidth: "36px" }}
              sx={{ m: 0.5 }}
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon style={{ marginLeft: 9 }} />}
              className={styles.button}
              onClick={() => deleteOrder(cell.row.values.orderNo)}
            ></Button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (isLoaded) {
    return (
      /* Should have used MUI Data Grid, but found it too late... */
      <Box>
        <div className={styles.center}>
          <table className={styles.table} {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {modalIsOpen && (
            <Modal
              orderInfo={data[viewingOrderID]}
              updateOrder={updateOrder}
              deleteOrder={deleteOrder}
              closeModal={closeModal}
            />
          )}
          {modalIsOpen && <Backdrop onClick={closeModal} />}
        </div>
      </Box>
    );
  } else {
    return <div>Loading...</div>;
  }
};
export default OrdersList;
