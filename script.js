// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Определяем страницу
const isHistoryPage = window.location.pathname.includes('history.html');

// Данные
let tournamentData = {
    current: {
        teams: [],
        bracket: { quarterfinals: [], semifinals: [], finals: [] },
        rosters: []
    },
    history: {
        seasons: {}
    }
};

// Загрузка данных
async function loadData() {
    try {
        const response = await fetch('data.json?v=' + Date.now());
        if (response.ok) {
            tournamentData = await response.json();
        } else {
            useDefaultData();
        }
    } catch (error) {
        useDefaultData();
    }
    
    if (isHistoryPage) {
        setupHistoryPage();
    } else {
        renderCurrentBracket();
        renderCurrentTeams();
        renderRosters();
    }
}

// Данные по умолчанию (8 команд с составами)
function useDefaultData() {
    tournamentData = {
        current: {
            teams: [
                { name: "Sugar Rush", points: 0, stage: "1/4 финала", place: 1 },
                { name: "Brawl Stars", points: 0, stage: "1/4 финала", place: 2 },
                { name: "Команда 3", points: 0, stage: "1/4 финала", place: 3 },
                { name: "Команда 4", points: 0, stage: "1/4 финала", place: 4 },
                { name: "Команда 5", points: 0, stage: "1/4 финала", place: 5 },
                { name: "Команда 6", points: 0, stage: "1/4 финала", place: 6 },
                { name: "Команда 7", points: 0, stage: "1/4 финала", place: 7 },
                { name: "Команда 8", points: 0, stage: "1/4 финала", place: 8 }
            ],
            bracket: {
                quarterfinals: [
                    { team1: "Команда 1", score1: 0, team2: "Команда 8", score2: 0, winner: "" },
                    { team1: "Команда 2", score1: 0, team2: "Команда 7", score2: 0, winner: "" },
                    { team1: "Команда 3", score1: 0, team2: "Команда 6", score2: 0, winner: "" },
                    { team1: "Команда 4", score1: 0, team2: "Команда 5", score2: 0, winner: "" }
                ],
                semifinals: [
                    { team1: "Победитель A", score1: 0, team2: "Победитель B", score2: 0, winner: "" },
                    { team1: "Победитель C", score1: 0, team2: "Победитель D", score2: 0, winner: "" }
                ],
                finals: [
                    { team1: "Финалист 1", score1: 0, team2: "Финалист 2", score2: 0, winner: "" }
                ]
            },
            rosters: [
                { name: "Sugar Rush", points: 0, players: ["Игрок 1", "Игрок 2", "Игрок 3", "Запасной"] },
                { name: "Brawl Stars", points: 0, players: ["Игрок 1", "Игрок 2", "Игрок 3", "Запасной"] },
                { name: "Команда 3", points: 0, players: ["Игрок 1", "Игрок 2", "Игрок 3", "Запасной"] },
                { name: "Команда 4", points: 0, players: ["Игрок 1", "Игрок 2", "Игрок 3", "Запасной"] },
                { name: "Команда 5", points: 0, players: ["Игрок 1", "Игрок 2", "Игрок 3", "Запасной"] },
                { name: "Команда 6", points: 0, players: ["Игрок 1", "Игрок 2", "Игрок 3", "Запасной"] },
                { name: "Команда 7", points: 0, players: ["Игрок 1", "Игрок 2", "Игрок 3", "Запасной"] },
                { name: "Команда 8", points: 0, players: ["Игрок 1", "Игрок 2", "Игрок 3", "Запасной"] }
            ]
        },
        history: {
            seasons: {
                "2026-spring": {
                    name: "Standoff 2",
                    year: 2026,
                    season: "Весна",
                    dates: "14, 15, 17 апреля 2026",
                    icon: "🔫",
                    teams: [
                        { name: "Cyber Wolves", points: 100, stage: "Чемпион", place: 1 },
                        { name: "Phoenix Rising", points: 85, stage: "Финалист", place: 2 },
                        { name: "Void Runners", points: 70, stage: "Полуфинал", place: 3 },
                        { name: "Quantum Squad", points: 65, stage: "Полуфинал", place: 4 }
                    ],
                    bracket: {
                        quarterfinals: [
                            { team1: "Cyber Wolves", score1: 2, team2: "Shadow Clan", score2: 0, winner: "Cyber Wolves" },
                            { team1: "Phoenix Rising", score1: 2, team2: "Neon Warriors", score2: 1, winner: "Phoenix Rising" },
                            { team1: "Void Runners", score1: 2, team2: "Street Legends", score2: 0, winner: "Void Runners" },
                            { team1: "Quantum Squad", score1: 2, team2: "Royal Flush", score2: 1, winner: "Quantum Squad" }
                        ],
                        semifinals: [
                            { team1: "Cyber Wolves", score1: 2, team2: "Quantum Squad", score2: 0, winner: "Cyber Wolves" },
                            { team1: "Phoenix Rising", score1: 2, team2: "Void Runners", score2: 1, winner: "Phoenix Rising" }
                        ],
                        finals: [
                            { team1: "Cyber Wolves", score1: 3, team2: "Phoenix Rising", score2: 1, winner: "Cyber Wolves" }
                        ]
                    }
                }
            }
        }
    };
}

// Текущий турнир
function renderCurrentBracket() {
    const container = document.getElementById('bracketContainer');
    if (!container) return;
    const bracket = tournamentData.current?.bracket;
    if (!bracket) {
        container.innerHTML = '<div class="loading">Нет данных о сетке</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="round">
            <h3>🏆 1/4 финала</h3>
            ${bracket.quarterfinals.map(m => `<div class="match"><div class="match-team"><span>${m.team1}</span><span>${m.score1}</span></div><div class="match-team"><span>${m.team2}</span><span>${m.score2}</span></div></div>`).join('')}
        </div>
        <div class="round">
            <h3>⭐ Полуфинал</h3>
            ${bracket.semifinals.map(m => `<div class="match"><div class="match-team"><span>${m.team1}</span><span>${m.score1}</span></div><div class="match-team"><span>${m.team2}</span><span>${m.score2}</span></div></div>`).join('')}
        </div>
        <div class="round">
            <h3>👑 Финал</h3>
            ${bracket.finals.map(m => `<div class="match"><div class="match-team"><span>${m.team1}</span><span>${m.score1}</span></div><div class="match-team"><span>${m.team2}</span><span>${m.score2}</span></div>${m.winner ? `<div style="margin-top:10px;text-align:center;font-weight:700;color:#ff4d6d;">🏆 ${m.winner}</div>` : ''}</div>`).join('')}
        </div>
    `;
}

function renderCurrentTeams() {
    const tbody = document.getElementById('teamsTableBody');
    if (!tbody) return;
    const teams = tournamentData.current?.teams;
    if (!teams || teams.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Нет данных</td></tr>';
        return;
    }
    const sorted = [...teams].sort((a,b) => b.points - a.points);
    tbody.innerHTML = sorted.map((t,i) => `<tr><td>${i+1}</td><td><strong>${t.name}</strong></td><td>${t.points}</td><td>${t.stage}</td></tr>`).join('');
}

function renderRosters() {
    const container = document.getElementById('rostersContainer');
    if (!container) return;
    const rosters = tournamentData.current?.rosters;
    if (!rosters || rosters.length === 0) {
        container.innerHTML = '<div class="loading">Нет данных о составах команд</div>';
        return;
    }
    
    const roleMap = { 0: "Капитан", 1: "Игрок", 2: "Игрок", 3: "Запасной" };
    
    container.innerHTML = rosters.map(team => `
        <div class="roster-card">
            <div class="roster-header">
                <h3>${team.name}</h3>
                <div class="roster-points">⭐ ${team.points || 0} очков</div>
            </div>
            <div class="roster-players">
                ${team.players.map((player, idx) => `
                    <div class="player-item">
                        <i class="fas fa-user"></i>
                        <span class="player-name">${player}</span>
                        <span class="player-role">${roleMap[idx] || "Игрок"}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Страница истории
function setupHistoryPage() {
    const seasons = tournamentData.history?.seasons || {};
    const filterContainer = document.getElementById('seasonFilter');
    const contentContainer = document.getElementById('seasonContent');
    
    const seasonKeys = Object.keys(seasons);
    if (filterContainer && seasonKeys.length > 0) {
        filterContainer.innerHTML = seasonKeys.map((key, idx) => {
            const season = seasons[key];
            const isActive = idx === 0;
            return `<button class="filter-btn ${isActive ? 'active' : ''}" data-season="${key}">${season.icon || '🏆'} ${season.season} ${season.year} (${season.name})</button>`;
        }).join('');
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderSeasonContent(btn.dataset.season);
            });
        });
        
        if (seasonKeys[0]) renderSeasonContent(seasonKeys[0]);
    } else if (contentContainer) {
        contentContainer.innerHTML = '<div class="loading">Нет данных об истории турниров</div>';
    }
}

function renderSeasonContent(seasonKey) {
    const container = document.getElementById('seasonContent');
    const season = tournamentData.history?.seasons?.[seasonKey];
    if (!season || !container) return;
    
    const sortedTeams = [...season.teams].sort((a,b) => b.points - a.points);
    
    container.innerHTML = `
        <div class="container">
            <div class="season-card">
                <div class="season-header">
                    <div class="season-icon">${season.icon || '🏆'}</div>
                    <h2>${season.name} <span>${season.season} ${season.year}</span></h2>
                    <div class="season-dates">📅 ${season.dates}</div>
                </div>
                
                <div class="history-bracket">
                    <h3 style="margin-bottom: 20px;">Турнирная сетка</h3>
                    <div class="bracket">
                        <div class="round">
                            <h3>🏆 1/4 финала</h3>
                            ${season.bracket.quarterfinals.map(m => `<div class="match"><div class="match-team"><span>${m.team1}</span><span>${m.score1}</span></div><div class="match-team"><span>${m.team2}</span><span>${m.score2}</span></div></div>`).join('')}
                        </div>
                        <div class="round">
                            <h3>⭐ Полуфинал</h3>
                            ${season.bracket.semifinals.map(m => `<div class="match"><div class="match-team"><span>${m.team1}</span><span>${m.score1}</span></div><div class="match-team"><span>${m.team2}</span><span>${m.score2}</span></div></div>`).join('')}
                        </div>
                        <div class="round">
                            <h3>👑 Финал</h3>
                            ${season.bracket.finals.map(m => `<div class="match"><div class="match-team"><span>${m.team1}</span><span>${m.score1}</span></div><div class="match-team"><span>${m.team2}</span><span>${m.score2}</span></div>${m.winner ? `<div style="margin-top:10px;text-align:center;font-weight:700;color:#ff4d6d;">🏆 Чемпион: ${m.winner}</div>` : ''}</div>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="history-teams-table">
                    <h3 style="margin-bottom: 20px;">Итоговые результаты</h3>
                    <div class="teams-table-wrapper">
                        <table class="teams-table">
                            <thead><tr><th>Место</th><th>Команда</th><th>Очки</th><th>Результат</th></tr></thead>
                            <tbody>
                                ${sortedTeams.map((t,i) => `<tr><td>${i+1}</td><td><strong>${t.name}</strong></td><td>${t.points}</td><td>${t.stage}</td></tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div style="margin-top: 32px; padding: 20px; background: #fff0f0; border-radius: 20px; text-align: center;">
                    <i class="fas fa-cake-candles" style="color: #ff4d6d; font-size: 1.5rem;"></i>
                    <p style="margin-top: 8px;">🍰 Победители получили сладкие призы и кубок чемпионов! 🏆</p>
                </div>
            </div>
        </div>
    `;
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId.includes('.html')) return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Скролл-подсказка
const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
    scrollHint.addEventListener('click', () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    });
}

loadData();