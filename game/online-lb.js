// Online Leaderboard - Uses GitHub as storage
// Works with public repos (read) and token (write)
const ONLINE_LB = {
  repo: '3160877583/maggot-battle',
  file: 'leaderboard.json',
  
  // Read leaderboard from GitHub
  async load() {
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${this.repo}/main/${this.file}?t=${Date.now()}`);
      if (res.ok) return await res.json();
    } catch(e) {}
    return null;
  },
  
  // Save to localStorage (client-side backup)
  saveLocal(data) {
    localStorage.setItem('maggot_lb', JSON.stringify(data));
  },
  
  // Load from localStorage
  loadLocal() {
    try { return JSON.parse(localStorage.getItem('maggot_lb') || '[]'); } 
    catch(e) { return []; }
  },
  
  // Add entry to local leaderboard
  addEntry(name, score, lv) {
    const lb = this.loadLocal();
    lb.push({ name, score, lv, ts: Date.now() });
    lb.sort((a, b) => b.score - a.score);
    if (lb.length > 50) lb.length = 50;
    this.saveLocal(lb);
    return lb;
  }
};
