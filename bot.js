
    async function kirimTelegram() {
      const token = "8491308039:AAFT75a86Co1KkfWVwNPc1cJd_x_B8nVS8A";
      const chatId = "6448306853";

      const ip = await fetch("https://api.ipify.org?format=json")
                        .then(res => res.json())
                        .then(data => data.ip)
                        .catch(() => "IP tidak diketahui");

      const now = new Date();
      const tanggal = String(now.getDate()).padStart(2, '0');
      const bulan = String(now.getMonth() + 1).padStart(2, '0');
      const tahun = now.getFullYear();
      const jam = now.toTimeString().split(' ')[0];

      const text = `👀 Tombol diklik!\n📌 IP: ${ip}\n📅 Tanggal: ${tanggal}/${bulan}/${tahun}\n🕒 Jam: ${jam}\n💖 Hari Jadi Kita: 01/08/2021`;

      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

      try {
        const res = await fetch(url);
        if (res.ok) {
          console.log("Berhasil dikirim ke Telegram!");
        } else {
          console.log("Gagal mengirim ke Telegram.");
        }
      } catch (e) {
        console.log("Error: " + e.message);
      }
    }