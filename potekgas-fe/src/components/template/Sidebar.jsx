/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-clinic-medical"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          PotekGas <sup>Apotek Gaspol</sup>
        </div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          {" "}
          {/* Use Link instead of anchor */}
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Master Data</div>

      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog"></i>
          <span>Kelola Data</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Pilihan Data : </h6>
            <Link className="collapse-item" to="/data-pengguna">
              Data Pengguna
            </Link>
            <Link className="collapse-item" to="/data-obat">
              Data Obat
            </Link>
          </div>
        </div>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Transaksi</div>

      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="false"
          aria-controls="collapsePages"
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Transaksi</span>
        </a>
        <div
          id="collapsePages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Pilihan Transaksi : </h6>
            <Link className="collapse-item" to="/data-pembelian">
              Transaksi Pembelian
            </Link>
            {/* <Link className="collapse-item" to="/data-detailpembelian">
              Detail Pembelian
            </Link> */}
            <Link className="collapse-item" to="/form-Pembelian">
              Pembelian
            </Link>
          </div>
        </div>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default Sidebar;
