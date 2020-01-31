const { CONNECTION_URL, DATABASE, OPTIONS } = require("../../config/mongodb.config")
const MongoClient = require("mongodb").MongoClient

const insertEasyQuiz = function (db) {
    return Promise.all([
        db.collection("EasyQuiz").insertMany([
            {
                question: "通常、原価計算期間はどれくらいの長さか？",
                option: ["1日", "1週間", "1ヶ月", "1年"],
                answer: "1ヶ月",
                description: "経営管理のためには短ければ短いほど良い",
                field: "原価管理の基礎的分類"
            },
            {
                question: "カメラ製造において、レンズ研磨機の洗浄剤の消費は何の費用に当たるか？",
                option: ["間接経費", "一般管理費", "直接材料費", "間接材料費"],
                answer: "間接材料費",
                description: "どの製品の為に消費されたか特定困難な材料費。",
                field: "原価管理の基礎的分類"
            },
            {
                question: "本社事務員給料はどれに当たるか？",
                option: ["一般管理費", "間接経費", "直接労務費", "間接労務費"],
                answer: "一般管理費",
                description: "会社全体の管理に要した費用のこと。本社の減価償却費もこれ。",
                field: "原価管理の基礎的分類"
            },
            {
                question: "工員による組立作業にかかった賃金はどれに当たるか？",
                option: ["一般管理費", "間接経費", "直接労務費", "間接労務費"],
                answer: "直接労務費",
                description: "どの製品のために消費されたかがわかる労務費。",
                field: "原価管理の基礎的分類"
            },
            {
                question: "単純個別原価計算とは何の計算手続を省略したものか？",
                option: ["部門別計算", "費目別計算", "製品別計算", "期間別計算"],
                answer: "部門別計算",
                description: "単純個別原価計算は中小企業においてよく使われている。",
                field: "実際単純個別原価計算"
            },
            {
                question: "期間原価の概念はどの原価計算方式から誕生したか？",
                option: ["見積原価計算", "実際単純個別原価計算", "商的工業会計", "標準原価計算"],
                answer: "実際単純個別原価計算",
                description: "単純個別原価計算は中小企業においてよく使われている。",
                field: "実際単純個別原価計算"
            },
            {
                question: "実際原価計算において、製造直接費は製造指図書番号の原価計算票へ移記する。これを、製造直接費の何というか？",
                option: ["期間的対応", "客体的対応", "個別的対応", "原価計算的対応"],
                answer: "期間的対応",
                description: "努力と成果の関係が比較的薄く、発生期間を媒介とする対応であるため、こう呼ばれる。",
                field: "実際単純個別原価計算"
            },
            {
                question: "実際原価計算において、収益的支出のうち販売費や一般管理費を売上総利益と対応させる行為はどれに当たるか？",
                option: ["賦課", "振替", "直課", "配賦"],
                answer: "直課",
                description: "製造間接費は、どの製品にかかった費用か特定困難なため、配賦。",
                field: "実際単純個別原価計算"
            },
            {
                question: "棚卸計算法を踏襲したのは以下のうちどれか？",
                option: ["見積原価計算", "実際単純個別原価計算", "標準原価計算", "この中にはない"],
                answer: "見積原価計算",
                description: "原価計算にかかるコストの節約を目的に丼勘定方式の計算原理を利用。",
                field: "見積原価計算"
            },
            {
                question: "実際の直接材料費を示せないのは、以下のうちどれ？",
                option: ["標準原価計算", "実際単純個別原価計算", "見積原価計算", "この中にはない"],
                answer: "見積原価計算",
                description: "丼勘定方式により見積もられているため。",
                field: "見積原価計算"
            },
            {
                question: "継続記録法とは次のうちどの計算方法において最も効果的か？",
                option: ["実際単純個別原価計算", "標準原価計算", "見積原価計算", "実際部門別個別原価計算"],
                answer: "見積原価計算",
                description: "継続記録法は莫大なコストがかかる。",
                field: "見積原価計算"
            },
            {
                question: "価格決定や期間損益計算目的の基礎として使用する原価見積の正確性を、複式簿記機構内で期間的に検証することを目的とする計算方法はどれか？",
                option: ["実際部門別個別原価計算", "見積原価計算", "この中にはない", "標準原価計算"],
                answer: "見積原価計算",
                description: "上記目的達成のため、計算・記帳の手数が簡略化されている。",
                field: "見積原価計算"
            },
            {
                question: "工場の部門を製造部門と補助部門に分けた時、補助部門に当たるのはどれか？",
                option: ["機械部", "動力部", "旋盤部", "鍛造部"],
                answer: "動力部",
                description: "補助部門はさらに補助経営部門と工場管理部門とに分類される。",
                field: "実際部門別個別原価計算"
            },
        ]),
        db.collection("EasyQuiz").createIndex({question: 1}, {unique: true, background: true})
    ])
}

const insertIntermediateQuiz = function (db) {
    return Promise.all([
        db.collection("IntermediateQuiz").insertMany([
            {
                question: "従業員の賃金等の支払いに生じる製造原価は何というか？",
                answer: "労務費",
                description: "製造原価は、労務費、材料費（材料の消費額）、経費（電気代等）の3つに分類できる。",
                field: "原価管理の基礎的分類"
            },
            {
                question: "材料費のように生産量に比例して発生する費用を何というか？",
                answer: "変動費",
                description: "生産量に関係なく、発生額が一定の費用は固定費と言われる。",
                field: "原価管理の基礎的分類"
            },
            {
                question: "製品加工の途中で未完成のものを何というか？",
                answer: "仕掛品",
                description: "読み方は「しかかりひん」",
                field: "原価管理の基礎的分類"
            },
            {
                question: "従業員の賃金等の支払いに生じる製造原価はなんというか？",
                answer: "労務費",
                description: "製造原価は、労務費、材料費（材料の消費額）、経費（電気代等）の3つに分類できる。",
                field: "原価管理の基礎的分類"
            },
            {
                question: "見積原価計算において、材料の量の変化を考慮するために採用された方法は何か？",
                answer: "継続記録法",
                description: "丼勘定方式を踏襲する見積原価計算は、実際の直接材料費を示せない。",
                field: "見積原価計算"
            },
            {
                question: "見積原価計算において、原価単位あたりの実際製造原価を非科学的方法により予定した額を何という？",
                answer: "原価見積",
                description: "製造原価を全くの勘で見積もったもの。",
                field: "見積原価計算"
            },
            {
                question: "見積原価計算において、見積原価は原価見積に何を乗じたものか？",
                answer: "実際生産量",
                description: "原価見積100円の製品を100個生産した場合の見積原価は10000円。",
                field: "見積原価計算"
            },
            {
                question: "実際原価の概念は歴史的原価から何へと変化したか？",
                answer: "実際正常原価",
                description: "実際正常原価計算では、異常な財貨消費額は非原価項目として除去するか、数期間に平均化する。",
                field: "実際原価計算"
            },
            {
                question: "一定期間における発生額を、当期の収益に直接対応させて、把握した原価を何というか？",
                answer: "期間原価",
                description: "一定単位の製品に集計された原価は製品原価と呼ばれる。",
                field: "実際原価計算"
            },
            {
                question: "材料は常備材料と、何に分類できるか？",
                answer: "引当材料",
                description: "実務ではあまり使われない。",
                field: "実際原価計算"
            }
        ]),
        db.collection("IntermediateQuiz").createIndex({question: 1}, {unique: true, background: true})
    ])
}

MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    const db = client.db(DATABASE);
    Promise.all([
        insertEasyQuiz(db),
        insertIntermediateQuiz(db)
    ]).catch((error) => {
        console.log(error)
    }).then(() => {
        client.close()
    })
})
