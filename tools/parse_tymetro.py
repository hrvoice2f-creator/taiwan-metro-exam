#!/usr/bin/env python3
"""解析桃園捷運官方試題 PDF（答案內嵌於題號後）
格式：N. (答案字母)題目 (A)選項 (B)選項 (C)選項 (D)選項
共同科目卷含國文/英文/邏輯/大眾捷運概論四科 → 靠內容分科
"""
import re, json, subprocess
from pathlib import Path
from collections import Counter

RAW = Path(__file__).resolve().parent.parent / "raw" / "tymetro"
OUT = Path(__file__).resolve().parent.parent / "raw" / "parsed_tymetro.json"
FIGURE = re.compile(r"(如圖|下圖|上圖|附圖|右圖|左圖|圖所示|電路圖|波形|如下圖)")

# 檔名(Google Drive id)→ (roc, 卷別)
FILES = {
    "1qUFGqpyfrtYWvs3sPVMErk2ip8GzLOM9.bin": (110, "共同科目"),
    "1q4uC759pse4RO07wukg-mshsEl84EB-V.bin": (110, "大眾捷運概論"),
    "1IR5TXdR9ZOeQYIvrvHhbKX6OpERdUG2q.bin": (110, "基本電學"),
}

def pdf_text(p):
    return subprocess.run(["pdftotext","-layout",str(p),"-"],capture_output=True).stdout.decode("utf-8","replace")

def ascii_ratio(s):
    s = s or " "
    return sum(ord(c) < 128 for c in s) / len(s)

def classify(stem, opts):
    blob = stem + " " + " ".join(opts)
    if ascii_ratio(blob) > 0.5:
        return "英文"
    if re.search(r"(桃園捷運|機場捷運|大眾捷運|捷運系統|月台|站體|運量|班距|路權|軌距|號誌|運價|票價|旅客|列車|轉乘|BOT|運輸)", blob):
        return "大眾捷運概論"
    if re.search(r"(多少|幾[個天人題分歲種次站張枝顆位元車]|機率|平均|倍|％|%|公尺|公里|公分|分鐘|數列|方程|餘數|質數|面積|體積|邏輯|推論|推理|規律|排列|至少|大於|小於|薪水|元)", blob):
        return "邏輯分析"
    return "國文"

def parse_file(path, roc, paper):
    text = pdf_text(path)
    # 去頁首/頁尾雜訊行
    text = re.sub(r"頁次：[0-9-]+", "", text)
    # 切題：行首 N.
    qpat = re.compile(r"(?:^|\n)\s*(\d{1,2})\.\s*", re.M)
    marks = list(qpat.finditer(text))
    # 找第1題起點（避免抓到說明文字裡的編號）
    out = []
    for i, mk in enumerate(marks):
        n = int(mk.group(1))
        if n < 1 or n > 50: continue
        seg = text[mk.end(): marks[i+1].start() if i+1 < len(marks) else len(text)]
        # 答案：題幹最前面的 (X)
        ma = re.match(r"\s*[(（]([A-D])[)）]\s*", seg)
        if not ma: continue
        ans = "ABCD".index(ma.group(1))
        rest = seg[ma.end():]
        # 找選項 (A)(B)(C)(D)：取從第一個 (A) 開始
        pa = rest.find("(A)")
        if pa < 0: pa = rest.find("（A）")
        if pa < 0: continue
        stem = rest[:pa]
        opt_text = rest[pa:]
        parts = re.split(r"[(（]([A-D])[)）]", opt_text)
        od = {}
        for j in range(1, len(parts)-1, 2):
            od[parts[j]] = parts[j+1]
        if not all(k in od for k in "ABCD"): continue
        # 清理（合併換行、去多餘空白）
        def cl(s):
            s = re.sub(r"\s+", " ", s).strip()
            return s.rstrip("。").strip()
        stem = cl(stem)
        opts = [cl(od[k]) for k in "ABCD"]
        if len(stem) < 4 or any(not o for o in opts): continue
        if FIGURE.search(stem): continue
        if "�" in stem or any(0xE000 <= ord(c) <= 0xF8FF for c in stem+"".join(opts)): continue
        subject = paper if paper != "共同科目" else classify(stem, opts)
        out.append({
            "company":"tymetro","roc":roc,"subject":subject,
            "question":stem,"options":opts,"answer":ans,
            "source":"https://www.tymetro.com.tw/tymetro-new/tw/_pages/news/12",
            "paper":paper
        })
    return out

def main():
    allq=[]
    for fn,(roc,paper) in FILES.items():
        p = RAW/fn
        if not p.exists():
            print("缺檔:", fn); continue
        qs = parse_file(p, roc, paper)
        allq.extend(qs)
        print(f"{fn[:20]} {paper} 收 {len(qs)}")
    seen=set(); ded=[]
    for q in allq:
        k=(q["roc"],q["question"][:50],q["options"][0][:25])
        if k in seen: continue
        seen.add(k); ded.append(q)
    OUT.write_text(json.dumps(ded,ensure_ascii=False,indent=1))
    print(f"\n總 {len(allq)} 去重後 {len(ded)} → {OUT.name}")
    for (roc,s),n in sorted(Counter((q["roc"],q["subject"]) for q in ded).items()):
        print(f"  {roc} {s}: {n}")

if __name__=="__main__": main()
