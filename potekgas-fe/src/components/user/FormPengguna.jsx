/* eslint-disable no-unused-vars */
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

  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdateMode) {
      getUserById(id)
        .then((response) => {
          const userData = response.data.data[0];
          setNama_user(userData?.nama || "");
          setRole(userData?.role || "");
          setUsername(userData?.username || "");
          setPassword(userData?.password || "");
          setNo_telp(userData?.no_telp || "");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [isUpdateMode, id]);

  function saveUser(e) {
    e.preventDefault();
    const user = {
      id_user: id,
      nama_user,
      role,
      no_telp,
      username,
      password,
      status: 1,
    };

    if (isUpdateMode) {
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
              <h1 className="h4 text-gray-900 mb-4">Data Pengguna</h1>
            </div>
            <hr />
            <form className="user">
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Nama"
                    name="nama"
                    value={nama_user}
                    onChange={(e) => setNama_user(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  {/* <span>Role</span> */}
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
                      Pilih Role
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
                  <input
                    type="number"
                    className="form-control form-control-user"
                    placeholder="Nomor Telepon"
                    name="no_telp"
                    value={no_telp}
                    onChange={(e) => setNo_telp(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm mb-3 mb-sm-0">
                  <input
                    type="password"
                    className="form-control form-control-user"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary btn-user btn-block"
                onClick={saveUser}
              >
                Submit
              </button>
              <hr />
            </form>
            <hr />
            <div className="text-center">
              <a href="/data-pengguna">← Back to Data Pengguna</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPengguna;
