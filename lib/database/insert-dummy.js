const { CONNECTION_URL, DATABASE, OPTIONS } = require("../../config/mongodb.config")
const MongoClient = require("mongodb").MongoClient

const insertPersonal  = function (db) {
    return Promise.all([
        db.collection("personal").insertOne(
            {
                username: "るい",
                password: "るいるい",
                icon: ""
            }
        ),
        db.collection("personal").createIndex({username: 1}, {unique: true, background: true})
    ])
}

const insertAnswerHistory = function (db) {
    return Promise.all([
        db.collection("dummyAnswerHistory").insertMany([
            {
                question: "アメリカの首都は？",
                username: "るい",
                result: "O",
                field: "Geography",
                level: "easy"
            },
            {
                question: "名画「落ち穂拾い」を描いた画家は？",
                username: "るい",
                result: "X",
                field: "History",
                level: "easy"
            },
            {
                question: "2019年、新生男児で最多の名前は？",
                username: "るい",
                result: "X",
                field: "Entertainment",
                level: "easy"
            },
            {
                question: "上杉謙信と武田信玄が戦ったのはどれ？",
                username: "るい",
                result: "O",
                field: "History",
                level: "easy"
            },
            {
                question: "次のうち、日本全国に最も多くの店舗を持つのは？",
                username: "るい",
                result: "X",
                field: "Entertainment",
                level: "easy"
            },
            {
                question: "次のうち、ノーベル文学賞を受賞しているのは？",
                username: "るい",
                result: "O",
                field: "History",
                level: "easy"
            },
            {
                question: "次のうち、日本で唯一イオンの店舗が存在しない都道府県は？",
                username: "るい",
                result: "O",
                field: "Geography",
                level: "easy"
            },
            {
                question: "次のうち、CD売り上げ200万枚を達成していないのは？",
                username: "るい",
                result: "O",
                field: "Entertainment",
                level: "easy"
            },
            {
                question: "次のうち、日本で唯一刑務所のない都道府県は？",
                username: "るい",
                result: "O",
                field: "Geography",
                level: "easy"
            },
            {
                question: "アカデミー賞主演男優賞を過去最も多く受賞しているのは誰？",
                username: "るい",
                result: "X",
                field: "Entertainment",
                level: "easy"
            },
            {
                question: "イギリスのケンブリッジ公爵ウィリアム王子と同夫人キャサリンとの間に生まれた長男の名前は？",
                username: "るい",
                result: "X",
                field: "Entertainment",
                level: "intermediate"
            },
            {
                question: "「春はあけぼの」から始まる、文学作品の名前は？",
                username: "るい",
                result: "X",
                field: "History",
                level: "intermediate"
            },
            {
                question: "結婚50年は金婚式、25年は銀婚式、では1年は？",
                username: "るい",
                result: "O",
                field: "Entertainment",
                level: "intermediate"
            },
            {
                question: "世界三大映画祭、「ヴェネツィア国際映画祭」、「ベルリン国際映画祭」、あと１つは？",
                username: "るい",
                result: "O",
                field: "Entertainment",
                level: "intermediate"
            },
            {
                question: "ルクセンブルクの首都は？",
                username: "るい",
                result: "O",
                field: "Geography",
                level: "intermediate"
            },
            {
                question: "「心太」、何て読む？　ひらがなで回答してください。",
                username: "るい",
                result: "X",
                field: "History",
                level: "intermediate"
            },
            {
                question: "記念すべき100作目のNHK連続テレビ小説として、2019年前期に放送されていた作品名は？",
                username: "るい",
                result: "O",
                field: "Entertainment",
                level: "intermediate"
            },
            {
                question: "日本で最も土地面積が狭い都道府県はどこか？",
                username: "るい",
                result: "O",
                field: "Geography",
                level: "intermediate"
            },
            {
                question: "9月の誕生石は？",
                username: "るい",
                result: "O",
                field: "Entertainment",
                level: "intermediate"
            },
            {
                question: "1560年に今川軍と織田軍との間で起きた奇襲合戦の名前は？",
                username: "るい",
                result: "O",
                field: "History",
                level: "intermediate"
            },
        ])
    ])
}

const insertEasyQuiz = function (db) {
    return Promise.all([
        db.collection("dummyEasyQuiz").insertMany([
            {
                question: "アメリカの首都は？",
                option: ["ニューヨーク", "フィラデルフィア", "ワシントンD.C.", "ロサンゼルス"],
                answer: "ワシントンD.C.",
                description: "19〇〇年に首都はワシントンD.C.にうつった。",
                field: "Geography"
            },
            {
                question: "上杉謙信と武田信玄が戦ったのはどれ？",
                option: ["川中島の戦い", "桶狭間の戦い", "関ヶ原の戦い", "大阪夏の陣"],
                answer: "川中島の戦い",
                description: "5回行われた。",
                field: "History"
            },
            {
                question: "名画「落ち穂拾い」を描いた画家は？",
                option: ["モネ", "ゴッホ", "ジャン=フランソワ・ミレー", "ピカソ"],
                answer: "ジャン=フランソワ・ミレー",
                description: "油彩画。1857年に描かれた",
                field: "History"
            },
            {
                question: "次のうち、世界遺産でないのはどれ？",
                option: ["凱旋門", "自由の女神", "モン・サン=ミシェル", "厳島神社"],
                answer: "凱旋門",
                description: "残りの3つはすべて世界文化遺産",
                field: "Geography"
            },
            {
                question: "次のうち、ノーベル文学賞を受賞しているのは？",
                option: ["村上春樹", "川端康成", "夏目漱石", "谷崎潤一郎"],
                answer: "川端康成",
                description: "1968年に受賞。対象作品には「雪国」、「千羽鶴」など",
                field: "History"

            },
            {
                question: "次のうち、CD売り上げ200万枚を達成していないのは？",
                option: ["Mr.Children / Tomorrow never knows", "宇多田ヒカル / Automatic", "福山雅治/ 桜坂", "スピッツ / チェリー"],
                answer: "スピッツ / チェリー",
                description: "「チェリー」の売上枚数は161万枚",
                field: "Entertainment"
            },
            {
                question: "次のうち、日本で唯一イオンの店舗が存在しない都道府県は？",
                option: ["長崎県", "福井県", "北海道", "沖縄県"],
                answer: "福井県",
                description: "イオンが出店していない都道府県は、福井県だけ",
                field: "Geography"
            },
            {
                question: "次のうち、日本で唯一刑務所のない都道府県は？",
                option: ["奈良県", "山形県", "鳥取県", "高知県"],
                answer: "奈良県",
                description: "2017年に奈良少年刑務所が老朽化により閉鎖された。",
                field: "Geography"
            },
            {
                question: "2019年、新生男児で最多の名前は？",
                option: ["しょう", "れん", "はると", "みずき"],
                answer: "れん",
                description: "「れん」は2年連続。ちなみに2位は「はると」",
                field: "Entertainment"
            },
            {
                question: "アカデミー賞主演男優賞を過去最も多く受賞しているのは誰？",
                option: ["ダスティン・ホフマン", "ウィル・スミス", "ダニエル・デイ＝ルイス", "キーファー・サザーランド"],
                answer: "ダニエル・デイ＝ルイス",
                description: "過去3度の受賞。代表作は「リンカーン」",
                field: "Entertainment"
            },
            {
                question: "オリンピック開催回数が最も多い国はアメリカ。ではその次に多い国は？",
                option: ["イタリア", "フランス", "ロシア", "日本"],
                answer: "フランス",
                description: "フランスは5回。ちなみに3位は日本の4回",
                field: "History"
            },
            {
                question: "次のうち、発行部数が最も少ないのはどれ？",
                option: ["ゴルゴ13", "こち亀", "BLEACH", "美味しんぼ"],
                answer: "BLEACH",
                description: "「BLEACH」は1億2000万部。ちなみに最多は「ゴルゴ13」で2億部。",
                field: "Entertainment"
            },
            {
                question: "次のうち、日本全国に最も多くの店舗を持つのは？",
                option: ["吉野家", "ケンタッキー", "モス・バーガー", "鳥貴族"],
                answer: "モス・バーガー",
                description: "モス・バーガーは日本に約1700店舗",
                field: "Entertainment"
            }
        ]),
        db.collection("dummyEasyQuiz").createIndex({question: 1}, {unique: true, background: true})
    ])
}

const insertIntermediateQuiz = function (db) {
    return Promise.all([
        db.collection("dummyIntermediateQuiz").insertMany([
            {
                question: "「心太」、何て読む？　ひらがなで回答してください。",
                answer: "ところてん",
                description: "ところてんと読む。特殊な読み方。",
                field: "History"
            },
            {
                question: "早稲田大学の創設者は誰？",
                answer: "大隈重信",
                description: "大隈重信が1920年に創設",
                field: "History"
            },
            {
                question: "ルクセンブルクの首都は？",
                answer: "ルクセンブルク",
                description: "「北のジブラルタル」の異名をもつ頑強な城郭都市。",
                field: "Geography"
            },
            {
                question: "「春はあけぼの」から始まる、文学作品の名前は？",
                answer: "枕草子",
                description: "清少納言によって西暦1000頃に執筆された。",
                field: "History"
            },
            {
                question: "日本で最も土地面積が狭い都道府県はどこか？",
                answer: "香川県",
                description: "その次に小さいのは大阪府。",
                field: "Geography"
            },
            {
                question: "ナウマンゾウの化石が出土した旧石器時代の遺跡といえば？",
                answer: "野尻湖遺跡",
                description: "旧石器時代の遺跡",
                field: "History"
            },
            {
                question: "1560年に今川軍と織田軍との間で起きた奇襲合戦の名前は？",
                answer: "桶狭間の戦い",
                description: "織田軍が勝利した。",
                field: "History"
            },
            {
                question: "世界三大映画祭、「ヴェネツィア国際映画祭」、「ベルリン国際映画祭」、あと１つは？",
                answer: "カンヌ国際映画祭",
                description: "毎年5月にフランスで開催される。",
                field: "Entertainment"
            },
            {
                question: "世界三大美女、「楊貴妃」、「ヘレネー」、あと一人は？",
                answer: "クレオパトラ",
                description: "日本では小野小町が入れられることが多い。",
                field: "Entertainment"
            },
            {
                question: "「森のミルク」の異名をもつ食材は？",
                answer: "アボカド",
                description: "アボガドではなくアボカドが正式。",
                field: "Entertainment"
            },
            {
                question: "9月の誕生石は？",
                answer: "サファイア",
                description: "ちなみに翌月10月はオパール。",
                field: "Entertainment"
            },
            {
                question: "結婚50年は金婚式、25年は銀婚式、では1年は？",
                answer: "紙婚式",
                description: "「和紙」に由来。",
                field: "Entertainment"
            },
            {
                question: "イギリスのケンブリッジ公爵ウィリアム王子と同夫人キャサリンとの間に生まれた長男の名前は？",
                answer: "ジョージ",
                description: "ちなみに、長女の名前はシャーロット。",
                field: "Entertainment"
            },
            {
                question: "色の三原色、「イエロー」、「シアン」、あと１つは？",
                answer: "マゼンタ",
                description: "光の三原色はRGB。",
                field: "History"
            },
            {
                question: "記念すべき100作目のNHK連続テレビ小説として、2019年前期に放送されていた作品名は？",
                answer: "なつぞら",
                description: "主演は広瀬すず。",
                field: "Entertainment"
            }
        ]),
        db.collection("dummyIntermediateQuiz").createIndex({question: 1}, {unique: true, background: true})
    ])
}

MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    const db = client.db(DATABASE);
    Promise.all([
        insertPersonal(db),
        insertAnswerHistory(db),
        insertEasyQuiz(db),
        insertIntermediateQuiz(db)
    ]).catch((error) => {
        console.log(error)
    }).then(() => {
        client.close()
    })
})