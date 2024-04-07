import React, { useEffect, useState } from "react";
import {
  createUser,
  updateUser,
  getUserById,
} from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";

function FormPengguna() {
  const { id } = useParams();
  const isUpdateMode = !!id;
  const [nama_user, setNama_user] = useState("");
  const [role, setRole] = useState("");
  const [no_telp, setNo_telp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    if (isUpdateMode) {
      user = {
        id_user: id,
        nama_user,
        role,
        no_telp,
        username,
        password,
        status: 1,
      };
      updateUser(user)
        .then(() => {
          navigate("/data-pengguna", { replace: true });
        })
        .catch((error) => {
          console.error("Error updating user:", error.response);
        });
    } else {
      createUser(user)
        .then(() => {
          navigate("/data-pengguna");
        })
        .catch((error) => {
          console.error("Error saving user:", error);
        });
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="col-lg  ">
          <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4 font-weight-bold">Form Pengguna</h1>
          </div>
            <hr />
            <form className="user">
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Nama Pengguna"
                    name="nama"
                    value={nama_user}
                    onChange={(e) => setNama_user(e.target.value)}
                  />
                </div>
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <select
                    name="role"
                    id="role"
                    className="form-control"
                    style={{
                      borderRadius: "10rem",
                      fontSize: "1rem",
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
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
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
                      {showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
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
              </div>
              <button
                className="btn btn-primary btn-user btn-block"
                onClick={saveUser}
              >
                Simpan Data
              </button>
              <hr />
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
