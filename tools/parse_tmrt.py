#!/usr/bin/env python3
"""解析台中捷運官方試題 PDF（題目 + 末尾答案對照表）"""
import re, json, subprocess
from pathlib import Path
from collections import Counter, defaultdict

RAW = Path(__file__).resolve().parent.parent / "raw" / "tmrt"
OUT = Path(__file__).resolve().parent.parent / "raw" / "parsed_tmrt.json"
FIGURE = re.compile(r"(如圖|下圖|上圖|附圖|右圖|左圖|圖所示|如下圖|如右|電路圖|波形)")

def pdf_text(p):
    return subprocess.run(["pdftotext","-layout",str(p),"-"],capture_output=True).stdout.decode("utf-8","replace")

def despace(s):
    """中捷 PDF 每字間有空白 → 移除中文字之間的單一空格，保留英數字間空格"""
    # 反覆移除「中文 空格 中文」中的空格
    for _ in range(3):
        s = re.sub(r"([一-鿿，。、：；？！「」『』（）()／·－])\s+([一-鿿，。、：；？！「」『』（）()／·－])", r"\1\2", s)
    s = re.sub(r"[ \t]+", " ", s)
    return s

def parse_answer_table(text):
    """擷取末尾『題號 答案』對照表 → {題號:字母}"""
    ans = {}
    tail = text[text.rfind("題號")-5:] if "題號" in text else ""
    for m in re.finditer(r"(?<!\d)(\d{1,2})\s+([A-D])(?![A-Za-z])", tail):
        n = int(m.group(1))
        if 1 <= n <= 60 and n not in ans:
            ans[n] = "ABCD".index(m.group(2))
    return ans

def parse_inline_answers(text):
    """114 年格式：每題題號前有答案字母，如『A 48. 題目』→ {題號:idx}"""
    ans = {}
    for m in re.finditer(r"(?:^|\n)\s*([A-D])\s+(\d{1,2})\.\s", text):
        n = int(m.group(2))
        if 1 <= n <= 60 and n not in ans:
            ans[n] = "ABCD".index(m.group(1))
    return ans

def detect_subject_paper(text):
    head = despace(text[:900]).replace("\n", "")
    if "語文科目" in head:
        return "語文科目(國文、英文)"
    if "綜合科目" in head or "數理邏輯" in head:
        return "綜合科目【數理邏輯、捷運常識】"
    # 專業科目：XXX / 專業科目 - XXX / 共同科目：XXX，到「測驗時間/考試時間/注意事項」為止
    m = re.search(r"(?:專業科目|共同科目)\s*[-－：:]\s*([^\n]+?)(?:測驗時間|考試時間|—|注意事項|甄試類科|應試類科)", head)
    if m:
        return re.sub(r"\s+", "", m.group(1))
    return "專業科目"

def classify(raw, stem, opts):
    blob = stem + " " + " ".join(opts)
    def ascii_ratio(s):
        s=s or " "; return sum(c<chr(128) for c in s)/len(s)
    if "語文" in raw or ("國文" in raw and "英文" in raw):
        return "英文" if ascii_ratio(blob) > 0.55 else "國文"
    if "綜合" in raw or ("數理" in raw):
        law = re.search(r"(捷運|大眾運輸|主管機關|罰鍰|運價|票價|旅客|乘客|路權|車站|月台|軌道|運輸|號誌|站務|博愛|營運)", blob)
        math = re.search(r"(多少|幾[個天人題分歲種次站張枝顆位元]|機率|平均|倍|％|%|公尺|公里|公分|分鐘|數列|方程|餘數|質數|面積|體積|邏輯|推理|規律|排列|至少|大於|小於)", blob)
        if law and not math: return "捷運法規及常識"
        if math and not law: return "數理邏輯"
        return "捷運法規及常識" if law else "數理邏輯"
    # 專業科目：取代碼後文字
    raw2 = re.sub(r"^\d+", "", raw).strip()
    return raw2 or "專業科目"

def parse_file(p):
    name = p.stem
    roc = int(name.split("_")[0])
    text = pdf_text(p)
    raw_subject = detect_subject_paper(text)
    answers = parse_answer_table(text)
    inline = False
    if not answers:
        answers = parse_inline_answers(text)
        inline = True
    if not answers:
        return [], "無答案表"
    # 移除答案表區段，避免把對照表當題目
    cut = text.rfind("題號")
    body = text[:cut] if cut > 200 else text
    body = despace(body)
    # 114 格式：移除每題題號前的答案字母，避免干擾切題
    if inline:
        body = re.sub(r"(^|\n)\s*[A-D]\s+(\d{1,2})\.\s", r"\1\2. ", body)
    # 切題：N. ... 直到下一個 N.
    qpat = re.compile(r"(?:^|\n)\s*(\d{1,2})\.\s", re.M)
    marks = list(qpat.finditer(body))
    out = []
    for i, mk in enumerate(marks):
        n = int(mk.group(1))
        seg = body[mk.end(): marks[i+1].start() if i+1 < len(marks) else len(body)]
        seg = seg.strip()
        if n not in answers: continue
        # 找 (A)(B)(C)(D)
        pa = seg.find("(A)");
        if pa < 0: pa = seg.find("（A）")
        if pa < 0: continue
        stem = seg[:pa].strip()
        opt_text = seg[pa:]
        parts = re.split(r"[(（]([A-D])[)）]", opt_text)
        # parts: ['', 'A', '...', 'B', '...', ...]
        od = {}
        for j in range(1, len(parts)-1, 2):
            od[parts[j]] = parts[j+1].strip().rstrip("。").strip()
        if not all(k in od for k in "ABCD"): continue
        opts = [od["A"], od["B"], od["C"], od["D"]]
        stem = re.sub(r"\s+", " ", stem).strip()
        if len(stem) < 4: continue
        if FIGURE.search(stem): continue
        if "�" in stem or any(not o for o in opts): continue
        if any(0xE000 <= ord(c) <= 0xF8FF for c in stem+''.join(opts)): continue
        subject = classify(raw_subject, stem, opts)
        out.append({
            "company":"tmrt","roc":roc,"subject":subject,
            "question":stem,"options":opts,"answer":answers[n],
            "source":"https://recruit.tmrt.com.tw/Recruit/PastYearQuestions/Exam",
            "paper":raw_subject
        })
    return out, f"{raw_subject[:18]} 收{len(out)}"

def main():
    allq=[]; rep=[]
    for p in sorted(RAW.glob("*.pdf")):
        try: qs,msg=parse_file(p)
        except Exception as e: rep.append(f"{p.name} ERR {e}"); continue
        allq.extend(qs); rep.append(f"{p.name[:30]:30s} {msg}")
    # 去重
    seen=set(); ded=[]
    for q in allq:
        k=(q["roc"],q["question"][:50],q["options"][0][:25])
        if k in seen: continue
        seen.add(k); ded.append(q)
    OUT.write_text(json.dumps(ded,ensure_ascii=False,indent=1))
    print("\n".join(rep))
    print(f"\n總 {len(allq)} 去重後 {len(ded)} → {OUT.name}")
    for (roc,s),n in sorted(Counter((q["roc"],q["subject"]) for q in ded).items()):
        print(f"  {roc} {s}: {n}")

if __name__=="__main__": main()
