/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  createObat,
  updateObat,
  getObatById,
} from "../../services/ObatService";
import { useNavigate, useParams } from "react-router-dom";

function FormObat() {
  const { id } = useParams();
  const isUpdateMode = !!id;
  const [nama_obat, setNama_obat] = useState("");
  const [merk_obat, setMerk_obat] = useState("");
  const [jenis_obat, setJenis_obat] = useState("");
  const [harga, setHarga] = useState("");
  const [hargaFormatted, setHargaFormatted] = useState("");
  const [tgl_kadaluarsa, setTgl_kadaluarsa] = useState("");
  const [stok, setStok] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdateMode) {
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
        })
        .catch((error) => {
          console.error("Error fetching Obat data:", error);
        });
    }
  }, [isUpdateMode, id]);

  function saveObat(e) {
    e.preventDefault();
    var obat = {
      id_obat: id,
      nama_obat,
      merk_obat,
      jenis_obat,
      harga,
      keterangan,
      stok,
      tgl_kadaluarsa,
      //   status: 1,
    };

    if (isUpdateMode) {
      obat = {
        id_obat: id,
        nama_obat,
        merk_obat,
        jenis_obat,
        harga,
        keterangan,
        stok,
        tgl_kadaluarsa,
        status: 1,
      };
      updateObat(obat)
        .then(() => {
          navigate("/data-Obat", { replace: true });
        })
        .catch((error) => {
          console.error("Error updating Obat:", error.response);
        });
    } else {
      createObat(obat)
        .then(() => {
          navigate("/data-Obat");
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
              <h1 className="h4 text-gray-900 mb-4">Form Obat</h1>
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
                    placeholder="merk_obat"
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
                <div className="col-sm">
                  <textarea
                    name="keterangan"
                    id="keterangan"
                    cols="30"
                    rows="10"
                    className="form-control"
                    placeholder="Keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <button
                className="btn btn-primary btn-user btn-block"
                onClick={saveObat}
              >
                Submit
              </button>
              <hr />
            </form>
            <hr />
            <div className="text-center">
              <a href="/data-Obat">← Back to Data Obat</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormObat;
