/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { listObats, deleteObat } from "../../services/ObatService";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt";

function TabelObat() {
  const [obats, setObats] = useState([]);
  const navigator = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    loadObats();
  }, []);

  useEffect(() => {
    if (obats.length > 0) {
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
  }, [obats]);

  const loadObats = () => {
    listObats()
      .then((response) => {
        setObats(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatRupiah = (harga) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(harga);
  };

  const formatExpired = (expired) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(expired).toLocaleDateString("id-ID", options);
  };

  function formObatHandler() {
    navigator("/form-obat");
  }

  function updateobatHandler(obat) {
    navigator(`/form-obat/${obat.id}`);
  }

  function deleteObatHandler(obt) {
    const obat = {
      id_obat: obt.id,
    };

    const isConfirmed = window.confirm(
      "Apakah Anda Yakin Ingin Menghapus Obat Ini?"
    );

    if (isConfirmed) {
      deleteObat(obat)
        .then(() => {
          loadObats();
        })
        .catch((error) => {
          console.error("Error deleting Obat:", error);
        });
    } else {
      alert("Batal Menghapus Obat");
    }
  }

  return (
    <div className="container-fluid">
      <div className="col-lg">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
              Data Obat
            </h1>
          </div>
          <hr />

          <a
            className="btn btn-sm btn-primary btn-icon-split mb-3"
            onClick={formObatHandler}
          >
            <span className="icon text-white-50">
              <i className="fas fa-plus"></i>
            </span>
            <span className="text">Tambah Obat</span>
          </a>

          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  id="dataTable"
                  className="table table-hover table"
                  ref={tableRef}
                >
                  <thead>
                    <tr className="text-center">
                      <th>No</th>
                      <th>Nama Obat</th>
                      <th>Merk Obat</th>
                      <th>Jenis</th>
                      <th>Harga</th>
                      <th>Keterangan</th>
                      <th>Expired</th>
                      <th>Stok</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {obats.map((obat, index) => (
                      <tr key={obat.id} className="text-center">
                        <td className="text-center">{index + 1}</td>
                        <td className="text-left">{obat.namaObat}</td>
                        <td className="text-left">{obat.merk}</td>
                        <td className="text-left">{obat.jenis}</td>
                        <td>{formatRupiah(obat.harga)}</td>
                        <td className="text-left">{obat.keterangan}</td>
                        <td className="text-left">
                          {formatExpired(obat.tgl_kadaluarsa)}
                        </td>
                        <td className="text-center">{obat.stok}</td>
                        <td className="text-center">{obat.status}</td>
                        <td className="text-center">
                          <a
                            className="btn btn-sm btn-warning btn-icon-split"
                            onClick={() => updateobatHandler(obat)}
                          >
                            <span className="icon text-white-50">
                              <i className="fas fa-edit"></i>
                            </span>
                            <span className="text">Update</span>
                          </a>{" "}
                          <a
                            className="btn btn-sm btn-danger btn-icon-split"
                            onClick={() => deleteObatHandler(obat)}
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
    </div>
  );
}

export default TabelObat;
