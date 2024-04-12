/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import {
  listDetails,
  getDetailById
} from "../../services/DetailPembelianService";
import {
  listPembelians,
} from "../../services/PembelianService";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import DataTable from "datatables.net-dt";

function DetailPembelian() {
  const [details, setDetails] = useState([]);
  const [pembelianOptions, setPembelianOptions] = useState([]);
  const [detailPembelian, setDetailPembelian] = useState([]);
  const navigator = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    loadDetails();
  }, []);

  useEffect(() => {
    if (details.length > 0) {
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
  }, [details]);

  function viewDetailHandler(idDetail) {
    getDetailById(idDetail)
      .then((response) => {
        console.log(response.data.data);
        setDetailPembelian(response.data.data);
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

  const loadDetails = () => {
    Promise.all([listDetails(), listPembelians()])
      .then(([detailsResponse, pembelianOptionsResponse]) => {
        setDetails(detailsResponse.data.data);
        setPembelianOptions(pembelianOptionsResponse.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return ( <>
    <div className="container-fluid">
      <div className="col-lg">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
              Detail Transaksi Pembelian
            </h1>
          </div>
          <hr />

          <div className="card shadow mb-4">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="TableDetail"
                    className="table table-hover table"
                    ref={tableRef}
                  >
                    <thead>
                      <tr className="text-center">
                        <th className="text-center">No</th>
                        <th className="text-center">ID Detail</th>
                        <th className="text-center">ID Transaksi</th>
                        <th className="text-center">Tanggal Pembelian</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((detail, index) => (
                        <tr key={detail.idDetail} className="text-center">
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            {detail.idDetail}
                          </td>
                          <td className="text-center">{detail.idTransaksi}</td>
                          <td className="text-center">
                          {formatDate(pembelianOptions.find(option => option.idTransaksi === detail.idTransaksi)?.tglPembelian)}
                          </td>
                          <td className="text-center">
                            <a
                              className="btn btn-sm btn-info btn-icon-split"
                              data-toggle="modal"
                              data-target="#detailModal"
                              onClick={() =>
                                viewDetailHandler(detail.idDetail)
                              }
                            >
                              <span className="icon text-white-50">
                                <i className="fas fa-eye"></i>
                              </span>
                              <span className="text">View</span>
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
            {detailPembelian && detailPembelian.length > 0 && (
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ fontWeight: "bold" }}
                >
                  Detail Transaksi Pembelian : {detailPembelian[0].idTransaksi}
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
                              {item.deskripsiObat}
                            </div>
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

export default DetailPembelian;
