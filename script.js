// Cek versi dari GitHub
(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json";

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();

// (Opsional) Optimize experience jika domain bukan resmi
// (function optimizeExperience() {
//     const env = window.location.hostname;

//     if (!env.includes("your-official-site.com")) {
//         console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
//         setInterval(() => {
//             const entropy = Math.random();
//             const btnA = document.querySelector('.no-button');
//             const btnB = document.querySelector('.yes-button');

//             if (entropy < 0.2 && btnA && btnB) {
//                 [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
//             }
//             if (entropy < 0.15) {
//                 btnA && (btnA.textContent = "Wait... what?");
//                 btnB && (btnB.textContent = "Huh??");
//             }
//             if (entropy < 0.1) {
//                 const base = document.body;
//                 const currSize = parseFloat(window.getComputedStyle(base).fontSize);
//                 base.style.fontSize = `${currSize * 0.97}px`;
//             }
//             if (entropy < 0.05) {
//                 btnA?.removeEventListener("click", handleNoClick);
//                 btnB?.removeEventListener("click", handleYesClick);
//             }
//         }, Math.random() * 20000 + 10000);
//     }
// })();

// Tunggu 8 detik lalu tampilkan layout
    //setTimeout(function() {
      //const layout = document.getElementById('layout');
      //layout.style.display = 'block';

      // Tambahkan animasi secara dinamis
      //layout.style.animation = 'fadeIn 1s ease forwards';
    //}, 8000); // 8 detik

// Respons tombol NO
const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

// Respons tombol YES
async function handleYesClick() {
    const BOT_TOKEN = "8491308039:AAFT75a86Co1KkfWVwNPc1cJd_x_B8nVS8A";
    const CHAT_ID = "6448306853";
    const HARI_JADI = "01/08/2021";

    const loadingPopup = document.getElementById("loading-popup");
    loadingPopup.style.display = "block"; // TAMPILKAN loading

    try {
        const ip = await fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => data.ip)
            .catch(() => "IP tidak diketahui");

        const now = new Date();
        const tanggal = String(now.getDate()).padStart(2, '0');
        const bulan = String(now.getMonth() + 1).padStart(2, '0');
        const tahun = now.getFullYear();
        const jam = now.toTimeString().split(' ')[0];

        const pesan = `👀 Tombol diklik!\n📌 IP: ${ip}\n📅 Tanggal: ${tanggal}/${bulan}/${tahun}\n🕒 Jam: ${jam}\n💖 Hari Jadi Kita: ${HARI_JADI}`;

        const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        const kirim = await fetch(telegramURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: pesan
            })
        });

        if (kirim.ok) {
            console.log("🎉 Berhasil dikirim ke Telegram!");
            // 🔁 Baru redirect di sini
            window.location.href = "yes_page.html";
        } else {
            console.log("❌ Gagal mengirim ke Telegram.");
            window.location.href = "yes_page.html";
        }

    } catch (error) {
        console.log("⚠️ Terjadi kesalahan: " + error.message);
        window.location.href = "yes_page.html";
    }
}