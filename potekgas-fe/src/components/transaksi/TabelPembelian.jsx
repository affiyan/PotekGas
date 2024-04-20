/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import {
  listPembelians,
  getDetailPembelianById,
} from "../../services/PembelianService";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import DataTable from "datatables.net-dt";

function TabelPembelian() {
  const [pembelians, setPembelians] = useState([]);
  const [detailPembelian, setDetailPembelian] = useState([]);
  const [totalHargaModal, setTotalHargaModal] = useState(0); // State untuk menyimpan total harga pada modal
  const [showModal, setShowModal] = useState(false);
  const navigator = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    loadPembelians();
  }, []);

  useEffect(() => {
    if (pembelians.length > 0) {
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
  }, [pembelians]);

  const loadPembelians = () => {
    listPembelians()
      .then((response) => {
        setPembelians(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function viewDetailHandler(idTransaksi) {
    getDetailPembelianById(idTransaksi)
      .then((response) => {
        console.log(response.data.data);
        setDetailPembelian(response.data.data);

        // Hitung total harga dari detail pembelian
        let totalHarga = 0;
        response.data.data.forEach((item) => {
          totalHarga += item.jumlah * item.hargaObat;
        });
        setTotalHargaModal(totalHarga);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const formatRupiah = (harga) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(harga);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  function formPembelianHandler() {
    navigator("/form-Pembelian");
  }

  function updatePembelianHandler(pembelian) {
    navigator(`/form-Pembelian/${pembelian.idTransaksi}`);
    setShowModal(true);
  }

  function deletePembelianHandler(pembelian) {
    const isConfirmed = window.confirm(
      "Apakah Anda Yakin Ingin Menghapus Pembelian Ini?"
    );

    if (isConfirmed) {
      // Tambahkan logika penghapusan pembelian
    } else {
      alert("Batal Menghapus Pembelian");
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="col-lg">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
                Data Pembelian
              </h1>
            </div>
            <hr />

            <a
              className="btn btn-sm btn-primary btn-icon-split mb-3"
              onClick={formPembelianHandler}
            >
              <span className="icon text-white-50">
                <i className="fas fa-plus"></i>
              </span>
              <span className="text">Tambah Pembelian</span>
            </a>

            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="TablePembelian"
                    className="table table-hover table"
                    ref={tableRef}
                  >
                    <thead>
                      <tr className="text-center">
                        <th className="text-center">No</th>
                        <th className="text-center">Nama User</th>
                        <th className="text-center">Tanggal Pembelian</th>
                        <th className="text-center">Total Harga</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pembelians.map((pembelian, index) => (
                        <tr key={pembelian.idTransaksi} className="text-center">
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{pembelian.namaUser}</td>
                          <td className="text-center">
                            {formatDate(pembelian.tglPembelian)}
                          </td>
                          <td className="text-center">
                            {formatRupiah(pembelian.totalHarga)}
                          </td>
                          <td className="text-center">
                            <a
                              className="btn btn-sm btn-info btn-icon-split"
                              data-toggle="modal"
                              data-target="#detailModal"
                              onClick={() =>
                                viewDetailHandler(pembelian.idTransaksi)
                              }
                            >
                              <span className="icon text-white-50">
                                <i className="fas fa-eye"></i>
                              </span>
                              <span className="text">View</span>
                            </a>{" "}
                            {/* <a
                              className="btn btn-sm btn-warning btn-icon-split"
                              onClick={() => updatePembelianHandler(pembelian)}
                            >
                              <span className="icon text-white-50">
                                <i className="fas fa-edit"></i>
                              </span>
                              <span className="text">Update</span>
                            </a>{" "}
                            <a
                              className="btn btn-sm btn-danger btn-icon-split"
                              onClick={() => deletePembelianHandler(pembelian)}
                            >
                              <span className="icon text-white-50">
                                <i className="fas fa-trash"></i>
                              </span>
                              <span className="text">Hapus</span>
                            </a> */}
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

      <div
        className="modal fade"
        id="detailModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            {detailPembelian && detailPembelian.length > 0 ? (
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ fontWeight: "bold" }}
                >
                  Detail Pembelian
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            ) : (
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ fontWeight: "bold" }}
                >
                  Detail Pembelian
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
            <div className="modal-body modal-body-grid">
              <div className="d-flex flex-wrap">
                {detailPembelian.map((item) => (
                  <div key={item.idDetail} className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-bottom-dark shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="font-weight-bold text-dark mb-1">
                              {item.namaObat}
                            </div>
                            <hr />
                            <div className="mb-0 font-weight-bold text-gray-800">
                              {item.jumlah} pcs
                            </div>
                            <div className="mb-0 font-weight-bold text-gray-800">
                              {formatRupiah(item.hargaObat)} / pcs
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <span className="font-weight-bold text-dark mb-1">
              Total Harga : {formatRupiah(totalHargaModal)}
              </span>
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabelPembelian;
