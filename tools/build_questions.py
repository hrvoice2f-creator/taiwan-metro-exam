#!/usr/bin/env python3
"""合併所有題庫 → questions.js（window.EXAM_QUESTIONS）
來源：北捷/中捷/桃捷 PDF 解析 + 原本精選 65 題（有詳解，優先保留）
去重：同公司同題幹同首選項視為重複；保留有 explanation 的版本
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "raw"

def load(name):
    p = RAW / name
    return json.loads(p.read_text()) if p.exists() else []

curated = load("curated.json")   # 已是最終欄位格式（含 explanation）
trtc = load("parsed_trtc.json")
tmrt = load("parsed_tmrt.json")
tym  = load("parsed_tymetro.json")

def norm(s):
    return re.sub(r"\s+", "", s or "")[:60]

# 先放精選（有詳解），再放 PDF 題；去重時精選優先
merged = {}
def add(q, curated=False):
    key = (q["company"], norm(q["question"]), norm(q["options"][0]))
    if key in merged:
        # 已存在：若新的是精選(有解析)且舊的沒有 → 取代
        if curated and not merged[key].get("explanation"):
            merged[key] = q
        return
    merged[key] = q

for q in curated:
    q.setdefault("explanation", "")
    add(q, curated=True)
for bank in (trtc, tmrt, tym):
    for q in bank:
        q.pop("paper", None)
        q.setdefault("explanation", "")
        add(q, curated=False)

final = list(merged.values())

# 清理：移除題幹開頭殘留的「請閱讀下文，並作答以下 N 題：」這類無附文無法作答的孤兒題
def is_orphan(q):
    s = q["question"]
    if re.search(r"(閱讀下文|閱讀下列|根據下文|閱讀以下|請依下文|閱讀本文).{0,15}(回答|作答|completing|following)", s) and len(s) < 40:
        return True
    return False
final = [q for q in final if not is_orphan(q)]

# 排序：公司、年度、科目
order = {"trtc":0,"tymetro":1,"tmrt":2,"krtc":3}
final.sort(key=lambda q:(order.get(q["company"],9), -(q["roc"] or 0), q["subject"]))

OUT = ROOT / "questions.js"
js = "// 捷運招考題庫（程式解析自各公司官方公開試題 PDF + 精選詳解題）\n"
js += "// 每題：company, roc(民國年), subject, question, options[4], answer(0-3), explanation, source\n"
js += "window.EXAM_QUESTIONS = " + json.dumps(final, ensure_ascii=False, separators=(",",":")) + ";\n"
OUT.write_text(js)

from collections import Counter
print(f"合併後共 {len(final)} 題 → questions.js（{OUT.stat().st_size//1024} KB）")
for c,n in Counter(q["company"] for q in final).most_common():
    print(f"  {c}: {n}")
print("科目分布：")
for s,n in Counter(q["subject"] for q in final).most_common(15):
    print(f"  {s}: {n}")
print("有詳解題數：", sum(1 for q in final if q.get("explanation")))
