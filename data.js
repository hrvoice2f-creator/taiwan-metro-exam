// 台灣捷運招考考古題 題庫資料
// 題目來源：各捷運公司公開試題與網路公開題庫，僅供練習參考，正確內容以官方公布為準。
window.EXAM_DATA = {
  companies: [
    {
      id: "trtc",
      name: "台北捷運",
      fullName: "臺北大眾捷運股份有限公司",
      color: "#0070BD",
      tagline: "官方歷年試題專區完整公開",
      archiveUrl: "https://ssl.metro.taipei/workerdataV2/",
      archiveNote: "甄試網站內有各年度「試題與答案」專區（110～114 年）。",
      hasQuestions: true,
      years: [
        {
          roc: 114, year: 2025,
          examName: "114年新進人員甄試",
          organizer: "臺北大眾捷運股份有限公司（自辦）",
          categories: "行車專員、站務員、技術專員、工程員、專員、護理類",
          subjects: "國文、英文（語文科目合卷）、綜合科目（數理邏輯、捷運法規及常識）、各類專業科目",
          links: [
            { title: "114 年試題與答案專區", url: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm", verified: true },
            { title: "114 年甄試簡章（類科與考科一覽）", url: "https://ssl.metro.taipei/workerdataV2/downloads/114_info_c.pdf", verified: true }
          ]
        },
        {
          roc: 113, year: 2024,
          examName: "113年新進人員甄試",
          organizer: "臺北大眾捷運股份有限公司（自辦）",
          categories: "行車專員、技術專員、工程員、專員、站務員",
          subjects: "國文、英文、綜合科目（數理邏輯、捷運法規及常識）、各類專業科目",
          links: [
            { title: "113 年試題與答案專區", url: "https://ssl.metro.taipei/workerdataV2/113exam/list.htm", verified: true }
          ]
        },
        {
          roc: 112, year: 2023,
          examName: "112年新進人員甄試",
          organizer: "臺北大眾捷運股份有限公司（自辦）",
          categories: "司機員、隨車站務員、站務員、技術員、行控資訊員、控制員、工程員、專員",
          subjects: "國文、英文、綜合科目（數理邏輯、捷運法規及常識）、各類專業科目",
          links: [
            { title: "112 年試題與答案專區", url: "https://ssl.metro.taipei/workerdataV2/112exam/list.htm", verified: true }
          ]
        },
        {
          roc: 111, year: 2022,
          examName: "111年新進人員甄試",
          organizer: "臺北大眾捷運股份有限公司（自辦）",
          categories: "司機員、站務員、技術員、工程員、專員、控制員",
          subjects: "國文、英文、綜合科目（數理邏輯、捷運法規及常識）、各類專業科目",
          links: [
            { title: "111 年試題與答案專區", url: "https://ssl.metro.taipei/workerdataV2/111exam/list.htm", verified: true }
          ]
        },
        {
          roc: 110, year: 2021,
          examName: "110年新進人員甄試",
          organizer: "臺北大眾捷運股份有限公司（自辦）",
          categories: "司機員、站務員、技術員、工程員、專員",
          subjects: "國文、英文、綜合科目（數理邏輯、捷運法規及常識）、各類專業科目",
          links: [
            { title: "110 年試題與答案專區（請由甄試網站總入口進入）", url: "https://ssl.metro.taipei/workerdataV2/110exam/list.htm", verified: false }
          ]
        }
      ]
    },
    {
      id: "tymetro",
      name: "桃園捷運",
      fullName: "桃園大眾捷運股份有限公司",
      color: "#8246AF",
      tagline: "招募網公告試題，活動結束後可能下架",
      archiveUrl: "https://www.tymetro.com.tw/tymetro-new/tw/_pages/news/12",
      archiveNote: "桃捷官網未設固定考古題專區，試題多於各次招募活動公布（招募網 recruit.tymetro.com.tw 僅於招募期間開放）；110 年全套試題解答仍有公開備份可下載。",
      hasQuestions: true,
      years: [
        {
          roc: 114, year: 2025,
          examName: "114年度第一次／第二次新進人員招募甄試",
          organizer: "桃園大眾捷運股份有限公司（委託銘傳大學辦理）",
          categories: "維修類、運務類（站務員、司機員、票務）、經營管理類、身心障礙類",
          subjects: "共同科目（國文、英文、邏輯分析、大眾捷運概論及常識）、各類專業科目",
          links: [
            { title: "桃園捷運官網最新公告（招募訊息）", url: "https://www.tymetro.com.tw/tymetro-new/tw/_pages/news/12", verified: true },
            { title: "桃園捷運招募網站（僅招募期間開放）", url: "https://recruit.tymetro.com.tw/", verified: false }
          ]
        },
        {
          roc: 113, year: 2024,
          examName: "113年度第一次／第二次新進人員招募甄試",
          organizer: "桃園大眾捷運股份有限公司（委託銘傳大學辦理）",
          categories: "維修類、運務類、經營管理類、原住民類、身心障礙類",
          subjects: "共同科目（國文、英文、邏輯分析、大眾捷運概論及常識）、各類專業科目",
          links: [
            { title: "113 年度第二次招募甄試公告（官網）", url: "https://www.tymetro.com.tw/tymetro-new/tw/_pages/news/show-1999-1.html", verified: true }
          ]
        },
        {
          roc: 112, year: 2023,
          examName: "112年度第一次／第二次新進人員招募甄試",
          organizer: "桃園大眾捷運股份有限公司（委託銘傳大學辦理）",
          categories: "維修類、運務類、經營管理類、身心障礙類",
          subjects: "共同科目（國文、英文、邏輯分析、大眾捷運概論及常識）、各類專業科目",
          links: [
            { title: "112 年度第二次甄試簡章（銘傳大學試務網站）", url: "https://tymetro.mcu.edu.tw/", verified: false }
          ]
        },
        {
          roc: 111, year: 2022,
          examName: "111年度新進人員招募甄試",
          organizer: "桃園大眾捷運股份有限公司（委託銘傳大學辦理）",
          categories: "維修類、運務類、經營管理類、身心障礙類",
          subjects: "共同科目（國文、英文、邏輯分析、大眾捷運概論及常識）、各類專業科目",
          links: [
            { title: "桃園捷運官網最新公告（招募訊息）", url: "https://www.tymetro.com.tw/tymetro-new/tw/_pages/news/12", verified: true }
          ]
        },
        {
          roc: 110, year: 2021,
          examName: "110年度第一次新進人員招募甄試",
          organizer: "桃園大眾捷運股份有限公司（委託銘傳大學辦理）",
          categories: "維修類、運務類、經營管理類、資訊類、原住民類、身心障礙類",
          subjects: "共同科目（國文、英文、邏輯分析、大眾捷運概論及常識）、機械／電機／電子概論、基本電學、大眾捷運概論等",
          links: [
            { title: "110 年第一次招募 共同科目 試題及解答（備份）", url: "https://drive.google.com/file/d/1qUFGqpyfrtYWvs3sPVMErk2ip8GzLOM9/view?usp=sharing", verified: true },
            { title: "110 年第一次招募 大眾捷運概論（備份）", url: "https://drive.google.com/file/d/1q4uC759pse4RO07wukg-mshsEl84EB-V/view?usp=sharing", verified: true },
            { title: "110 年第一次招募 基本電學（備份）", url: "https://drive.google.com/file/d/1IR5TXdR9ZOeQYIvrvHhbKX6OpERdUG2q/view?usp=sharing", verified: true },
            { title: "110 年各科試題整理頁（5138 考神網）", url: "https://www.5138.com.tw/exam/exam-3709.html", verified: true }
          ]
        }
      ]
    },
    {
      id: "tmrt",
      name: "台中捷運",
      fullName: "臺中捷運股份有限公司",
      color: "#009A3E",
      tagline: "官方招募系統設有歷屆試題專區",
      archiveUrl: "https://recruit.tmrt.com.tw/Recruit/PastYearQuestions/Exam",
      archiveNote: "招募系統「歷屆試題」頁可切換期別（110、111、112、114 年），各類科提供共同科目與專業科目 PDF。",
      hasQuestions: true,
      years: [
        {
          roc: 114, year: 2025,
          examName: "114年度新進人員甄試／控制工程師甄試",
          organizer: "臺中捷運股份有限公司（委辦試務：松盟教育）",
          categories: "站務員、行控資訊員、助理工程師、技術員（電子電機／機械／資訊）、事務員、控制工程師",
          subjects: "語文科目（國文、英文）、綜合科目（數理邏輯、捷運常識含法規）、計算機概論、基本電學、機件原理等",
          links: [
            { title: "114 年新進人員甄試試題（官方歷屆試題專區）", url: "https://recruit.tmrt.com.tw/Recruit/PastYearQuestions/Exam?Period=11403", verified: true },
            { title: "114 年控制工程師甄試試題（官方歷屆試題專區）", url: "https://recruit.tmrt.com.tw/Recruit/PastYearQuestions/Exam?Period=11405", verified: true }
          ]
        },
        {
          roc: 112, year: 2023,
          examName: "112年度新進人員甄試",
          organizer: "臺中捷運股份有限公司",
          categories: "站務員（車務類）、技術員（電子電機／機械／土木／常年大夜班）",
          subjects: "語文科目（國文、英文）、綜合科目（數理邏輯、捷運常識含法規）、基本電學、機件原理、基礎工程力學",
          links: [
            { title: "112 年新進人員甄試試題（官方歷屆試題專區）", url: "https://recruit.tmrt.com.tw/Recruit/PastYearQuestions/Exam?Period=11201", verified: true },
            { title: "112 年各類科試題與答案（5138 整理頁）", url: "https://www.5138.com.tw/exam/exam-5749.html", verified: true }
          ]
        },
        {
          roc: 111, year: 2022,
          examName: "111年度新進人員甄試",
          organizer: "臺中捷運股份有限公司",
          categories: "站務員（車務類）、技術員（電子電機／機械）、事務員",
          subjects: "語文科目（國文、英文）、綜合科目（數理邏輯、捷運法規及常識）、基本電學、機件原理",
          links: [
            { title: "111 年新進人員甄試試題（官方歷屆試題專區）", url: "https://recruit.tmrt.com.tw/Recruit/PastYearQuestions/Exam?Period=11104", verified: true }
          ]
        },
        {
          roc: 110, year: 2021,
          examName: "110年公開招考",
          organizer: "臺中捷運股份有限公司",
          categories: "控制工程師、站務員、助理工程員、技術員、事務員",
          subjects: "語文科目（國文、英文）、綜合科目（數理邏輯、捷運法規及常識）、運輸規劃管理與實務、電路學、計算機概論等",
          links: [
            { title: "110 年公開招考試題（官方歷屆試題專區）", url: "https://recruit.tmrt.com.tw/Recruit/PastYearQuestions/Exam?Period=11004", verified: true },
            { title: "110 年各類科試題與答案（5138 整理頁）", url: "https://www.5138.com.tw/exam/exam-4222.html", verified: true }
          ]
        }
      ]
    },
    {
      id: "krtc",
      name: "高雄捷運",
      fullName: "高雄捷運股份有限公司",
      color: "#DC4405",
      tagline: "隨缺隨招，官方不公布考古題",
      archiveUrl: "https://corp.krtc.com.tw/News/recruit",
      archiveNote: "高捷採「隨缺隨招」，由 104／1111 人力銀行投遞應徵，筆試自辦且不對外公布試題。共同科目固定為國文、英文、邏輯分析（選擇題），與北捷、桃捷、中捷題型相近，建議用本站「綜合測驗」練習共同科目。",
      hasQuestions: false,
      years: [
        {
          roc: 114, year: 2025,
          examName: "新進人員甄試（隨缺隨招）",
          organizer: "高雄捷運股份有限公司（自辦，經 104／1111 人力銀行收件）",
          categories: "供電／號誌／軌道維修技術員、高雄輕軌列車駕駛等",
          subjects: "國文、英文、邏輯分析（輕軌列車駕駛另考機械原理大意）",
          links: [
            { title: "高雄捷運官方徵才資訊", url: "https://corp.krtc.com.tw/News/recruit", verified: true },
            { title: "高雄捷運歷史徵才訊息（可依年份查詢）", url: "https://corp.krtc.com.tw/News/recruit_history", verified: true }
          ]
        },
        {
          roc: 110, year: 2021,
          examName: "110～113 年新進人員甄試（隨缺隨招）",
          organizer: "高雄捷運股份有限公司（自辦）",
          categories: "列車駕駛（司機員）、站務員、各類維修技術員",
          subjects: "國文、英文、邏輯分析",
          links: [
            { title: "高雄捷運歷史徵才訊息", url: "https://corp.krtc.com.tw/News/recruit_history", verified: true }
          ]
        }
      ]
    }
  ],

  questions: [
    // ===== 台北捷運 114年（2025）國文 =====
    { company: "trtc", roc: 114, subject: "國文", question: "以下文句，何者沒有錯字？", options: ["只要在向前一步就能找到解決方法", "保持態度和藹可親比較容易贏得他人好感", "這罐髮油能解決頭髮毛躁問題", "那位藝人的行為對社會大眾產生重大引響"], answer: 1, explanation: "(A)應為「再」向前一步；(D)「引響」應為「影響」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "國文", question: "以下文句中的成語，何者用法正確？", options: ["國家圖書館汗牛充棟，入寶山豈能空手而歸", "這篇作文用詞流暢，沆瀣一氣，令人拍案叫絕", "他為人果敢，勇於代人捉刀，因此被評價為正義之士", "小陳與太太感情很好，可說是舐犢情深，令人羨慕"], answer: 0, explanation: "(B)「沆瀣一氣」為貶義（臭味相投）；(C)「代人捉刀」指代人作文；(D)「舐犢情深」指父母對子女之愛，非夫妻。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "國文", question: "以下文句，何者為「假設語氣」？", options: ["聖人之所以為聖，愚人之所以為愚，其皆出於此乎", "若亡鄭有益於君，敢以煩執事", "固知一死生為虛誕，齊彭殤為妄作", "先帝知臣謹慎，故臨崩寄臣以大事也"], answer: 1, explanation: "「若」為假設連詞，表「如果」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "國文", question: "下列何者屬於「編年體」史書？", options: ["《春秋》", "《戰國策》", "《史記》", "《漢書》"], answer: 0, explanation: "《春秋》依年月編排，為編年體；《戰國策》為國別體，《史記》《漢書》為紀傳體。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "國文", question: "先秦諸子中，提倡「兼愛」、「非攻」者為哪一家？", options: ["儒家", "道家", "墨家", "法家"], answer: 2, explanation: "「兼愛」「非攻」為墨家（墨子）核心主張。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "國文", question: "「扁鵲重生稱妙手」為對聯之上聯，其下聯應為以下何者？", options: ["參芎同功回造化", "華佗再世頌丹心", "借寓東西南北人", "明月三杯李白歌"], answer: 1, explanation: "「扁鵲」對「華佗」（皆名醫），「重生」對「再世」，「稱妙手」對「頌丹心」，對仗工整。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "國文", question: "下列何者有「天下第一行書」之譽？", options: ["陶淵明〈桃花源詩並序〉", "王羲之〈蘭亭集序〉", "李白〈春夜宴從弟桃花園序〉", "文天祥〈正氣歌並序〉"], answer: 1, explanation: "王羲之〈蘭亭集序〉被譽為「天下第一行書」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "國文", question: "下段文字□□中，最可能填入下列何者？「鐵道不是一把尺，而是□□。車站為針尖腳，我是那活動的鉛筆腳。慢吞地畫出半徑或圓圈，丈量著經過的大城大鎮小村小落。」（劉克襄）", options: ["剪刀", "針車", "圓規", "畫板"], answer: 2, explanation: "由「針尖腳」「鉛筆腳」「畫出半徑或圓圈」可知比喻對象為「圓規」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "國文", question: "下列選項中的成語，何組意義最相近？", options: ["煮豆燃萁／兄友弟恭", "含沙射影／指桑罵槐", "國事蜩螗／城狐社鼠", "吐哺握髮／含辛茹苦"], answer: 1, explanation: "「含沙射影」與「指桑罵槐」皆指暗中影射、旁敲側擊地攻擊或諷刺。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },

    // ===== 台北捷運 114年（2025）英文 =====
    { company: "trtc", roc: 114, subject: "英文", question: "My brother ____ not like seafood and vegetables. He eats meat only.", options: ["is", "am", "was", "does"], answer: 3, explanation: "一般現在式否定，第三人稱單數用 does not。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "This pair of shoes is not ____. It's so muddy!", options: ["I", "my", "me", "mine"], answer: 3, explanation: "所有格代名詞 mine（= my shoes）。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "Thirty years ago, it was hard for mothers ____ babies' diapers in public restrooms.", options: ["change", "to change", "to changing", "changing"], answer: 1, explanation: "「it is hard for + 受詞 + to V」句型。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "It is high time that we ____ for the coming typhoon.", options: ["have prepared", "prepared", "will preparing", "preparing"], answer: 1, explanation: "「It is high time that + 主詞 + 過去式動詞」表示「早該做某事」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "____ with special needs are advised to use the elevators on both sides of the platforms.", options: ["Passengers", "Pedestrians", "Pilots", "Professionals"], answer: 0, explanation: "依語意（月台、電梯），需特殊協助者為「乘客 Passengers」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "Students can ____ their vacation by reading good books and learning a new language.", options: ["come up with", "get away with", "let go of", "make use of"], answer: 3, explanation: "make use of（善用）符合語意「善用假期」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "The bus ____ is going to rise by twenty percent due to inflation.", options: ["fare", "income", "tuition", "wage"], answer: 0, explanation: "bus fare 指公車「車資／票價」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "Kevin's paintings somehow lack the originality that we are looking for.（選出與 originality 意思最接近的字）", options: ["creativity", "diversity", "invention", "knowledge"], answer: 0, explanation: "originality（原創性）與 creativity（創意）意義最相近。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "____ this is your first visit to my hometown, I will show you around and treat you to dinner.", options: ["Although", "Until", "Since", "When"], answer: 2, explanation: "Since 表「既然／因為」，符合因果語意。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },
    { company: "trtc", roc: 114, subject: "英文", question: "A: Do you know why she made such a stupid decision? B: ______ I have been asking myself the same question.", options: ["It beats me.", "Certainly!", "Thankfully!", "Sounds great."], answer: 0, explanation: "It beats me 為慣用語，意為「我也搞不懂」。", source: "https://ssl.metro.taipei/workerdataV2/114exam/list.htm" },

    // ===== 台北捷運 113年（2024）數理邏輯 =====
    { company: "trtc", roc: 113, subject: "數理邏輯", question: "已知三數 18, A, 2 為等比數列，試求等比中項 A 之值為多少？", options: ["6", "4", "±4", "±6"], answer: 3, explanation: "等比中項 A² = 18×2 = 36，故 A = ±6。", source: "https://ssl.metro.taipei/workerdataV2/113exam/list.htm" },
    { company: "trtc", roc: 113, subject: "數理邏輯", question: "試求等差級數 5+7+9+11+…+23 的和為何？", options: ["120", "130", "140", "150"], answer: 2, explanation: "首項 5、末項 23、公差 2，共 10 項；和 = (5+23)×10÷2 = 140。", source: "https://ssl.metro.taipei/workerdataV2/113exam/list.htm" },
    { company: "trtc", roc: 113, subject: "數理邏輯", question: "一副撲克牌共有 52 張，任意抽一張，要抽中紅心花色而且點數是質數的機率是多少？（A、J、Q、K 不列入質數計算）", options: ["1/13", "2/13", "3/13", "4/13"], answer: 0, explanation: "紅心中點數為質數者為 2、3、5、7 共 4 張，4/52 = 1/13。", source: "https://ssl.metro.taipei/workerdataV2/113exam/list.htm" },

    // ===== 台北捷運 113年（2024）捷運法規及常識 =====
    { company: "trtc", roc: 113, subject: "捷運法規及常識", question: "在捷運範圍內不允許做出下列哪種行為？", options: ["使用直排輪", "使用滑板車", "使用溜冰鞋", "以上皆不允許"], answer: 3, explanation: "依規定，直排輪、滑板車、溜冰鞋於捷運範圍內均不得使用。", source: "https://ssl.metro.taipei/workerdataV2/113exam/list.htm" },
    { company: "trtc", roc: 113, subject: "捷運法規及常識", question: "旅客遺失車票後辦理自動補票，應加收票價幾倍之違約金？", options: ["5 倍", "10 倍", "50 倍", "免加收違約金"], answer: 3, explanation: "遺失車票辦理自動補票，補繳票價差額，免加收違約金。", source: "https://ssl.metro.taipei/workerdataV2/113exam/list.htm" },
    { company: "trtc", roc: 113, subject: "捷運法規及常識", question: "若欲在大眾捷運系統設施附掛管線，應協調下列何者同意後始得施工？", options: ["中央主管機關", "地方主管機關", "工程建設機構", "免取得同意"], answer: 2, explanation: "依大眾捷運法，於捷運系統設施附掛管線應與工程建設機構協調同意後始得施工。", source: "https://ssl.metro.taipei/workerdataV2/113exam/list.htm" },
    { company: "trtc", roc: 113, subject: "捷運法規及常識", question: "大眾捷運系統的建設可能由哪種機關辦理？", options: ["中央主管機關", "地方主管機關", "兩者皆可", "以上皆非"], answer: 2, explanation: "依大眾捷運法，捷運系統建設可由中央或地方主管機關辦理。", source: "https://ssl.metro.taipei/workerdataV2/113exam/list.htm" },

    // ===== 台北捷運 112年（2023）捷運法規及常識 =====
    { company: "trtc", roc: 112, subject: "捷運法規及常識", question: "採用非完全獨立專用路權的大眾捷運系統考量哪項因素時，得設置優先通行或聲光號誌？", options: ["路段鋪面材質", "路段坡度", "路口行車安全", "氣候條件"], answer: 2, explanation: "非完全獨立專用路權（與其他交通混合）為確保路口行車安全，得設置優先通行或聲光號誌。", source: "https://ssl.metro.taipei/workerdataV2/112exam/list.htm" },
    { company: "trtc", roc: 112, subject: "捷運法規及常識", question: "大眾捷運系統營運機構若遭受停止營運處分多久以上仍未改善者，中央主管機關得廢止其營運許可？", options: ["三個月", "六個月", "十二個月", "十八個月"], answer: 1, explanation: "依大眾捷運法，受停止營運處分滿六個月仍未改善者，得廢止其營運許可。", source: "https://ssl.metro.taipei/workerdataV2/112exam/list.htm" },
    { company: "trtc", roc: 112, subject: "捷運法規及常識", question: "臺北捷運公司若欲宣告停業，需經下列哪一單位核准？", options: ["臺北捷運公司本身", "臺北市政府交通局", "臺北市政府與新北市政府", "中央主管機關"], answer: 3, explanation: "依大眾捷運法，營運機構停業須報請中央主管機關核准。", source: "https://ssl.metro.taipei/workerdataV2/112exam/list.htm" },
    { company: "trtc", roc: 112, subject: "捷運法規及常識", question: "當站務人員發現旅客疑似攜帶強酸的危險品，但拒絕接受檢查時，公司得通知哪一機關辦理？", options: ["衛生局", "交通局", "警察局", "捷運工程局"], answer: 2, explanation: "旅客拒絕接受危險品檢查時，得通知警察機關到場處理。", source: "https://ssl.metro.taipei/workerdataV2/112exam/list.htm" },
    { company: "trtc", roc: 112, subject: "捷運法規及常識", question: "有一乘客攜帶小型寵物箱，內裝有一隻小型犬，請問該犬隻的哪個部位可以露出寵物箱？", options: ["頭", "尾巴", "四肢", "以上皆不可露出"], answer: 3, explanation: "攜帶寵物須完全置於寵物箱（袋）內，動物的任何部位均不得露出。", source: "https://ssl.metro.taipei/workerdataV2/112exam/list.htm" },
    { company: "trtc", roc: 112, subject: "捷運法規及常識", question: "若欲使用代步車在臺北捷運站內通行，最高速度為多少公里／小時？", options: ["5", "10", "15", "20"], answer: 0, explanation: "電動代步車於站內通行最高速度為每小時 5 公里。", source: "https://ssl.metro.taipei/workerdataV2/112exam/list.htm" },
    { company: "trtc", roc: 112, subject: "捷運法規及常識", question: "若某乘客冒用不符身分之車票乘車，搭乘單程票價為 40 元的區間，該名乘客連同違約金共應支付多少元？", options: ["1200 元", "2000 元", "2040 元", "4040 元"], answer: 2, explanation: "除補繳票價 40 元外，並加收票價 50 倍違約金（40×50 = 2000 元），合計 2040 元。", source: "https://ssl.metro.taipei/workerdataV2/112exam/list.htm" },

    // ===== 桃園捷運 =====
    { company: "tymetro", roc: 112, subject: "大眾捷運概論", question: "桃園機場捷運規劃之最大營運速度為？", options: ["70 公里/小時", "80 公里/小時", "90 公里/小時", "100 公里/小時"], answer: 3, explanation: "桃園機場捷運（直達車）規劃最大營運速度為 100 公里／小時。出自 112 年第 1 次桃捷甄試。", source: "https://yamol.tw/" },
    { company: "tymetro", roc: 109, subject: "大眾捷運概論", question: "對旅客攜帶自行車使用桃園機場捷運之相關規定，何者不正確？", options: ["週六/日、國定假日、調整放假日全天開放", "政府行政機關上班日及補行上班日之開放時間為 10:00~16:00", "未經驗票程序，逕行攜帶自行車上車者，將處以新臺幣 1500 元以下之罰鍰", "攜帶自行車搭乘桃園機場捷運，進出車站時嚴禁使用電扶梯"], answer: 2, explanation: "依大眾捷運法第 50 條，罰則為新臺幣 1500 元以上 7500 元以下罰鍰，並非「1500 元以下」。出自 109 年第 2 次桃捷甄試。", source: "https://yamol.tw/" },
    { company: "tymetro", roc: 108, subject: "大眾捷運概論", question: "下列何者為半大眾捷運系統（Semi-rapid Transit）？", options: ["桃園客運", "高雄輕軌", "台灣大車隊計程車", "桃園捷運"], answer: 1, explanation: "輕軌（如高雄輕軌）路權非完全獨立，屬半大眾捷運系統。出自 108 年桃捷甄試。", source: "https://yamol.tw/" },
    { company: "tymetro", roc: 106, subject: "大眾捷運概論", question: "桃園捷運在台北火車站所採用的月台形式為何種？", options: ["島式", "側式", "雙島式", "混合式"], answer: 2, explanation: "機場捷運臺北車站採雙島式月台設計。出自 106 年桃捷甄試。", source: "https://yamol.tw/" },
    { company: "tymetro", roc: 103, subject: "大眾捷運概論", question: "假設一捷運路線之目標年尖峰小時運量預估為 15,800 人次/小時，採用之列車（含 6 節客車）最大設計載客量為 800 人/列車，營運公司應規劃尖峰班距為多少才能符合需求？", options: ["15 分鐘", "3 分鐘", "5 分鐘", "10 分鐘"], answer: 1, explanation: "每小時所需列車數 = 15800÷800 ≈ 20 列；班距 = 60÷20 = 3 分鐘。出自 103 年桃捷甄試。", source: "https://yamol.tw/" },
    { company: "tymetro", roc: null, subject: "捷運法規及常識", question: "根據大眾捷運法，關於大眾捷運系統之運價，下列敘述何者正確？", options: ["由營運機構擬訂，報請地方主管機關核定後公告實施", "由營運機構擬訂，報請中央主管機關核定後公告實施", "由營運機構擬訂，報請行政院核定後公告實施", "中央主管機關擬訂，報請行政院核定後公告實施"], answer: 0, explanation: "依大眾捷運法第 29 條：運價率公式由中央擬訂報行政院核定；運價由營運機構依公式擬訂，報「地方主管機關」核定公告（口訣：公式中央定，票價地方核）。捷運法規共通高頻考點。", source: "https://yamol.tw/" },
    { company: "tymetro", roc: null, subject: "捷運法規及常識", question: "大眾捷運系統建設及車輛製造之技術規範應由下列何者辦理？", options: ["中央主管機關", "大眾捷運系統營運機構", "大眾捷運系統工程建設機構", "負責管轄之地方主管機關"], answer: 0, explanation: "依大眾捷運法第 24 條之 2，技術規範由中央主管機關定之。捷運法規共通高頻考點。", source: "https://yamol.tw/" },
    { company: "tymetro", roc: null, subject: "大眾捷運概論", question: "下列何種運輸系統採用 BOT（興建—營運—移轉）模式？", options: ["桃園捷運", "高雄捷運", "台中捷運", "台北捷運"], answer: 1, explanation: "高雄捷運（紅、橘線）採 BOT 模式興建營運。捷運概論共通考點。", source: "https://yamol.tw/" },
    { company: "tymetro", roc: null, subject: "國文", question: "「轉品」是指改變詞語原來詞性的修辭手法。下列「　」中的詞語，未使用轉品的是哪一選項？", options: ["讓我「溫暖」你的心", "他的手法很「靈巧」", "緊握著一街的「寧靜」", "她很「寶貝」她的秀髮"], answer: 1, explanation: "(B)「靈巧」仍為形容詞，未轉品；(A)形容詞→動詞、(C)形容詞→名詞、(D)名詞→動詞。國文修辭共通考點。", source: "https://yamol.tw/" },

    // ===== 台中捷運 108年（2019）數理邏輯 =====
    { company: "tmrt", roc: 108, subject: "數理邏輯", question: "「圓周上取 n 個相異點，任兩點用一線段連接，可把圓切割成最多 f(n) 個區域」，已知 f(2)=2、f(3)=4、f(4)=8、f(5)=16，求 f(6)=？", options: ["31", "32", "33", "34"], answer: 0, explanation: "著名的「圓內弦分割區域」題，數列並非單純倍增；f(6) = C(6,4)+C(6,2)+1 = 31。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 108, subject: "數理邏輯", question: "12 支球隊比賽決定冠軍，每天一場比賽（採單淘汰），至少要比幾天才能決出最強隊伍？", options: ["14 天", "13 天", "12 天", "11 天"], answer: 3, explanation: "單淘汰要淘汰 11 隊需 11 場比賽，每天一場故至少 11 天。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 108, subject: "數理邏輯", question: "a, i, m, y, o, n 六個相異字母，總共有幾種排列方式？", options: ["12", "216×216", "720", "120"], answer: 2, explanation: "6 個相異字母全排列 6! = 720。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 108, subject: "數理邏輯", question: "甲、乙、丙、丁四人賽跑：甲說「乙已經先跑完」、乙說「我比丙早到」、丙說「我不是最後一個」、丁說「我跑完時還有一個人沒跑完」。請問到達順序為何？", options: ["乙丙丁甲", "乙丁丙甲", "丙乙甲丁", "乙甲丁丙"], answer: 1, explanation: "由各條件推得名次為乙、丁、丙、甲。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 108, subject: "數理邏輯", question: "數列 2, 4, 7, ○, 16, 22 依規律，○ 應為多少？", options: ["10", "11", "12", "13"], answer: 1, explanation: "相鄰差為 2,3,4,5,6，故 7+4 = 11。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 108, subject: "數理邏輯", question: "一個蛋糕，大寶吃了 1/8，二寶吃了剩下的 1/7，三寶吃了再剩下的 1/6。請問誰吃得比較多？", options: ["大寶", "二寶", "三寶", "一樣多"], answer: 3, explanation: "大寶 1/8；二寶 7/8×1/7 = 1/8；三寶 6/8×1/6 = 1/8。三人一樣多。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 108, subject: "數理邏輯", question: "把一些糖果分給小朋友，若每人分 4 顆則剩 18 顆，若每人分 6 顆則不夠 12 顆。請問小朋友有幾人？", options: ["14 人", "15 人", "16 人", "17 人"], answer: 1, explanation: "設人數 x：4x+18 = 6x−12 → 2x = 30 → x = 15。", source: "https://yamol.tw/" },

    // ===== 台中捷運 111年（2022）數理邏輯 =====
    { company: "tmrt", roc: 111, subject: "數理邏輯", question: "將等差數列 1、4、7、10…… 由小到大依序寫在筆記本上，若每一頁寫 7 個數字，則 1192 應該寫在第幾頁？", options: ["56", "57", "58", "59"], answer: 1, explanation: "1192 為數列第 (1192−1)÷3+1 = 398 項，398÷7 ≈ 56.9，故在第 57 頁。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 111, subject: "數理邏輯", question: "已知捷運車廂節數，兩兩一數、三三一數、五五一數皆可數完且沒有剩餘，請問捷運最少可能有幾節車廂？", options: ["60", "40", "30", "20"], answer: 2, explanation: "需同時被 2、3、5 整除，最小公倍數為 30。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 111, subject: "數理邏輯", question: "將一個圓柱體的黏土切下三刀（直線切割），最多可以切成幾塊？", options: ["5", "6", "7", "8"], answer: 3, explanation: "三刀互不平行且不共線交錯切割，最多可分 8 塊。", source: "https://yamol.tw/" },

    // ===== 台中捷運 112年（2023）數理邏輯 =====
    { company: "tmrt", roc: 112, subject: "數理邏輯", question: "有一木製長方體，長 12 公分、寬 8 公分、高 10 公分，木工想雕塑出一個圓柱體，求此圓柱的最大體積為多少立方公分？", options: ["360π", "160π", "192π", "200π"], answer: 2, explanation: "底面圓直徑受限於寬 8（半徑 4），高取 12（沿長邊放置），體積 = π×4²×12 = 192π。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 112, subject: "數理邏輯", question: "有 60 張書籤分別編號 1～60，甲得到編號為 5 的倍數的書籤，乙得到剩下中編號為 3 的倍數的書籤，丙得到剩下中編號為 2 的倍數的書籤，試問丙可以得到多少張書籤？", options: ["14", "16", "18", "20"], answer: 1, explanation: "甲拿 5 的倍數 12 張；乙拿剩餘中 3 的倍數 16 張；丙再拿剩餘中 2 的倍數，共 16 張。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 112, subject: "數理邏輯", question: "公園中一條長直路從起點到終點共擺放 41 盆花，每兩盆之間距離 6 公尺，現在要改成每 4 公尺放一盆，請問有幾盆花不必搬動？", options: ["19", "20", "21", "22"], answer: 2, explanation: "總長 240 公尺；同時是 6 與 4 的倍數的位置即 12 的倍數（0,12,…,240）共 21 個。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 112, subject: "數理邏輯", question: "三人玩猜拳遊戲，假設出剪刀、石頭、布的機率皆相等，試問玩一次能分出勝負（不平手）的機率為？", options: ["1/3", "1/2", "2/3", "4/9"], answer: 2, explanation: "三人猜拳共 27 種情況，恰出現兩種手勢（可分勝負）的情況有 18 種，機率 = 18/27 = 2/3。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 112, subject: "數理邏輯", question: "若敘述「小中喜歡慢跑 或 阿捷喜歡打籃球」為假，請選出推論必定正確的選項。", options: ["小中喜歡打籃球且阿捷喜歡慢跑", "阿捷不喜歡慢跑", "小中不喜歡慢跑", "阿捷喜歡慢跑且不喜歡打籃球"], answer: 2, explanation: "「P 或 Q」為假 ⇒ P 與 Q 皆為假，故「小中喜歡慢跑」為假。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 112, subject: "數理邏輯", question: "阿飛與阿翔同時、同地、同方向出發，阿飛每天固定走 10 公里，阿翔第一天走 8 公里，之後每天增加 0.5 公里，試問出發後第幾天阿翔可以追上阿飛？", options: ["4", "6", "7", "9"], answer: 3, explanation: "阿翔累積距離（等差級數）≥ 阿飛累積距離 10n，解不等式得第 9 天追上。", source: "https://yamol.tw/" },

    // ===== 台中捷運 114年（2024）數理邏輯 =====
    { company: "tmrt", roc: 114, subject: "數理邏輯", question: "商店推出「買一杯原價 40 元、第二杯半價」的優惠，每賣出一組（兩杯）可賺利潤 15 元。請問一杯飲料的成本為多少元？", options: ["15 元", "20 元", "22.5 元", "30 元"], answer: 2, explanation: "兩杯售價 = 40+20 = 60 元，利潤 15 元，總成本 = 45 元，單杯成本 = 22.5 元。", source: "https://yamol.tw/" },
    { company: "tmrt", roc: 114, subject: "數理邏輯", question: "某公司 2 月營業額 500 萬元，3 月相較 2 月漲幅 +10%，4 月相較 3 月漲幅 −20%。請問 4 月營業額為多少萬元？", options: ["440", "450", "540", "510"], answer: 0, explanation: "500×1.1×0.8 = 440 萬元。", source: "https://yamol.tw/" },

    // ===== 台中捷運 捷運法規及常識（綠線情境練習題） =====
    { company: "tmrt", roc: 110, subject: "捷運法規及常識", question: "假設臺中捷運綠線往返一趟需時 88 分鐘，若要提供班距 3 分鐘的服務，則該路線至少要準備多少列車？", options: ["30 列車", "20 列車", "15 列車", "60 列車"], answer: 0, explanation: "往返 88 分鐘 ÷ 班距 3 分鐘 ≈ 29.3，無條件進位需 30 列。（綠線情境練習題）", source: "http://www.11exam.com/exam/course/204837" },
    { company: "tmrt", roc: 110, subject: "捷運法規及常識", question: "臺中捷運綠線（烏日文心北屯線）採用之軌距為下列何者？", options: ["1435mm", "1067mm", "1450mm", "1068mm"], answer: 0, explanation: "臺中捷運綠線採標準軌 1435mm。（綠線情境練習題）", source: "http://www.11exam.com/exam/course/204837" },
    { company: "tmrt", roc: 110, subject: "捷運法規及常識", question: "依大眾捷運法，捷運系統之中央主管機關為下列何者？", options: ["經濟部", "財政部", "內政部", "交通部"], answer: 3, explanation: "大眾捷運法第 4 條，中央主管機關為交通部。", source: "http://www.11exam.com/exam/course/204837" },
    { company: "tmrt", roc: 110, subject: "捷運法規及常識", question: "下列何者不屬於大眾運輸系統？", options: ["捷運", "火車", "國道客運", "計程車"], answer: 3, explanation: "計程車屬個別化（非定線定班）運具，不屬大眾運輸系統。", source: "http://www.11exam.com/exam/course/204837" },
    { company: "tmrt", roc: 110, subject: "捷運法規及常識", question: "臺中捷運綠線除了下列哪兩站為地面車站外，其他車站皆為高架車站？", options: ["北屯總站、烏日站", "松竹站、大慶站", "台中市政府站、台中高鐵站", "北屯總站、台中高鐵站"], answer: 0, explanation: "綠線多為高架站，北屯總站與烏日站為地面（平面）車站。（綠線情境練習題）", source: "http://www.11exam.com/exam/course/204837" }
  ]
};
