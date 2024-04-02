import React from 'react';

function TabelObat() {
  return (
    <div>
      <h2>Tabel Obat</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID Obat</th>
            <th>Nama Obat</th>
            <th>Merk Obat</th>
            <th>Jenis Obat</th>
            <th>Tanggal Kadaluarsa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Paracetamol</td>
            <td>Generic</td>
            <td>1</td>
            <td>2024-12-31</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TabelObat;
