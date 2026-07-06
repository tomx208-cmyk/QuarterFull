/**
 * ==========================================================
 * QuarterFull
 * lesson.js
 * Phase 1 Complete Version
 * Part 1
 * ==========================================================
 */

"use strict";


const Lesson = {


    // ==========================
    // Data
    // ==========================

    decks: [],

    currentDeck: null,

    currentIndex: 0,

    currentCard: null,

    sessionCorrect: 0,

    orderedCards: [],



    // ==========================
    // Initialize
    // ==========================

    init(data) {


        this.decks = data;


        const saved =
            StorageManager.getCurrentLesson();



        if (saved.deckId) {


            const deck =
                this.decks.find(item =>

                    item.id === saved.deckId

                );



            if (deck) {


                this.selectDeck(
                    saved.deckId
                );


                this.currentIndex =
                    saved.cardIndex || 0;


            }


        }


    },



    // ==========================
    // Deck
    // ==========================

    getDecks() {


        return this.decks;


    },



    setDecks(decks) {


        this.decks = decks;


        if (this.currentDeck) {


            const updated =
                decks.find(item =>

                    item.id === this.currentDeck.id

                );


            if (!updated) {

                // 現在開いていたデッキが削除された場合は一覧に戻る
                this.backToList();

                return;

            }


            this.currentDeck = updated;

            this.orderedCards =
                this.buildStudyOrder(updated);


            if (this.currentIndex >= this.orderedCards.length) {

                this.currentIndex = 0;

            }


            this.showCurrentCard();

        }


    },



    getCurrentDeck() {


        return this.currentDeck;


    },



    selectDeck(deckId) {


        const deck =
            this.decks.find(item =>

                item.id === deckId

            );



        if (!deck) {


            return false;


        }



        this.currentDeck =
            deck;



        this.currentIndex =
            0;


        this.sessionCorrect =
            0;


        this.orderedCards =
            this.buildStudyOrder(deck);



        StorageManager.saveCurrentLesson(

            deckId,

            0

        );



        UI.setActiveDeck(
            deckId
        );



        UI.setDeckTitle(
            deck.name
        );



        this.showCurrentCard();



        return true;


    },



    // ==========================
    // Card
    // ==========================

    getCards() {


        return this.orderedCards;


    },



    // ==========================
    // Study Order (Spaced Repetition)
    // ==========================
    //
    // 復習期限を過ぎているカードや、前回間違えたカードほど
    // 優先的に先頭へ並べる簡易間隔反復ロジック。
    // 期限管理自体は StorageManager.updateCardProgress() の
    // SM-2簡易版で行っている。

    buildStudyOrder(deck) {


        if (!deck || !deck.cards) {

            return [];

        }


        // シャッフルモードが有効な場合は、優先度順ではなく
        // ランダムな順番でカードを出題する
        if (StorageManager.getShuffleMode()) {

            return this.shuffleCards(deck.cards);

        }


        const progress =
            StorageManager.getDeckProgress(deck.id);


        const now = Date.now();

        const DAY_MS = 24 * 60 * 60 * 1000;


        const scored =
            deck.cards.map(card => {


                const p = progress[card.id];


                let score;


                if (!p) {

                    // 未学習カードは中程度の優先度で混ぜる
                    score = 45;

                }
                else {

                    const due =
                        p.dueDate
                            ? new Date(p.dueDate).getTime()
                            : now;


                    const overdueDays =
                        (now - due) / DAY_MS;


                    const wrongBonus =
                        p.result === false ? 30 : 0;


                    score = overdueDays + wrongBonus;

                }


                return { card, score };


            });


        scored.sort((a, b) => b.score - a.score);


        return scored.map(item => item.card);


    },



    // カード配列をFisher-Yatesアルゴリズムでシャッフルする
    // (元の配列は変更せず、新しい配列を返す)
    shuffleCards(cards) {


        const shuffled =
            [...cards];


        for (let i = shuffled.length - 1; i > 0; i--) {

            const j =
                Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] =
                [shuffled[j], shuffled[i]];

        }


        return shuffled;


    },



    getCurrentCard() {


        const cards =
            this.getCards();



        return cards[this.currentIndex];


    },



    showCurrentCard() {


        const card =
            this.getCurrentCard();



        if (!card) {


            UI.clearCard();


            return;


        }



        this.currentCard =
            card;



        UI.renderCard(
            card
        );



        UI.updateProgress(

            this.currentIndex + 1,

            this.getCards().length

        );



        StorageManager.saveCurrentLesson(

            this.currentDeck.id,

            this.currentIndex

        );


    },



    // ==========================
    // Answer
    // ==========================

    showAnswer() {


        UI.showAnswer();


    },



    // ==========================
    // Result
    // ==========================

    answer(
        result
    ) {


        if (!this.currentCard) {


            return;


        }



        const correct =
            result === true;


        if (correct) {

            this.sessionCorrect++;

        }



        StorageManager.updateCardProgress(

            this.currentDeck.id,

            this.currentCard.id,

            correct

        );



        StorageManager.addHistory({

            deckId:
                this.currentDeck.id,


            cardId:
                this.currentCard.id,


            correct

        });



        StorageManager.updateStats(

            correct

        );



        UI.updateDashboard();


        this.nextCard();


    },

/**
 * ==========================================================
 * QuarterFull
 * lesson.js
 * Phase 1 Complete Version
 * Part 2
 * ==========================================================
 */



    // ==========================
    // Next Card
    // ==========================

    nextCard() {


        const total =
            this.getCards().length;



        this.currentIndex++;



        if (
            this.currentIndex >= total
        ) {


            this.complete();


            return;


        }



        this.showCurrentCard();


    },



    // ==========================
    // Complete
    // ==========================

    complete() {


        const total =
            this.getCards().length;


        const correct =
            this.sessionCorrect;


        const accuracy =
            total === 0
                ? 0
                : Math.round(
                    (correct / total) * 100
                );



        UI.updateProgress(

            total,

            total

        );



        UI.showToast(

            "このデッキを完了しました！"

        );



        this.currentIndex = 0;



        StorageManager.saveCurrentLesson(

            this.currentDeck.id,

            0

        );


        UI.showComplete({

            total,

            correct,

            accuracy

        });


    },



    // ==========================
    // Retry
    // ==========================

    retry() {


        if (!this.currentDeck) {


            return;


        }


        this.currentIndex = 0;

        this.sessionCorrect = 0;

        this.orderedCards =
            this.buildStudyOrder(this.currentDeck);


        UI.hideComplete();

        this.showCurrentCard();


    },



    // 出題順の設定(シャッフルON/OFFなど)が変わった際に、
    // 現在学習中のデッキがあればすぐに並び順を再計算する
    refreshOrder() {


        if (!this.currentDeck) {


            return;


        }


        this.orderedCards =
            this.buildStudyOrder(this.currentDeck);


        this.currentIndex = 0;


        this.showCurrentCard();


    },



    // ==========================
    // Back To Deck List
    // ==========================

    backToList() {


        this.currentDeck = null;

        this.currentIndex = 0;

        this.currentCard = null;

        this.sessionCorrect = 0;


        StorageManager.saveCurrentLesson(

            null,

            0

        );


        UI.setActiveDeck(null);

        UI.setDeckTitle(
            "デッキを選択してください"
        );

        UI.hideComplete();

        UI.clearCard();

        UI.updateProgress(0, 0);

        UI.clearStatistics();


    },



    // ==========================
    // Previous Card
    // ==========================

    previousCard() {


        if (
            this.currentIndex <= 0
        ) {


            return;


        }



        this.currentIndex--;



        this.showCurrentCard();


    },



    // ==========================
    // Statistics
    // ==========================

    updateStatistics() {


        if (!this.currentDeck) {


            return;


        }



        const stats =

            StorageManager
                .getDeckStatistics(

                    this.currentDeck.id

                );



        UI.renderStatistics(

            stats

        );


    },



    // ==========================
    // Reset
    // ==========================

    resetDeck() {


        if (!this.currentDeck) {


            return;


        }



        StorageManager.resetDeck(

            this.currentDeck.id

        );



        this.currentIndex = 0;

        this.sessionCorrect = 0;

        this.orderedCards =
            this.buildStudyOrder(this.currentDeck);


        this.showCurrentCard();


    },



    // ==========================
    // Search
    // ==========================

    findCard(cardId) {


        const cards =
            this.getCards();



        return cards.find(card =>

            card.id === cardId

        );


    },



    // ==========================
    // Status
    // ==========================

    getStatus() {


        return {


            deck:

                this.currentDeck,


            index:

                this.currentIndex,


            total:

                this.getCards().length,


            card:

                this.currentCard


        };


    }



};



// ==========================
// Export
// ==========================

// Object.freeze(Lesson);


window.Lesson = Lesson;