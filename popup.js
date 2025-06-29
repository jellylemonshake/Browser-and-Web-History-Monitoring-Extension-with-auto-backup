let phishDomains = [];
let currentLogItems = [];
let currentStats = { Low: 0, Medium: 0, High: 0 };
let customKeywords = [];

const suspiciousPatterns = [
  // --- Malware & Exploits ---
  { keyword: "malware", type: "Malware" },
  { keyword: "malw4re", type: "Malware" },
  { keyword: "virus", type: "Malware" },
  { keyword: "v1rus", type: "Malware" },
  { keyword: "worm", type: "Malware" },
  { keyword: "trojan", type: "Malware" },
  { keyword: "spyware", type: "Malware" },
  { keyword: "adware", type: "Malware" },
  { keyword: "ransomware", type: "Malware" },
  { keyword: "keylogger", type: "Malware" },
  { keyword: "rootkit", type: "Malware" },
  { keyword: "backdoor", type: "Malware" },
  { keyword: "fileless", type: "Malware" },
  { keyword: "exploit", type: "Malware" },
  { keyword: "expl0it", type: "Malware" },
  { keyword: "loader", type: "Malware" },
  { keyword: "dropper", type: "Malware" },
  { keyword: "infostealer", type: "Malware" },
  { keyword: "stealer", type: "Malware" },
  { keyword: "inject", type: "Malware" },
  { keyword: "banker", type: "Malware" },
  { keyword: "payload", type: "Malware" },
  { keyword: "shellcode", type: "Malware" },
  { keyword: "obfuscate", type: "Malware" },

  // --- Phishing & Social Engineering ---
  { keyword: "phish", type: "Phishing" },
  { keyword: "ph1sh", type: "Phishing" },
  { keyword: "spoof", type: "Phishing" },
  { keyword: "impersonate", type: "Phishing" },
  { keyword: "login-page", type: "Phishing" },
  { keyword: "fakebank", type: "Phishing" },
  { keyword: "phishing", type: "Phishing" },

  // --- Command & Control, Botnets, DDoS ---
  { keyword: "c2", type: "Command and Control" },
  { keyword: "commandandcontrol", type: "Command and Control" },
  { keyword: "botnet", type: "Botnet" },
  { keyword: "ddos", type: "DDoS" },
  { keyword: "d0s", type: "DDoS" },
  { keyword: "stress", type: "DDoS" },
  { keyword: "booter", type: "DDoS" },
  { keyword: "flood", type: "DDoS" },
  { keyword: "stresser", type: "DDoS" },
  { keyword: "dosattack", type: "DDoS" },

  // --- Cryptomining, Cryptojacking ---
  { keyword: "cryptominer", type: "Cryptomining" },
  { keyword: "webminer", type: "Cryptomining" },
  { keyword: "cryptojack", type: "Cryptomining" },
  { keyword: "mining", type: "Cryptomining" },
  { keyword: "coinhive", type: "Cryptomining" },
  { keyword: "nicehash", type: "Cryptomining" },

  // --- Hacking, Reconnaissance, Exploits ---
  { keyword: "hack", type: "Recon" },
  { keyword: "h4ck", type: "Recon" },
  { keyword: "hacker", type: "Recon" },
  { keyword: "hacktool", type: "Recon" },
  { keyword: "crack", type: "Recon" },
  { keyword: "cr4ck", type: "Recon" },
  { keyword: "keygen", type: "Recon" },
  { keyword: "serialz", type: "Recon" },
  { keyword: "serials", type: "Recon" },
  { keyword: "shell", type: "Recon" },
  { keyword: "sqlinject", type: "Recon" },
  { keyword: "sql-inject", type: "Recon" },
  { keyword: "xss", type: "Recon" },
  { keyword: "bruteforce", type: "Recon" },
  { keyword: "carding", type: "Recon" },
  { keyword: "exploit", type: "Recon" },
  { keyword: "pentest", type: "Recon" },
  { keyword: "0day", type: "Recon" },
  { keyword: "0-day", type: "Recon" },
  { keyword: "expl0it", type: "Recon" },
  { keyword: "leak", type: "Recon" },
  { keyword: "leaked", type: "Recon" },

  // --- Remote Access & RATs ---
  { keyword: "rat", type: "Remote Access" },
  { keyword: "remoteshell", type: "Remote Access" },
  { keyword: "teamviewer", type: "Remote Access" },
  { keyword: "anydesk", type: "Remote Access" },
  { keyword: "vnc", type: "Remote Access" },
  { keyword: "rdp", type: "Remote Access" },
  { keyword: "remotedesktop", type: "Remote Access" },
  { keyword: "logmein", type: "Remote Access" },
  { keyword: "gotomypc", type: "Remote Access" },
  { keyword: "ultraviewer", type: "Remote Access" },
  { keyword: "remotetools", type: "Remote Access" },
  { keyword: "remotework", type: "Remote Access" },

  // --- File Sharing, Piracy, Warez ---
  { keyword: "torrent", type: "File Sharing" },
  { keyword: "torr3nt", type: "File Sharing" },
  { keyword: "pirate", type: "File Sharing" },
  { keyword: "pir4te", type: "File Sharing" },
  { keyword: "warez", type: "File Sharing" },
  { keyword: "megaupload", type: "File Sharing" },
  { keyword: "rapidshare", type: "File Sharing" },
  { keyword: "4shared", type: "File Sharing" },
  { keyword: "zippyshare", type: "File Sharing" },
  { keyword: "kickass", type: "File Sharing" },
  { keyword: "thepiratebay", type: "File Sharing" },
  { keyword: "1337x", type: "File Sharing" },
  { keyword: "limetorrents", type: "File Sharing" },
  { keyword: "magnet:?xt=", type: "File Sharing" },
  { keyword: ".torrent", type: "File Sharing" },
  { keyword: "ddl", type: "File Sharing" },
  { keyword: "cracked", type: "File Sharing" },
  { keyword: "crackz", type: "File Sharing" },
  { keyword: "sceneaccess", type: "File Sharing" },
  { keyword: "usenet", type: "File Sharing" },
  { keyword: "nzb", type: "File Sharing" },
  { keyword: "direct download", type: "File Sharing" },
  { keyword: "ddl", type: "File Sharing" },
  { keyword: "mp3 download", type: "File Sharing" },
  { keyword: "movie download", type: "File Sharing" },
  { keyword: "free movies", type: "File Sharing" },
  { keyword: "free music", type: "File Sharing" },

  // --- Social Media, Entertainment, Distractions ---
  { keyword: "youtube", type: "Entertainment" },
  { keyword: "youtu.be", type: "Entertainment" },
  { keyword: "facebook", type: "Entertainment" },
  { keyword: "instagram", type: "Entertainment" },
  { keyword: "tiktok", type: "Entertainment" },
  { keyword: "twitter", type: "Entertainment" },
  { keyword: "x.com", type: "Entertainment" }, // Twitter rebrand
  { keyword: "snapchat", type: "Entertainment" },
  { keyword: "netflix", type: "Entertainment" },
  { keyword: "reddit", type: "Entertainment" },
  { keyword: "discord", type: "Entertainment" },
  { keyword: "pinterest", type: "Entertainment" },
  { keyword: "twitch", type: "Entertainment" },
  { keyword: "primevideo", type: "Entertainment" },
  { keyword: "hotstar", type: "Entertainment" },
  { keyword: "dailymotion", type: "Entertainment" },
  { keyword: "onlyfans", type: "Entertainment" },
  { keyword: "funnyjunk", type: "Entertainment" },
  { keyword: "9gag", type: "Entertainment" },
  { keyword: "tumblr", type: "Entertainment" },
  { keyword: "imgur", type: "Entertainment" },
  { keyword: "bilibili", type: "Entertainment" },

  // --- Gambling ---
  { keyword: "casino", type: "Gambling" },
  { keyword: "bet", type: "Gambling" },
  { keyword: "poker", type: "Gambling" },
  { keyword: "lotto", type: "Gambling" },
  { keyword: "bingo", type: "Gambling" },
  { keyword: "jackpot", type: "Gambling" },
  { keyword: "gamble", type: "Gambling" },
  { keyword: "bookie", type: "Gambling" },
  { keyword: "sportsbook", type: "Gambling" },
  { keyword: "bet365", type: "Gambling" },
  { keyword: "betway", type: "Gambling" },
  { keyword: "1xbet", type: "Gambling" },
  { keyword: "parimatch", type: "Gambling" },
  { keyword: "dafabet", type: "Gambling" },
  { keyword: "betonline", type: "Gambling" },

  // --- Drugs, Illegal Substances ---
  { keyword: "drug", type: "Illegal" },
  { keyword: "weed", type: "Illegal" },
  { keyword: "cocaine", type: "Illegal" },
  { keyword: "heroin", type: "Illegal" },
  { keyword: "meth", type: "Illegal" },
  { keyword: "lsd", type: "Illegal" },
  { keyword: "ecstasy", type: "Illegal" },
  { keyword: "marijuana", type: "Illegal" },
  { keyword: "mdma", type: "Illegal" },
  { keyword: "shrooms", type: "Illegal" },
  { keyword: "psilocybin", type: "Illegal" },
  { keyword: "dmt", type: "Illegal" },
  { keyword: "ketamine", type: "Illegal" },
  { keyword: "fentanyl", type: "Illegal" },
  { keyword: "adderall", type: "Illegal" },
  { keyword: "oxycontin", type: "Illegal" },
  { keyword: "opium", type: "Illegal" },
  { keyword: "morphine", type: "Illegal" },
  { keyword: "vicodin", type: "Illegal" },

  // --- NSFW, Adult Content, Pornography ---
  { keyword: "porn", type: "NSFW" },
  { keyword: "pr0n", type: "NSFW" },
  { keyword: "p0rn", type: "NSFW" },
  { keyword: "xxx", type: "NSFW" },
  { keyword: "sex", type: "NSFW" },
  { keyword: "s3x", type: "NSFW" },
  { keyword: "nude", type: "NSFW" },
  { keyword: "naked", type: "NSFW" },
  { keyword: "pornhub", type: "NSFW" },
  { keyword: "xvideos", type: "NSFW" },
  { keyword: "xhamster", type: "NSFW" },
  { keyword: "redtube", type: "NSFW" },
  { keyword: "brazzers", type: "NSFW" },
  { keyword: "xnxx", type: "NSFW" },
  { keyword: "spankbang", type: "NSFW" },
  { keyword: "youjizz", type: "NSFW" },
  { keyword: "youporn", type: "NSFW" },
  { keyword: "pornsite", type: "NSFW" },
  { keyword: "sexsite", type: "NSFW" },
  { keyword: "amateurporn", type: "NSFW" },
  { keyword: "camgirl", type: "NSFW" },
  { keyword: "cam4", type: "NSFW" },
  { keyword: "onlyfans", type: "NSFW" },
  { keyword: "rule34", type: "NSFW" },
  { keyword: "hentai", type: "NSFW" },
  { keyword: "fap", type: "NSFW" },
  { keyword: "furry", type: "NSFW" },
  { keyword: "yiff", type: "NSFW" },
  { keyword: "nsfw", type: "NSFW" },
  { keyword: "erotic", type: "NSFW" },
  { keyword: "pornografía", type: "NSFW" }, // Spanish
  { keyword: "porno", type: "NSFW" }, // Spanish, Italian, etc.
  { keyword: "nudes", type: "NSFW" },
  { keyword: "escort", type: "NSFW" },
  { keyword: "bdsm", type: "NSFW" },
  { keyword: "anal", type: "NSFW" },
  { keyword: "cum", type: "NSFW" },
  { keyword: "blowjob", type: "NSFW" },
  { keyword: "deepthroat", type: "NSFW" },
  { keyword: "milf", type: "NSFW" },
  { keyword: "gayporn", type: "NSFW" },
  { keyword: "lesbianporn", type: "NSFW" },

  // --- Scam, Fraud, Impersonation ---
  { keyword: "scam", type: "Fraud" },
  { keyword: "fraud", type: "Fraud" },
  { keyword: "fake", type: "Fraud" },
  { keyword: "counterfeit", type: "Fraud" },
  { keyword: "giveaway", type: "Fraud" },
  { keyword: "lottery", type: "Fraud" },
  { keyword: "sweepstake", type: "Fraud" },
  { keyword: "loan", type: "Fraud" },
  { keyword: "investment", type: "Fraud" },
  { keyword: "getrich", type: "Fraud" },
  { keyword: "winmoney", type: "Fraud" },
  { keyword: "phishing", type: "Fraud" },

  // --- Cryptocurrency, Trading, Investment ---
  { keyword: "crypto", type: "Crypto" },
  { keyword: "bitcoin", type: "Crypto" },
  { keyword: "btc", type: "Crypto" },
  { keyword: "ethereum", type: "Crypto" },
  { keyword: "binance", type: "Crypto" },
  { keyword: "dogecoin", type: "Crypto" },
  { keyword: "coinbase", type: "Crypto" },
  { keyword: "blockchain", type: "Crypto" },
  { keyword: "forex", type: "Crypto" },
  { keyword: "trading", type: "Crypto" },
  { keyword: "binaryoption", type: "Crypto" },
  { keyword: "usdt", type: "Crypto" },
  { keyword: "altcoin", type: "Crypto" },
  { keyword: "defi", type: "Crypto" },
  { keyword: "nft", type: "Crypto" },

  // --- IoT, Supply Chain, Cloud Threats ---
  { keyword: "iot", type: "IoT" },
  { keyword: "firmware", type: "IoT" },
  { keyword: "supplychain", type: "Supply Chain" },
  { keyword: "cloud", type: "Cloud" },
  { keyword: "s3bucket", type: "Cloud" },
  { keyword: "misconfig", type: "Cloud" },

  // --- Spam, Unsolicited, Social Engineering ---
  { keyword: "spam", type: "Spam" },
  { keyword: "unsolicited", type: "Spam" },
  { keyword: "socialengineer", type: "Social Engineering" },

  // --- Insider, State, Advanced Threats ---
  { keyword: "insider", type: "Insider Threat" },
  { keyword: "apt", type: "Advanced Threat" },
  { keyword: "statesponsored", type: "Advanced Threat" },
  { keyword: "cyberwar", type: "Advanced Threat" },

  // --- Circumvention Tools & Bypass ---
  { keyword: "vpn", type: "Circumvention" },
  { keyword: "proxy", type: "Circumvention" },
  { keyword: "tor", type: "Circumvention" },
  { keyword: "ultrasurf", type: "Circumvention" },
  { keyword: "psiphon", type: "Circumvention" },
  { keyword: "hotspotshield", type: "Circumvention" },
  { keyword: "hidemyass", type: "Circumvention" },
  { keyword: "protonvpn", type: "Circumvention" },
  { keyword: "tunnelbear", type: "Circumvention" },
  { keyword: "openvpn", type: "Circumvention" },
  { keyword: "bypass block", type: "Circumvention" },
  { keyword: "unblock site", type: "Circumvention" },
  { keyword: "school wifi hack", type: "Circumvention" },
  { keyword: "proxy list", type: "Circumvention" },
  { keyword: "web proxy", type: "Circumvention" },
  { keyword: "free vpn", type: "Circumvention" },
  { keyword: "vpn download", type: "Circumvention" },

  // --- Obfuscated/Encoded/Tricky ---
  { keyword: "[dot]", type: "Obfuscation" },
  { keyword: "(dot)", type: "Obfuscation" },
  { keyword: "{dot}", type: "Obfuscation" },
  { keyword: "dotcom", type: "Obfuscation" },
  { keyword: "dot net", type: "Obfuscation" },

  // --- Newly Seen/Unknown Domains ---
  { keyword: "newdomain", type: "Unknown" },
  { keyword: "unknown", type: "Unknown" }
];

document.addEventListener("DOMContentLoaded", () => {
  const analyzeBtn = document.getElementById("analyze");
  if (analyzeBtn) analyzeBtn.disabled = true;

  fetch(chrome.runtime.getURL("blacklist.json"))
    .then(resp => resp.json())
    .then(data => {
      phishDomains = data;
      if (analyzeBtn) analyzeBtn.disabled = false;
    })
    .catch(() => {
      phishDomains = [];
      if (analyzeBtn) analyzeBtn.disabled = false;
    });

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", analyzeHistory);
  }
  document.getElementById("sortSelect").addEventListener("change", renderEventLogs);
  document.getElementById("filterSelect").addEventListener("change", renderEventLogs);

  // Custom keywords
  loadCustomKeywords();
  document.getElementById("addKeywordBtn").addEventListener("click", () => {
    const input = document.getElementById("customKeywordInput");
    const val = input.value.trim();
    if (val && !customKeywords.includes(val)) {
      customKeywords.push(val);
      chrome.storage.local.set({ customKeywords }, loadCustomKeywords);
      input.value = "";
    }
  });

  // Download logs as Excel/CSV
  document.getElementById("downloadExcelBtn").addEventListener("click", () => {
    // If logs haven't been analyzed yet, analyze first
    if (!currentLogItems.length) {
      analyzeHistory();
      setTimeout(() => downloadLogsCSV(currentLogItems), 100);
    } else {
      downloadLogsCSV(currentLogItems);
    }
  });

    // Unified Alert Mode Toggle (Warning vs. Non-dismissable Alert)
  const alertModeToggle = document.getElementById("alertModeToggle");
  if (alertModeToggle) {
    chrome.storage.local.get({ nonAdmissibleMode: false }, (data) => {
      alertModeToggle.checked = !!data.nonAdmissibleMode;
    });
    alertModeToggle.addEventListener("change", () => {
      chrome.storage.local.set({ nonAdmissibleMode: alertModeToggle.checked }, () => {
        chrome.tabs.query({}, function(tabs) {
          for (let tab of tabs) {
            if (tab.id && tab.url && /^https?:\/\//.test(tab.url)) {
              chrome.tabs.reload(tab.id);
            }
          }
        });
      });
    });
  }


});

function downloadLogsCSV(logs) {
  const headers = ["URL", "Title", "Last Visit Time", "Message", "Severity"];
  const rows = logs.map(item => [
    `"${item.url}"`,
    `"${item.title || ""}"`,
    `"${new Date(item.lastVisitTime).toLocaleString()}"`,
    `"${item.message || ""}"`,
    `"${item.logType || ""}"`
  ]);
  let csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "event_log.csv";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

function loadCustomKeywords() {
  chrome.storage.local.get({ customKeywords: [] }, (data) => {
    customKeywords = data.customKeywords;
    displayCustomKeywords();
  });
}

function displayCustomKeywords() {
  const listDiv = document.getElementById("customKeywordsList");
  if (!listDiv) return;
  listDiv.innerHTML = customKeywords.map((kw, idx) =>
    `<span class="custom-keyword-chip" data-idx="${idx}">
      ${kw}
      <span class="custom-keyword-remove" data-idx="${idx}" role="button" tabindex="0" aria-label="Remove keyword">&times;</span>
    </span>`
  ).join('');

  // Attach event listeners to all remove buttons (CSP-safe)
  Array.from(listDiv.getElementsByClassName("custom-keyword-remove")).forEach(btn => {
    btn.addEventListener("click", function(e) {
      const idx = parseInt(this.getAttribute("data-idx"), 10);
      if (!isNaN(idx)) {
        customKeywords.splice(idx, 1);
        chrome.storage.local.set({ customKeywords }, loadCustomKeywords);
      }
    });
    // Optional: allow keyboard removal for accessibility
    btn.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " " || e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        this.click();
      }
    });
  });
}

function analyzeHistory() {
  chrome.storage.local.get(["eventLog", "customKeywords"], (data) => {
    let historyItems = data.eventLog || [];
    let localCustomKeywords = data.customKeywords || [];
    currentLogItems = [];
    let stats = { Low: 0, Medium: 0, High: 0 };

    historyItems.forEach(item => {
      const url = item.url;
      let logType = "Low";
      let message = `✅ OK: No threat found at: ${url}`;
      let isThreat = false;

      // Combine built-in and custom keywords
      const allPatterns = [
        ...suspiciousPatterns,
        ...localCustomKeywords.map(kw => ({ keyword: kw, type: "Custom" }))
      ];

      allPatterns.forEach(pattern => {
        if (url.toLowerCase().includes(pattern.keyword.toLowerCase())) {
          isThreat = true;
          logType = (pattern.type === "Recon" || pattern.type === "Custom") ? "Low" : "High";
          message = `🚨 ${pattern.type} risk detected at: ${url}`;
        }
      });

      if (!isThreat) {
        const result = isSuspiciousUrl(url);
        if (result.matched) {
          isThreat = true;
          logType = "Medium";
          message = `⚠️ Suspicious URL (${result.reason}): ${url}`;
        }
      }

      currentLogItems.push({
        ...item,
        logType,
        message
      });
      stats[logType]++;
    });

    currentStats = stats;
    updateCounters(stats);
    drawCircularChart(stats);
    renderEventLogs();
  });
}

function renderEventLogs() {
  let logs = [...currentLogItems];
  const sortValue = document.getElementById("sortSelect").value;
  const filterValue = document.getElementById("filterSelect").value;

  if (filterValue !== "all") {
    logs = logs.filter(item => item.logType.toLowerCase() === filterValue);
  }

  if (sortValue === "newest") {
    logs.sort((a, b) => b.lastVisitTime - a.lastVisitTime);
  } else if (sortValue === "oldest") {
    logs.sort((a, b) => a.lastVisitTime - b.lastVisitTime);
  } else if (sortValue === "severity") {
    const sevOrder = { High: 0, Medium: 1, Low: 2 };
    logs.sort((a, b) => sevOrder[a.logType] - sevOrder[b.logType] || b.lastVisitTime - a.lastVisitTime);
  }

  const logList = document.getElementById("logList");
  if (!logList) return;
  logList.innerHTML = "";

  logs.forEach(item => {
    const visitTime = new Date(item.lastVisitTime).toLocaleString();
    const li = document.createElement("li");
    li.innerHTML = `<span class="log-time">[${visitTime}]</span> <span class="log-message">${item.message}</span>`;
    li.setAttribute("data-severity", item.logType);

    // Add classes for coloring
    if (item.message.includes("OK:")) {
      li.classList.add("log-ok");
    } else {
      li.classList.add("log-risk");
    }

    li.style.transition = "background 0.3s, color 0.3s, box-shadow 0.3s";
    li.addEventListener("mouseenter", () => {
      li.style.backgroundColor = "#f5f5f5";
      li.style.boxShadow = "0 2px 8px 0 #bcbcbc33";
    });
    li.addEventListener("mouseleave", () => {
      li.style.backgroundColor = "";
      li.style.boxShadow = "";
    });
    logList.appendChild(li);
  });
}

function calculateEntropy(domain) {
  const freq = {};
  for (let char of domain) {
    freq[char] = (freq[char] || 0) + 1;
  }
  const len = domain.length;
  let entropy = 0;
  for (let count of Object.values(freq)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

function isSuspiciousUrl(url) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (phishDomains.includes(hostname)) {
      return { matched: true, reason: "Blacklisted by PhishTank" };
    }

    const entropy = calculateEntropy(hostname);
    if (entropy > 4.0) {
      return { matched: true, reason: "High entropy domain (possible obfuscation)" };
    }

    return { matched: false };
  } catch (err) {
    return { matched: true, reason: "Malformed URL" };
  }
}

function updateCounters(stats) {
  const low = document.getElementById("lowCount");
  const medium = document.getElementById("mediumCount");
  const high = document.getElementById("highCount");
  if (low) low.textContent = stats.Low;
  if (medium) medium.textContent = stats.Medium;
  if (high) high.textContent = stats.High;
}

function drawCircularChart(stats) {
  const svg = document.getElementById("riskChart");
  if (!svg) return;

  while (svg.childNodes.length > 1) {
    svg.removeChild(svg.lastChild);
  }

  const total = stats.Low + stats.Medium + stats.High;
  if (total === 0) return;

  const colors = {
    Low: "#00ff99",
    Medium: "#f1c40f",
    High: "#e74c3c"
  };

  const data = [
    { value: stats.Low, color: colors.Low },
    { value: stats.Medium, color: colors.Medium },
    { value: stats.High, color: colors.High }
  ];

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  data.forEach((segment, idx) => {
    if (segment.value === 0) return;
    const percent = segment.value / total;
    const dash = percent * circumference;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "90");
    circle.setAttribute("cy", "90");
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", segment.color);
    circle.setAttribute("stroke-width", "30");
    circle.setAttribute("stroke-dasharray", `0 ${circumference}`);
    circle.setAttribute("stroke-dashoffset", -offset);
    circle.setAttribute("transform", "rotate(-90 90 90)");
    circle.style.transition = "stroke-dasharray 1s cubic-bezier(.77,0,.18,1)";

    svg.appendChild(circle);

    setTimeout(() => {
      circle.setAttribute("stroke-dasharray", `${dash} ${circumference - dash}`);
    }, 120 * idx);

    offset += dash;
  });
}
