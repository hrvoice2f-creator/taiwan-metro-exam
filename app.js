/* 台灣捷運招考題庫 — 介面邏輯 */
(function () {
  const DATA = window.EXAM_DATA;
  // 題庫：優先用程式解析的完整題庫（questions.js），退回 data.js 內建精選題
  const QUESTIONS = window.EXAM_QUESTIONS || DATA.questions;
  const companyMap = {};
  DATA.companies.forEach(c => (companyMap[c.id] = c));

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const LETTERS = ["A", "B", "C", "D"];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  /* ===== 視圖切換 ===== */
  function showView(id) {
    $$(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + id));
    $$(".nav button[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === id));
    window.scrollTo({ top: 0 });
  }
  $$(".nav button[data-view]").forEach(b => b.addEventListener("click", () => showView(b.dataset.view)));
  $(".nav .logo").addEventListener("click", () => showView("home"));

  /* 首頁四個特色方塊 → 連到對應功能 */
  $$(".feature[data-goto]").forEach(card => {
    card.addEventListener("click", () => {
      const target = card.dataset.goto;
      if (target === "history") {
        showView("quiz");
        renderHistory();
        const box = $("#quizHistoryBox");
        if (box) setTimeout(() => box.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
      } else {
        showView(target);
      }
    });
  });

  /* ===== 首頁：公司卡片 ===== */
  function renderCompanyCards() {
    const grid = $("#companyGrid");
    grid.innerHTML = DATA.companies.map(c => {
      const count = QUESTIONS.filter(q => q.company === c.id).length;
      const yearsLabel = c.years.length ? `民國 ${Math.min(...c.years.map(y => y.roc))}～${Math.max(...c.years.map(y => y.roc))} 年` : "";
      const countLabel = c.hasQuestions ? `歷屆題庫 ${count} 題` : "官方不公布考古題";
      return `
        <div class="company-card" style="--cc:${c.color}" data-company="${c.id}">
          <div class="cc-dot">${esc(c.name.charAt(0))}</div>
          <h3>${esc(c.name)}</h3>
          <div class="cc-tag">${esc(c.tagline)}</div>
          <div class="cc-meta">
            <span class="badge">${esc(yearsLabel)}</span>
            <span class="badge">${esc(countLabel)}</span>
          </div>
        </div>`;
    }).join("");
    grid.querySelectorAll(".company-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.company;
        if (companyMap[id].hasQuestions) {
          showView("search");
          $("#filterCompany").value = id;
          applyFilters();
        } else {
          showView("resources");
          const el = document.getElementById("res-" + id);
          if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        }
      });
    });
  }

  /* ===== 考古題搜尋 ===== */
  function initFilters() {
    const subjects = [...new Set(QUESTIONS.map(q => q.subject))];
    $("#filterSubject").innerHTML = '<option value="">全部科目</option>' + subjects.map(s => `<option>${esc(s)}</option>`).join("");
    const rocs = [...new Set(QUESTIONS.map(q => q.roc).filter(r => r != null))].sort((a, b) => b - a);
    $("#filterYear").innerHTML = '<option value="">全部年度</option>' + rocs.map(r => `<option value="${r}">民國 ${r} 年</option>`).join("") + '<option value="common">共通考點題</option>';
    $("#filterCompany").innerHTML = '<option value="">全部公司</option>' + DATA.companies.filter(c => c.hasQuestions).map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join("");
    ["filterCompany", "filterYear", "filterSubject"].forEach(id => $("#" + id).addEventListener("change", applyFilters));
    $("#filterKeyword").addEventListener("input", applyFilters);
  }

  function applyFilters() {
    const comp = $("#filterCompany").value;
    const year = $("#filterYear").value;
    const subj = $("#filterSubject").value;
    const kw = $("#filterKeyword").value.trim().toLowerCase();
    const list = QUESTIONS.filter(q => {
      if (comp && q.company !== comp) return false;
      if (year === "common" && q.roc != null) return false;
      if (year && year !== "common" && q.roc !== Number(year)) return false;
      if (subj && q.subject !== subj) return false;
      if (kw) {
        const hay = (q.question + " " + q.options.join(" ") + " " + (q.explanation || "")).toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });
    renderQuestions(list);
  }

  const RENDER_CAP = 300;
  function renderQuestions(fullList) {
    const list = fullList.slice(0, RENDER_CAP);
    $("#resultCount").textContent = fullList.length > RENDER_CAP
      ? `共找到 ${fullList.length} 題，先顯示前 ${RENDER_CAP} 題（用上方篩選縮小範圍，或到測驗專區練習）`
      : `共找到 ${fullList.length} 題`;
    $("#questionList").innerHTML = list.map((q, i) => {
      const c = companyMap[q.company];
      const yearTag = q.roc != null ? `民國 ${q.roc} 年` : "共通考點";
      return `
      <div class="q-card">
        <div class="q-tags">
          <span class="badge" style="background:${c.color};color:#fff">${esc(c.name)}</span>
          <span class="badge" style="background:var(--bg-soft);border:1px solid var(--line);color:var(--text-dim)">${yearTag}</span>
          <span class="badge" style="background:var(--bg-soft);border:1px solid var(--line);color:var(--text-dim)">${esc(q.subject)}</span>
        </div>
        <div class="q-text">${esc(q.question)}</div>
        <ol>${q.options.map((o, j) => `<li data-opt="${j}">(${LETTERS[j]}) ${esc(o)}</li>`).join("")}</ol>
        <button class="reveal-btn" data-idx="${i}">顯示答案與解析</button>
        <div class="q-answer" id="ans-${i}">
          <b>正確答案：(${LETTERS[q.answer]})</b> ${esc(q.options[q.answer])}<br>
          ${q.explanation ? esc(q.explanation) : ""}
          <div class="src">來源：<a href="${esc(q.source)}" target="_blank" rel="noopener">${esc(q.source)}</a></div>
        </div>
      </div>`;
    }).join("") || '<p style="color:var(--text-dim)">沒有符合條件的題目，換個條件試試。</p>';

    $$("#questionList .reveal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.idx;
        const box = $("#ans-" + i);
        const shown = box.classList.toggle("show");
        btn.textContent = shown ? "隱藏答案" : "顯示答案與解析";
        const card = btn.closest(".q-card");
        const q = list[i];
        card.querySelectorAll("ol li").forEach(li => {
          li.classList.toggle("correct-reveal", shown && Number(li.dataset.opt) === q.answer);
        });
      });
    });
  }

  /* ===== 測驗專區 ===== */
  let quiz = null;

  function initQuizSetup() {
    const compSel = $("#quizCompany");
    compSel.innerHTML = '<option value="">綜合測驗（全部公司）</option>' +
      DATA.companies.filter(c => c.hasQuestions).map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join("");
    const subjSel = $("#quizSubject");
    const refreshSubjects = () => {
      const comp = compSel.value;
      const pool = QUESTIONS.filter(q => !comp || q.company === comp);
      const subjects = [...new Set(pool.map(q => q.subject))];
      subjSel.innerHTML = '<option value="">全部科目</option>' + subjects.map(s => `<option>${esc(s)}</option>`).join("");
    };
    compSel.addEventListener("change", refreshSubjects);
    refreshSubjects();
    $("#startQuiz").addEventListener("click", startQuiz);
  }

  function startQuiz() {
    const comp = $("#quizCompany").value;
    const subj = $("#quizSubject").value;
    const wanted = $("#quizCount").value;
    let pool = QUESTIONS.filter(q => (!comp || q.company === comp) && (!subj || q.subject === subj));
    if (!pool.length) { alert("這個條件下沒有題目，請換個科目試試。"); return; }
    pool = pool.slice().sort(() => Math.random() - 0.5);
    const n = wanted === "all" ? pool.length : Math.min(Number(wanted), pool.length);
    quiz = {
      questions: pool.slice(0, n),
      answers: new Array(n).fill(null),
      cur: 0,
      startedAt: Date.now(),
      comp, subj
    };
    $("#quizSetupBox").style.display = "none";
    $("#quizHistoryBox").style.display = "none";
    $("#quizStage").style.display = "block";
    $("#quizResult").style.display = "none";
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const { questions, answers, cur } = quiz;
    const q = questions[cur];
    const c = companyMap[q.company];
    $("#quizProgressFill").style.width = ((cur + 1) / questions.length * 100) + "%";
    $("#quizMetaLeft").textContent = `第 ${cur + 1} / ${questions.length} 題`;
    $("#quizMetaRight").textContent = `${c.name}・${q.roc != null ? "民國 " + q.roc + " 年" : "共通考點"}・${q.subject}`;
    $("#quizQText").textContent = q.question;
    $("#quizOptions").innerHTML = q.options.map((o, j) =>
      `<button class="quiz-opt ${answers[cur] === j ? "selected" : ""}" data-j="${j}">(${LETTERS[j]}) ${esc(o)}</button>`
    ).join("");
    $$("#quizOptions .quiz-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        answers[cur] = Number(btn.dataset.j);
        $$("#quizOptions .quiz-opt").forEach(b => b.classList.toggle("selected", b === btn));
      });
    });
    $("#quizPrev").disabled = cur === 0;
    $("#quizNext").textContent = cur === questions.length - 1 ? "交卷" : "下一題 →";
  }

  $("#quizPrev").addEventListener("click", () => { if (quiz.cur > 0) { quiz.cur--; renderQuizQuestion(); } });
  $("#quizNext").addEventListener("click", () => {
    if (quiz.cur < quiz.questions.length - 1) { quiz.cur++; renderQuizQuestion(); }
    else finishQuiz();
  });
  $("#quizQuit").addEventListener("click", () => {
    if (confirm("確定要放棄這次測驗嗎？")) resetQuizView();
  });

  function finishQuiz() {
    const unanswered = quiz.answers.filter(a => a === null).length;
    if (unanswered > 0 && !confirm(`還有 ${unanswered} 題沒作答，要直接交卷嗎？`)) return;
    const { questions, answers } = quiz;
    const correct = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
    const score = Math.round(correct / questions.length * 100);
    const secs = Math.round((Date.now() - quiz.startedAt) / 1000);
    const timeStr = secs >= 60 ? `${Math.floor(secs / 60)} 分 ${secs % 60} 秒` : `${secs} 秒`;

    saveHistory({
      date: new Date().toLocaleString("zh-TW", { hour12: false }),
      comp: quiz.comp ? companyMap[quiz.comp].name : "綜合",
      subj: quiz.subj || "全部科目",
      total: questions.length, correct, score
    });

    $("#quizStage").style.display = "none";
    const res = $("#quizResult");
    res.style.display = "block";
    res.innerHTML = `
      <div class="score-card">
        <div class="score-ring" style="--pct:${score}">
          <div class="score-num">${score}</div>
          <div class="score-label">分</div>
        </div>
        <div class="score-stats">
          <span>答對 <b>${correct}</b> / ${questions.length} 題</span>
          <span>用時 <b>${timeStr}</b></span>
        </div>
        <div style="margin-bottom:28px">
          <button class="btn btn-primary" id="quizAgain">再測一次</button>
          <button class="btn btn-ghost" id="quizBack">回測驗設定</button>
        </div>
        <h3 style="text-align:left;margin-bottom:12px">逐題檢討</h3>
        ${questions.map((q, i) => {
          const my = answers[i];
          const right = my === q.answer;
          return `
          <div class="review-item ${right ? "right" : "wrong"}">
            <div class="rv-head">${right ? '<span class="ok">✔ 答對</span>' : '<span class="bad">✘ 答錯</span>'}　<span style="color:var(--text-dim)">${esc(companyMap[q.company].name)}・${q.roc != null ? "民國 " + q.roc + " 年" : "共通考點"}・${esc(q.subject)}</span></div>
            <div class="rv-q">${i + 1}. ${esc(q.question)}</div>
            <div class="rv-detail">
              你的答案：${my === null ? "<i>未作答</i>" : `<span class="${right ? "ans-ok" : "ans-bad"}">(${LETTERS[my]}) ${esc(q.options[my])}</span>`}<br>
              正確答案：<span class="ans-ok">(${LETTERS[q.answer]}) ${esc(q.options[q.answer])}</span>
              ${q.explanation ? `<br>解析：${esc(q.explanation)}` : ""}
            </div>
          </div>`;
        }).join("")}
      </div>`;
    $("#quizAgain").addEventListener("click", () => { resetQuizView(); startQuiz(); });
    $("#quizBack").addEventListener("click", resetQuizView);
    window.scrollTo({ top: 0 });
  }

  function resetQuizView() {
    $("#quizStage").style.display = "none";
    $("#quizResult").style.display = "none";
    $("#quizSetupBox").style.display = "block";
    $("#quizHistoryBox").style.display = "block";
    renderHistory();
  }

  /* 歷史成績（存在瀏覽器） */
  const HIST_KEY = "metroExamHistory";
  function saveHistory(rec) {
    try {
      const list = JSON.parse(localStorage.getItem(HIST_KEY) || "[]");
      list.unshift(rec);
      localStorage.setItem(HIST_KEY, JSON.stringify(list.slice(0, 30)));
    } catch (e) { /* 無痕模式可能無法儲存，略過 */ }
  }
  function renderHistory() {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); } catch (e) {}
    const box = $("#quizHistoryBox");
    if (!list.length) {
      box.innerHTML = `
        <h3 style="margin:34px 0 10px">📋 歷史成績</h3>
        <p style="color:var(--text-dim);font-size:0.9rem">還沒有測驗紀錄。完成一次測驗後，成績會自動記錄在這裡（只存在這台裝置的瀏覽器）。</p>`;
      return;
    }
    box.innerHTML = `
      <h3 style="margin:34px 0 10px">📋 歷史成績（只存在這台裝置的瀏覽器）</h3>
      <p style="color:var(--text-dim);font-size:0.85rem;margin-bottom:8px">共 ${list.length} 筆紀錄　<button id="clearHistory" class="reveal-btn" style="padding:4px 12px">清除紀錄</button></p>
      <table class="history-table">
        <tr><th>時間</th><th>範圍</th><th>科目</th><th>成績</th></tr>
        ${list.map(r => `<tr><td>${esc(r.date)}</td><td>${esc(r.comp)}</td><td>${esc(r.subj)}</td><td><b>${r.score}</b> 分（${r.correct}/${r.total}）</td></tr>`).join("")}
      </table>`;
    const clr = $("#clearHistory");
    if (clr) clr.addEventListener("click", () => {
      if (confirm("確定要清除所有測驗成績紀錄嗎？")) {
        try { localStorage.removeItem(HIST_KEY); } catch (e) {}
        renderHistory();
      }
    });
  }

  /* ===== 官方資源 ===== */
  function renderResources() {
    $("#resourceList").innerHTML = DATA.companies.map(c => `
      <div class="res-company" id="res-${c.id}" style="--cc:${c.color}">
        <div class="res-company-head">
          <div>
            <h3>${esc(c.name)}（${esc(c.fullName)}）</h3>
            <div class="res-note">${esc(c.archiveNote)}　<a href="${esc(c.archiveUrl)}" target="_blank" rel="noopener">官方入口 ↗</a></div>
          </div>
        </div>
        ${c.id === "krtc" ? `
        <div class="krtc-notice">
          <h3>⚠ 高雄捷運沒有公開考古題</h3>
          <p>高捷招募採「隨缺隨招」，透過 104／1111 人力銀行應徵，筆試由高捷自辦且<b>不對外公布試題</b>，因此本站沒有收錄高捷真題（我們不編造假題）。
          高捷筆試共同科目固定為<b>國文、英文、邏輯分析</b>，題型與北捷、桃捷、中捷相近——建議到「測驗專區」選「綜合測驗」練習這幾科。</p>
        </div>` : ""}
        ${c.years.map(y => `
          <div class="year-block">
            <h4>民國 ${y.roc} 年（${y.year}）｜${esc(y.examName)}</h4>
            <div class="yb-meta">辦理單位：${esc(y.organizer)}<br>主要類組：${esc(y.categories)}<br>考試科目：${esc(y.subjects)}</div>
            <ul>
              ${y.links.map(l => `<li>📄 <a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title)}</a>${l.verified ? "" : ' <span class="link-warn">（連結可能失效，請改由官方入口進入）</span>'}</li>`).join("")}
            </ul>
          </div>`).join("")}
      </div>`).join("");
  }

  /* ===== 到訪人次計數器 ===== */
  // 起始基數 653：display = OFFSET + 線上計數值，讓第一位真實訪客看到 653，之後逐次 +1
  const COUNTER = {
    api: "https://abacus.jasoncameron.dev",
    ns: "taiwan-metro-exam-2026",
    key: "visitors",
    offset: 650  // 校準基數：線上實際值 + offset = 顯示人次，開站時顯示 653
  };
  function initCounter() {
    const el = $("#visitorCount");
    if (!el) return;
    const counted = sessionStorage.getItem("metroVisited");
    const endpoint = counted ? "get" : "hit";
    fetch(`${COUNTER.api}/${endpoint}/${COUNTER.ns}/${COUNTER.key}`)
      .then(r => r.json())
      .then(d => {
        if (typeof d.value !== "number") throw new Error("bad");
        if (!counted) sessionStorage.setItem("metroVisited", "1");
        const total = COUNTER.offset + d.value;
        localStorage.setItem("metroVisitorCache", total);
        el.textContent = total.toLocaleString("en-US");
      })
      .catch(() => {
        // 計數服務連不上時，顯示上次記得的數字或基數，不讓畫面壞掉
        const cached = localStorage.getItem("metroVisitorCache");
        el.textContent = (cached ? Number(cached) : 653).toLocaleString("en-US");
      });
  }

  /* ===== 啟動 ===== */
  initCounter();
  renderCompanyCards();
  initFilters();
  applyFilters();
  initQuizSetup();
  renderHistory();
  renderResources();
  showView("home");
})();
