// by: technodoomedone
 
/* ===============================================================================================
     Stores all available Torment cards so they might be used.
 =============================================================================================== */
/* -----------------------------------------------------------------------------------------------
     Classification of the different types of Torment cards that exist. 
 ----------------------------------------------------------------------------------------------- */
let CardType = {
    BASIC:      1,
    STACKABLE:  2,
    ALTERED:    3,
    META:       4,
    CHALLENGE:  5,
    RUN_CHOICE: 6
};

/* -----------------------------------------------------------------------------------------------
     Classification of the rarities that Torment cards can have, as weights to be offered.
     Weight is based on current difficulty.
 ----------------------------------------------------------------------------------------------- */
let CardRarity = {
    SPAM:             [25, 25, 25, 25, 25], // The card will be spammed as an option whenever possible.
    PERMANENT_COMMON: [11,  1,  1,  1,  1], // Common. Always a choice regardless of difficulty.
    COMMON:           [11,  1,  0,  0,  0], // Common. Will not be offered anymore as difficulty increases.
    UNCOMMON:         [ 6,  6,  6,  6,  1], // Uncommon.
    LOCKED_UNCOMMON:  [ 0,  6,  6,  6,  1], // Uncommon. Only ever gets offered after difficulty increases.
    RARE:             [ 3,  3,  3,  3,  3], // Rare.
    LOCKED_RARE:      [ 0,  3,  3,  3,  3], // Rare. Only ever gets offered after difficulty increases.
    NEVER_OFFER:      [ 0,  0,  0,  0,  0]  // Will never be offered normally.
};

/* -----------------------------------------------------------------------------------------------
     Template to create any Torment card. 
     Stores all the necessary information: card type, rarity, image, text, and rounds in which 
     it can't be offered.
 ----------------------------------------------------------------------------------------------- */
class Card {
    constructor(params) {
        this.type      = params.type;
        this.rarity    = params.rarity;
        this.image     = params.image;
        this.text      = params.text;
        this.no_rounds = params.forbidden_rounds;
    }

    // Calculates the weight of the card based on specified difficulty.
    // If the round is a forbbiden round for this card, its weight is 0 and can't be offered.
    weight(round, difficulty) {
        if (this.no_rounds.indexOf(round) != -1) {
            return 0;
        }
        else {
            return this.rarity[Math.min(4, difficulty)];
        }
    }
}

/* -----------------------------------------------------------------------------------------------
     Define and store all Torment cards.
 ----------------------------------------------------------------------------------------------- */
let blankCard = new Card({ type: null, 
                           rarity: null, 
                           image: "./images/BasicUnknown.gif",
                           text: "",
                           forbidden_rounds: null});

let basicCards = [
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.PERMANENT_COMMON,
              image:   "./images/Basic1.gif",
              text:    "Broken van monitors",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Basic2.gif",
              text:    "No cursed possession",
              forbidden_rounds: []}),
    
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.RARE,
              image:   "./images/Basic3.gif",
              text:    "Player sprint reduced by 1 second",
              forbidden_rounds: []}),
    
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.LOCKED_RARE,
              image:   "./images/Basic4.gif",
              text:    "Player speed reduced by 25%",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Basic5.gif",
              text:    "Reduced ghost activity",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.PERMANENT_COMMON,
              image:   "./images/Basic6.gif",
              text:    "1 second grace period in hunts",
              forbidden_rounds: []}),
    
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.LOCKED_UNCOMMON,
              image:   "./images/Basic7.gif",
              text:    "Ghost will change rooms more often",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.RARE,
              image:   "./images/Basic8.gif",
              text:    "Ghost roams the building more often",
              forbidden_rounds: []}),
    
    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Basic9.gif",
              text:    "Fingerprint chance is 50%",
              forbidden_rounds: []}),

    new Card({type:    CardType.BASIC, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Basic10.gif",
              text:    "Increased ghost event chance",
              forbidden_rounds: []})
];
    
let stackableCards = [
    new Card({type:    CardType.STACKABLE, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Stackable1.gif",
              text:    "Starting sanity is {X}%",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.STACKABLE, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Stackable2.gif",
              text:    "Pills restore {X}% sanity",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.STACKABLE, 
              rarity:  CardRarity.PERMANENT_COMMON,
              image:   "./images/Stackable3.gif",
              text:    "Sanity loss increased to {X}%",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.STACKABLE, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Stackable4.gif",
              text:    "Ghost moves at {X}% speed",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.STACKABLE, 
              rarity:  CardRarity.RARE,
              image:   "./images/Stackable5.gif",
              text:    "Ghost only leaves {X} evidence",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.STACKABLE, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Stackable6.gif",
              text:    "Sprint cooldown is {X} seconds",
              forbidden_rounds: []})
];
   
let alteredCards = [
    new Card({type:    CardType.ALTERED, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Stackable1_Alt.gif",
              text:    "Starting sanity is 0%",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.ALTERED, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Stackable2_Alt.gif",
              text:    "No sanity restored by pills",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.ALTERED, 
              rarity:  CardRarity.PERMANENT_COMMON,
              image:   "./images/Stackable3_Alt.gif",
              text:    "Sanity loss is tripled",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.ALTERED, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Stackable4_Alt.gif",
              text:    "Ghost moves at double speed",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.ALTERED, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Stackable5_Alt.gif",
              text:    "Ghost leaves no evidence",
              forbidden_rounds: []}),

    new Card({type:    CardType.ALTERED, 
              rarity:  CardRarity.RARE,
              image:   "./images/Stackable6_Alt.gif",
              text:    "Sprinting is disabled",
              forbidden_rounds: []})
];

let metaCards = [
    new Card({type:    CardType.META, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Meta1.gif",
              text:    "Pick an extra card next time",
              forbidden_rounds: [1, 4]}), // Would be too OP if next round is non-challenge.
                                          // Having to pick 3 modifiers you don't even know is scary.
   
    new Card({type:    CardType.META, 
              rarity:  CardRarity.PERMANENT_COMMON,
              image:   "./images/Meta2.gif",
              text:    "Pick a challenge next time",
              forbidden_rounds: [2, 5]}), // Makes no sense to offer it before a challenge round.
                                          // Otherwise, it would do nothing.
   
    new Card({type:    CardType.META, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Meta3.gif",
              text:    "All cards are a mystery next time",
              forbidden_rounds: []}), 
   
    new Card({type:    CardType.META, 
              rarity:  CardRarity.RARE,
              image:   "./images/Meta4.gif",
              text:    "Some cards will be much worse",
              forbidden_rounds: [5]}), // Makes no sense to offer it, when it has no time to do anything.

    new Card({type:    CardType.META, 
              rarity:  CardRarity.PERMANENT_COMMON,
              image:   "./images/Meta5.gif",
              text:    "Random cards are offered. Pick again",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.META, 
              rarity:  CardRarity.LOCKED_UNCOMMON,
              image:   "./images/Meta6.gif",
              text:    "Change all offered cards. Pick again",
              forbidden_rounds: []}),

    new Card({type:    CardType.META, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Meta7.gif",
              text:    "Change map to a bigger one",
              forbidden_rounds: [1, 2]}), // Pretty much a freebie. Appears only later in the run.
   
    new Card({type:    CardType.META, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Meta8.gif",
              text:    "Slightly increase card difficulty",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.META, 
              rarity:  CardRarity.LOCKED_RARE,
              image:   "./images/Meta9.gif",
              text:    "Further increase card difficulty",
              forbidden_rounds: []}),

    new Card({type:    CardType.META, 
              rarity:  CardRarity.SPAM,
              image:   "./images/Meta10.gif",
              text:    "Pick all cards. Get a big map. End run now",
              forbidden_rounds: [1, 2, 4]}), // Only ever offered on 5th round to end early.

    new Card({type:    CardType.META, 
              rarity:  CardRarity.NEVER_OFFER,
              image:   "./images/MetaSpecial1.gif",
              text:    "Pick 2 challenges next time",
              forbidden_rounds: []}),

    new Card({type:    CardType.META, 
              rarity:  CardRarity.NEVER_OFFER,
              image:   "./images/MetaSpecial2.gif",
              text:    "Greatly increase card difficulty",
              forbidden_rounds: []}), 

    new Card({type:    CardType.META, 
              rarity:  CardRarity.NEVER_OFFER,
              image:   "./images/MetaSpecial3.gif",
              text:    "Golden cards will not be offered",
              forbidden_rounds: []}) 
];
   
let challengeCards = [
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Challenge1.gif",
              text:    "Photo randomizer",
              forbidden_rounds: [1, 2]}), // This is a pretty gimmicky challenge. 
                                          // Don't offer it too early to not get fed up of it.
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.LOCKED_RARE,
              image:   "./images/Challenge2.gif",
              text:    "No hiding in safe spots",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.RARE,
              image:   "./images/Challenge3.gif",
              text:    "No crucifix, candles or smudges",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.LOCKED_UNCOMMON,
              image:   "./images/Challenge4.gif",
              text:    "No evidence items",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.PERMANENT_COMMON,
              image:   "./images/Challenge5.gif",
              text:    "Can't use the breaker",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Challenge6.gif",
              text:    "Can't use strong flashlights",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Challenge7.gif",
              text:    "Only enter the building once",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.LOCKED_RARE,
              image:   "./images/Challenge8.gif",
              text:    "Must finish under 12 minutes",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Challenge9.gif",
              text:    "Can't leave the building until hunted",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.RARE,
              image:   "./images/Challenge10.gif",
              text:    "No sound",
              forbidden_rounds: [1, 2, 3, 4, 5]}), // Too unfun to offer except in the last round.
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.COMMON,
              image:   "./images/Challenge11.gif",
              text:    "No paramic, thermometer or sensors",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.PERMANENT_COMMON,
              image:   "./images/Challenge12.gif",
              text:    "Get minimum 30$ in photos",
              forbidden_rounds: []}),
   
    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.UNCOMMON,
              image:   "./images/Challenge13.gif",
              text:    "Complete all objectives",
              forbidden_rounds: []}),

    new Card({type:    CardType.CHALLENGE, 
              rarity:  CardRarity.RARE,
              image:   "./images/Challenge14.gif",
              text:    "Get a ghost and bone photo",
              forbidden_rounds: []})
];

// Cards used to select type of run.
let normalRunCard = new Card({type:    CardType.RUN_CHOICE, 
                              rarity:  CardRarity.NEVER_OFFER,
                              image:   "./images/Run_Normal.gif",
                              text:    "Normal run",
                              forbidden_rounds: []});

let hardRunCard = new Card({type:    CardType.RUN_CHOICE, 
                            rarity:  CardRarity.NEVER_OFFER,
                            image:   "./images/Run_Hard.gif",
                            text:    "Hard run",
                            forbidden_rounds: []});

// Commonly used card collections.
let normalCards = basicCards.concat(stackableCards);
let randomCards = normalCards.concat(challengeCards);

/* ===============================================================================================
     Handles the web app's logic of offering and choosing Torment cards, handling their
     effects, and updating the webpage to communicate with the user accordingly.
 =============================================================================================== */
/* -----------------------------------------------------------------------------------------------
     Store all of Phasmophobia's maps into separate lists, based on their size.
 ----------------------------------------------------------------------------------------------- */
let smallMaps = [
    "Tanglewood Street House",
    "Edgefield Street House",
    "Ridgeview Road House",
    "Willow Street House",
    "Bleasdale Farmhouse",
    "Grafton Farmhouse",
    "Sunny Meadows (Restricted)",
    "Woodwind Campsite"
];

let biggerMaps = [
    "Prison",
    "Maple Lodge Campsite",
    "Brownstone High School",
    "Sunny Meadows Asylum"
];

/* -----------------------------------------------------------------------------------------------
     Stores all the variables used for web app's internal state.
     Those are referenced in a lot of places.
 ----------------------------------------------------------------------------------------------- */
let AppState = {
    // Keeps track of which cards are offered right now.
    offeredCards: [blankCard, blankCard, blankCard, blankCard],

    // Keeps track of the texts of cards that have been picked before.
    pickedModifiers: [],
    pickedChallenges: [],
    pickedMetaCards: [],

    // Keeps track of how many times each stackable card has been picked before.
    stackableCounter: [0, 0, 0, 0, 0, 0],

    // Keeps track of which round it is, current difficulty, and how many cards are left to pick.
    round: 1,
    difficulty: 0,
    remainingPicks: 0,

    // Special modes activated by meta cards. They all start deactivated.
    extraMode: false,
    challengeMode: false,
    mysteryMode: false,
    alteredMode: false,
    chaosMode: false,
    finishMode: false,
    noMetaMode: false,
    
    // Extra variables for mystery mode.
    scheduleMystery: false,
    reclickCard: false,

    // Keeps track of which slots have cards that have already been picked during a round.
    hiddenCards: []
};

/* -----------------------------------------------------------------------------------------------
     Auxiliary function.
     Shuffles an array randomly by using the Fisher-Yates algorithm.
 ----------------------------------------------------------------------------------------------- */
function shuffle(array) {
    const length = array.length;
    var index, randIndex, temp;

    for (index = length - 1; index > 0; index--) {
        randIndex = Math.floor(Math.random() * (index + 1));

        temp = array[index];
        array[index] = array[randIndex];
        array[randIndex] = temp;
    }
}

/* -----------------------------------------------------------------------------------------------
     Auxiliary function.
     Returns an array with the cumulative weights of each element and those before it in
     an array.
 ----------------------------------------------------------------------------------------------- */
function getCumulativeWeights(array) {
    const length = array.length;
    var index, cumWeights;

    cumWeights = [array[0].weight(AppState.round, AppState.difficulty)];
    cumWeights.length = length;

    for (index = 1; index < length; index++) {
        cumWeights[index] = cumWeights[index - 1] + array[index].weight(AppState.round, 
                                                                        AppState.difficulty);
    }

    return cumWeights;
}

/* -----------------------------------------------------------------------------------------------
     Auxiliary function.
     Returns a randomly chosen element from an array, depending on the cumulative weights array
     also passed as an argument.
 ----------------------------------------------------------------------------------------------- */
function randomChoice(array, cumWeights) {
    const length = array.length;
    var index, randomValue;

    randomValue = 1 + Math.floor(Math.random() * cumWeights[length - 1]);

    for (index = 0; index < length; index++) {
        if (randomValue <= cumWeights[index]) {
            return array[index];
        }
    }
}

/* -----------------------------------------------------------------------------------------------
     Auxiliary function.
     Hides the specified card. This prevents clicking on it.
 ----------------------------------------------------------------------------------------------- */
function hideCard(slotIndex) {
    var card = document.getElementById('card' + slotIndex);
    card.src = "./images/NoCard.png";
    card.onclick = function onclick() {};
}

/* -----------------------------------------------------------------------------------------------
     Auxiliary function.
     Unhides the specified card. This allows clicking on it.
 ----------------------------------------------------------------------------------------------- */
function unhideCard(slotIndex) {
    var card = AppState.offeredCards[slotIndex];
    var cardElement = document.getElementById('card' + slotIndex);

    if ((AppState.mysteryMode || (slotIndex == 3)) && !AppState.reclickCard &&
        (card.text != "Pick all cards. Get a big map. End run now") && !AppState.finishMode) {
        if (card.type == CardType.CHALLENGE) {
            cardElement.src = "./images/ChallengeUnknown.gif";
        }
        else if (card.type == CardType.META) {
            cardElement.src = "./images/MetaUnknown.gif";
        }
        else {
            cardElement.src = "./images/BasicUnknown.gif";
        }
    }
    else {
        cardElement.src = card.image;
    }

    cardElement.onclick = function onclick() { takeCard(slotIndex); };
}

/* -----------------------------------------------------------------------------------------------
     Auxiliary function.
     Returns a list with all slot indexes that contain a hidden card.
 ----------------------------------------------------------------------------------------------- */
function getHiddenSlots() {
    var result = [];

    for (var slotIndex = 0; slotIndex < 4; slotIndex++) {
        var cardElement = document.getElementById('card' + slotIndex);

        if (cardElement.src.indexOf("NoCard.png") != -1) {
            result.push(slotIndex);
        }
    }

    return result;
}

/* -----------------------------------------------------------------------------------------------
     Primary function.
     Starts a new run by setting all variables in AppState to default, shuffling the maps, and
     updating the web page.
 ----------------------------------------------------------------------------------------------- */
function startNewRun() {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  Variable initialization
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    AppState.offeredCards = [blankCard, blankCard, blankCard, blankCard];
    AppState.pickedModifiers = [];
    AppState.pickedChallenges = [];
    AppState.pickedMetaCards = [];
    AppState.stackableCounter = [0, 0, 0, 0, 0, 0];
    AppState.round = 0;
    AppState.difficulty = 0;
    AppState.remainingPicks = 2;
    AppState.extraMode = false;
    AppState.challengeMode = false;
    AppState.mysteryMode = false;
    AppState.alteredMode = false;
    AppState.chaosMode = false;
    AppState.finishMode = false;
    AppState.noMetaMode = false;
    AppState.scheduleMystery = false;
    AppState.reclickCard = false;
    AppState.hiddenCards = [];

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  Randomize maps chosen
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    shuffle(smallMaps);
    shuffle(biggerMaps);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  Update the web page
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Reset the round, map and pick text.
    document.getElementById('roundtext').textContent = "Welcome to the Torment cards challenge!";
    document.getElementById('roundtext').style.color = "#002255"; 
    document.getElementById('maptext').innerHTML = "&nbsp;";
    document.getElementById('picktext').textContent = "Choose your challenge run:";

    // Show the welcome text section.
    document.getElementById('welcometext-section').style.display = "block";

    // Show the run cards on screen, and update what happens when you click on them.
    document.getElementById('card0').src = "./images/Run_Normal.gif";
    document.getElementById('card0').onclick = function onclick() { normalRun(); };
    document.getElementById('card1').src = "./images/Run_Hard.gif";
    document.getElementById('card1').onclick = function onclick() { hardRun();  };
    document.getElementById('card2').style.display = "none";
    document.getElementById('card3').style.display = "none";

    // Reset the modifiers and challenges lists.
    document.getElementById('modifiers').innerHTML = "";
    document.getElementById('challenges').innerHTML = "";

    // Reset the 'Next round' button to be greyed out and do nothing.
    var rb = document.getElementById('nextround-button');
    rb.className = 'nextround-button-disabled';
    rb.onclick = function onclick() {};

    // Hide both buttons and lists.
    document.getElementById('newrun-button').style.display = "none";
    document.getElementById('nextround-button').style.display = "none";
    document.getElementById('listcolumns').style.display = "none";

    // Show the card slots again.
    document.getElementById('cardslots').style.display = "flex";
}

startNewRun();

/* -----------------------------------------------------------------------------------------------
     Primary functions.
     Starts either a normal or hard run.
 ----------------------------------------------------------------------------------------------- */

function normalRun() {
    // Show all cards, both buttons and both lists.
    document.getElementById('card2').style.display = "inline";
    document.getElementById('card3').style.display = "inline";
    document.getElementById('newrun-button').style.display = "inline";
    document.getElementById('nextround-button').style.display = "inline";
    document.getElementById('listcolumns').style.display = "flex";

    // Hide the welcome text section.
    document.getElementById('welcometext-section').style.display = "none";

    // Go to next round, which is the first round.
    nextRound();
}

function hardRun() {
    // Show all cards, and both buttons.
    document.getElementById('card2').style.display = "inline";
    document.getElementById('card3').style.display = "inline";
    document.getElementById('newrun-button').style.display = "inline";
    document.getElementById('nextround-button').style.display = "inline";

    // Hide the welcome text section.
    document.getElementById('welcometext-section').style.display = "none";

    // Set the round text to explain what's going on.
    document.getElementById('roundtext').textContent = "How hard?";
    document.getElementById('roundtext').style.color = "#8b0000";

    // This extra round of pain, all cards are going to be visible - not a mystery.
    AppState.finishMode = true;

    // Set the cards and show them.
    AppState.offeredCards = [metaCards[3], metaCards[10], metaCards[11], metaCards[12]];
    for (var slotIndex = 0; slotIndex < 4; slotIndex++) {
        unhideCard(slotIndex);
    }

    // Set the pick text, and amount of cards to be picked.
    document.getElementById('picktext').textContent = "Pick 2 of these cards:";
    AppState.remainingPicks = 2;
}

/* -----------------------------------------------------------------------------------------------
     Primary function.
     Chooses cards to offer, and updates the images shown on the web page. 
     Only stackable cards can appear again after being picked, up to 3 times.
     Among the cards offered, there are never any duplicates.
 ----------------------------------------------------------------------------------------------- */
function generateCards() {
    // Some challenge cards are incompatible. This list will be needed later on.
    let incompatChallenges = [
        "Complete all objectives",
        "No paramic, thermometer or sensors",
        "No crucifix, candles or smudges",
        "Photo randomizer"
    ];

    // Choose the correct card pool, and which slots are guaranteed to offer a meta card.
    var cardPool, metaLimit, metaSlots = [0, 1, 2, 3];

    // Rounds 3 & 6 are challenge rounds. 
    // The rest are non-challenge rounds, unless in challenge mode.
    if ((AppState.round % 3 == 0) || AppState.challengeMode) {
        cardPool = challengeCards;
        metaSlots = [];
    }
    // Round 4 has an extra meta card (normal amount is 1, randomly 0-1 in rounds 1 & 5).
    // In chaos mode, challenge or altered cards may also be offered less frequently.
    else {
        cardPool = AppState.chaosMode? randomCards : normalCards;
        metaLimit = AppState.noMetaMode? 0 : 1 + (AppState.round == 4);

        if ((AppState.round % 4 == 1) || AppState.chaosMode) {
            metaLimit = AppState.noMetaMode? 0 : metaLimit - Math.floor(Math.random() * 2);
        }

        shuffle(metaSlots);
        metaSlots = metaSlots.slice(0, metaLimit);
    }

    // For each slot, offer a new card.
    // Come up with a possibility, and keep trying until a card that can be offered is found.
    var card, success;
    let poolCumWeights = getCumulativeWeights(cardPool);
    let metaCumWeights = getCumulativeWeights(metaCards);

    for (var slotIndex = 0; slotIndex < 4; slotIndex++) {
        while (true) {
            var success = true;

            // Cards offered in meta slots must be meta cards.
            if (metaSlots.indexOf(slotIndex) != -1) {
                card = randomChoice(metaCards, metaCumWeights);
            }
            // Otherwise, use whichever card pool was determined before.
            else {
                card = randomChoice(cardPool, poolCumWeights);
            }

            // In altered mode, almost all stackable cards are changed for a much worse version.
            // The user must not have picked those cards before, or they won't be changed.
            // In chaos mode, this can also happen randomly.
            if (card.type == CardType.STACKABLE) {
                if (AppState.alteredMode || ((Math.random() < 0.5) && AppState.chaosMode)) {
                    if (AppState.pickedModifiers.indexOf(card.text) == -1) {
                        for (var stackableIndex = 0; stackableIndex < alteredCards.length; stackableIndex++) {
                            if (card.text == stackableCards[stackableIndex].text) {
                                card = alteredCards[stackableIndex];
                            }
                        }
                    }
                }
            }

            // Some challenges are incompatible. 
            // If the generated card is one of those challenge cards, don't offer it...
            for (var probIndex = 0; probIndex < incompatChallenges.length; probIndex++) {
                if (card.text == incompatChallenges[probIndex]) {

                    // ...if any other incompatible card is on offer right now.
                    for (var otherSlotIndex = 0; otherSlotIndex < slotIndex; otherSlotIndex++) {
                        let otherCardText = AppState.offeredCards[otherSlotIndex].text;
                        if (incompatChallenges.indexOf(otherCardText) != -1) {
                            success = false;
                            break;
                        }
                    }

                    // ...if any other incompatible card has been picked before.
                    for (var probIndex2 = 0; probIndex2 < incompatChallenges.length; probIndex2++) {
                        let otherCardText = incompatChallenges[probIndex2];
                        if (AppState.pickedChallenges.indexOf(otherCardText) != -1) {
                            success = false;
                            break;
                        }
                    }
                }
            }

            // Change "Further increase card difficulty" to "Slightly increase card difficulty" if
            // other hasn't been chosen yet.
            if ((card.text == "Further increase card difficulty") &&
                (AppState.pickedMetaCards.indexOf("Slightly increase card difficulty") == -1)) {
                card = metaCards[metaCards.length - 6];
            }

            // Don't offer any card that is already on offer right now, or has been picked before...
            // unless it's an stackable card (and hasn't been already picked 3 times).
            for (var otherSlotIndex = 0; otherSlotIndex < 4; otherSlotIndex++) {
                if (card.text == AppState.offeredCards[otherSlotIndex].text) {
                    success = false;
                    break;
                }
            }

            if ((AppState.pickedModifiers.indexOf(card.text) != -1) ||
                (AppState.pickedChallenges.indexOf(card.text) != -1) ||
                (AppState.pickedMetaCards.indexOf(card.text) != -1)) {
                if (card.type == CardType.STACKABLE) {
                    for (var stackableIndex = 0; stackableIndex < stackableCards.length; stackableIndex++) {
                        if ((card.text == stackableCards[stackableIndex].text) &&
                            (AppState.stackableCounter[stackableIndex] == 3)) {
                            success = false;
                            break;
                        }
                    }
                }
                else {
                    success = false;
                }
            }

            // If the card has passed all tests so far, get out of the 'infinite' loop.
            if (success) {
                break;
            }
        }

        // Once an appropiate card has been generated, it's time to put it on offer. To do so,
        // we unhide the card, setting its new image in the process.
        AppState.offeredCards[slotIndex] = card;
        unhideCard(slotIndex);
    }
}

/* -----------------------------------------------------------------------------------------------
     Primary function.
     When a card is picked, it is processed and hidden. If all cards have been picked for 
     this round, then the 'Next round' button becomes available.
 ----------------------------------------------------------------------------------------------- */
function takeCard(slotIndex) {
    // Collect the card to process it.
    var card = AppState.offeredCards[slotIndex];

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  Handles picking a mystery card
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if ((AppState.mysteryMode || (slotIndex == 3)) && !AppState.finishMode &&
        (card.text != "Pick all cards. Get a big map. End run now")) {

        // The mystery card is clicked on while facedown...
        if (!AppState.reclickCard) {
            // Hide all other cards, and store which ones were already hidden.
            AppState.hiddenSlots = getHiddenSlots();
            for (var otherSlotIndex = 0; otherSlotIndex < 4; otherSlotIndex++) {
                hideCard(otherSlotIndex);
            }

            // Show the card, and make the user click again on it to confirm their card choice.
            AppState.reclickCard = true;
            document.getElementById('picktext').textContent = "Confirm your card";
            unhideCard(slotIndex);
            return;
        }
        // The mystery card is clicked on while faceup...
        else {
            // No longer have to reclick.
            AppState.reclickCard = false;

            // Unhide all other cards, unless they were already hidden.
            for (var otherSlotIndex = 0; otherSlotIndex < 4; otherSlotIndex++) {
                if ((slotIndex != otherSlotIndex) &&
                    (AppState.hiddenSlots.indexOf(otherSlotIndex) == -1)) {
                    unhideCard(otherSlotIndex);
                }
            }

            // Reset the 'hiddenSlots' variables.
            AppState.hiddenSlots = [];
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  Process the card
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Add its text to the corresponding picked modifiers/challenges list.
    if (card.type == CardType.CHALLENGE) {
        AppState.pickedChallenges.push(card.text);
    }
    else if (card.type == CardType.STACKABLE) {
        for (var stackableIndex = 0; stackableIndex < stackableCards.length; stackableIndex++) {
            if ((card.text == stackableCards[stackableIndex].text) &&
                (AppState.stackableCounter[stackableIndex] == 0)) {
                AppState.pickedModifiers.push(card.text);
                break;
            }
        }
    }
    else if (card.type != CardType.META) {
        AppState.pickedModifiers.push(card.text);
    }
    else {
        AppState.pickedMetaCards.push(card.text);
    }

    // Meta cards affect the logic of the web app. They need to be handled on an individual basis.
    if (card.type == CardType.META) {
        if (card.text == "Pick an extra card next time") {
            AppState.extraMode = true;
        }
        else if (card.text == "Pick a challenge next time") {
            AppState.challengeMode = true;
        }
        else if (card.text == "Pick 2 challenges next time") {
            AppState.extraMode = true;
            AppState.challengeMode = true;
        }
        else if (card.text == "All cards are a mystery next time") {
            AppState.scheduleMystery = true;
        }
        else if (card.text == "Some cards will be much worse") {
            AppState.alteredMode = true;
        }
        else if (card.text == "Random cards are offered. Pick again") {
            AppState.chaosMode = true;
        }
        else if (card.text == "Golden cards will not be offered") {
            AppState.noMetaMode = true;
        }
        else if (card.text == "Change map to a bigger one") {
            let lastBiggerMap = biggerMaps[biggerMaps.length - 1];
            document.getElementById('maptext').textContent = lastBiggerMap;
        }
        else if ((card.text == "Slightly increase card difficulty") ||
                 (card.text == "Further increase card difficulty")) {
            AppState.difficulty += 1;
        }
        else if (card.text == "Greatly increase card difficulty") {
            AppState.difficulty += 3;
            AppState.pickedMetaCards.push("Slightly increase card difficulty");
            AppState.pickedMetaCards.push("Further increase card difficulty");
        }
        else if (card.text == "Pick all cards. Get a big map. End run now") {
            AppState.round += 1;
            AppState.remainingPicks += 2;
            AppState.finishMode = true;

            document.getElementById('maptext').textContent = biggerMaps[1];
            
            AppState.hiddenSlots = getHiddenSlots();
            for (var otherSlotIndex = 0; otherSlotIndex < 4; otherSlotIndex++) {
                if (AppState.hiddenSlots.indexOf(otherSlotIndex) == -1) {
                    unhideCard(otherSlotIndex);
                }
            }
            AppState.hiddenSlots = [];
        }

        // These cards change the cards that are offered (including themselves), but respect 
        // slots already empty. Otherwise, hide the picked card.
        if ((card.text == "Random cards are offered. Pick again") ||
            (card.text == "Change all offered cards. Pick again")) {
            AppState.hiddenSlots = getHiddenSlots();
            generateCards();
            
            for (var otherSlotIndex = 0; otherSlotIndex < 4; otherSlotIndex++) {
                if (AppState.hiddenSlots.indexOf(otherSlotIndex) != -1) {
                    hideCard(otherSlotIndex);
                }
            }
            AppState.hiddenSlots = [];
            AppState.remainingPicks += 1;
            AppState.chaosMode = false;
        }
        else {
            hideCard(slotIndex);
        }
    }
    // Process stackables.
    else {
        if (card.type == CardType.STACKABLE) {
            for (var stackableIndex = 0; stackableIndex < 6; stackableIndex++) {
                if (card.text == stackableCards[stackableIndex].text) {
                    AppState.stackableCounter[stackableIndex] += 1;
                    break;
                }
            }
        }

        hideCard(slotIndex);
    }
 
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  Check remaining cards to pick
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Reduce the cards to pick this round by 1.
    AppState.remainingPicks -= 1;

    // If there are no more cards to pick...
    if (AppState.remainingPicks == 0) {

        // Check if the run has ended, saying so clearly and hiding all cards.
        if (AppState.round == 6) {
            document.getElementById('picktext').textContent = "The run ends here. Good luck!";

            for (var slotIndex = 0; slotIndex < 4; slotIndex++) {
                hideCard(slotIndex);
            }
        }

        // Otherwise: enable the 'next round' button, hide all cards, update the pick text.
        else {
            var rb = document.getElementById('nextround-button');
            rb.className = "nextround-button-enabled";
            rb.onclick = function onclick(event) { nextRound(); };
            rb.innerHTML = "Next round";

            for (var otherSlotIndex = 0; otherSlotIndex < 4; otherSlotIndex++) {
                hideCard(otherSlotIndex);
            }

            if (AppState.round > 0) {
                let text = "If you beat the map, go to the next round.";
                document.getElementById('picktext').textContent = text;
            }
            else {
                let text = "Your choices have been made...";
                document.getElementById('picktext').textContent = text;
                rb.innerHTML = "Continue";
            }
        }

        // If the window is too slim, remove the card slots from view entirely so that buttons
        // jump higher and can be used without scrolling. More comfortable for mobile devices.
        if (document.getElementById('card0').width < 208) {
            document.getElementById('cardslots').style.display = "none";
        }
    }
    else {
        let newPickText = "Pick " + AppState.remainingPicks + " of these cards:";
        document.getElementById('picktext').textContent = newPickText;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  Update the modifiers/challenges lists
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //-------------
    // Modifiers
    //-------------
    let modifiers = AppState.pickedModifiers;
    var modifierText = "";

    for (var modIndex = 0; modIndex < modifiers.length; modIndex++) {
        let modifier = modifiers[modIndex];

        if (modifier.indexOf("{X}") != -1) {
            if (modifier == stackableCards[0].text) {
                modifier = modifier.replace("{X}", 100 - AppState.stackableCounter[0] * 25);
            }
            else if (modifier == stackableCards[1].text) {
                modifier = modifier.replace("{X}",  30 - AppState.stackableCounter[1] * 10);
            }
            else if (modifier == stackableCards[2].text) {
                modifier = modifier.replace("{X}", 100 + AppState.stackableCounter[2] * 50);
            }
            else if (modifier == stackableCards[3].text) {
                modifier = modifier.replace("{X}", 100 + AppState.stackableCounter[3] * 25);
            }
            else if (modifier == stackableCards[4].text) {
                modifier = modifier.replace("{X}",   3 - AppState.stackableCounter[4] * 1);
            }
            else if (modifier == stackableCards[5].text) {
                modifier = modifier.replace("{X}",   5 + AppState.stackableCounter[5] * 3);
            }
        }
        modifierText += modifier + "<br>";
    }
    document.getElementById('modifiers').innerHTML = modifierText;

    //-------------
    // Challenges
    //-------------
    let challenges = AppState.pickedChallenges;
    var challengeText = "";

    for (var challengeIndex = 0; challengeIndex < challenges.length; challengeIndex++) {
        let challenge = challenges[challengeIndex];
        challengeText += challenge + "<br>";
    }
    document.getElementById('challenges').innerHTML = challengeText;
}

/* -----------------------------------------------------------------------------------------------
     Primary function.
     Advances to the next round. This involves changing a lot of the variables of the web app,
     and updating the web page to offer 4 more cards to pick from.
 ----------------------------------------------------------------------------------------------- */
function nextRound() {
     // If finish mode is on and a next round was called, then a hard run was chosen.
     // Show the lists again, and deactivate the mode.
     if (AppState.finishMode) {
        document.getElementById('listcolumns').style.display = "flex";
        AppState.finishMode = false;
     }

     // Increase the round counter by 1, and updates the round and map text accordingly.
     AppState.round += 1
     document.getElementById('roundtext').textContent = "Round " + AppState.round;
     document.getElementById('roundtext').style.color = "black";

     let challengeRoundsVisited = Math.floor(AppState.round / 3);

     if (AppState.round % 3 == 0) {
         document.getElementById('maptext').textContent = biggerMaps[challengeRoundsVisited];
     }
     else {
         let index = AppState.round - challengeRoundsVisited - 1;
         document.getElementById('maptext').textContent = smallMaps[index];
     }

     // If it's a challenge round, increase the difficulty.
     if (AppState.round % 3== 0) {
         AppState.difficulty += 1;
     }

     // Activate mystery mode if it was scheduled. Otherwise if in mystery mode, deactivate it.
     if (AppState.scheduleMystery) {
         AppState.scheduleMystery = false;
         AppState.mysteryMode = true;
     }
     else if (AppState.mysteryMode) {
         AppState.mysteryMode = false;
     }

     // Set the correct amount of cards to pick for the next round, and update the appropiate text.
     // In challenge rounds, the user must only pick 1 card (2 in extra mode).
     // In normal rounds, the user picks 2 cards.
     if ((AppState.round % 3 == 0) || AppState.challengeMode) {
         if (AppState.extraMode) {
             AppState.remainingPicks = 2;
             AppState.extraMode = false;
         }
         else {
             AppState.remainingPicks = 1;
         }
     }
     else {
         AppState.remainingPicks = 2;
     }
     let newPickText = "Pick " + AppState.remainingPicks + " of these cards:"
     document.getElementById('picktext').textContent = newPickText;

     // Deactivate the 'Next round' button again.
     var rb = document.getElementById('nextround-button');
     rb.className = "nextround-button-disabled";
     rb.onclick = function onclick(event) {};

     // Generate new cards.
     generateCards();

     // Reset the card slots again, in case they were removed for a better experience in mobile.
     document.getElementById('cardslots').style.display = "flex";

     // Deactivate challenge mode after card generation.
     AppState.difficulty += (AppState.challengeMode && (AppState.round == 2));
     AppState.challengeMode = false;
}
