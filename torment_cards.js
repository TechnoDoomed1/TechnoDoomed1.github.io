// torment_cards.json
// by: technodoomedone

/// -------------------------------------------------------------------------------------------------------------------
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
///   SECTION 1: WEBPAGE MODIFICATION
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
/// -------------------------------------------------------------------------------------------------------------------
/* ==========================================================================================================
    [WebHandler]
     Static class. Manages updating the different HTML elements of the web app.
 ========================================================================================================= */
class WebHandler {
    // --------------------------------------------------------------------------------------------
    /// Constructor
    //  Throws an error, since the class is not meant to be instantiated.
    // --------------------------------------------------------------------------------------------
    constructor() {
        throw Error("WebHandler is an static class, and therefore can't be instantiated");
    }
    
    // --------------------------------------------------------------------------------------------
    /// getWidth(String)
    //  Needs the element ID as parameter.
    //  Returns the height of the element in pixels.
    // --------------------------------------------------------------------------------------------
    static getWidth(elementID) {
        return document.getElementById(elementID).width;
    }
    
    // --------------------------------------------------------------------------------------------
    /// getText(String)
    //  Needs the element ID as parameter.
    //  Returns the text of the element.
    // --------------------------------------------------------------------------------------------
    static getText(elementID) {
        return document.getElementById(elementID).textContent;
    }
    
    // --------------------------------------------------------------------------------------------
    /// changeText(String, String)
    //  Needs the element ID and text as parameters.
    //  Changes the element's "innerHTML" to the specified text. This allows special characters.
    // --------------------------------------------------------------------------------------------
    static changeText(elementID, text) {
        document.getElementById(elementID).innerHTML = text;
    }
    
    // --------------------------------------------------------------------------------------------
    /// changeColor(String, String)
    //  Needs the element ID and hex color as parameters.
    //  Changes the element's "color" to the specified hex value. Examples: "#ffffff", "#00002a".
    // --------------------------------------------------------------------------------------------
    static changeColor(elementID, hexColor) {
        document.getElementById(elementID).style.color = hexColor;
    }
    
    // --------------------------------------------------------------------------------------------
    /// changeStyleCSS(String, String)
    //  Needs the element ID and the new CSS class as parameters.
    //  Changes the element's "className" to the specified new CSS class.
    // --------------------------------------------------------------------------------------------
    static changeStyleCSS(elementID, newClassCSS) {
        document.getElementById(elementID).className = newClassCSS;
    }
    
    // --------------------------------------------------------------------------------------------
    /// changeImage(String, String)
    //  Needs the element ID and relative path to new image as parameters.
    //  Changes the element's "display" to the specified mode.
    // --------------------------------------------------------------------------------------------
    static changeImage(elementID, newImagePath) {
        document.getElementById(elementID).src = newImagePath;
    }
    
    // --------------------------------------------------------------------------------------------
    /// changeClickFunction(String, Function)
    //  Needs the element ID and new click function as parameters.
    //  Changes what function is invoked when the element is clicked on.
    // --------------------------------------------------------------------------------------------
    static changeClickFunction(elementID, newClickFunction) {
        document.getElementById(elementID).onclick = newClickFunction;
    }
    
    // --------------------------------------------------------------------------------------------
    /// hideElement(String)
    //  Needs the element ID to be passed as parameter.
    //  Hides the specified element from view, not rendering it anymore.
    // --------------------------------------------------------------------------------------------
    static hideElement(elementID) {
        let element = document.getElementById(elementID);
        element.style.display = "none";
    }
    
    // --------------------------------------------------------------------------------------------
    /// showElement(String)
    //  Needs the element ID to be passed as parameter.
    //  Makes the specified element visible, rendering it again if it was hidden before. 
    // --------------------------------------------------------------------------------------------
    static showElement(elementID) {
        var element = document.getElementById(elementID);
        
        if (elementID.indexOf("section") >= 0) {
            element.style.display = "block";
        }
        else if ((elementID == 'cardslots') || (elementID == 'listcolumns')) {
            element.style.display = "flex";
        }
        else {
            element.style.display = "inline";
        }
    }
    
    // --------------------------------------------------------------------------------------------
    /// hideCard(Number)
    //  Needs the card's slot index as parameter.
    //  Hides the card by making it unclickable, and changing its image to "NoCard.png".
    //  This differs from "hideElement" in that card still renders, it's just transparent.
    // --------------------------------------------------------------------------------------------
    static hideCard(slotIndex) {
        var cardElementID = 'card' + slotIndex;
        WebHandler.changeClickFunction(cardElementID, function onclick() {});
        WebHandler.changeImage(cardElementID, "./images/no_card.png");
    }
    
    // --------------------------------------------------------------------------------------------
    /// showCard(Number)
    //  Needs the card's slot index and the app's current state as parameters.
    //  Shows the card by making it clickable again, and changing its image to the appropiate one.
    //  This differs from "showElement" in that the appropiate card image is applied.
    // --------------------------------------------------------------------------------------------
    static showCard(slotIndex, appState) {
        var card = appState.offeredCards[slotIndex];
        var cardElementID = 'card' + slotIndex;
        WebHandler.changeClickFunction(cardElementID, function onclick() 
                                                      { AppHandler.takeCard(slotIndex) });
                                                      
        // A mystery card is always shown in mystery mode or in the last card slot, except if...
        //   - A card needs to be reclicked.
        //   - The card is the "End run now" golden card, which is always shown clearly.
        //   - The special "showAllMode" is activated.
        let slotAmount = appState.totalCardSlots;
        if ((appState.mysteryMode || (slotIndex == slotAmount - 1)) &&
            !appState.reclickCard && (card.text[0].indexOf("End run now") == -1) && 
            !appState.showAllMode) {
            if (card.type == "Challenge") {
                WebHandler.changeImage(cardElementID, "./images/challenge_unknown.gif");
            }
            else if (card.type == "Golden") {
                WebHandler.changeImage(cardElementID, "./images/golden_unknown.gif");
            }
            else {
                WebHandler.changeImage(cardElementID, "./images/silver_unknown.gif");
            }
        }
        // Otherwise, show the card's image.
        else {
            WebHandler.changeImage(cardElementID, card.image);
        }
    }
    
    // --------------------------------------------------------------------------------------------
    /// isCardHidden(Number)
    //  Needs the card's slot index as parameter.
    //  Returns true if the card image is transparent or not rendered. Returns false otherwise.
    // --------------------------------------------------------------------------------------------
    static isCardHidden(slotIndex) {
        var cardElementID = 'card' + slotIndex;
        
        if ((document.getElementById(cardElementID).style.display == "none") ||
            (document.getElementById(cardElementID).src.indexOf("no_card") >= 0)) {
            return true;
        }
        else {
            return false;
        }
    }
}

/// -------------------------------------------------------------------------------------------------------------------
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
///   SECTION 2: WEB APPLICATION (INTERNAL LOGIC)
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
/// -------------------------------------------------------------------------------------------------------------------
class AppHandler {
    // --------------------------------------------------------------------------------------------
    //  Internal state of the web application.
    // --------------------------------------------------------------------------------------------    
    static state = {
        // Keeps track of current round, difficulty and cards to pick this round.
        round:            0,
        difficulty:       0,
        remainingPicks:   2,
        
        // Keeps track of maximum amount of rounds, and how many cards slots there are.
        maxRounds:        5,
        totalCardSlots:   4,
        
        // Keeps track of cards needing to be reclicked, being offered or hidden.
        reclickCard:      false,
        offeredCards:     [],
        hiddenSlots:      [],
        
        // Keeps track of all cards picked so far.
        pickedModifiers:  [],
        pickedChallenges: [],
        pickedGoldCards:  [],
        
        // Keeps track of special modes activated by golden cards.
        extraMode:        false,
        challengeMode:    false,
        scheduleMystery:  false,
        mysteryMode:      false,
        chaosMode:        false,
        showAllMode:      false,
        alteredMode:      false,
        noGoldMode:       false
    }
    
    // --------------------------------------------------------------------------------------------
    //  <Constructor> 
    //  Throws an error, since the class is not meant to be instantiated.
    // --------------------------------------------------------------------------------------------
    constructor() {
        throw Error("AppHandler is an static class, and therefore can't be instantiated");
    }
    
    // --------------------------------------------------------------------------------------------
    /// resetState()
    //  Resets all the state variables to their default values.
    // --------------------------------------------------------------------------------------------
    static resetState() {
        AppHandler.state = {
            round:            0,
            difficulty:       0,
            remainingPicks:   2,
            maxRounds:        5,
            totalCardSlots:   4,
            reclickCard:      false,
            offeredCards:     [],
            hiddenSlots:      [],
            pickedModifiers:  [],
            pickedChallenges: [],
            pickedGoldCards:  [],
            extraMode:        false,
            challengeMode:    false,
            scheduleMystery:  false,
            mysteryMode:      false,
            chaosMode:        false,
            showAllMode:      false,
            alteredMode:      false,
            noGoldMode:       false
        }
    }
    

    // --------------------------------------------------------------------------------------------
    /// chooseNewRun()
    //  Brings the user to the web page view of choosing a new run.
    // --------------------------------------------------------------------------------------------
    static chooseNewRun() {
        // Reset the AppHandler internal state, and the "timesPicked" counter of all cards.
        AppHandler.resetState();
        silverCards.resetCounters();
        challengeCards.resetCounters();
        goldenCards.resetCounters();
        
        // Randomize map order.
        smallMaps.shuffle();
        bigMaps.shuffle();
        
        // Make campsites more probable to appear in the first few rounds.
        var mapIndex, temp;
        if (Math.random() < 0.2) {
            mapIndex = smallMaps.indexOf("Camp Woodwind");
            temp = smallMaps[0];
            smallMaps[0] = "Camp Woodwind";
            smallMaps[mapIndex] = temp;
        }
        else if (Math.random() < 0.2) {
            mapIndex = smallMaps.indexOf("Camp Woodwind");
            temp = smallMaps[1];
            smallMaps[1] = "Camp Woodwind";
            smallMaps[mapIndex] = temp;
        }
        else if (Math.random() < 0.2) {
            mapIndex = bigMaps.indexOf("Maple Lodge Campsite");
            temp = bigMaps[0];
            bigMaps[0] = "Maple Lodge Campsite";
            bigMaps[mapIndex] = temp;
        }
        
        // Show the welcome text section, and link to the explanation page.
        WebHandler.showElement('welcometext-section');
        WebHandler.showElement('go-to-explanation');
        
        // Reset the round, map and pick text.
        WebHandler.changeText('roundtext', "Welcome to the Torment cards challenge!");
        WebHandler.changeColor('roundtext', "#002255");
        WebHandler.changeText('maptext', "&nbsp;");
        WebHandler.changeText('picktext', "Choose your challenge run:");
        
        // Show the run choice cards on screen, and update what happens when you click them.
        WebHandler.changeImage('card0', "./images/run_normal.gif");
        WebHandler.changeClickFunction('card0', function onclick() { AppHandler.startRun(false) });
        WebHandler.changeImage('card1', "./images/run_hard.gif");
        WebHandler.changeClickFunction('card1', function onclick() { AppHandler.startRun(true) });
        WebHandler.hideElement('card2');
        WebHandler.hideElement('card3');
        
        // Show the card slots again (in case they were hidden before for mobile view).
        WebHandler.showElement('cardslots');
        
        // Reset the 'Next round' button to be greyed out and do nothing.
        WebHandler.changeStyleCSS('right-button', "nextround-button-disabled");
        WebHandler.changeClickFunction('right-button', function onclick() {});

        // Hide both buttons.
        WebHandler.hideElement('left-button');
        WebHandler.hideElement('right-button');
        
        // Reset the modifier and challenge lists, and hide them.
        WebHandler.changeText('modifiers', "");
        WebHandler.changeText('challenges', "");
        WebHandler.hideElement('listcolumns');
    }
    
    // --------------------------------------------------------------------------------------------
    /// startRun(Boolean)
    //  Starts a new run. If the 'customRun' parameter is true, then a hard run starts by letting
    //  the player pick from a selection of cards to make it as hard as they want to.
    // --------------------------------------------------------------------------------------------
    static startRun(customRun) {
        // Hide the welcome text section, and link to explanation page.
        WebHandler.hideElement('welcometext-section');
        WebHandler.hideElement('go-to-explanation');
        
        // Show the rest of the cards again.
        WebHandler.showElement('card2');
        WebHandler.showElement('card3');
        
        // Show both buttons.
        WebHandler.showElement('left-button');
        WebHandler.showElement('right-button');
        
        // If the run is a normal run, just go to the next round to start the run proper.
        if (!customRun) {
            AppHandler.nextRound();
        }
        // If the run is a custom run, a preliminary round to customise difficulty is done.
        else {
            // Set the round, map and pick text to explain what's going on.
            WebHandler.changeText('roundtext', "How hard?");
            WebHandler.changeColor('roundtext', "#8b0000");
            WebHandler.changeText('maptext', "Choose your own difficulty");
            WebHandler.changeColor('maptext', "#af0000");
            WebHandler.changeText('picktext', "Pick any amount of these cards:");
        
            // This extra round of pain, no cards are a mystery and all of them can be picked.
            AppHandler.state.showAllMode = true;
            AppHandler.state.remainingPicks = AppHandler.state.totalCardSlots;

            // Set the cards and show them.
            AppHandler.state.offeredCards = [goldenCards[0], goldenCards[1], goldenCards[2], goldenCards[3]];
                                             
            let slotAmount = AppHandler.state.totalCardSlots;
            for (var slotIndex = 0; slotIndex < slotAmount; slotIndex++) {
                WebHandler.showCard(slotIndex, AppHandler.state);
            }

            // Allow the user to continue whenever they want.
            WebHandler.changeText('right-button', "Continue");
            WebHandler.changeStyleCSS('right-button', "nextround-button-enabled");
            WebHandler.changeClickFunction('right-button', function onclick() { AppHandler.nextRound() });
        }
    }
    
   // --------------------------------------------------------------------------------------------
    /// nextRound()
    //  Advances to the next round of the run.
    // --------------------------------------------------------------------------------------------
    static nextRound() {
        // Disable "showAllMode" since it's intended to last only through 1 round. 
        
        // Enable "mysteryMode" if it's scheduled, or disable it if it's already active.
        AppHandler.state.showAllMode = false;
        
        if (AppHandler.state.scheduleMystery) {
            AppHandler.state.scheduleMystery = false;
            AppHandler.state.mysteryMode = true;
        }
        else if (AppHandler.state.mysteryMode) {
            AppHandler.state.mysteryMode = false;
        }
        
        // Increase the round counter by 1.
        // Difficulty is also increased at rounds 3 & 5, but reset to 0 during round 6.
        AppHandler.state.round++;
        if ((AppHandler.state.round == 3) || (AppHandler.state.round == 5)) {
            AppHandler.state.difficulty++;
        }
        else if ((AppHandler.state.round == 6)) {
            AppHandler.state.difficulty = 0;
        }
        
        // Set the correct amount of cards to pick this new round. By default, it's 2.
        // The user must pick 1 extra card if "extraMode" is activated.
        AppHandler.state.remainingPicks = 2 + (AppHandler.state.extraMode == true);
        
        // Update the round, map and pick text accordingly.
        let newPickText = "Pick " + AppHandler.state.remainingPicks + " of these cards:";
        var map;
        
        if (AppHandler.state.round == 3) {
            map = bigMaps[0];
        }
        else if (AppHandler.state.round == 5) {
            map = bigMaps[1];
        }
        else {
            map = smallMaps[AppHandler.state.round - 1];
        }
        
        WebHandler.changeText('roundtext', "Round " + AppHandler.state.round);
        WebHandler.changeColor('roundtext', "black");
        WebHandler.changeText('maptext', map);
        WebHandler.changeColor('maptext', "#0000da");
        WebHandler.changeText('picktext', newPickText);
        
        // Show the lists again (in case they were hidden), and deactivate the 'Next round' button.
        WebHandler.showElement('cardslots');
        WebHandler.showElement('listcolumns');
        WebHandler.changeStyleCSS('right-button', "nextround-button-disabled");
        WebHandler.changeClickFunction('right-button', function onclick() {});
        
        // Hide the 4th card slot if it's not going to be used.
        if (AppHandler.state.totalCardSlots == 3) {
            WebHandler.hideElement('card3');
        }
        
        // Generate a new set of cards and offer them to the user.
        AppHandler.offerNewCards();
                
        // Deactivate "extraMode", "challengeMode", "mysteryMode" and "chaosMode".
        AppHandler.state.extraMode = false;
        AppHandler.state.chaosMode = false;
    }
    

    // --------------------------------------------------------------------------------------------
    /// offerNewCards()
    //  Offers a new selection of non-picked cards, and updates the images shown on the web.
    //  Among the cards offered, there are never any duplicates.
    // --------------------------------------------------------------------------------------------
    static offerNewCards() {
        // A random slot is chosen to be the slot that has a golden card.
        // Rounds 5 & 6 definitely don't have them.
        var goldenSlot;
        
        if (!AppHandler.state.noGoldMode) {
            if (AppHandler.state.round < 5) {
                goldenSlot = Math.floor(Math.random() * AppHandler.state.totalCardSlots);
            }
        }
        
        // A random slot is chosen to be the slot that has a challenge card.
        // If "challengeMode" or "noGoldMode" are activated, more rounds will have an extra challenge card.
        var challengeSlots = [];
        
        if (AppHandler.state.round >= 2) {
            var randomSlot;
            do {
                randomSlot = Math.floor(Math.random() * AppHandler.state.totalCardSlots);
            } while (randomSlot == goldenSlot);
            challengeSlots.push(randomSlot);
        }
        if (AppHandler.state.challengeMode || 
            (AppHandler.state.noGoldMode && (AppHandler.state.round >= 4))) {
            var randomSlot;
            do {
                randomSlot = Math.floor(Math.random() * AppHandler.state.totalCardSlots);
            } while ((randomSlot == goldenSlot) || (challengeSlots.indexOf(randomSlot) >= 0));
            challengeSlots.push(randomSlot);
        }
        
        // Determine which map the player is going to be playing this round.
        let map = WebHandler.getText('maptext');
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //  For each slot, offer a new card.
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Keep coming up with possibilities for each slot, until a card can be offered.
        let slotAmount = AppHandler.state.totalCardSlots;
        var card, success;
        
        for (var slotIndex = 0; slotIndex < slotAmount; slotIndex++) {
            while (!success) {
                success = true;
                
                // Cards offered in golden slots must be golden cards.
                // Cards offered in challenge slots must be challenge cards.
                // Otherwise, generate a silver card.
                if (slotIndex == goldenSlot) {
                    card = goldenCards.getRandomCard(AppHandler.state.round, AppHandler.state.difficulty, map);
                }
                else if (challengeSlots.indexOf(slotIndex) >= 0) {
                    card = challengeCards.getRandomCard(AppHandler.state.round, AppHandler.state.difficulty, map);
                }
                else {
                    card = silverCards.getRandomCard(AppHandler.state.round, AppHandler.state.difficulty, map);
                }
                
                // ···························································
                //  Dealing with cards that have a definitive version
                // ···························································
                if (card.definitiveVersion) {
                    // If a card has been picked its maximum amount of times, the definitive version is used.
                    if (card.timesPicked == card.maxPicks) {
                        card = card.definitiveVersion;
                    }
                    // Stackable cards (which are special silver cards) are changed to their definitive version
                    // in "alteredMode" with 100% probability, and in "chaosMode" with 50% probability.
                    else if ((card.type == "Stackable") &&
                             (AppHandler.state.alteredMode || (AppHandler.state.chaosMode && (Math.random() < 0.5)))) {
                        card = card.definitiveVersion;
                    }
                }
                
                // ···························································
                //  Will the card be offered?
                // ···························································
                // Don't offer cards that have already been picked their maximum amount of times.
                if (card.timesPicked == card.maxPicks) {
                    success = false;
                    continue;
                }
                
                // Don't offer cards that are already on offer, are the definitive version of a card on offer,
                // or have already on offer their definitive version.
                for (var slotIndex2 = 0; slotIndex2 < slotIndex; slotIndex2++) {
                    let otherCard = AppHandler.state.offeredCards[slotIndex2];
                    
                    if (JSON.stringify(card.text) == JSON.stringify(otherCard.text)) {
                        success = false;
                        break;
                    }
                    else if (card.definitiveVersion && 
                             (JSON.stringify(card.definitiveVersion.text) == JSON.stringify(otherCard.text))) {
                        success = false;
                        break;
                    }
                    else if (otherCard.definitiveVersion && 
                             (JSON.stringify(card.text) == JSON.stringify(otherCard.definitiveVersion.text))) {
                        success = false;
                        break;
                    }
                }
                if (!success) {
                    continue;
                }
                
                // Don't offer cards that are incompatible with others already picked, or other cards on offer.
                for (let incompatText in card.incompatibleCards) {
                    if ((AppHandler.state.pickedModifiers.indexOf(incompatText) >= 0) ||
                        (AppHandler.state.pickedChallenges.indexOf(incompatText) >= 0) ||
                        (AppHandler.state.pickedGoldCards.indexOf(incompatText) >= 0)) {
                        success = false;
                        break;
                    }
                    
                }
                for (var slotIndex2 = 0; slotIndex2 < slotIndex; slotIndex2++) {
                    let otherCard = AppHandler.state.offeredCards[slotIndex2];
                    
                    if (card.incompatibleCards.indexOf(otherCard.text[0]) >= 0) {
                        success = false;
                        break;
                    }
                }
                if (!success) {
                    continue;
                }
            }
            
            // Once an appropiate card has been generated, it's time to put it on offer.
            AppHandler.state.offeredCards[slotIndex] = card;
            WebHandler.showCard(slotIndex, AppHandler.state);
            success = false;
        }
        
        // There's a 20% probability in "noGoldMode", to start round 1 with a special challenge available.
        if (AppHandler.state.noGoldMode && (Math.random() < 0.2) && (AppHandler.state.round == 1)) {
            var specialCard = challengeCards[challengeCards.length - 1];
            var randomSpecialIndex = Math.floor(Math.random() * 4);
            
            AppHandler.state.offeredCards[randomSpecialIndex] = specialCard;
            WebHandler.showCard(randomSpecialIndex, AppHandler.state);
        }
    }
    
    // --------------------------------------------------------------------------------------------
    /// takeCard()
    //  When a card is picked, it is processed and hidden.
    //  If all cards have been picked for this round, then the 'Next round' button is activated
    //  (unless the run has ended).
    // --------------------------------------------------------------------------------------------
    static takeCard(slotIndex) {
        var card = AppHandler.state.offeredCards[slotIndex];

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //  Handling picking a mystery card.
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if ((AppHandler.state.mysteryMode || (slotIndex == AppHandler.state.totalCardSlots - 1)) && 
            (card.text[0].indexOf("End run now") == -1) && !AppHandler.state.showAllMode) {
            let slotAmount = AppHandler.state.totalCardSlots;
            
            // If the card was clicked while a mystery (face down)...
            if (!AppHandler.state.reclickCard) {
                // Get all previously hidden cards.
                for (var slotIndex2 = 0; slotIndex2 < slotAmount; slotIndex2++) {
                    if (WebHandler.isCardHidden(slotIndex2)) {
                        AppHandler.state.hiddenSlots.push(slotIndex2);
                    }
                }
                // Hide all cards.
                for (var slotIndex2 = 0; slotIndex2 < slotAmount; slotIndex2++) {
                    WebHandler.hideCard(slotIndex2);
                }
                // Show the card and make the user click again to confirm their card choice.
                AppHandler.state.showAllMode = true;
                WebHandler.showCard(slotIndex, AppHandler.state);
                AppHandler.state.showAllMode = false;
                
                WebHandler.changeText('picktext', "Confirm your card");
                AppHandler.state.reclickCard = true;
                return;
            }
            
            // If the card was clicked while revealed (face up)...
            else {
                // We no longer need to reclick.
                AppHandler.state.reclickCard = false;
                
                // Show all cards again, unless they were hidden before clicking the mystery card.
                for (var slotIndex2 = 0; slotIndex2 < slotAmount; slotIndex2++) {
                    if (AppHandler.state.hiddenSlots.indexOf(slotIndex2) == -1) {
                        WebHandler.showCard(slotIndex2, AppHandler.state);
                    }
                }
                // No longer need to know which slots were previously hidden.
                AppHandler.state.hiddenSlots = [];
            }
        }
        
        // ~~~~~~~~~~~~~~~~~~~~~~~
        //  Processing the card.
        // ~~~~~~~~~~~~~~~~~~~~~~~
        // Hide card, and update its "timesPicked" counter.
        WebHandler.hideCard(slotIndex);
        card.timesPicked += 1;
        
        // Add the card's corresponding text to the appropiate list, and if it's a golden card 
        // then apply its effect.
        if (card.type == "Golden") {
            AppHandler.state.pickedGoldCards.push(card.text[card.timesPicked - 1]);
            card.effect();
        }
        else if (card.type == "Challenge") {
            AppHandler.state.pickedChallenges.push(card.text[card.timesPicked - 1]);
        }
        else {
            AppHandler.state.pickedModifiers.push(card.text[card.timesPicked - 1]);
        }
        
        // Remove the text of earlier picked tiers, or the text of the base card if the card
        // being picked was a definitive version of a card.
        if (card.timesPicked > 1) {
            var textRemoval = function filterFunction(element) { return element != card.text[card.timesPicked - 2] };
            
            if (card.type == "Golden") {
                AppHandler.state.pickedGoldCards = AppHandler.state.pickedGoldCards.filter(textRemoval);
            }
            if (card.type == "Challenge") {
                AppHandler.state.pickedChallenges = AppHandler.state.pickedChallenges.filter(textRemoval);
            }
            else {
                AppHandler.state.pickedModifiers = AppHandler.state.pickedModifiers.filter(textRemoval);
            }
        }
        if (card.baseCard) {
            var textRemoval;
            for (var index = 0; index < card.baseCard.text.length; index++) {
                textRemoval = function filterFunction(element) { return (element != card.baseCard.text[index]) };
                
                if (card.type == "Golden") {
                    AppHandler.state.pickedGoldCards = AppHandler.state.pickedGoldCards.filter(textRemoval);
                }
                if (card.type == "Challenge") {
                    AppHandler.state.pickedChallenges = AppHandler.state.pickedChallenges.filter(textRemoval);
                }
                else {
                    AppHandler.state.pickedModifiers = AppHandler.state.pickedModifiers.filter(textRemoval);
                }
            }
        }
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //  Update the modifiers/challenges lists
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //-------------
        // Modifiers
        //-------------
        let modifiers = AppHandler.state.pickedModifiers.sort().reverse();
        var modifierText = "";
        var sectionIndex, oldSectionIndex = null;

        for (var modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
            let modifier = modifiers[modifierIndex];
            sectionIndex = modifier.indexOf("[Player]") >= 0? 0 : (modifier.indexOf("[Ghost]") >= 0? 1 : 2);

            if ((oldSectionIndex !== null) && (oldSectionIndex != sectionIndex)) {
                modifierText += "--------------------------------------------------" + "<br>";
            }
            modifierText += modifier + "<br>";
            
            oldSectionIndex = sectionIndex;
        }
        WebHandler.changeText('modifiers', modifierText);
        
        //-------------
        // Challenges
        //-------------
        let challenges = AppHandler.state.pickedChallenges;
        var challengeText = "";

        for (var challengeIndex = 0; challengeIndex < challenges.length; challengeIndex++) {
            let challenge = challenges[challengeIndex];
            challengeText += challenge + "<br>";
        }
        WebHandler.changeText('challenges', challengeText);
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //  Check remaining cards to pick
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Reduce the cards to pick this round by 1.
        AppHandler.state.remainingPicks -= 1;

        // If there are no more cards to pick...
        if (AppHandler.state.remainingPicks == 0) {

            // Check if the run has ended, saying so clearly and hiding all cards.
            if (AppHandler.state.round == AppHandler.state.maxRounds) {
                WebHandler.changeText('picktext', "The run ends here. Good luck!");

                let slotAmount = AppHandler.state.totalCardSlots;
                for (var slotIndex2 = 0; slotIndex2 < slotAmount; slotIndex2++) {
                    WebHandler.hideCard(slotIndex2);
                }
            }
            // Otherwise: enable the 'next round' button, hide all cards, update the pick text.
            else {
                if (AppHandler.state.round == 0) {
                    WebHandler.changeText('picktext', "Feeling masochistic, eh? Go ahead...");
                }
                else {
                    WebHandler.changeText('right-button', "Next round");
                    WebHandler.changeStyleCSS('right-button', "nextround-button-enabled");
                    WebHandler.changeClickFunction('right-button', function onclick()
                                                                   { AppHandler.nextRound() });
                    let slotAmount = AppHandler.state.totalCardSlots;
                    for (var slotIndex2 = 0; slotIndex2 < slotAmount; slotIndex2++) {
                        WebHandler.hideCard(slotIndex2);
                    }
                    
                    WebHandler.changeText('picktext', "If you beat the map, go to the next round.");
                }
            }

            // If the window is too slim, remove the card slots from view entirely so that buttons
            // jump higher and can be used without scrolling. More comfortable for mobile devices.
            if (WebHandler.getWidth('card0') < 208) {
                WebHandler.hideElement('cardslots');
            }
        }
        else if (!AppHandler.state.showAllMode) {
            let newPickText = "Pick " + AppHandler.state.remainingPicks + " of these cards:";
            WebHandler.changeText('picktext', newPickText);
        }
    }
}

/// -------------------------------------------------------------------------------------------------------------------
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
///   SECTION 3: MAPS
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
/// -------------------------------------------------------------------------------------------------------------------
/* ==========================================================================================================
    [MapCollection]
     Template to create a collection of Phasmophobia maps.
 ========================================================================================================= */
class MapCollection extends Array {
    // --------------------------------------------------------------------------------------------
    /// Constructor
    //  Needs to be passed an array containing the names of all maps to include in the collection.
    // --------------------------------------------------------------------------------------------
    constructor(array) {
        super();
        for (let element of array) {
            this.push(element);
        }
    }
    
    // --------------------------------------------------------------------------------------------
    /// shuffle()
    //  Shuffles the collection randomly by using the Fisher-Yates algorithm.
    // --------------------------------------------------------------------------------------------
    shuffle() {
        var index, randIndex, temp;

        for (index = this.length - 1; index > 0; index--) {
            randIndex = Math.floor(Math.random() * (index + 1));

            temp = this[index];
            this[index] = this[randIndex];
            this[randIndex] = temp;
       }
    }
}

 /* =========================================================================================================
     Defining all maps available.
 ========================================================================================================= */
let smallMaps = new MapCollection([
    "Tanglewood Drive",
    "Edgefield Road",
    "Ridgeview Court",
    "Willow Street",
    "Camp Woodwind",
    "Sunny Meadows (Restricted)",
    "Bleasdale Farmhouse",
    "Grafton Farmhouse"
]);
 
let bigMaps = new MapCollection([
    "Brownstone High School",
    "Prison",
    "Maple Lodge Campsite",
    "Sunny Meadows"
]);

/// -------------------------------------------------------------------------------------------------------------------
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
///   SECTION 4: CARDS
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
/// -------------------------------------------------------------------------------------------------------------------
class TormentCard {
    static ratings = {"Don't offer":      0,
                      "Very easy":        1, 
                      "Easy":             2, 
                      "Normal":           3, 
                      "Hard":             4, 
                      "Very hard":        5, 
                      "Maybe impossible": 6};
                      
    static weights = [[0, 0, 0, 0, 0, 0], // Difficulty: Don't offer
                      [3, 1, 0, 0, 0, 0], // Difficulty: Very easy
                      [4, 3, 2, 1, 0, 0], // Difficulty: Easy
                      [2, 3, 3, 3, 1, 0], // Difficulty: Normal
                      [1, 2, 4, 3, 5, 5], // Difficulty: Hard
                      [0, 1, 1, 2, 3, 3], // Difficulty: Very hard
                      [0, 0, 0, 1, 1, 2]] // Difficulty: Maybe impossible
                      
    // --------------------------------------------------------------------------------------------
    /// Constructor
    //  Needs to be passed a dictionary storing the card's: 
    //    - Type
    //    - Difficulty
    //    - Rarity
    //    - Image
    //    - Text
    //    - Max number of times it can be picked
    //    - Definitive version
    //    - Rounds in which it can't be offered
    //    - List of other cards it's incompatible with
    //    - (OPTIONAL) Effect to apply when picked
    // --------------------------------------------------------------------------------------------
    constructor(params) {
        this.type = params.type;
        this.rating = TormentCard.ratings[params.difficulty];
        this.weightModifier = params.rarity;
        this.image = params.image;
        this.text = params.text;
        this.maxPicks = params.maxPicks;
        this.forbiddenRounds = params.forbiddenRounds;
        this.incompatibleCards = params.incompatibleCards;
        this.definitiveVersion = params.definitive;
        
        this.timesPicked = 0;
        this.effect = params.type == "Golden"? params.effect : null;
    }
    
    // --------------------------------------------------------------------------------------------
    /// resetCounter()
    //  Resets the "timesPicked" counter to 0.
    // --------------------------------------------------------------------------------------------
    resetCounter() {
        this.timesPicked = 0;
    }
    
    // --------------------------------------------------------------------------------------------
    /// getWeight(Number, Number, String) -> Number
    //  Needs the current round, difficulty, and map's name to be passed as parameters.
    //  Return the weight based on the card's rarity, and difficulty rating (cards that are too 
    //  far above or below the current difficulty won't be offered).
    // --------------------------------------------------------------------------------------------
    getWeight(round, difficulty, map) {
        // If the current round is a forbidden round for this card, then its weight is 0 
        // and won't be offfered.
        if (this.forbiddenRounds.indexOf(round) >= 0) {
            return 0;
        }
        // If the map's not a campsite and the card regards weather, it can't be offered.
        else if ((map.indexOf("Camp") == -1) && (this.text[0].indexOf("Weather") >= 0)) {
            return 0;
        }
        // Otherwise, return the appropiate weight based on the card's difficulty rating and
        // current difficulty, taking into account is rarity.
        else {
            let baseWeight = TormentCard.weights[this.rating][difficulty];
            
            if (baseWeight > 0) {
                return Math.max(0, baseWeight + this.weightModifier);
            }
            else {
                return 0;
            }
        }
    }
 }
 
 /* =========================================================================================================
    [CardCollection]
     Template to create a collection of Torment cards.
 ========================================================================================================= */
 class CardCollection extends Array {
    // --------------------------------------------------------------------------------------------
    /// Constructor
    //  Needs to be passed an array of dictionaries, with each dictionary containing the information
    //  of each card to be stored in the collection.
    // --------------------------------------------------------------------------------------------
    constructor(dictArray) {
        super();
        
        // Populate the array of the collection.
        for (var index = 0; index < dictArray.length; index++) {
            this.push(new TormentCard(dictArray[index]));
            
            if (this[index].definitiveVersion) {
                this[index].definitiveVersion = new TormentCard(this[index].definitiveVersion);
                this[index].definitiveVersion.baseCard = this[index];
            }
        }
    }
    
    // --------------------------------------------------------------------------------------------
    /// resetCounters()
    //  Reset the "timesPicked" counter of all cards in the collection.
    // --------------------------------------------------------------------------------------------
    resetCounters() {
        for (var index = 0; index < this.length; index++) {
            this[index].resetCounter();
        }
    }
    
    // --------------------------------------------------------------------------------------------
    /// getRandomCard(Number, Number) -> TormentCard
    //  Needs round, difficulty and map to be passed as parameters.
    //  Returns a randomly chosen card from the collection, based on their weights.
    // --------------------------------------------------------------------------------------------
    getRandomCard(round, difficulty, map) {
        var cumWeights;

        // Calculate the cumulative weight for each card.
        cumWeights = [this[0].getWeight(round, difficulty, map)];
        
        for (var index = 1; index < this.length; index++) {
            cumWeights.push(cumWeights[index - 1] + this[index].getWeight(round, difficulty, map));
        }
        
        // Get a random number in the interval [1, totalWeights].
        // Return the first card with a cumulative value equal to or greater than that number.
        let totalWeights = cumWeights[this.length - 1];
        let randomValue = 1 + Math.floor(Math.random() * totalWeights);

        // Return the first card that has a cumulative weight <= randomValue.
        for (var index = 0; index < this.length; index++) {
            if (cumWeights[index] >= randomValue) {
                return this[index];
            }
        }
        
        return goldenCards[goldenCards.length - 4];
    }
}

 /* =========================================================================================================
     LIST OF TORMENT CARDS
 ========================================================================================================= */
let silverCards = new CardCollection([
    // ---------------------------------------
    //   BASIC CARDS
    // ---------------------------------------
    {"type":       "Basic",
     "difficulty": "Easy",
     "rarity":     +0,
     "image":      "./images/basic1.gif",
     "text":      ["[Contract] Activity monitor: Off<br>[Contract] Sanity monitor: Off"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": []},
       
    {"type":       "Basic",
     "difficulty": "Very easy",
     "rarity":     -1,
     "image":      "./images/basic2.gif",
     "text":      ["[Contract] Cursed possessions quantity: 0"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": ["Must exhaust cursed item once found"]},
       
    {"type":       "Basic",
     "difficulty": "Normal",
     "rarity":     -1,
     "image":      "./images/basic3.gif",
     "text":      ["[Contract] Fuse box starts: Broken"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": []},
       
    {"type":       "Basic",
     "difficulty": "Normal",
     "rarity":     -1,
     "image":      "./images/basic4.gif",
     "text":      ["[Ghost] Fingerprint chance: 50%"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Ghost] Evidence given: 0"]},
       
    {"type":       "Basic",
     "difficulty": "Easy",
     "rarity":     +0,
     "image":      "./images/basic5.gif",
     "text":      ["[Ghost] Fingerprint duration: 15s"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Ghost] Evidence given: 0"]},
       
    {"type":       "Basic",
     "difficulty": "Very easy",
     "rarity":     +1,
     "image":      "./images/basic6.gif",
     "text":      ["[Ghost] Interaction amount: Medium<br>[Ghost] Event frequency: High"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": []},
       
    {"type":       "Basic",
     "difficulty": "Very easy",
     "rarity":     +5,
     "image":      "./images/basic7.gif",
     "text":      ["[Contract] Weather: Snowing"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Contract] Weather: Heavy rain"]},
       
    {"type":       "Basic",
     "difficulty": "Normal",
     "rarity":     +8,
     "image":      "./images/basic8.gif",
     "text":      ["[Contract] Weather: Heavy rain"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Contract] Weather: Snow"]},
       
    {"type":       "Basic",
     "difficulty": "Hard",
     "rarity":     -1,
     "image":      "./images/basic9.gif",
     "text":      ["[Ghost] Changing favourite room: Medium"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": []},
       
    // ---------------------------------------
    //   STACKABLE CARDS
    // ---------------------------------------      
    {"type":       "Stackable",
     "difficulty": "Very hard",
     "rarity":     +2,
     "image":      "./images/stackable1.gif",
     "text":      ["[Player] Starting sanity: 75%",
                   "[Player] Starting sanity: 50%",
                   "[Player] Starting sanity: 25%"],
     "maxPicks":   3,
     "definitive": {"type":       "Basic",
                    "difficulty": "Maybe impossible",
                    "rarity":     -1,
                    "image":      "./images/stackable1_definitive.gif",
                    "text":      ["[Player] Stating sanity: 0%"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": []},
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Player] Stating sanity: 0%]"]},
       
    {"type":       "Stackable",
     "difficulty": "Hard",
     "rarity":     +2,
     "image":      "./images/stackable2.gif",
     "text":      ["[Player] Sanity pill restoration: 20%",
                   "[Player] Sanity pill restoration: 10%"],
     "maxPicks":   2,
     "definitive": {"type":       "Basic",
                    "difficulty": "Very hard",
                    "rarity":     +0,
                    "image":      "./images/stackable2_definitive.gif",
                    "text":      ["[Player] Sanity pill restoration: 0%"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": []},
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Player] Sanity pill restoration: 0%"]},
       
    {"type":       "Stackable",
     "difficulty": "Hard",
     "rarity":     -1,
     "image":      "./images/stackable3.gif",
     "text":      ["[Player] Sprint duration: 2s",
                   "[Player] Sprint duration: 1s"],
     "maxPicks":   2,
     "definitive": {"type":       "Basic",
                    "difficulty": "Very hard",
                    "rarity":     -2,
                    "image":      "./images/stackable3_definitive.gif",
                    "text":      ["[Player] Sprinting: Off", "Can't sprint during hunts"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": []},
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Player] Sprinting: Off"]},
       
    {"type":       "Stackable",
     "difficulty": "Normal",
     "rarity":     +1,
     "image":      "./images/stackable4.gif",
     "text":      ["[Ghost] Evidence given: 2",
                   "[Ghost] Evidence given: 1"],
     "maxPicks":   2,
     "definitive": {"type":       "Basic",
                    "difficulty": "Maybe impossible",
                    "rarity":     +0,
                    "image":      "./images/stackable4_definitive.gif",
                    "text":      ["[Ghost] Evidence given: 0"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": ["[Ghost] Fingerprint chance: 50%",
                                          "[Ghost] Fingerprint duration: 15s",
                                          "No evidence items"]},
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Ghost] Evidence given: 0"]},
    
       
    {"type":       "Stackable",
     "difficulty": "Hard",
     "rarity":     -2,
     "image":      "./images/stackable5.gif",
     "text":      ["[Player] Player speed: 75%"],
     "maxPicks":   1,
     "definitive": {"type":    "Basic",
                    "difficulty": "Maybe impossible",
                    "rarity":    -2,
                    "image":     "./images/stackable5_definitive.gif",
                    "text":     ["[Player] Player speed: 50%"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": []},
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Player] Player speed: 50%"]},
       
    {"type":       "Stackable",
     "difficulty": "Hard",
     "rarity":     +10,
     "image":      "./images/stackable6.gif",
     "text":      ["[Ghost] Ghost speed: 125%"],
     "maxPicks":   1,
     "definitive": {"type":       "Basic",
                    "difficulty": "Very hard",
                    "rarity":     +0,
                    "image":      "./images/stackable6_definitive.gif",
                    "text":      ["[Ghost] Ghost speed: 150%"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": []},
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Ghost] Ghost speed: 150%"]},
       
    {"type":       "Stackable",
     "difficulty": "Normal",
     "rarity":     +10,
     "image":      "./images/stackable7.gif",
     "text":      ["[Ghost] Grace period: 1s"],
     "maxPicks":   1,
     "definitive": {"type":       "Basic",
                    "difficulty": "Very hard",
                    "rarity":     -2,
                    "image":      "./images/stackable7_definitive.gif",
                    "text":      ["[Ghost] Grace period: 0s<br>[Ghost] Kills extend hunts: Low"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": []},
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Ghost] Grace period: 0s<br>[Ghost] Kills extend hunts: Low"]},
       
    {"type":       "Stackable",
     "difficulty": "Easy",
     "rarity":     +0,
     "image":      "./images/stackable8.gif",
     "text":      ["[Contract] Number of hiding places: Low"],
     "maxPicks":   1,
     "definitive": {"type":       "Basic",
                    "difficulty": "Maybe impossible",
                    "rarity":     -1,
                    "image":      "./images/stackable8_definitive.gif",
                    "text":      ["[Contract] Number of hiding places: None"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": []},
     "forbiddenRounds":   [],
     "incompatibleCards": ["[Contract] Number of hiding places: None"]}
]);

let challengeCards = new CardCollection([
    // ---------------------------------------
    //   CHALLENGE CARDS
    // ---------------------------------------
    {"type":       "Challenge",
     "difficulty": "Normal",
     "rarity":     -1,
     "image":      "./images/challenge1.gif",
     "text":      ["Can't use strong flashlights"],
     "maxPicks":   1,
     "definitive": {"type":       "Basic",
                    "difficulty": "Very hard",
                    "rarity":     -2,
                    "image":      "./images/challenge1_definitive.gif",
                    "text":      ["[Player] Flashlights: Off"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": []},
     "forbiddenRounds":   [1],
     "incompatibleCards": ["[Player] Flashlights: Off"]},
       
    {"type":       "Challenge",
     "difficulty": "Hard",
     "rarity":     +2,
     "image":      "./images/challenge2.gif",
     "text":      ["Photo randomizer"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Starter equipment only",
                           "Complete all objectives",
                           "Can't use any items used last round"]},
       
    {"type":       "Challenge",
     "difficulty": "Very hard",
     "rarity":     -1,
     "image":      "./images/challenge3.gif",
     "text":      ["Starter equipment only"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Complete all objectives",
                           "Photo randomizer",
                           "Get minimum 50$ in photos",
                           "Can't use any items used last round"]},
       
    {"type":       "Challenge",
     "difficulty": "Very hard",
     "rarity":     +1,
     "image":      "./images/challenge4.gif",
     "text":      ["No crucifix, candles or smudge sticks"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Complete all objectives"]},
       
    {"type":       "Challenge",
     "difficulty": "Hard",
     "rarity":     -1,
     "image":      "./images/challenge5.gif",
     "text":      ["No evidence items"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["[Ghost] Evidence given: 0",
                           "Complete all objectives"]},
       
    {"type":       "Challenge",
     "difficulty": "Normal",
     "rarity":     +0,
     "image":      "./images/challenge6.gif",
     "text":      ["No paramic, thermometer or sensors"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Complete all objectives"]},
       
    {"type":       "Challenge",
     "difficulty": "Normal",
     "rarity":     +1,
     "image":      "./images/challenge7.gif",
     "text":      ["Complete all objectives"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Photo randomizer",
                           "Starter equipment only",
                           "No crucifix, candles or smudge sticks",
                           "No evidence items",
                           "No paramic, thermometer or sensors",
                           "Can't use any items used last round"]},
                 
    {"type":       "Challenge",
     "difficulty": "Very hard",
     "rarity":     +2,
     "image":      "./images/challenge8.gif",
     "text":      ["Must finish under 12 minutes"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": []},
       
    {"type":       "Challenge",
     "difficulty": "Easy",
     "rarity":     +0,
     "image":      "./images/challenge9.gif",
     "text":      ["Only enter the building once"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": []},
       
    {"type":       "Challenge",
     "difficulty": "Normal",
     "rarity":     +2,
     "image":      "./images/challenge10.gif",
     "text":      ["Must exhaust cursed item once found"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["[Contract] Cursed possessions quantity: 0"]},
       
    {"type":       "Challenge",
     "difficulty": "Hard",
     "rarity":     +2,
     "image":      "./images/challenge11.gif",
     "text":      ["No sound"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1, 2, 3, 4],
     "incompatibleCards": []},
       
    {"type":       "Challenge",
     "difficulty": "Normal",
     "rarity":     +1,
     "image":      "./images/challenge12.gif",
     "text":      ["Get minimum 50$ in photos"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Starter equipment only",
                           "Can't use any items used last round"]},
       
    {"type":       "Challenge",
     "difficulty": "Hard",
     "rarity":     -1,
     "image":      "./images/challenge13.gif",
     "text":      ["Get ghost & bone photo"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Can't use any items used last round"]},
       
    {"type":       "Challenge",
     "difficulty": "Very hard",
     "rarity":     -1,
     "image":      "./images/challenge14.gif",
     "text":      ["Can only use 1 of each item"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Can't use any items used last round"]},
     
    {"type":       "Challenge",
     "difficulty": "Hard",
     "rarity":     +0,
     "image":      "./images/challenge15.gif",
     "text":      ["Can't close any doors"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": []},
     
    {"type":       "Challenge",
     "difficulty": "Easy",
     "rarity":     +0,
     "image":      "./images/challenge16.gif",
     "text":      ["Can't interact with light switches"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": []},
     
    {"type":       "Challenge",
     "difficulty": "Hard",
     "rarity":     +1,
     "image":      "./images/challenge17.gif",
     "text":      ["Can't sprint during hunts"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["[Player] Sprinting: Off"]},
     
    {"type":       "Challenge",
     "difficulty": "Hard",
     "rarity":     +2,
     "image":      "./images/challenge18.gif",
     "text":      ["Can't reuse rooms to hide in"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": []},
     
    {"type":       "Challenge",
     "difficulty": "Don't offer",
     "rarity":     +0,
     "image":      "./images/challenge_special.gif",
     "text":      ["Can't use any items used last round"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1],
     "incompatibleCards": ["Photo randomizer",
                           "Starter equipment only",
                           "Complete all objectives",
                           "Get minimum 50$ in photos",
                           "Get ghost & bone photo",
                           "Can only use 1 of each item"]},
]);
 
let goldenCards = new CardCollection([
    // ---------------------------------------
    //   SPECIAL GOLDEN CARDS (HARD RUNS)
    // ---------------------------------------
    {"type":       "Golden",
     "difficulty": "Don't offer",
     "rarity":     +0,
     "image":      "./images/golden_special1.gif",
     "text":      ["Golden cards will not be offered"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": [],
     "effect":
         function onPick() { 
             AppHandler.state.noGoldMode = true;
         }
     },
     
    {"type":       "Golden",
     "difficulty": "Don't offer",
     "rarity":     +0,
     "image":      "./images/golden_special2.gif",
     "text":      ["Greatly increase card difficulty"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": [],
     "effect":
         function onPick() { 
             AppHandler.state.difficulty += 2;
         } 
     },
     
    {"type":       "Golden",
     "difficulty": "Don't offer",
     "rarity":     +0,
     "image":      "./images/golden_special3.gif",
     "text":      ["Some cards will be much worse"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": [],
     "effect":    
         function onPick() { 
             AppHandler.state.alteredMode = true;
         } 
     },
     
    {"type":       "Golden",
     "difficulty": "Don't offer",
     "rarity":     +0,
     "image":      "./images/golden_special4.gif",
     "text":      ["Restrict card choices to 3 slots"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": [],
     "effect": 
         function onPick() {
             AppHandler.state.totalCardSlots = 3;
         }
     },
       
    // ---------------------------------------
    //   STANDARD GOLDEN CARDS
    // ---------------------------------------
    {"type":       "Golden",
     "difficulty": "Normal",
     "rarity":     +5,
     "image":      "./images/golden1.gif",
     "text":      ["Slightly increase card difficulty"],
     "maxPicks":   1,
     "definitive": {"type":       "Golden",
                    "difficulty": "Hard",
                    "rarity":     +3,
                    "image":      "./images/golden1_definitive.gif",
                    "text":      ["Further increase card difficulty"],
                    "maxPicks":   1,
                    "definitive": null,
                    "forbiddenRounds":   [],
                    "incompatibleCards": ["Greatly increase card difficulty"],
                    "effect":
                        function onPick() { 
                             AppHandler.state.difficulty += 1;
                        } 
                    },
     "forbiddenRounds":   [5, 6],
     "incompatibleCards": ["Further increase card difficulty", "Greatly increase card difficulty"],
     "effect":
         function onPick() { 
             AppHandler.state.difficulty += 1;
         }
     },
       
    {"type":       "Golden",
     "difficulty": "Hard",
     "rarity":     +1,
     "image":      "./images/golden2.gif",
     "text":      ["Pick an extra card next time"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [5, 6],
     "incompatibleCards": [],
     "effect":
         function onPick() { 
             AppHandler.state.extraMode = true;
         }
     },
       
    {"type":       "Golden",
     "difficulty": "Easy",
     "rarity":     +1,
     "image":      "./images/golden3.gif",
     "text":      ["Challenges appear more often"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [4, 5, 6],
     "incompatibleCards": [],
     "effect":
         function onPick() { 
             AppHandler.state.challengeMode = true;
         }
     },
       
    {"type":       "Golden",
     "difficulty": "Hard",
     "rarity":     +2,
     "image":      "./images/golden4.gif",
     "text":      ["All cards are a mystery next time"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [5, 6],
     "incompatibleCards": [],
     "effect":
         function onPick() { 
             AppHandler.state.scheduleMystery = true;
         }
     },
       
    {"type":       "Golden",
     "difficulty": "Normal",
     "rarity":     +2,
     "image":      "./images/golden5.gif",
     "text":      ["Random cards are offered. Pick again"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [],
     "incompatibleCards": [],
     "effect":
         function onPick() { 
             AppHandler.state.chaosMode = true; 
             AppHandler.state.difficulty += 1;
             AppHandler.offerNewCards();
             AppHandler.state.difficulty -= 1;
             AppHandler.state.chaosMode = false;
             
             AppHandler.state.remainingPicks += 1;
         }
     },
       
    {"type":       "Golden",
     "difficulty": "Easy",
     "rarity":     +0,
     "image":      "./images/golden6.gif",
     "text":      ["Change map to a bigger one"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [3, 5],
     "incompatibleCards": [],
     "effect":
         function onPick() { 
             let lastBigMap = bigMaps[bigMaps.length - 1];
             WebHandler.changeText('maptext', lastBigMap);
         }
     },
       
    {"type":       "Golden",
     "difficulty": "Easy",
     "rarity":     +3,
     "image":      "./images/golden7.gif",
     "text":      ["Pick all cards. Get a bigger map. End run now"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [1, 2, 3, 5],
     "incompatibleCards": ["You can fail any 1 round. Longer run"],
     "effect":
         function onPick() {
             // Make this the last round, and force the user to pick all cards (which are shown
             // if they were a mystery before).
             AppHandler.state.maxRounds -= 1;
             AppHandler.state.remainingPicks += AppHandler.state.totalCardSlots - 2;
             AppHandler.state.showAllMode = true;

             // Update the map and pick text.
             WebHandler.changeText('maptext', bigMaps[1]);
             WebHandler.changeText('picktext', "Pick all remaining cards");

             // Get all previously hidden cards.
             let slotAmount = AppHandler.state.totalCardSlots;
             
             for (var slotIndex = 0; slotIndex < slotAmount; slotIndex++) {
                 if (WebHandler.isCardHidden(slotIndex)) {
                     AppHandler.state.hiddenSlots.push(slotIndex);
                 }
             }
             
             // Show all cards that weren't previously hidden.
             for (var slotIndex = 0; slotIndex < slotAmount; slotIndex++) {
                 if ((AppHandler.state.hiddenSlots.indexOf(slotIndex) == -1) &&
                     (AppHandler.state.offeredCards[slotIndex].text[0].indexOf("Pick all cards") == -1)) {
                     WebHandler.showCard(slotIndex, AppHandler.state);
                 }
             }
             
             // No longer need to know which slots were previously hidden.
             AppHandler.state.hiddenSlots = [];
         }
     },
       
    {"type":       "Golden",
     "difficulty": "Very easy",
     "rarity":     +2,
     "image":      "./images/golden8.gif",
     "text":      ["You can fail any 1 round. Longer run"],
     "maxPicks":   1,
     "definitive": null,
     "forbiddenRounds":   [4, 5],
     "incompatibleCards": [],
     "effect":    
         function onPick() { 
             AppHandler.state.maxRounds += 1;
             AppHandler.state.pickedChallenges.splice(0, 0, "-- REMINDER: You may fail any 1 round --<br>");
         } 
     }
]);

/// -------------------------------------------------------------------------------------------------------------------
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
///   SECTION 5: MAKING IT ALL WORK
/// ·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~·~
/// -------------------------------------------------------------------------------------------------------------------
/* ===============================================================================================
    RUN THIS CODE ON PAGE LOAD
 =============================================================================================== */
AppHandler.chooseNewRun();