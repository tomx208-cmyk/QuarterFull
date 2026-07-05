/**
 * ==========================================================
 * QuarterFull
 * deckManager.js
 * デッキ・カードの追加/編集/削除(CRUD)を担当するモーダルUI
 * ==========================================================
 */

"use strict";


const DeckManager = {


    // 現在モーダルで編集対象になっているデッキID
    currentEditDeckId: null,


    // ==========================
    // Initialize
    // ==========================

    init() {

        UI.elements.modalCloseButton.addEventListener(
            "click",
            () => this.closeModal()
        );

        UI.elements.modalOverlay.addEventListener(
            "click",
            event => {

                if (event.target === UI.elements.modalOverlay) {

                    this.closeModal();

                }

            }
        );

        UI.elements.modalBody.addEventListener(
            "submit",
            event => this.handleSubmit(event)
        );

        UI.elements.modalBody.addEventListener(
            "click",
            event => this.handleClick(event)
        );

        UI.elements.modalBody.addEventListener(
            "change",
            event => this.handleChange(event)
        );

    },


    closeModal() {

        UI.closeModal();

        this.currentEditDeckId = null;

    },


    // ==========================
    // 新規デッキ作成
    // ==========================

    openNewDeckForm() {

        UI.openModal(
            "新しいデッキを作成",
            `
                <form id="deckForm">

                    <label for="deckNameInput">デッキ名</label>

                    <input
                        type="text"
                        id="deckNameInput"
                        required
                        maxlength="50"
                        placeholder="例: 英単語 中学レベル">

                    <div class="modal-actions">

                        <button type="submit" class="primary-button">
                            作成する
                        </button>

                    </div>

                </form>
            `
        );

        const input =
            document.getElementById("deckNameInput");

        if (input) input.focus();

    },


    // ==========================
    // デッキ編集(名前変更/カード管理への導線)
    // ==========================

    openEditDeck(deckId) {

        const deck =
            Lesson.getDecks().find(item => item.id === deckId);

        if (!deck) return;

        // 組み込みのサンプルデッキも編集できるよう、
        // 初回編集時にローカル保存の編集可能コピーを用意する
        StorageManager.ensureEditableDeck(deck);

        this.currentEditDeckId = deckId;

        UI.openModal(
            "デッキを編集",
            `
                <form id="deckEditForm">

                    <label for="deckNameInput">デッキ名</label>

                    <input
                        type="text"
                        id="deckNameInput"
                        required
                        maxlength="50"
                        value="${UI.escapeHtml(deck.name)}">

                    <div class="modal-actions">

                        <button type="submit" class="primary-button">
                            保存
                        </button>

                        <button
                            type="button"
                            id="manageCardsButton"
                            class="secondary-button">
                            カードを管理(${deck.cards.length}枚)
                        </button>

                    </div>

                </form>
            `
        );

    },


    // ==========================
    // カード一覧・追加
    // ==========================

    openCardManager(deckId) {

        const deck =
            Lesson.getDecks().find(item => item.id === deckId);

        if (!deck) return;

        // 組み込みのサンプルデッキも編集できるよう、
        // 初回のカード追加/編集時にローカル保存の編集可能コピーを用意する
        StorageManager.ensureEditableDeck(deck);

        this.currentEditDeckId = deckId;

        const cardsHtml =
            deck.cards.length
                ? deck.cards.map(card => `
                    <li class="card-row" data-card-id="${card.id}">

                        <div class="card-row-text">

                            <strong>${UI.escapeHtml(card.question)}</strong>

                            <span>${UI.escapeHtml(card.answer)}</span>

                            ${
                                card.example
                                    ? `<span class="card-row-example">${UI.escapeHtml(card.example)}</span>`
                                    : ""
                            }

                        </div>

                        <div class="card-row-actions">

                            <button
                                type="button"
                                class="card-edit-button"
                                data-card-id="${card.id}"
                                aria-label="カードを編集">
                                ✏️
                            </button>

                            <button
                                type="button"
                                class="card-delete-button"
                                data-card-id="${card.id}"
                                aria-label="カードを削除">
                                🗑️
                            </button>

                        </div>

                    </li>
                `).join("")
                : `<p class="empty-message">カードがまだありません。</p>`;

        UI.openModal(
            `${deck.name} のカード`,
            `
                <div class="csv-tools">

                    <button
                        type="button"
                        id="csvImportButton"
                        class="secondary-button">
                        📥 CSVから追加
                    </button>

                    <button
                        type="button"
                        id="csvExportButton"
                        class="secondary-button">
                        📤 CSVで書き出す
                    </button>

                    <input
                        type="file"
                        id="csvImportInput"
                        accept=".csv,text/csv"
                        class="hidden">

                </div>

                <p class="csv-hint">
                    CSVは1列目=問題、2列目=答え、3列目=例文(任意)、4列目=例文の訳(任意)
                    の順で入力してください(1行目は見出し行でもOK)。
                    Excel等で作成したCSVをそのまま読み込めます。
                    <button type="button" id="csvTemplateButton" class="link-button">
                        テンプレートをダウンロード
                    </button>
                </p>

                <ul class="card-list">${cardsHtml}</ul>

                <form id="cardForm">

                    <label for="cardQuestionInput">問題(単語)</label>

                    <textarea
                        id="cardQuestionInput"
                        required
                        maxlength="500"
                        rows="1"></textarea>

                    <label for="cardAnswerInput">答え(意味)</label>

                    <textarea
                        id="cardAnswerInput"
                        required
                        maxlength="500"
                        rows="1"></textarea>

                    <label for="cardExampleInput">例文(任意)</label>

                    <textarea
                        id="cardExampleInput"
                        maxlength="500"
                        rows="2"></textarea>

                    <label for="cardExampleTranslationInput">例文の訳(任意)</label>

                    <textarea
                        id="cardExampleTranslationInput"
                        maxlength="500"
                        rows="2"></textarea>

                    <div class="modal-actions">

                        <button type="submit" class="primary-button">
                            カードを追加
                        </button>

                        <button
                            type="button"
                            id="backToDeckEditButton"
                            class="secondary-button">
                            ← デッキ編集に戻る
                        </button>

                    </div>

                </form>
            `
        );

    },


    // ==========================
    // カード編集
    // ==========================

    openCardEditForm(deckId, cardId) {

        const deck =
            Lesson.getDecks().find(item => item.id === deckId);

        if (!deck) return;

        const card =
            deck.cards.find(item => item.id === cardId);

        if (!card) return;

        UI.openModal(
            "カードを編集",
            `
                <form id="cardEditForm" data-card-id="${cardId}">

                    <label for="cardQuestionInput">問題(単語)</label>

                    <textarea
                        id="cardQuestionInput"
                        required
                        maxlength="500"
                        rows="1">${UI.escapeHtml(card.question)}</textarea>

                    <label for="cardAnswerInput">答え(意味)</label>

                    <textarea
                        id="cardAnswerInput"
                        required
                        maxlength="500"
                        rows="1">${UI.escapeHtml(card.answer)}</textarea>

                    <label for="cardExampleInput">例文(任意)</label>

                    <textarea
                        id="cardExampleInput"
                        maxlength="500"
                        rows="2">${UI.escapeHtml(card.example || "")}</textarea>

                    <label for="cardExampleTranslationInput">例文の訳(任意)</label>

                    <textarea
                        id="cardExampleTranslationInput"
                        maxlength="500"
                        rows="2">${UI.escapeHtml(card.exampleTranslation || "")}</textarea>

                    <div class="modal-actions">

                        <button type="submit" class="primary-button">
                            保存
                        </button>

                        <button
                            type="button"
                            id="backToCardListButton"
                            class="secondary-button">
                            ← カード一覧に戻る
                        </button>

                    </div>

                </form>
            `
        );

    },


    // ==========================
    // フォーム送信処理
    // ==========================

    handleSubmit(event) {

        event.preventDefault();

        const formId = event.target.id;


        if (formId === "deckForm") {

            const input =
                document.getElementById("deckNameInput");

            const name =
                input ? input.value.trim() : "";

            if (!name) return;

            const deck =
                StorageManager.addDeck(name);

            App.refreshData();

            UI.showToast(
                "デッキを作成しました。続けてカードを追加しましょう"
            );

            this.openCardManager(deck.id);

            return;

        }


        if (formId === "deckEditForm") {

            const input =
                document.getElementById("deckNameInput");

            const name =
                input ? input.value.trim() : "";

            if (!name || !this.currentEditDeckId) return;

            StorageManager.updateDeck(
                this.currentEditDeckId,
                { name }
            );

            App.refreshData();

            UI.showToast("デッキ名を変更しました");

            this.closeModal();

            return;

        }


        if (formId === "cardForm") {

            const question =
                document.getElementById("cardQuestionInput").value.trim();

            const answer =
                document.getElementById("cardAnswerInput").value.trim();

            const example =
                document.getElementById("cardExampleInput").value.trim();

            const exampleTranslation =
                document.getElementById("cardExampleTranslationInput").value.trim();

            if (!question || !answer || !this.currentEditDeckId) return;

            StorageManager.addCard(
                this.currentEditDeckId,
                { question, answer, example, exampleTranslation }
            );

            App.refreshData();

            UI.showToast("カードを追加しました");

            this.openCardManager(this.currentEditDeckId);

            return;

        }


        if (formId === "cardEditForm") {

            const cardId =
                event.target.dataset.cardId;

            const question =
                document.getElementById("cardQuestionInput").value.trim();

            const answer =
                document.getElementById("cardAnswerInput").value.trim();

            const example =
                document.getElementById("cardExampleInput").value.trim();

            const exampleTranslation =
                document.getElementById("cardExampleTranslationInput").value.trim();

            if (!question || !answer || !this.currentEditDeckId) return;

            StorageManager.updateCard(
                this.currentEditDeckId,
                cardId,
                { question, answer, example, exampleTranslation }
            );

            App.refreshData();

            UI.showToast("カードを更新しました");

            this.openCardManager(this.currentEditDeckId);

            return;

        }

    },


    // ==========================
    // クリック処理(モーダル内の画面遷移・削除)
    // ==========================

    handleClick(event) {

        const manageCardsButton =
            event.target.closest("#manageCardsButton");

        if (manageCardsButton && this.currentEditDeckId) {

            this.openCardManager(this.currentEditDeckId);

            return;

        }


        const backToDeckEditButton =
            event.target.closest("#backToDeckEditButton");

        if (backToDeckEditButton && this.currentEditDeckId) {

            this.openEditDeck(this.currentEditDeckId);

            return;

        }


        const backToCardListButton =
            event.target.closest("#backToCardListButton");

        if (backToCardListButton && this.currentEditDeckId) {

            this.openCardManager(this.currentEditDeckId);

            return;

        }


        const cardEditButton =
            event.target.closest(".card-edit-button");

        if (cardEditButton && this.currentEditDeckId) {

            this.openCardEditForm(
                this.currentEditDeckId,
                cardEditButton.dataset.cardId
            );

            return;

        }


        const cardDeleteButton =
            event.target.closest(".card-delete-button");

        if (cardDeleteButton && this.currentEditDeckId) {

            const confirmed =
                window.confirm("このカードを削除します。よろしいですか？");

            if (!confirmed) return;

            StorageManager.deleteCard(
                this.currentEditDeckId,
                cardDeleteButton.dataset.cardId
            );

            App.refreshData();

            UI.showToast("カードを削除しました");

            this.openCardManager(this.currentEditDeckId);

            return;

        }


        const csvExportButton =
            event.target.closest("#csvExportButton");

        if (csvExportButton && this.currentEditDeckId) {

            this.exportDeckCsv(this.currentEditDeckId);

            return;

        }


        const csvImportButton =
            event.target.closest("#csvImportButton");

        if (csvImportButton) {

            const input =
                document.getElementById("csvImportInput");

            if (input) input.click();

            return;

        }


        const csvTemplateButton =
            event.target.closest("#csvTemplateButton");

        if (csvTemplateButton) {

            this.downloadTemplateCsv();

            return;

        }

    },


    // ==========================
    // ファイル選択(CSVインポート)
    // ==========================

    handleChange(event) {

        if (event.target.id === "csvImportInput") {

            const file =
                event.target.files[0];

            if (!file) return;

            const deckId =
                this.currentEditDeckId;

            this.importCsvFile(deckId, file);

            event.target.value = "";

        }

    },


    // ==========================
    // CSV インポート
    // ==========================

    async importCsvFile(deckId, file) {

        if (!deckId) return;

        try {

            const buffer =
                await file.arrayBuffer();

            const text =
                this.decodeCsvBuffer(buffer);

            const rows =
                this.parseCsv(text);

            const cards =
                this.cardsFromCsvRows(rows);

            if (cards.length === 0) {

                UI.showToast(
                    "読み込めるカードが見つかりませんでした"
                );

                return;

            }

            cards.forEach(card => {

                StorageManager.addCard(deckId, card);

            });

            App.refreshData();

            UI.showToast(
                `${cards.length}枚のカードを追加しました`
            );

            this.openCardManager(deckId);

        }
        catch (error) {

            console.error("CSV Import Error:", error);

            UI.showToast(
                "CSVの読み込みに失敗しました。ファイル形式を確認してください"
            );

        }

    },


    // ==========================
    // CSV エクスポート
    // ==========================

    exportDeckCsv(deckId) {

        const deck =
            Lesson.getDecks().find(item => item.id === deckId);

        if (!deck) return;

        const csv =
            this.toCsv(deck.cards);

        this.downloadCsv(
            `${this.sanitizeFilename(deck.name)}.csv`,
            csv
        );

        UI.showToast("CSVを書き出しました");

    },


    downloadTemplateCsv() {

        const rows = [

            ["question", "answer", "example", "exampleTranslation"],

            [
                "implement",
                "実施する・導入する",
                "The company will implement a new remote work policy next month.",
                "会社は来月新しいリモートワーク方針を実施する。"
            ],

            [
                "apple",
                "りんご",
                "",
                ""
            ]

        ];

        const csv =
            rows

                .map(row =>

                    row.map(cell => this.escapeCsvCell(cell)).join(",")

                )

                .join("\r\n");

        this.downloadCsv(
            "QuarterFull_template.csv",
            csv
        );

    },


    // ==========================
    // CSV ユーティリティ
    // ==========================

    // CSVファイルの文字コードを判定してデコードする。
    // Excelの「CSV UTF-8」形式(BOMあり)はUTF-8として、
    // 通常の「CSV」形式(Windows日本語環境ではShift-JIS/CP932で
    // 保存されることが多い)はUTF-8として読めない場合に
    // Shift-JISとして読み直すことで、文字化けを防ぐ。
    decodeCsvBuffer(buffer) {

        const bytes =
            new Uint8Array(buffer);

        const hasUtf8Bom =

            bytes.length >= 3 &&

            bytes[0] === 0xEF &&

            bytes[1] === 0xBB &&

            bytes[2] === 0xBF;


        if (hasUtf8Bom) {

            return new TextDecoder("utf-8").decode(buffer);

        }


        try {

            // UTF-8として厳密にデコードを試みる
            // (不正なバイト列があれば例外を投げる設定)
            return new TextDecoder(
                "utf-8",
                { fatal: true }
            ).decode(buffer);

        }
        catch (error) {

            // UTF-8として読めなかった場合はShift-JISとして読み直す
            return new TextDecoder("shift-jis").decode(buffer);

        }

    },


    // シンプルなCSVパーサー
    // (ダブルクォートで囲まれたカンマ・改行・""によるエスケープに対応)
    parseCsv(text) {

        const content =
            text.replace(/^\uFEFF/, "");

        const rows = [];

        let row = [];

        let field = "";

        let inQuotes = false;


        for (let i = 0; i < content.length; i++) {

            const char = content[i];

            const next = content[i + 1];


            if (inQuotes) {

                if (char === '"' && next === '"') {

                    field += '"';

                    i++;

                }
                else if (char === '"') {

                    inQuotes = false;

                }
                else {

                    field += char;

                }

                continue;

            }


            if (char === '"') {

                inQuotes = true;

            }
            else if (char === ",") {

                row.push(field);

                field = "";

            }
            else if (char === "\r") {

                // 何もしない(\nで処理)

            }
            else if (char === "\n") {

                row.push(field);

                rows.push(row);

                row = [];

                field = "";

            }
            else {

                field += char;

            }

        }


        if (field.length > 0 || row.length > 0) {

            row.push(field);

            rows.push(row);

        }


        return rows.filter(cells =>

            cells.some(cell => cell.trim() !== "")

        );

    },


    // パース済みの行データをカード配列に変換
    // (1列目=question, 2列目=answer, 3列目=example, 4列目=exampleTranslation)
    // 1行目が見出し行(question/answer/例文 等)の場合は除外する
    cardsFromCsvRows(rows) {

        if (rows.length === 0) return [];

        let dataRows = rows;


        const firstRow =
            rows[0].map(cell => cell.trim().toLowerCase());

        const headerKeywords = [
            "question", "answer", "example", "exampletranslation",
            "問題", "答え", "意味", "単語", "例文", "例文の訳", "訳"
        ];

        const looksLikeHeader =

            firstRow.some(cell => headerKeywords.includes(cell));


        if (looksLikeHeader) {

            dataRows = rows.slice(1);

        }


        return dataRows

            .map(row => ({

                question: (row[0] || "").trim(),

                answer: (row[1] || "").trim(),

                example: (row[2] || "").trim(),

                exampleTranslation: (row[3] || "").trim()

            }))

            .filter(card => card.question && card.answer);

    },


    // CSVセルのエスケープ(カンマ・改行・ダブルクォートを含む場合のみ引用符で囲む)
    escapeCsvCell(value) {

        const str = String(value ?? "");

        if (/[",\r\n]/.test(str)) {

            return '"' + str.replace(/"/g, '""') + '"';

        }

        return str;

    },


    // カード配列をCSV文字列に変換
    // (問題, 答え, 例文, 例文の訳 の4列)
    toCsv(cards) {

        const lines = [

            "question,answer,example,exampleTranslation",

            ...cards.map(card =>

                [
                    card.question,
                    card.answer,
                    card.example || "",
                    card.exampleTranslation || ""
                ]
                    .map(cell => this.escapeCsvCell(cell))
                    .join(",")

            )

        ];


        return lines.join("\r\n");

    },


    // CSVファイルとしてダウンロード(Excel対応のためBOM付き)
    downloadCsv(filename, csvText) {

        const bom = "\uFEFF";

        const blob =
            new Blob(

                [bom + csvText],

                { type: "text/csv;charset=utf-8;" }

            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download = filename;

        link.click();

        URL.revokeObjectURL(url);

    },


    // ファイル名として使えない文字を除去
    sanitizeFilename(name) {

        const cleaned =
            (name || "deck")
                .replace(/[\\/:*?"<>|]/g, "_")
                .trim();

        return cleaned || "deck";

    },


    // ==========================
    // デッキ削除
    // ==========================

    confirmDeleteDeck(deckId) {

        const deck =
            Lesson.getDecks().find(item => item.id === deckId);

        if (!deck) return;

        const isBuiltIn =
            App.builtInDecks.some(item => item.id === deckId);

        const message =
            isBuiltIn
                ? `「${deck.name}」は組み込みのサンプルデッキです。削除すると元に戻せません(学習履歴も削除されます)。よろしいですか？`
                : `「${deck.name}」を削除します。学習履歴も削除されます。よろしいですか？`;

        const confirmed =
            window.confirm(message);

        if (!confirmed) return;

        StorageManager.deleteDeck(deckId);

        App.refreshData();

        UI.showToast("デッキを削除しました");

    }


};


// ==========================
// Export
// ==========================

window.DeckManager = DeckManager;
