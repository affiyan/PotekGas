/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  createUser,
  updateUser,
  getUserById,
} from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function FormPengguna() {
  const { id } = useParams();
  const isUpdateMode = !!id;
  const [nama_user, setNama_user] = useState("");
  const [role, setRole] = useState("");
  const [no_telp, setNo_telp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gambar, setGambar] = useState(""); // State untuk menyimpan gambar yang dipilih
  const [gambarUrl, setGambarUrl] = useState(""); // State untuk menyimpan URL gambar yang dipilih
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdateMode) {
      getUserById(id)
        .then((response) => {
          const userData = response.data.data[0];
          setNama_user(userData?.nama || "");
          setRole(userData?.role || "");
          if (userData.role === "Admin") {
            setRole(1);
          } else if (userData.role === "Kasir") {
            setRole(2);
          }
          setUsername(userData?.username || "");
          setPassword(userData?.password || "");
          setNo_telp(userData?.no_telp || "");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [isUpdateMode, id]);

  function togglePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  function warningNotify(message) {
    toast.warn(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

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
      onClose: () => navigate("/data-pengguna"),
    });
  }

  function saveUser(e) {
    e.preventDefault();

    var user = {
      id_user: id,
      nama_user,
      role,
      no_telp,
      username,
      password,
      // status: 1,
    };

    // Buat objek FormData untuk mengirim data termasuk file gambar
    const formData = new FormData();
    formData.append("idUser", id);
    formData.append("namaUser", nama_user);
    formData.append("role", role);
    formData.append("noTelp", no_telp);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("status", 1);
    formData.append("foto", gambar); // Tambahkan gambar ke FormData

    if (isUpdateMode) {
      updateUser(formData, formData)
      .then((response) => {
        const status = response.data.status;
        const message = response.data.message;
        if (status === 200) {
          successNotify(message);
        } else {
          warningNotify(message);
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error.response);
      });
    } else {
      createUser(formData, formData)
          .then((response) => {
            const status = response.data.status;
            const message = response.data.message;
            if (status === 200) {
              successNotify(message);
            } else {
              warningNotify(message);
            }
          })
          .catch((error) => {
            console.error("Error saving user:", error);
          });
    }
  }

  function deleteSelectedImage() {
    // Menampilkan konfirmasi sebelum menghapus gambar
    // const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus gambar?");
    // if (isConfirmed) {
    //   setGambar('null'); // Menghapus gambar dari state
    //   setGambarUrl('../public/assets/img/undraw_profile.svg');
    //   console.log('gambar : '+gambar) // Mengosongkan URL gambar yang ditampilkan
    //   console.log('gambar Url : '+gambarUrl) // Mengosongkan URL gambar yang ditampilkan
    // }
    setGambar(null); // Menghapus gambar dari state
    setGambarUrl('../public/assets/img/undraw_profile.svg');
    console.log('gambar : '+gambar) // Mengosongkan URL gambar yang ditampilkan
    console.log('gambar Url : '+gambarUrl) // Mengosongkan URL gambar yang ditampilkan
  }
  
  return (
    <>
      <div className="container-fluid">
        <div className="col-lg  ">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
                Form Pengguna
              </h1>
            </div>
            <hr />
            <form className="user">
              <div className="form-group row">
                <div className="col-sm-6 ">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Nama Pengguna"
                    name="nama"
                    value={nama_user}
                    onChange={(e) => setNama_user(e.target.value)}
                  />
                </div>
                <div className="col-sm-6 ">
                  <select
                    name="role"
                    id="role"
                    className="form-control"
                    style={{
                      borderRadius: "10rem",
                      fontSize: "0.8rem",
                      height: "100%",
                      verticalAlign: "top",
                    }}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" disabled>
                      Role Pengguna
                    </option>
                    <option value="1">Admin</option>
                    <option value="2">Kasir</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 ">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="col-sm-6 ">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-user"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="position-absolute top-5 end-0 translate-middle-y"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      cursor: "pointer",
                      top: "1px",
                      marginTop: "14px",
                      right: "30px",
                      zIndex: "2",
                    }}
                  >
                    {showPassword ? (
                      <i className="fas fa-eye"></i>
                    ) : (
                      <i className="fas fa-eye-slash"></i>
                    )}
                  </span>
                </div>
              </div>
              <div className="form-group row mb-4">
                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-user"
                    placeholder="Nomor Telepon"
                    name="no_telp"
                    value={no_telp}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input.length <= 13) {
                        setNo_telp(input);
                      }
                    }}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label htmlFor="gambar" className="btn btn-primary">
                    Pilih Gambar
                  </label>{" "}
                  <label onClick={deleteSelectedImage} className="btn btn-danger">
                    Hapus Gambar
                  </label>
                  <input
                    type="file"
                    id="gambar"
                    className="form-control form-control-user"
                    accept="image/*"
                    style={{
                      display: "none",
                    }}
                    onChange={(e) => {
                      setGambar(e.target.files[0]); // Set gambar yang dipilih ke state
                      setGambarUrl(URL.createObjectURL(e.target.files[0])); // Set URL gambar yang dipilih ke state
                    }}
                  />{" "}
                  <br />
                  <img
                    src={gambarUrl || `http://localhost:8083/users/foto/${id}`}
                    alt="Belum Memilih Gambar"
                    style={{
                      width: "210px",
                      height: "210px",
                      border: "2px solid #ccc",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary btn-user btn-block"
                onClick={saveUser}
              >
                Simpan Data
              </button>
              <ToastContainer />
            </form>
            <hr />
            <div className="text-center">
              <a href="/data-pengguna">← Kembali ke Data Pengguna</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPengguna;
