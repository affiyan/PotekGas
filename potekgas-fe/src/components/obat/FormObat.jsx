/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  createObat,
  updateObat,
  getObatById,
} from "../../services/ObatService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function FormObat() {
  const { id } = useParams();
  const isUpdateMode = !!id;
  const [nama_obat, setNama_obat] = useState("");
  const [merk_obat, setMerk_obat] = useState("");
  const [jenis_obat, setJenis_obat] = useState("");
  const [harga, setHarga] = useState(0);
  const [hargaFormatted, setHargaFormatted] = useState("");
  const [tgl_kadaluarsa, setTgl_kadaluarsa] = useState("0001-01-01");
  const [stok, setStok] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [keteranganLength, setKeteranganLength] = useState(0); 
  const [gambar, setGambar] = useState("");
  const [gambarUrl, setGambarUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUpdateMode) {
      setTgl_kadaluarsa(getTodayDate()); // Set tanggal kadaluarsa ke hari ini jika sedang dalam mode create
    } else {
      getObatById(id)
        .then((response) => {
          const obatData = response.data.data[0];
          setNama_obat(obatData?.namaObat || "");
          setMerk_obat(obatData?.merk || "");
          setHarga(obatData?.harga || "");
          setHargaFormatted(formatRupiah(obatData?.harga) || "");
          setTgl_kadaluarsa(formatDate(obatData?.tgl_kadaluarsa) || "");
          setJenis_obat(obatData?.jenis || "");
          if (obatData.jenis === "Tablet") {
            setJenis_obat(0);
          } else if (obatData.jenis === "Kapsul") {
            setJenis_obat(1);
          }
          setStok(obatData?.stok || "");
          setKeterangan(obatData?.keterangan || "");
          // setGambar(obatData?.gambar || ""); // Sesuaikan dengan properti yang menyimpan URL gambar
          // setGambar(obatData?.gambar); // Sesuaikan dengan properti yang menyimpan URL gambar
        })
        .catch((error) => {
          console.error("Error fetching Obat data:", error);
        });
    }
  }, [isUpdateMode, id]);

  useEffect(() => {
    setKeteranganLength(keterangan.length); // Update panjang keterangan setiap kali berubah
  }, [keterangan]);

  // Membatasi jumlah karakter keterangan
  function handleKeteranganChange(e) {
    const value = e.target.value;
    if (value.length <= 100) {              // Memastikan keterangan tidak lebih dari 100 karakter
      setKeterangan(value);
    }
  }

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
      onClose: () => navigate("/data-obat"),
    });
  }

  function saveObat(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("idObat", id);
    formData.append("namaObat", nama_obat);
    formData.append("merkObat", merk_obat);
    formData.append("jenisObat", jenis_obat);
    formData.append("tglKadaluarsa", tgl_kadaluarsa);
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("keterangan", keterangan);
    formData.append("status", 1);
    formData.append("gambar", gambar);

    if (isUpdateMode) {
      updateObat(formData, formData)
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
          console.error("Error updating Obat:", error.response);
        });
    } else {
      createObat(formData, formData) // Tambahkan formData sebagai parameter pertama
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
        console.error("Error saving Obat:", error);
      });
    }
  }

  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }

  function handleChangeHarga(e) {
    const value = e.target.value;
    // Hapus semua karakter selain angka
    const numbers = value.replace(/\D/g, "");
    setHarga(numbers);
    setHargaFormatted(formatRupiah(numbers));
  }

  function formatDate(date) {
    if (!date) return ""; // Menghindari error jika date null atau undefined
    const formattedDate = new Date(date)
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
    return formattedDate;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="col-lg  ">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
                Form Obat
              </h1>
            </div>
            <hr />
            <form className="user">
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Nama Obat"
                    name="nama_obat"
                    value={nama_obat}
                    onChange={(e) => setNama_obat(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Merk obat"
                    name="merk_obat"
                    value={merk_obat}
                    onChange={(e) => setMerk_obat(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <select
                    name="jenis"
                    id="jenis"
                    className="form-control"
                    style={{
                      borderRadius: "10rem",
                      fontSize: "0.8rem",
                      height: "100%",
                      verticalAlign: "top",
                    }}
                    value={jenis_obat}
                    onChange={(e) => setJenis_obat(e.target.value)}
                  >
                    <option value="" disabled>
                      Jenis Obat
                    </option>
                    <option value="0">Tablet</option>
                    <option value="1">Kapsul</option>
                    <option value="2">Sirup</option>
                    <option value="3">Tetes</option>
                    <option value="4">Emulsi</option>
                    <option value="5">Larutan</option>
                    <option value="6">Suspensi</option>
                    <option value="7">krim</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Harga Obat"
                    name="harga"
                    value={hargaFormatted}
                    onChange={handleChangeHarga}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6">
                  <input
                    type="date"
                    className="form-control form-control-user"
                    placeholder="Tanggal Kadaluarsa"
                    name="tgl_kadaluarsa"
                    value={tgl_kadaluarsa}
                    onChange={(e) => setTgl_kadaluarsa(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control form-control-user"
                    placeholder="Stok Obat"
                    name="stok"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
              <div className="col-sm-6" style={{ position: 'relative' }}>
                  <textarea
                    name="keterangan"
                    id="keterangan"
                    cols="30"
                    rows="10"
                    className="form-control"
                    placeholder="Keterangan (max 100 karakter)"
                    value={keterangan}
                    onChange={handleKeteranganChange}
                    style={{
                      borderRadius: "10px",
                    }}
                  ></textarea>
                  <span style={{ position: 'absolute', bottom: '10px', right: '20px', transform: 'translateX(-5px)' }}>
                    {keteranganLength}/100
                  </span>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="gambar" className="btn btn-primary">
                    Pilih Gambar 
                  </label>
                  <input
                    type="file"
                    id="gambar"
                    className="form-control form-control-user"
                    accept="image/*"
                    style={{
                      display: "none",
                    }}
                    // value={gambar}
                    onChange={(e) => {
                      setGambar(e.target.files[0]);
                      setGambarUrl(URL.createObjectURL(e.target.files[0])); // Simpan URL gambar
                    }}
                  />
                  {" "}
                  <br />
                  <img
                    src={
                      gambarUrl || `http://localhost:8083/obats/gambar/${id}`
                    }
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
                onClick={saveObat}
              >
                Simpan Data
              </button>
              <ToastContainer />
              <hr />
            </form>
            <hr />
            <div className="text-center">
              <a href="/data-Obat">← Kembali ke Data Obat</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormObat;
