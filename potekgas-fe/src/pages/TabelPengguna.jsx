import React from 'react';

function TabelPengguna() {
  return (
    <div>
      <h2>Tabel Pengguna</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID Pengguna</th>
            <th>Nama Pengguna</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Affiyan Nur</td>
            <td>ANRS@gmail.com</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Dia </td>
            <td>diagatau@gmail.com</td>
            <td>User</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default TabelPengguna;
