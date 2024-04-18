/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { listUsers, deleteUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import DataTable from "datatables.net-dt";

function TabelPengguna() {
  const [users, setUsers] = useState([]);
  const navigator = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const table = tableRef.current;
      if (table) {
        $(table).DataTable().destroy();
        $(table).DataTable({
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          responsive: true,
          autoWidth: false,
          language: {
            search: "", // mengganti teks "Search" menjadi "Cari:"
            lengthMenu: "Tampilkan _MENU_ data per halaman", // mengganti teks "Entries per page" dengan teks baru
            info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ data", // mengganti teks info
            infoEmpty: "Data tidak tersedia", // mengganti teks ketika tidak ada data yang tersedia
            infoFiltered: "(disaring dari _MAX_ total data)", // mengganti teks ketika data difilter
            paginate: {
              first: "Pertama", // mengganti teks tombol pertama
              previous: "Sebelumnya", // mengganti teks tombol sebelumnya
              next: "Selanjutnya", // mengganti teks tombol selanjutnya
              last: "Terakhir", // mengganti teks tombol terakhir
            },
          },
          initComplete: function () {
            // Set border radius for search input
            $(".dt-input")
              .addClass("form-control-sm")
              .attr("placeholder", "Search")
              .css({ borderRadius: "15px" });
            $(".dt-paging-button")
              .addClass("btn btn-primary")
              .css({ borderRadius: "15px" });
          },
        });
      }
    }
  }, [users]);

  function successNotify(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => window.location.reload(),
    });
  }

  const loadUsers = () => {
    listUsers()
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function formPenggunaHandler() {
    navigator("/form-pengguna");
  }

  function updateUserHandler(user) {
    navigator(`/form-pengguna/${user.id}`);
  }

  function deleteUserHandler(usr) {
    const user = {
      id_user: usr.id,
    };

    const isConfirmed = window.confirm(
      "Apakah Anda Yakin Ingin Menghapus Pengguna Ini?"
    );

    if (isConfirmed) {
      deleteUser(user)
        .then((response) => {
          successNotify(response.data.message)
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } else {
      alert("Batal Menghapus Pengguna");
    }
  }

  return (
    <div className="container-fluid">
      <div className="col-lg">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
              Data Pengguna
            </h1>
          </div>
          <hr />

          <a
            className="btn btn-sm btn-primary btn-icon-split mb-3"
            onClick={formPenggunaHandler}
          >
            <span className="icon text-white-50">
              <i className="fas fa-plus"></i>
            </span>
            <span className="text">Tambah Pengguna</span>
          </a>

          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  id="TablePengguna"
                  className="table table-hover table"
                  ref={tableRef}
                >
                  <thead>
                    <tr className="text-center">
                      <th className="text-center">No</th>
                      <th className="text-center">Nama Pengguna</th>
                      <th className="text-center">Telp</th>
                      <th className="text-center">Role</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id} className="text-center">
                        <td className="text-center">{index + 1}</td>
                        <td className="text-left">{user.nama}</td>
                        <td className="text-center">{user.no_telp}</td>
                        <td>{user.role}</td>
                        <td>{user.status}</td>
                        <td className="text-center">
                          <a
                            className="btn btn-sm btn-warning btn-icon-split"
                            onClick={() => updateUserHandler(user)}
                          >
                            <span className="icon text-white-50">
                              <i className="fas fa-edit"></i>
                            </span>
                            <span className="text">Update</span>
                          </a>{" "}
                          <a
                            className="btn btn-sm btn-danger btn-icon-split"
                            onClick={() => deleteUserHandler(user)}
                          >
                            <span className="icon text-white-50">
                              <i className="fas fa-trash"></i>
                            </span>
                            <span className="text">Hapus</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TabelPengguna;
