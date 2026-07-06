/**
 * ==========================================================
 * QuarterFull
 * storage.js
 * Phase 1 Complete Version
 * Part 1
 * ==========================================================
 */

"use strict";


const StorageManager = {


    // ==========================
    // Keys
    // ==========================

    KEYS: {

        SETTINGS: "quarterfull_settings",

        CURRENT: "quarterfull_current",

        PROGRESS: "quarterfull_progress",

        HISTORY: "quarterfull_history",

        STATS: "quarterfull_stats",

        CUSTOM_DECKS: "quarterfull_custom_decks",

        DELETED_DECKS: "quarterfull_deleted_decks"

    },



    // ==========================
    // Initialize
    // ==========================

    init() {

        if (!localStorage.getItem(this.KEYS.SETTINGS)) {

            this.save(
                this.KEYS.SETTINGS,
                {
                    theme: "light",
                    speechRate: 1.0
                }
            );

        }


        if (!localStorage.getItem(this.KEYS.CURRENT)) {

            this.save(
                this.KEYS.CURRENT,
                {
                    deckId: null,
                    cardIndex: 0
                }
            );

        }


        if (!localStorage.getItem(this.KEYS.PROGRESS)) {

            this.save(
                this.KEYS.PROGRESS,
                {}
            );

        }


        if (!localStorage.getItem(this.KEYS.HISTORY)) {

            this.save(
                this.KEYS.HISTORY,
                []
            );

        }


        if (!localStorage.getItem(this.KEYS.STATS)) {

            this.save(
                this.KEYS.STATS,
                {
                    totalAnswered: 0,
                    totalCorrect: 0,
                    streak: 0,
                    lastStudyDate: null
                }
            );

        }


        if (!localStorage.getItem(this.KEYS.CUSTOM_DECKS)) {

            this.save(
                this.KEYS.CUSTOM_DECKS,
                []
            );

        }


        if (!localStorage.getItem(this.KEYS.DELETED_DECKS)) {

            this.save(
                this.KEYS.DELETED_DECKS,
                []
            );

        }

    },



    // ==========================
    // Basic Storage
    // ==========================

    save(key, value) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

            return true;

        }
        catch(error) {

            console.error(
                "Storage save error:",
                error
            );

            return false;

        }

    },



    load(key, defaultValue = null) {

        try {

            const data =
                localStorage.getItem(key);


            if (!data) {

                return defaultValue;

            }


            return JSON.parse(data);

        }
        catch(error) {

            console.error(
                "Storage load error:",
                error
            );

            return defaultValue;

        }

    },



    remove(key) {

        localStorage.removeItem(key);

    },



    clear() {

        Object.values(this.KEYS)
            .forEach(key => {

                localStorage.removeItem(key);

            });

    },



    // ==========================
    // Settings
    // ==========================

    getSettings() {

        return this.load(

            this.KEYS.SETTINGS,

            {
                theme: "light",
                speechRate: 1.0
            }

        );

    },



    saveSettings(settings) {

        return this.save(

            this.KEYS.SETTINGS,

            settings

        );

    },



    getTheme() {

        return this.getSettings().theme;

    },



    setTheme(theme) {


        const settings =
            this.getSettings();


        settings.theme = theme;


        this.saveSettings(settings);


    },



    getSpeechRate() {

        const settings =
            this.getSettings();

        return settings.speechRate ?? 1.0;

    },



    setSpeechRate(rate) {


        const settings =
            this.getSettings();


        settings.speechRate = rate;


        this.saveSettings(settings);


    },



    // ==========================
    // Current Lesson
    // ==========================

    getCurrentLesson() {

        return this.load(

            this.KEYS.CURRENT,

            {
                deckId: null,
                cardIndex: 0
            }

        );

    },



    saveCurrentLesson(
        deckId,
        cardIndex
    ) {

        return this.save(

            this.KEYS.CURRENT,

            {

                deckId,

                cardIndex

            }

        );

    },



    // ==========================
    // Progress
    // ==========================

    getProgress() {

        return this.load(

            this.KEYS.PROGRESS,

            {}

        );

    },



    saveProgress(progress) {

        return this.save(

            this.KEYS.PROGRESS,

            progress

        );

    },


    getDeckProgress(deckId) {


        const progress =
            this.getProgress();


        return progress[deckId] || {};

    },



    updateCardProgress(
        deckId,
        cardId,
        correct
    ) {


        const progress =
            this.getProgress();


        if (!progress[deckId]) {

            progress[deckId] = {};

        }


        const prev =
            progress[deckId][cardId] || {

                interval: 0,

                easeFactor: 2.5,

                reviewCount: 0,

                dueDate: null

            };


        let { interval, easeFactor, reviewCount } = prev;


        if (!correct) {

            // 不正解: 復習回数をリセットし、翌日また出題する
            reviewCount = 0;

            interval = 1;

            easeFactor = Math.max(1.3, easeFactor - 0.2);

        }
        else {

            reviewCount++;

            if (reviewCount === 1) {

                interval = 1;

            }
            else if (reviewCount === 2) {

                interval = 6;

            }
            else {

                interval = Math.round(interval * easeFactor);

            }

            easeFactor = Math.max(1.3, easeFactor + 0.1);

        }


        const dueDate = new Date();

        dueDate.setDate(dueDate.getDate() + interval);


        progress[deckId][cardId] = {

            result: correct,

            interval,

            easeFactor:
                Math.round(easeFactor * 100) / 100,

            reviewCount,

            dueDate:
                dueDate.toISOString(),

            updatedAt:
                new Date().toISOString()

        };


        this.saveProgress(progress);


    },

/**
 * ==========================================================
 * QuarterFull
 * storage.js
 * Phase 1 Complete Version
 * Part 2
 * ==========================================================
 */



    // ==========================
    // History
    // ==========================

    getHistory() {

        return this.load(

            this.KEYS.HISTORY,

            []

        );

    },



    saveHistory(history) {

        return this.save(

            this.KEYS.HISTORY,

            history

        );

    },



    addHistory(record) {


        const history =
            this.getHistory();



        history.push({

            ...record,

            timestamp:
                new Date().toISOString()

        });



        this.saveHistory(history);


    },



    // ==========================
    // Statistics
    // ==========================

    getStats() {

        return this.load(

            this.KEYS.STATS,

            {

                totalAnswered: 0,

                totalCorrect: 0,

                streak: 0,

                lastStudyDate: null

            }

        );

    },



    saveStats(stats) {

        return this.save(

            this.KEYS.STATS,

            stats

        );

    },



    updateStats(isCorrect) {


        const stats =
            this.getStats();



        const today =
            new Date()
                .toISOString()
                .slice(0,10);



        stats.totalAnswered++;



        if (isCorrect) {

            stats.totalCorrect++;

        }



        if (
            stats.lastStudyDate !== today
        ) {


            if (!stats.lastStudyDate) {

                stats.streak = 1;

            }
            else {


                const last =
                    new Date(
                        stats.lastStudyDate
                    );


                const current =
                    new Date(today);



                const diff =
                    Math.floor(
                        (
                            current - last
                        )
                        /
                        (
                            1000 *
                            60 *
                            60 *
                            24
                        )
                    );



                if (diff === 1) {

                    stats.streak++;

                }
                else if (diff > 1) {

                    stats.streak = 1;

                }

            }



            stats.lastStudyDate = today;


        }



        this.saveStats(stats);


    },



    getAccuracy() {


        const stats =
            this.getStats();



        if (
            stats.totalAnswered === 0
        ) {

            return 0;

        }



        return Math.round(

            (
                stats.totalCorrect /
                stats.totalAnswered
            )
            *
            100

        );


    },



    getTodayCount() {


        const today =
            new Date()
                .toISOString()
                .slice(0,10);



        const history =
            this.getHistory();



        return history.filter(item =>

            item.timestamp
                .slice(0,10)
                === today

        ).length;


    },



    // ==========================
    // Deck Statistics
    // ==========================

    getDeckStatistics(deckId) {


        const progress =
            this.getDeckProgress(deckId);



        const cards =
            Object.values(progress);



        const learned =
            cards.length;



        const correct =
            cards.filter(card =>

                card.result === true

            ).length;



        return {


            learned,


            correct,


            accuracy:

                learned === 0

                ? 0

                :

                Math.round(

                    (
                        correct /
                        learned

                    )
                    *
                    100

                )


        };


    },



    // ==========================
    // Custom Decks / Cards
    // ==========================

    generateId(prefix = "id") {

        return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    },


    getCustomDecks() {

        return this.load(

            this.KEYS.CUSTOM_DECKS,

            []

        );

    },


    saveCustomDecks(decks) {

        return this.save(

            this.KEYS.CUSTOM_DECKS,

            decks

        );

    },


    addDeck(name) {


        const decks =
            this.getCustomDecks();


        const deck = {

            id: this.generateId("deck"),

            name: name.trim(),

            custom: true,

            cards: []

        };


        decks.push(deck);


        this.saveCustomDecks(decks);


        return deck;

    },


    updateDeck(deckId, data) {


        const decks =
            this.getCustomDecks();


        const target =
            decks.find(deck => deck.id === deckId);


        if (!target) {

            return null;

        }


        if (typeof data.name === "string") {

            target.name = data.name.trim();

        }


        this.saveCustomDecks(decks);


        return target;

    },


    deleteDeck(deckId) {


        const decks =
            this.getCustomDecks()
                .filter(deck => deck.id !== deckId);


        this.saveCustomDecks(decks);


        // 組み込み(JSON)のサンプルデッキも削除できるよう、
        // 削除済みIDとして記録しておき、次回マージ時に除外する
        const deletedIds =
            this.getDeletedDeckIds();


        if (!deletedIds.includes(deckId)) {

            deletedIds.push(deckId);

            this.saveDeletedDeckIds(deletedIds);

        }


        this.resetDeck(deckId);

    },


    getDeletedDeckIds() {

        return this.load(

            this.KEYS.DELETED_DECKS,

            []

        );

    },


    saveDeletedDeckIds(ids) {

        return this.save(

            this.KEYS.DELETED_DECKS,

            ids

        );

    },


    // 組み込みデッキを初めて編集/カード追加する際に、
    // 編集可能なローカルコピーとしてcustomDecksへ複製する。
    // 既にコピー済みの場合はそれをそのまま返す。
    ensureEditableDeck(deck) {


        const decks =
            this.getCustomDecks();


        const existing =
            decks.find(item => item.id === deck.id);


        if (existing) {

            return existing;

        }


        const cloned = {

            id: deck.id,

            name: deck.name,

            custom: true,

            cards:
                deck.cards.map(card => ({ ...card }))

        };


        decks.push(cloned);


        this.saveCustomDecks(decks);


        return cloned;

    },


    // 組み込みデッキの編集済みコピー(customDecks内)を削除し、
    // 削除済みリストからも除外することで、JSON側の元の内容に戻す
    restoreBuiltInDeck(deckId) {


        const decks =
            this.getCustomDecks()
                .filter(deck => deck.id !== deckId);


        this.saveCustomDecks(decks);


        const deletedIds =
            this.getDeletedDeckIds()
                .filter(id => id !== deckId);


        this.saveDeletedDeckIds(deletedIds);


    },


    addCard(deckId, card) {


        const decks =
            this.getCustomDecks();


        const deck =
            decks.find(item => item.id === deckId);


        if (!deck) {

            return null;

        }


        const newCard = {

            id: this.generateId("card"),

            question: card.question.trim(),

            answer: card.answer.trim(),

            example:
                (card.example || "").trim(),

            exampleTranslation:
                (card.exampleTranslation || "").trim()

        };


        deck.cards.push(newCard);


        this.saveCustomDecks(decks);


        return newCard;

    },


    updateCard(deckId, cardId, data) {


        const decks =
            this.getCustomDecks();


        const deck =
            decks.find(item => item.id === deckId);


        if (!deck) {

            return null;

        }


        const card =
            deck.cards.find(item => item.id === cardId);


        if (!card) {

            return null;

        }


        if (typeof data.question === "string") {

            card.question = data.question.trim();

        }


        if (typeof data.answer === "string") {

            card.answer = data.answer.trim();

        }


        if (typeof data.example === "string") {

            card.example = data.example.trim();

        }


        if (typeof data.exampleTranslation === "string") {

            card.exampleTranslation = data.exampleTranslation.trim();

        }


        this.saveCustomDecks(decks);


        return card;

    },


    deleteCard(deckId, cardId) {


        const decks =
            this.getCustomDecks();


        const deck =
            decks.find(item => item.id === deckId);


        if (!deck) {

            return;

        }


        deck.cards =
            deck.cards.filter(card => card.id !== cardId);


        this.saveCustomDecks(decks);

    },



    // ==========================
    // Backup
    // ==========================

    exportData() {


        return {


            settings:
                this.getSettings(),


            current:
                this.getCurrentLesson(),


            progress:
                this.getProgress(),


            history:
                this.getHistory(),


            stats:
                this.getStats(),


            customDecks:
                this.getCustomDecks(),


            deletedDeckIds:
                this.getDeletedDeckIds()


        };


    },



    importData(data) {


        if (!data) {

            return false;

        }



        if (data.settings) {

            this.saveSettings(
                data.settings
            );

        }



        if (data.current) {

            this.save(
                this.KEYS.CURRENT,
                data.current
            );

        }



        if (data.progress) {

            this.saveProgress(
                data.progress
            );

        }



        if (data.history) {

            this.saveHistory(
                data.history
            );

        }



        if (data.stats) {

            this.saveStats(
                data.stats
            );

        }


        if (data.customDecks) {

            this.saveCustomDecks(
                data.customDecks
            );

        }


        if (data.deletedDeckIds) {

            this.saveDeletedDeckIds(
                data.deletedDeckIds
            );

        }



        return true;


    },



    // ==========================
    // Reset
    // ==========================

    resetDeck(deckId) {


        const progress =
            this.getProgress();



        delete progress[deckId];



        this.saveProgress(progress);


    },



    resetAll() {


        this.clear();


        this.init();


    }


};



// ==========================
// Export
// ==========================

// Object.freeze(StorageManager);


window.StorageManager =
    StorageManager;