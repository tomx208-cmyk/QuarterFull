/**
 * ==========================================================
 * QuarterFull
 * app.js
 * Phase 1 Complete Version
 * ==========================================================
 */

"use strict";


const App = {


    // ==========================
    // Data
    // ==========================

    DATA_PATH:

        "data/sample.json",



    // ==========================
    // Initialize
    // ==========================

    async init() {

        UI.init();

        UI.showLoading();


        try {


            StorageManager.init();


            UI.applyTheme(

                StorageManager.getTheme()

            );


            if (UI.elements.speechRateSelect) {

                const savedRate =
                    String(StorageManager.getSpeechRate());


                const hasOption =
                    Array.from(
                        UI.elements.speechRateSelect.options
                    ).some(option => option.value === savedRate);


                UI.elements.speechRateSelect.value =
                    hasOption ? savedRate : "1";


                if (!hasOption) {

                    StorageManager.setSpeechRate(1);

                }

            }


            UI.setShuffleButtonState(
                StorageManager.getShuffleMode()
            );



            await this.loadData();



            // 復元処理(Lesson.init)が「選択中」表示を
            // 反映できるよう、デッキ一覧は先に描画する

            this.start();



            Lesson.init(

                this.data

            );



            this.bindEvents();


            DeckManager.init();



            UI.updateDashboard();



            UI.hideLoading();



        }
        catch(error) {


            console.error(

                "App Initialize Error:",

                error

            );



            UI.hideLoading();



            UI.showToast(

                "読み込みに失敗しました"

            );


        }


    },



    // ==========================
    // Load JSON
    // ==========================

    async loadData() {


        const response =

            await fetch(

                this.DATA_PATH

            );



        if (!response.ok) {


            throw new Error(

                "Data Load Failed"

            );


        }



        const builtIn =

            await response.json();


        this.builtInDecks =

            builtIn.map(deck => ({

                ...deck,

                custom: false

            }));


        this.mergeDecks();


    },



    // ==========================
    // Merge Built-in + Custom Decks
    // ==========================

    mergeDecks() {


        const custom =

            StorageManager.getCustomDecks();


        const customIds =

            new Set(custom.map(deck => deck.id));


        const deletedIds =

            new Set(StorageManager.getDeletedDeckIds());


        // customDecksに複製(編集)済み、または削除済みの
        // 組み込みデッキは、元のJSON版を表示対象から除外する
        const builtInRemaining =

            this.builtInDecks.filter(deck =>

                !customIds.has(deck.id) &&

                !deletedIds.has(deck.id)

            );


        this.data =

            [

                ...builtInRemaining,

                ...custom

            ];


    },



    // ==========================
    // Refresh After CRUD
    // ==========================

    refreshData() {


        this.mergeDecks();


        Lesson.setDecks(this.data);


        UI.renderDeckList(this.data);


    },



    // ==========================
    // Events
    // ==========================

    bindEvents() {



        // テーマ変更

        UI.elements.themeButton

            .addEventListener(

                "click",

                () => {


                    UI.toggleTheme();


                }

            );




        // ランダム出題の切り替え

        UI.elements.shuffleButton

            .addEventListener(

                "click",

                () => {


                    const enabled =
                        !StorageManager.getShuffleMode();


                    StorageManager.setShuffleMode(
                        enabled
                    );


                    UI.setShuffleButtonState(
                        enabled
                    );


                    Lesson.refreshOrder();


                    UI.showToast(

                        enabled
                            ? "🔀 ランダム出題にしました"
                            : "優先度順(間隔反復)に戻しました"

                    );


                }

            );




        // 読み上げ速度の変更

        UI.elements.speechRateSelect

            .addEventListener(

                "change",

                () => {


                    const rate =
                        parseFloat(
                            UI.elements.speechRateSelect.value
                        );


                    StorageManager.setSpeechRate(rate);


                    UI.showToast(
                        `読み上げ速度を${rate}倍にしました`
                    );


                }

            );





        // デッキ選択・編集・削除

        UI.elements.deckList

            .addEventListener(

                "click",

                event => {


                    const editButton =

                        event.target.closest(
                            ".deck-edit-button"
                        );


                    if (editButton) {

                        DeckManager.openEditDeck(
                            editButton.dataset.deckId
                        );

                        return;

                    }


                    const deleteButton =

                        event.target.closest(
                            ".deck-delete-button"
                        );


                    if (deleteButton) {

                        DeckManager.confirmDeleteDeck(
                            deleteButton.dataset.deckId
                        );

                        return;

                    }


                    const item =

                        event.target.closest(

                            ".deck-item"

                        );


                    if (!item) {


                        return;


                    }


                    Lesson.selectDeck(

                        item.dataset.id

                    );


                    Lesson.updateStatistics();


                    UI.scrollToDeckTitle();


                }

            );


        // 新しいデッキを作成

        UI.elements.newDeckButton

            .addEventListener(

                "click",

                () => {


                    DeckManager.openNewDeckForm();


                }

            );





        // 答えを見る

        UI.elements.showAnswerButton

            .addEventListener(

                "click",

                () => {


                    Lesson.showAnswer();


                }

            );




        // 単語の発音を聞く

        UI.elements.speakQuestionButton

            .addEventListener(

                "click",

                () => {


                    UI.speak(

                        UI.elements.speakQuestionButton.dataset.text

                    );


                }

            );




        // 例文の発音を聞く

        UI.elements.speakExampleButton

            .addEventListener(

                "click",

                () => {


                    UI.speak(

                        UI.elements.speakExampleButton.dataset.text

                    );


                }

            );





        // 正解

         UI.elements.correctButton

        .addEventListener(

            "click",

            () => {


               UI.showToast(
                    "⭕ 正解！"
                );


                Lesson.answer(
                    true
                );

                Lesson.updateStatistics();


            }

        );




        // 不正解

        UI.elements.wrongButton

        .addEventListener(

            "click",

            () => {


                UI.showToast(
                    "❌ 不正解"
                );


                Lesson.answer(
                    false
                );

                Lesson.updateStatistics();


            }

        );




        // デッキの学習履歴をリセット

        UI.elements.resetButton

            .addEventListener(

                "click",

                () => {


                    if (!Lesson.getCurrentDeck()) {

                        return;

                    }


                    const confirmed =
                        window.confirm(
                            "このデッキの学習履歴をリセットします。よろしいですか？"
                        );


                    if (!confirmed) {

                        return;

                    }


                    Lesson.resetDeck();

                    Lesson.updateStatistics();

                    UI.updateDashboard();


                    UI.showToast(
                        "学習データをリセットしました"
                    );


                }

            );




        // 完了画面：もう一度

        UI.elements.retryButton

            .addEventListener(

                "click",

                () => {


                    Lesson.retry();


                }

            );




        // 完了画面：デッキ一覧に戻る

        UI.elements.backToListButton

            .addEventListener(

                "click",

                () => {


                    Lesson.backToList();


                }

            );




        // バックアップ書き出し

        UI.elements.exportButton

            .addEventListener(

                "click",

                () => {


                    UI.downloadBackup();


                    UI.showToast(
                        "バックアップを書き出しました"
                    );


                }

            );




        // バックアップ読み込み

        UI.elements.importButton

            .addEventListener(

                "click",

                () => {


                    UI.elements.importFileInput.click();


                }

            );




        UI.elements.importFileInput

            .addEventListener(

                "change",

                async event => {


                    const file =
                        event.target.files[0];


                    if (!file) {

                        return;

                    }


                    try {


                        const text =
                            await file.text();


                        const data =
                            JSON.parse(text);


                        const success =
                            StorageManager.importData(data);


                        if (success) {


                            UI.showToast(
                                "バックアップを読み込みました"
                            );


                            Lesson.backToList();

                            UI.updateDashboard();


                        }
                        else {


                            UI.showToast(
                                "読み込みに失敗しました"
                            );


                        }


                    }
                    catch (error) {


                        console.error(
                            "Import Error:",
                            error
                        );


                        UI.showToast(
                            "ファイルの形式が正しくありません"
                        );


                    }


                    event.target.value = "";


                }

            );


    },



    // ==========================
    // Start
    // ==========================

    start() {


        const decks =

            this.data;



        UI.renderDeckList(

            decks

        );


    }



};



// ==========================
// Start Application
// ==========================

document.addEventListener(

    "DOMContentLoaded",

    async () => {


        await App.init();


    }

);



// ==========================
// Service Worker (PWA)
// ==========================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker

            .register("./sw.js")

            .catch(error => {

                console.error(
                    "Service Worker registration failed:",
                    error
                );

            });

    });

}



// Export

window.App = App;