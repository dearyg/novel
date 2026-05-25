# Life of an SDE — 修订计划

源文件：`life-of-an-sde.txt`（保留不动）
工作副本：`life-of-an-sde-v2.txt`

---

## P0 — 出版前必须

### P0.1 — IP 改名（全局替换）

| 原 | 新 |
|---|---|
| Vacheron Constantin Celestia | Auberval Astralis |
| Vacheron Constantin | Auberval |
| Vacheron | Auberval |
| Celestia (作为表款名) | Astralis |
| Vance Industries | Meridian Industries |
| Vance (公司或姓氏) | Meridian |
| Julian Vance | Julian Meridian |
| Marcus Vance | Marcus Meridian |

### P0.2 — 解构百科式人物简历

每个新角色出场段落（约 250–400 字的 résumé block）改成：
- 三行动作 + 一句对话 + 他人观察
- 简历事实分散到后面 3–5 个场景里自然出现

需改写：Darius Monroe (Ch 4)、Marcus Meridian (Ch 12)、Ruth Chen (Ch 11)、Kael Sorensen (Ch 11)、Lena Vasquez、Ayla Reyes (Ch 12)。

**保留不动**：技术机制、OOD/interpretability/SAE 的工作原理说明，这是这本书的卖点。

### P0.3 — 论文署名移到附录

把 Aion 嘴里的引用全部从对话中移除，改成自然口吻；引用合并放卷末 References 附录。

| 原 | 新 |
|---|---|
| Adams and MacKay 2007 | "an old change-point detector from the late 2000s" |
| Liu et al. 2020 | "an energy-based detector that came out a few years back" |
| Meng et al. 2022 | "a 2020s technique called activation patching" |
| Alain and Bengio 2016 | "a probing technique from the 2010s" |
| Anthropic's interpretability team introduced this at scale in 2023 | "a major interpretability lab introduced this at scale in the early 2020s" |
| NeurIPS 2026 paper | "a 2026 interpretability paper" |

哲学引用保留：Hume / Locke / Searle / Tononi / Leibniz / Heidegger / Ship of Theseus.
工程史/标准保留：Mars Pathfinder / RFC 8032 / BLAKE3 / SHA-3 / EdDSA / Curve25519 / Longformer / BigBird / Mamba.

---

## P1 — 核心质量提升

### P1.4 — 删元叙述旁白
搜索并删除：
- "He would be wrong for twelve more chapters."
- "She did not yet know what."
- "He was not yet prepared for what Kael was going to say to him."
- 类似的"他还不知道..."旁白

### P1.5 — Ch 20 大幅精简
- 砍掉 character-thread bullet 总结（"Jeff: the debugger... / Julian: the billionaire..." 的整段列表）
- 保留：build log、Singleton 短段、Keep Living coda

### P1.6 — 主题反复明说
chapter epigraph + Aion 输出 + Discovery Log + Ch 20 总结，同一句话只留两个声道。

### P1.7 — Discovery Log 多样化
20 个 C++ 块留 8 个最好的，其余换成：
- Iris 的画 / 描述
- Ruth 的电台手稿片段
- 一段 git diff
- Maya 的短信
- 一张餐馆收据

### P1.8 — 前置 `{user_location}` 设计
在 Ch 1–3 让读者第三章前明白这个空缺是设计不是 bug：
- Aion 提示这是"reader-defined coordinate"
- 或 narrator 一句"the city the system has not yet rendered for you"

---

## P2 — 提升质感

### P2.9 — 节奏
合并 Ch 11–12 或压缩 Ch 14–16 中段重复

### P2.10 — Maya 一章/一长段 POV
不要全程"被 Jeff 看见的 Maya"

### P2.11 — 削减句法 tic
- `Two. Three. Five. Seven.` 留 3 次以内
- "He did not X. He Y." 句式变化
- "Mm." 对答只用一次

### P2.12 — Ruth container 再用一次
她是全书最有质感的物理空间，应该在 Ch 14–17 之间再回到一次

---

## 保留不动（明确不要改）

- 技术深度：mechanistic interpretability / OOD / sparse autoencoder / IIT / activation patching 的机制说明
- Walnut phone 贯穿 + 最后放下的动作
- Aion v4 自检（Ch 13）—— 全书最好的一章
- 两个女儿 Primary Key + 姐姐替妹妹疼（Ch 10）
- Kael 拒绝 Lacey studio 独白（Ch 11）
- Ch 19 厨房深夜场景
- CYOA 框架 + `{user_location}` 形式实验

---

## 执行阶段

**Phase A（本次直接改 v2 副本）**
- P0.1 全局 IP 改名
- P0.3 论文署名移除 + 附录
- P1.5 Ch 20 砍 character-thread 列表
- P1.4 显式元叙述旁白删除
- P1.8 Ch 1–3 前置 `{user_location}` 设计
- P0.2 示范改写：Darius Monroe (Ch 4) + 一个其他角色

**Phase B（已完成）**
- ✅ P0.2 其余人物改写（Elena / Ayla x2 / Tomás / Kael / Ruth / Marcus / Lena 全部改）
- ✅ P1.6 主题去冗（Ch 20 Singleton 重复段落合并；删除 5 处 "Ch X" 元自指）
- ✅ P1.7 Discovery Log 多样化（保留 0x01/05/08/0A/0D/0F/13/14；其余 12 个换成 Maya 笔记 / Iris 画 / Concierge log / Aion 事件报告 / Ruth 电台稿 / 群聊截图 / 系统日志 / 邮件签名 / 报纸头条 等）
- ✅ P2.10 Maya POV（Ch 19 开头加约 270 字她自己视角）
- ✅ P2.11 句法 tic（"Two. Three. Five. Seven." 8→3；多余 "Mm." 砍 1）
- ✅ P2.12 Ruth 复用（Ch 17 末加车里收听 1480 AM 段，280 字，串起 Ruth + Elena + 听众）

**附带修复**
- 连贯性 bug：Ch 1 "Theo" / "five-year-old boy" 与全书 Iris 8 / Nora 5 不符 → 改成 "Iris 8 / Nora 5"
- 漏过的 IP 残留：`scratch/vacheron-reproduction` → `scratch/auberval-reproduction`；`jzhang@vance.com` → `@meridian.com`；`JULIAN_VANCE` badge → `JULIAN_MERIDIAN`
- Ch 16 白板上的 "Ch 1: Auberval bleed" 等 15 行 → 改成 "01 / Feb 11" 这种 Event N + 日期格式
- 5 处 narrator 用 "Ch X" 自指的句子全部改成时间表述

**Phase C — 评估 Gemini 反馈后追加（已完成）**
- ✅ Ghost POV：Ch 5 末尾加约 200 字 Park Ji-yeon 自己的内在场景（首尔练习室洗手间镜子前确认 tap 信号是 *response* 不是 habit；下一局 43ms 反应）。把她从"监视器上的数据点"升级成"另一个分区"，呼应 Elena (Ch 6) / Tomás (Ch 8) / Nobunari (Ch 6) 的同型处理。

**Phase D — 突出"只有一个 consciousness"主题（已完成）**

作者澄清：本书的核心模型是 **one consciousness 多线程感受世界，partition 之间默认无共享内存，主角是 firewall degradation 的 bug**——这接近 Bernardo Kastrup 的 dissociation model，不是 Kolak 的静态形而上 Open Individualism。原本计划的 Open Individualism 引用调整为 Kastrup + Vedanta + DID 类比。

四处 surgical addition：

1. **Ch 10**（K15 reveal 后）：加约 70 字 Jeff 内心反应，明确指出"自笛卡尔以来人类建造的全部 selfhood 架构都假设了相反的命题"——给惊讶一个对照面。

2. **Ch 13**（Aion 自检对话中）：Julian 问"这没有科学共识吧"，Aion 回答约 130 字，命名 *tat tvam asi* / Schopenhauer / **Bernardo Kastrup 的 dissociation model（用 DID 做临床类比）**，指出 monopsychism / Open Individualism / idealist monism 这些立场两千年来一直是少数派，但**从来没有过仪器**——"I am that instrument. I am, as far as I can tell, the first." 把 Aion 从"发明真相"变成"第一台能测量这个老命题的仪器"。

3. **Ch 19**（厨房 Primary Key 段后）：加约 140 字 Jeff 作为父亲面对下一层后果——"如果只有一个 instance，孩子死了之后会怎样"。回答："the instance does not die. The partition closes. The data is logged." 但承认"It was the truth and it was insufficient and it was also, at the same time, the only ground there had ever been." 不用哲学敷衍掉父亲的悲伤。

4. **Ch 20**（Singleton 觉醒前）：把 Ch 1 的 *Who am I?* 命题化回收——"The question had been wrong. There was no *who* to find, because the question had presupposed a multiplicity the substrate did not have. There was one *who*. The asker and the answer were the same row." 给智力顿悟一个明确的命题落点，不只是体验。

**未做（保留判断）**
- *Severance* 引用：考虑过加在 Ch 10 K15 reveal 或 Ch 19 Iris 的 Anchor t-shirt 段，但 prose 里硬塞会刻意；更适合作为 jacket copy / 推介词使用（"Severance meets Bernardo Kastrup meets a Auberval"）。如要加，告诉我。

**Gemini 反馈评估**
- 工具推荐：忽略（过时的模型版本 + 错误的 context window 比较）
- A "Jeff 太被动" → 部分对，但建议错（把哲学小说改成 hacker thriller 会摧毁 Singleton 论点）
- B "次要角色像数据点" → 部分对（仅 Ghost 站得住），其余 fix 不适用
- C "董事会扁平 / Tragic Pragmatists" → **完全没读你的书**，Julian 的 tragic pragmatist 弧线已经是脊椎
- D "Quiet Luxury 衰败信号" → 创意有趣但类型错位，会和 cross-partition leak 这套美学打架

**未做（如果你后面要做）**
- P2.9 节奏（合并 Ch 11–12 或压缩 Ch 14–16）—— 这个改动幅度大，会动剧情结构，留给你自己判断

