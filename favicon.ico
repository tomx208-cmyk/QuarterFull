/**
 * ==========================================================
 * QuarterFull
 * ui.js
 * Phase 2 Complete Version
 * Part 1
 * ==========================================================
 */

"use strict";


const UI = {


    // ==========================
    // DOM Elements
    // ==========================

    elements: {},



    // ==========================
    // Initialize
    // ==========================

    init() {


        this.elements = {


            themeButton:
                document.getElementById(
                    "themeButton"
                ),


            deckList:
                document.getElementById(
                    "deckList"
                ),


            deckTitle:
                document.getElementById(
                    "deckTitle"
                ),


            question:
                document.getElementById(
                    "question"
                ),


            answer:
                document.getElementById(
                    "answer"
                ),


            showAnswerButton:
                document.getElementById(
                    "showAnswerButton"
                ),


            correctButton:
                document.getElementById(
                    "correctButton"
                ),


            wrongButton:
                document.getElementById(
                    "wrongButton"
                ),


            progressText:
                document.getElementById(
                    "progressText"
                ),


            progressFill:
                document.getElementById(
                    "progressFill"
                ),


            todayCount:
                document.getElementById(
                    "todayCount"
                ),


            accuracy:
                document.getElementById(
                    "accuracy"
                ),


            streak:
                document.getElementById(
                    "streak"
                ),


            statisticsContent:
                document.getElementById(
                    "statisticsContent"
                ),


            loading:
                document.getElementById(
                    "loading"
                ),


            toast:
                document.getElementById(
                    "toast"
                ),


            card:
                document.getElementById(
                    "card"
                ),


            lessonButtons:
                document.getElementById(
                    "lessonButtons"
                ),


            previousButton:
                document.getElementById(
                    "previousButton"
                ),


            resetButton:
                document.getElementById(
                    "resetButton"
                ),


            completeScreen:
                document.getElementById(
                    "completeScreen"
                ),


            completeSummary:
                document.getElementById(
                    "completeSummary"
                ),


            retryButton:
                document.getElementById(
                    "retryButton"
                ),


            backToListButton:
                document.getElementById(
                    "backToListButton"
                ),


            exportButton:
                document.getElementById(
                    "exportButton"
                ),


            importButton:
                document.getElementById(
                    "importButton"
                ),


            importFileInput:
                document.getElementById(
                    "importFileInput"
                ),


            newDeckButton:
                document.getElementById(
                    "newDeckButton"
                ),


            modalOverlay:
                document.getElementById(
                    "modalOverlay"
                ),


            modalTitle:
                document.getElementById(
                    "modalTitle"
                ),


            modalBody:
                document.getElementById(
                    "modalBody"
                ),


            modalCloseButton:
                document.getElementById(
                    "modalCloseButton"
                ),


            speakQuestionButton:
                document.getElementById(
                    "speakQuestionButton"
                ),


            speakExampleButton:
                document.getElementById(
                    "speakExampleButton"
                ),


            answerText:
                document.getElementById(
                    "answerText"
                ),


            exampleBlock:
                document.getElementById(
                    "exampleBlock"
                ),


            exampleText:
                document.getElementById(
                    "exampleText"
                ),


            exampleTranslationText:
                document.getElementById(
                    "exampleTranslationText"
                ),


            speechRateSelect:
                document.getElementById(
                    "speechRateSelect"
                )


        };


        this.setupAnimations();


    },


    // ==========================
    // Modal
    // ==========================

    openModal(title, bodyHtml) {


        if (this.elements.modalTitle) {

            this.elements.modalTitle.textContent = title;

        }


        if (this.elements.modalBody) {

            this.elements.modalBody.innerHTML = bodyHtml;

        }


        if (this.elements.modalOverlay) {

            this.elements.modalOverlay.classList.remove("hidden");

        }


    },



    closeModal() {


        if (this.elements.modalOverlay) {

            this.elements.modalOverlay.classList.add("hidden");

        }


        if (this.elements.modalBody) {

            this.elements.modalBody.innerHTML = "";

        }


    },



    // ==========================
    // Deck
    // ==========================

    // ==========================
    // Text to Speech (読み上げ)
    // ==========================

    speak(text, options = {}) {


        if (!text) {

            return;

        }


        if (!("speechSynthesis" in window)) {

            if (!options.silent) {

                this.showToast(
                    "お使いのブラウザは読み上げに対応していません"
                );

            }

            return;

        }


        // 前の発話が残っていればキャンセルしてから再生する
        window.speechSynthesis.cancel();


        const utterance =
            new SpeechSynthesisUtterance(text);


        // 日本語が含まれていれば日本語、それ以外は英語として読み上げる
        const hasJapanese =
            /[\u3040-\u30FF\u4E00-\u9FFF]/.test(text);


        utterance.lang =
            hasJapanese ? "ja-JP" : "en-US";


        const baseRate =
            hasJapanese ? 1.0 : 0.9;


        const speedMultiplier =
            StorageManager.getSpeechRate();


        utterance.rate =
            baseRate * speedMultiplier;


        window.speechSynthesis.speak(utterance);


    },



    // ==========================
    // Toast
    // ==========================

    showToast(message) {


        const toast =
            this.elements.toast;


        if (!toast) return;

        toast.textContent =
            message;


        toast.classList.remove(
            "hidden"
        );

        toast.classList.add(
            "show"
        );

        setTimeout(() => {

            toast.classList.remove(
                "show"
            );


            toast.classList.add(
                "hidden"
            );


        }, 3000);


    },



    // ==========================
    // Complete Screen
    // ==========================

    showComplete(result) {


        if (this.elements.card) {

            this.elements.card.classList.add("hidden");

        }


        if (this.elements.lessonButtons) {

            this.elements.lessonButtons.classList.add("hidden");

        }


        if (this.elements.completeSummary) {

            this.elements.completeSummary.textContent =
                `${result.total}問中 ${result.correct}問正解（正答率 ${result.accuracy}%）`;

        }


        if (this.elements.completeScreen) {

            this.elements.completeScreen.classList.remove("hidden");

            this.elements.completeScreen.classList.remove("card-animation");

            void this.elements.completeScreen.offsetWidth;

            this.elements.completeScreen.classList.add("card-animation");

        }


    },



    hideComplete() {


        if (this.elements.completeScreen) {

            this.elements.completeScreen.classList.add("hidden");

        }


        if (this.elements.card) {

            this.elements.card.classList.remove("hidden");

        }


        if (this.elements.lessonButtons) {

            this.elements.lessonButtons.classList.remove("hidden");

        }


    },




    // ==========================
    // Animation Setup
    // ==========================

    setupAnimations() {


        const question =
            this.elements.question;


        const answer =
            this.elements.answer;


        if (question) {

            question.classList.add(
                "card-animation"
            );

        }


        if (answer) {

            answer.classList.add(
                "answer-animation"
            );

        }


    },



    // ==========================
    // Screen Animation
    // ==========================

    animateQuestion() {


        const target =
            this.elements.question;


        if (!target) return;


        target.classList.remove(
            "card-animation"
        );


        void target.offsetWidth;


        target.classList.add(
            "card-animation"
        );


    },


    animateAnswer() {


        const target =
            this.elements.answer;


        if (!target) return;


        target.classList.remove(
            "answer-animation"
        );


        void target.offsetWidth;


        target.classList.add(
            "answer-animation"
        );


    },


    // ==========================
    // Utility
    // ==========================

    escapeHtml(text) {


        const map = {

            "&": "&amp;",

            "<": "&lt;",

            ">": "&gt;",

            '"': "&quot;",

            "'": "&#39;"

        };


        return String(text ?? "").replace(

            /[&<>"']/g,

            char => map[char]

        );


    },



    // ==========================
    // Deck List
    // ==========================

    renderDeckList(decks) {


        const container =
            this.elements.deckList;



        container.innerHTML = "";


        if (!decks || decks.length === 0) {

            container.innerHTML = `
                <p class="empty-message">
                    デッキがまだありません。「＋」から作成しましょう。
                </p>
            `;

            return;

        }



        decks.forEach(deck => {


            const item =
                document.createElement(
                    "div"
                );



            item.className =
                "deck-item deck-card";



            item.dataset.id =
                deck.id;



            const editButtons = `
                        <div class="deck-actions">

                            <button
                                class="deck-edit-button"
                                data-deck-id="${deck.id}"
                                aria-label="デッキを編集"
                                title="デッキを編集">
                                ✏️
                            </button>

                            <button
                                class="deck-delete-button"
                                data-deck-id="${deck.id}"
                                aria-label="デッキを削除"
                                title="デッキを削除">
                                🗑️
                            </button>

                        </div>
                      `;



            item.innerHTML = `

                <div class="deck-name">

                    ${this.escapeHtml(deck.name)}

                </div>


                <div class="deck-count">

                    ${deck.cards.length} 枚

                </div>

                ${editButtons}

            `;



            container.appendChild(item);


        });


    },



    setActiveDeck(deckId) {


        document
            .querySelectorAll(
                ".deck-item"
            )
            .forEach(item => {


                item.classList.toggle(

                    "active",

                    item.dataset.id === deckId

                );


            });


    },



    // ==========================
    // Lesson Card
    // ==========================

    renderCard(card) {


        this.hideComplete();


        this.elements.question.textContent =
            card.question;


        this.elements.answerText.textContent =
            card.answer;


        // 例文の表示切り替え
        if (card.example) {

            this.elements.exampleText.textContent =
                card.example;

            this.elements.exampleTranslationText.textContent =
                card.exampleTranslation || "";

            this.elements.exampleBlock
                .classList
                .remove("hidden");

        }
        else {

            this.elements.exampleText.textContent = "";

            this.elements.exampleTranslationText.textContent = "";

            this.elements.exampleBlock
                .classList
                .add("hidden");

        }


        // 読み上げボタン用に対象テキストを保持
        this.elements.speakQuestionButton
            .classList
            .remove("hidden");

        this.elements.speakQuestionButton.dataset.text =
            card.question || "";


        this.elements.speakExampleButton.dataset.text =
            card.example || "";


        // 単語はボタンを押さなくても自動で読み上げる
        this.speak(card.question, { silent: true });


        this.hideAnswer();



        this.elements.correctButton
            .classList
            .add("hidden");



        this.elements.wrongButton
            .classList
            .add("hidden");



        this.elements.showAnswerButton
            .classList
            .remove("hidden");

    this.animateQuestion();

    },




    clearCard() {


        this.hideComplete();


        this.elements.question.textContent =
            "デッキを選択してください。";


        this.elements.answerText.textContent =
            "";


        this.elements.exampleText.textContent = "";

        this.elements.exampleTranslationText.textContent = "";

        this.elements.exampleBlock
            .classList
            .add("hidden");


        this.elements.speakQuestionButton
            .classList
            .add("hidden");

        this.elements.speakQuestionButton.dataset.text = "";

        this.elements.speakExampleButton.dataset.text = "";


    },



    showAnswer() {


        this.elements.answer
            .classList
            .remove(
                "hidden"
            );



        this.elements.showAnswerButton
            .classList
            .add(
                "hidden"
            );



        this.elements.correctButton
            .classList
            .remove(
                "hidden"
            );



        this.elements.wrongButton
            .classList
            .remove(
                "hidden"
            );

        this.animateAnswer();

    },





    hideAnswer() {


        this.elements.answer
            .classList
            .add(
                "hidden"
            );


    },

/**
 * ==========================================================
 * QuarterFull
 * ui.js
 * Phase 1 Complete Version
 * Part 2
 * ==========================================================
 */



    // ==========================
    // Progress
    // ==========================

    updateProgress(
        current,
        total
    ) {


        if (!total) {

            this.elements.progressText.textContent =
                "0 / 0";


            this.elements.progressFill.style.width =
                "0%";


            return;

        }



        const percent =
            Math.round(
                (current / total) * 100
            );



        this.elements.progressText.textContent =
            `${current} / ${total}`;



        this.elements.progressFill.style.width =
            `${percent}%`;


    },



    // ==========================
    // Deck Title
    // ==========================

    setDeckTitle(title) {


        this.elements.deckTitle.textContent =
            title;


    },



    // ==========================
    // Dashboard
    // ==========================

    updateDashboard() {


        if (!window.StorageManager) {

            return;

        }



        const today =
            StorageManager.getTodayCount();



        const accuracy =
            StorageManager.getAccuracy();



        const stats =
            StorageManager.getStats();



        this.elements.todayCount.textContent =
            today;



        this.elements.accuracy.textContent =
            `${accuracy}%`;



        this.elements.streak.textContent =
            `${stats.streak}日`;


    },



    // ==========================
    // Statistics
    // ==========================

    renderStatistics(
        data
    ) {


        const container =
            this.elements.statisticsContent;



        container.innerHTML = `

            <div class="statistics-card">

                <h3>
                    学習状況
                </h3>


                <div class="statistics-item">

                    <span class="statistics-label">
                        学習済み
                    </span>


                    <span class="statistics-value">

                        ${data.learned}

                    </span>

                </div>



                <div class="statistics-item">

                    <span class="statistics-label">
                        正解数
                    </span>


                    <span class="statistics-value">

                        ${data.correct}

                    </span>

                </div>



                <div class="statistics-item">

                    <span class="statistics-label">
                        正答率
                    </span>


                    <span class="statistics-value">

                        ${data.accuracy}%

                    </span>

                </div>


            </div>

        `;


    },



    clearStatistics() {


        this.elements.statisticsContent.textContent =
            "デッキを選択してください。";


    },



    // ==========================
    // Theme
    // ==========================

    applyTheme(theme) {


        if (theme === "dark") {


            document.body.classList.add(
                "dark"
            );


            this.elements.themeButton.textContent =
                "☀️";


        }
        else {


            document.body.classList.remove(
                "dark"
            );


            this.elements.themeButton.textContent =
                "🌙";


        }


    },



    toggleTheme() {


        const current =
            StorageManager.getTheme();



        const next =
            current === "dark"
                ? "light"
                : "dark";



        StorageManager.setTheme(
            next
        );



        this.applyTheme(
            next
        );


    },



    // ==========================
    // Loading
    // ==========================

    showLoading() {


        this.elements.loading
            .classList
            .remove(
                "hidden"
            );


    },



    hideLoading() {


        this.elements.loading
            .classList
            .add(
                "hidden"
            );


    },




    // ==========================
    // Button State
    // ==========================

    resetButtons() {


        this.elements.showAnswerButton
            .classList
            .remove(
                "hidden"
            );



        this.elements.correctButton
            .classList
            .add(
                "hidden"
            );



        this.elements.wrongButton
            .classList
            .add(
                "hidden"
            );


    },



    // ==========================
    // Export
    // ==========================

    downloadBackup() {


        const data =
            StorageManager.exportData();



        const blob =
            new Blob(

                [
                    JSON.stringify(
                        data,
                        null,
                        2
                    )
                ],

                {
                    type:
                    "application/json"
                }

            );



        const url =
            URL.createObjectURL(
                blob
            );



        const link =
            document.createElement(
                "a"
            );



        link.href =
            url;



        link.download =
            "quarterfull_backup.json";



        link.click();



        URL.revokeObjectURL(
            url
        );


    }


};



// ==========================
// Export
// ==========================

// Object.freeze(UI);


window.UI = UI;