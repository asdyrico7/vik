document.addEventListener('DOMContentLoaded', () => {
    // 1. Fungsi untuk menandai hari ini
    function highlightToday() {
        const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        const date = new Date();
        const todayIndex = date.getDay(); // 0=Minggu, 1=Senin, dst.
        const todayDay = days[todayIndex];

        // Tampilkan informasi hari ini di atas tabel
        const currentDayInfo = document.getElementById('current-day-info');
        const formattedDate = date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        currentDayInfo.textContent = `Hari ini adalah: ${formattedDate}`;

        // Tandai baris tabel yang sesuai
        const todayRow = document.querySelector(`[data-day="${todayDay}"]`);
        if (todayRow) {
            todayRow.classList.add('today');
        }
    }

    // 2. Fungsi untuk menandai latihan selesai
    function setupCompletionButtons() {
        const completeButtons = document.querySelectorAll('.complete-btn');
        
        completeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr'); // Dapatkan baris <tr> terdekat
                const statusCell = this.parentElement; // Dapatkan sel <td> tempat tombol berada

                // Jika sudah ditandai selesai, biarkan saja atau tambahkan toggle
                if (row.classList.contains('completed-row')) {
                    // Opsional: Batalkan status selesai
                    row.classList.remove('completed-row');
                    statusCell.innerHTML = '<button class="complete-btn">Selesai</button>';
                    setupCompletionButtons(); // Panggil ulang untuk mengaktifkan kembali listener
                } else {
                    // Tandai baris sebagai selesai
                    row.classList.add('completed-row');
                    // Ganti tombol dengan teks status
                    statusCell.innerHTML = '<span class="complete-indicator">✔ SELESAI</span>';
                }
            });
        });
    }

    // Jalankan kedua fungsi saat halaman dimuat
    highlightToday();
    setupCompletionButtons();
}); 
