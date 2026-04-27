// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Данные команд (динамическая подгрузка)
const teamsData = [
    { name: "Cyber Wolves", members: 5, wins: 12, icon: "🐺" },
    { name: "Phoenix Rising", members: 5, wins: 10, icon: "🔥" },
    { name: "Void Runners", members: 5, wins: 9, icon: "🌑" },
    { name: "Quantum Squad", members: 5, wins: 8, icon: "⚛️" },
    { name: "Royal Flush", members: 5, wins: 7, icon: "♠️" },
    { name: "Street Legends", members: 5, wins: 6, icon: "🎮" }
];

const teamsGrid = document.getElementById('teamsGrid');
function renderTeams() {
    if (!teamsGrid) return;
    teamsGrid.innerHTML = teamsData.map(team => `
        <div class="team-card">
            <div class="team-icon">${team.icon}</div>
            <h3>${team.name}</h3>
            <p>👥 ${team.members} игроков | 🏆 ${team.wins} побед</p>
            <small style="color:#a77eff;">⭐ рейтинг ELITE</small>
        </div>
    `).join('');
}
renderTeams();

// Таймер обратного отсчета до 1 мая 2026 (00:00)
function getNextQualifDate() {
    const now = new Date();
    const target = new Date(2026, 4, 1, 0, 0, 0);
    if (now > target) {
        // если уже прошло, показываем нули (или можно запасной вариант)
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (86400000)) / (3600000));
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds, expired: false };
}

function updateCountdown() {
    const count = getNextQualifDate();
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    if (daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        daysSpan.innerText = String(count.days).padStart(2, '0');
        hoursSpan.innerText = String(count.hours).padStart(2, '0');
        minutesSpan.innerText = String(count.minutes).padStart(2, '0');
        secondsSpan.innerText = String(count.seconds).padStart(2, '0');
    }
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Форма регистрации с валидацией и имитацией отправки
const regForm = document.getElementById('registrationForm');
const formMessageDiv = document.getElementById('formMessage');
if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const teamName = document.getElementById('teamName').value.trim();
        const captainName = document.getElementById('captainName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!teamName || !captainName || !email || !phone) {
            formMessageDiv.innerHTML = '<span style="color:#ff8080;">❌ Заполните все поля!</span>';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            formMessageDiv.innerHTML = '<span style="color:#ff8080;">📧 Введите корректный email</span>';
            return;
        }
        // Имитация успешной отправки
        formMessageDiv.innerHTML = '<span style="color:#a0ffa0;">✅ Заявка принята! Ожидайте письмо с подтверждением.</span>';
        regForm.reset();
        setTimeout(() => {
            formMessageDiv.innerHTML = '';
        }, 5000);
    });
}

// Плавная прокрутка для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Анимация navbar при скролле (меняем прозрачность)
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(5, 5, 20, 0.95)";
        navbar.style.backdropFilter = "blur(12px)";
    } else {
        navbar.style.background = "rgba(10, 10, 26, 0.9)";
    }
});