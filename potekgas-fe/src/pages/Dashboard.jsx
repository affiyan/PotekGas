/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { countAdmin, countKasir } from "../services/UserService";
import { countObat } from "../services/ObatService";
import {
  countPembelian,
  getBestSellerObat,
} from "../services/PembelianService";
import { Collapse } from "react-bootstrap";
import { PieChart } from "@mui/x-charts/PieChart";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

function Dashboard() {
  const [admin, setAdmin] = useState(0);
  const [kasir, setKasir] = useState(0);
  const [obat, setObat] = useState(0);
  const [pembelian, setPembelian] = useState(0);
  const [obatBestSeller, setObatBestSeller] = useState([]);
  const [jumlahObatBestSeller, setJumlahObatBestSeller] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const data = [
    { id: 0, value: jumlahObatBestSeller[0], label: obatBestSeller[0] },
    { id: 1, value: jumlahObatBestSeller[1], label: obatBestSeller[1] },
    { id: 2, value: jumlahObatBestSeller[2], label: obatBestSeller[2] },
  ];

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Memanggil fungsi countAdmin dan countKasir saat komponen dimuat
    fetchData();
  }, []);

  const fetchData = () => {
    // Memanggil kedua fungsi countAdmin dan countKasir
    countAdmin()
      .then((response) => {
        setAdmin(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    countKasir()
      .then((response) => {
        setKasir(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    countObat()
      .then((response) => {
        setObat(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    countPembelian()
      .then((response) => {
        setPembelian(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getBestSellerObat()
      .then((response) => {
        const resArray = response.data.data;
        const obatNames = resArray.map((item) => item[0]);
        const obatQuantities = resArray.map((item) => item[1]);
        setObatBestSeller(obatNames);
        setJumlahObatBestSeller(obatQuantities);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Inisialisasi chart area
    function number_format(number, decimals, dec_point, thousands_sep) {
      // *     example: number_format(1234.56, 2, ',', ' ');
      // *     return: '1 234,56'
      number = (number + "").replace(",", "").replace(" ", "");
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return "" + Math.round(n * k) / k;
        };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    }
    
    return () => {
      // myAreaChart.destroy();
      // myPieChart.destroy();
    };
  }, [obatBestSeller, jumlahObatBestSeller]);

  const dataset = [
    {
      transaksi: 21,
      month: "Jan",
    },
    {
      transaksi: 28,
      month: "Feb",
    },
    {
      transaksi: 41,
      month: "Mar",
    },
    {
      transaksi: 73,
      month: "Apr",
    },
    {
      transaksi: 99,
      month: "May",
    },
    {
      transaksi: 144,
      month: "June",
    },
    {
      transaksi: 319,
      month: "July",
    },
    {
      transaksi: 249,
      month: "Aug",
    },
    {
      transaksi: 131,
      month: "Sept",
    },
    {
      transaksi: 55,
      month: "Oct",
    },
    {
      transaksi: 48,
      month: "Nov",
    },
    {
      transaksi: 25,
      month: "Dec",
    },
  ];

  const valueFormatter = (value) => `${value}mm`;

  const chartSetting = {
    yAxis: [
      {
        label: "Jumlah",
      },
    ],
    series: [{ dataKey: "transaksi", label: "Jumlah Transaksi", valueFormatter }],
    height: 320,
    
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Jumlah Admin
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {admin} Admin
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-user-tie fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Jumlah Kasir
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {kasir} Kasir
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-cash-register fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Macam Obat
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          {obat} Macam
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-capsules fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Jumlah Transaksi{" "}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {pembelian} Transaksi Pembelian
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Total Penjualan
                </h6>
              </div>
              <div className="card-body">
                <div style={{ width: "100%" }}>
                  <BarChart
                    dataset={dataset}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "month",
                      },
                    ]}
                    {...chartSetting}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Best Seller Obat
                </h6>
              </div>
              <div className="card-body">
                <div className="mt-0 text-center small">
                  {obatBestSeller.length >= 1 && (
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={obatBestSeller[0]}
                        sx={{ color: "white", backgroundColor: "#02b2af" }}
                      />
                    </Stack>
                  )}
                  <br />
                  {obatBestSeller.length >= 2 && (
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={obatBestSeller[1]}
                        sx={{ color: "white", backgroundColor: "#2e96ff" }}
                      />
                    </Stack>
                  )}
                  <br />
                  {obatBestSeller.length >= 3 && (
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={obatBestSeller[2]}
                        sx={{ color: "white", backgroundColor: "#b800d8" }}
                      />
                    </Stack>
                  )}

                  <PieChart
                    series={[
                      {
                        data,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "#3c62d2",
                        },
                      },
                    ]}
                    width={400}
                    height={200}
                    slotProps={{
                      legend: { hidden: true },
                      // position: 'start'
                    }}
                  />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row"></div>
      </div>
    </>
  );
}

export default Dashboard;
