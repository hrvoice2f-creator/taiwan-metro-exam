#!/usr/bin/env python3
"""解析北捷官方「含答案」試題 PDF → JSON 題庫
卷面格式：N. [ ] 【答案】 題目 (1)選項 (2)選項 (3)選項 (4)選項
"""
import re, json, subprocess, sys, unicodedata
from pathlib import Path

RAW = Path(__file__).resolve().parent.parent / "raw" / "trtc"
OUT = Path(__file__).resolve().parent.parent / "raw" / "parsed_trtc.json"

HEADER_PAT = re.compile(
    r"(臺北捷運公司|甄試試題|請務必填寫姓名|應考編號|Ans\.|選擇題：每題|背面尚有試題|"
    r"^第\s*\d+\s*頁|^\s*-\s*\d+\s*-\s*$|共\s*\d+\s*頁)"
)
Q_START = re.compile(r"^\s*(\d{1,2})\.\s*\[\s*\]\s*【([^】]{1,6})】\s*(.*)$")
FIGURE_PAT = re.compile(r"(如圖|下圖|上圖|附圖|右圖|左圖|圖所示|圖\(一\)|如附表|下表|如下電路)")

def pdf_text(p: Path) -> str:
    r = subprocess.run(["pdftotext", "-layout", str(p), "-"], capture_output=True)
    return r.stdout.decode("utf-8", errors="replace")

def clean(s: str) -> str:
    s = s.replace("　", " ")
    # 全形選項括號 →半形，統一解析
    s = re.sub(r"（(\d)）", r"(\1)", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def split_options(body: str):
    """從題目本文找出 (1)~(4) 選項；回傳 (題幹, [四個選項]) 或 None"""
    # 找出依序遞增的 (1)(2)(3)(4) 位置（取最後一組完整序列，避開題幹中夾雜的 (1)）
    pos = {}
    ok = True
    idx = len(body)
    # 由後往前找 (4)，再往前找 (3)... 確保順序
    p4 = body.rfind("(4)")
    if p4 < 0: return None
    p3 = body.rfind("(3)", 0, p4)
    if p3 < 0: return None
    p2 = body.rfind("(2)", 0, p3)
    if p2 < 0: return None
    p1 = body.rfind("(1)", 0, p2)
    if p1 < 0: return None
    stem = clean(body[:p1])
    opts = [clean(body[p1+3:p2]), clean(body[p2+3:p3]), clean(body[p3+3:p4]), clean(body[p4+3:])]
    opts[-1] = re.sub(r"。\s*$", "", opts[-1])
    if any(not o for o in opts): return None
    return stem, opts

def is_garbled(s: str) -> bool:
    if "�" in s: return True
    # 私用區字元（字型對不到，常見於數學符號）
    return any(0xE000 <= ord(c) <= 0xF8FF for c in s)

def ascii_ratio(s: str) -> float:
    if not s: return 0
    n = sum(1 for c in s if ord(c) < 128)
    return n / len(s)

LAW_KW = re.compile(r"(大眾捷運法|主管機關|罰鍰|違約金|營運機構|路權|運價|票價|車票|旅客|乘客|捷運系統|捷運範圍|站務|閘門|博愛|電扶梯|寵物|禁止|攜帶|核准|許可|申請|規定|法規|條例)")
MATH_KW = re.compile(r"(多少|幾[個天人題分歲種次站張枝顆題位]|機率|平均|比例|倍|％|%|公尺|公里|公分|分鐘|小時|數列|方程|餘數|整數|奇數|偶數|質數|面積|體積|集合|邏輯|推理|規律|順序|排列)")

def split_comprehensive(items):
    """綜合科目卷：前段=數理邏輯、後段=捷運法規及常識，找最佳分界點"""
    flags = []  # 1=像法規, -1=像數理, 0=不確定
    for q in items:
        blob = q["stem"] + " " + " ".join(q["options"])
        law = bool(LAW_KW.search(blob))
        math = bool(MATH_KW.search(blob)) or sum(c.isdigit() for c in q["stem"]) >= 4
        flags.append(1 if (law and not math) else (-1 if (math and not law) else (1 if law else 0)))
    best_b, best_cost = 0, 10**9
    for b in range(len(items) + 1):
        cost = sum(1 for f in flags[:b] if f == 1) + sum(1 for f in flags[b:] if f == -1)
        if cost < best_cost:
            best_b, best_cost = b, cost
    return ["數理邏輯" if i < best_b else "捷運法規及常識" for i in range(len(items))]

def parse_file(path: Path):
    m = re.match(r"(\d{3})_", path.name)
    roc = int(m.group(1)) if m else None
    paper = re.sub(r"^\d{3}_\d*_?", "", path.stem)
    text = pdf_text(path)
    lines = [ln.rstrip() for ln in text.splitlines()]
    # 收集題目區塊
    blocks = []  # (qnum, ans_raw, body_lines)
    cur = None
    for ln in lines:
        if HEADER_PAT.search(ln) and not Q_START.match(ln):
            continue
        m = Q_START.match(ln)
        if m:
            if cur: blocks.append(cur)
            cur = [int(m.group(1)), m.group(2).strip(), [m.group(3)]]
        elif cur is not None:
            if ln.strip() == "" :
                cur[2].append("")
            else:
                cur[2].append(ln.strip())
    if cur: blocks.append(cur)

    questions, skipped = [], {"圖表": 0, "亂碼": 0, "選項不全": 0, "特殊答案": 0}
    for qnum, ans_raw, body_lines in blocks:
        body = clean(" ".join(body_lines))
        if not re.fullmatch(r"[1-4]", ans_raw):
            skipped["特殊答案"] += 1; continue
        if FIGURE_PAT.search(body):
            skipped["圖表"] += 1; continue
        if is_garbled(body):
            skipped["亂碼"] += 1; continue
        so = split_options(body)
        if not so or len(so[0]) < 5:
            skipped["選項不全"] += 1; continue
        stem, opts = so
        questions.append({
            "qnum": qnum, "stem": stem, "options": opts,
            "answer": int(ans_raw) - 1
        })

    # 科目判定
    comp_subjects = None
    if "綜合科目" in paper:
        comp_subjects = split_comprehensive(questions)
    results = []
    for i, q in enumerate(questions):
        if "語文科目" in paper:
            # 英文題：題幹+選項以 ASCII 為主
            blob = q["stem"] + " " + " ".join(q["options"])
            subject = "英文" if ascii_ratio(blob) > 0.55 else "國文"
        elif "綜合科目" in paper:
            subject = comp_subjects[i]
        elif paper.startswith("英文") or "-英文" in paper:
            subject = "英文"
        else:
            # 檔名中科目：例 "07-114...技術專員(電子維修類)-電子學概要(答案)"
            mm = re.search(r"-([^-()]+?)(?:\(\d\))?\(答案\)$", paper)
            subject = mm.group(1) if mm else re.sub(r"\(答案\)|（答案）", "", paper.split("-")[-1])
            subject = subject.strip() or paper
        results.append({
            "company": "trtc", "roc": roc, "subject": subject,
            "question": q["stem"], "options": q["options"], "answer": q["answer"],
            "source": f"https://ssl.metro.taipei/workerdataV2/{roc}exam/list.htm",
            "paper": paper
        })
    return results, skipped

def main():
    all_q, report = [], []
    for p in sorted(RAW.glob("*.pdf")):
        try:
            qs, sk = parse_file(p)
        except Exception as e:
            report.append(f"{p.name[:50]:50s} 解析錯誤: {e}")
            continue
        all_q.extend(qs)
        sk_str = ", ".join(f"{k}{v}" for k, v in sk.items() if v)
        report.append(f"{p.name[:50]:50s} 收{len(qs):3d}題" + (f"（剔除 {sk_str}）" if sk_str else ""))
    # 去重（同年度同題幹同選項）
    seen, deduped = set(), []
    for q in all_q:
        key = (q["roc"], q["question"][:60], q["options"][0][:30])
        if key in seen: continue
        seen.add(key)
        deduped.append(q)
    OUT.write_text(json.dumps(deduped, ensure_ascii=False, indent=1))
    print("\n".join(report))
    print(f"\n總計 {len(all_q)} 題，去重後 {len(deduped)} 題 → {OUT.name}")
    # 科目統計
    from collections import Counter
    c = Counter((q["roc"], q["subject"]) for q in deduped)
    for (roc, subj), n in sorted(c.items()):
        print(f"  {roc} {subj}: {n}")

if __name__ == "__main__":
    main()
