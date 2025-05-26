// Ambil elemen
const namaInput = document.getElementById('namaSiswa');
const btnTambah = document.getElementById('btnTambah');
const tabelBody = document.querySelector('#tabelSiswa tbody');

let dataSiswa = [];

// Fungsi simpan ke localStorage
function simpanData() {
  localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa));
}

// Fungsi load data dari localStorage
function loadData() {
  const data = localStorage.getItem('dataSiswa');
  if (data) {
    dataSiswa = JSON.parse(data);
  }
}

// Fungsi render tabel
function renderTabel() {
  tabelBody.innerHTML = '';
  dataSiswa.forEach((siswa, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${siswa.nama}</td>
      <td>
        <select onchange="updateKehadiran(${index}, this.value)">
          <option value="Hadir" ${siswa.kehadiran === 'Hadir' ? 'selected' : ''}>Hadir</option>
          <option value="Tidak Hadir" ${siswa.kehadiran === 'Tidak Hadir' ? 'selected' : ''}>Tidak Hadir</option>
        </select>
      </td>
      <td>
        <input type="number" min="0" max="100" value="${siswa.nilai}" onchange="updateNilai(${index}, this.value)" />
      </td>
      <td>
        <button onclick="hapusSiswa(${index})">Hapus</button>
      </td>
    `;

    tabelBody.appendChild(row);
  });
}

// Tambah siswa
btnTambah.addEventListener('click', () => {
  const nama = namaInput.value.trim();
  if (nama === '') {
    alert('Nama siswa tidak boleh kosong!');
    return;
  }

  dataSiswa.push({ nama: nama, kehadiran: 'Hadir', nilai: 0 });
  namaInput.value = '';
  simpanData();
  renderTabel();
});

// Update kehadiran
window.updateKehadiran = (index, value) => {
  dataSiswa[index].kehadiran = value;
  simpanData();
};

// Update nilai
window.updateNilai = (index, value) => {
  const nilai = parseInt(value);
  if (!isNaN(nilai) && nilai >= 0 && nilai <= 100) {
    dataSiswa[index].nilai = nilai;
  } else {
    alert('Nilai harus antara 0-100!');
  }
  simpanData();
  renderTabel();
};

// Hapus siswa
window.hapusSiswa = (index) => {
  if (confirm(`Hapus siswa ${dataSiswa[index].nama}?`)) {
    dataSiswa.splice(index, 1);
    simpanData();
    renderTabel();
  }
};

// Load data saat awal buka aplikasi
loadData();
renderTabel();
