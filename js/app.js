/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = qs;
/* harmony export (immutable) */ __webpack_exports__["f"] = qsa;
/* harmony export (immutable) */ __webpack_exports__["a"] = arrayRemove;
/* harmony export (immutable) */ __webpack_exports__["b"] = invoke;
/* harmony export (immutable) */ __webpack_exports__["c"] = makePromise;
/* harmony export (immutable) */ __webpack_exports__["h"] = wait;
/* harmony export (immutable) */ __webpack_exports__["d"] = outerWidth;
/* harmony export (immutable) */ __webpack_exports__["g"] = reflow;


// Get first DOM element matching css selector in parent
// If parent is not provided, will select on document root
function qs(parent, selector)
{
    if(!selector)
    {
        return document.querySelector(parent);
    }

    return parent.querySelector(selector);
}

// Get all DOM elements matching css selector in parent
// If parent is not provided, will select on document root
function qsa(parent, selector)
{
    if(!selector)
    {
        return document.querySelectorAll(parent);
    }

    return parent.querySelectorAll(selector);
}

// Remove an element from array at a specific index O(1) complexity
function arrayRemove(arr, index)
{
    arr[index] = arr[arr.length - 1];
    arr.pop();
}

// Invoke a function
function invoke(func, ...args)
{
    func.apply(this, args);
}

// Create a promise by invoking the passed function
// The function is passed a callback that it should invoke to complete the process
function makePromise(func)
{
    return new Promise(function(resolve, reject)
    {
        func(function(error, success)
        {
            if(error) { reject(error); }
            else      { resolve(success); }                
        })
    });
}

// Function that returns a promise that will resolve after the specified number
// of milliseconds
function wait(millis)
{
    return new Promise(function(resolve)
    {
        setTimeout(function()
        {
            resolve();
        }, millis);
    });
}

// Function that returns the full width of an element
function outerWidth(element)
{
    var width = element.offsetWidth;
    var computedStyle = window.getComputedStyle(element); 
    width += parseInt(computedStyle.marginLeft);
    width += parseInt(computedStyle.marginRight);
    width += parseInt(computedStyle.borderLeftWidth);
    width += parseInt(computedStyle.borderRightWidth);
    return width;
}

// Causes an elements flow to be recalculated
function reflow(element)
{
    element.offsetWidth;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);




class InputOverlay
{
    constructor(overlayId)
    {
        this.overlay = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(overlayId);
        this.closeButtons = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["f" /* qsa */])(this.overlay, ".overlay_close");
        this.confirmButton = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".overlay_confirm");
        this.titleText = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".overlay_title");
        this.onConfirm = null;
        this.onCancel = null;

        var self = this;

        // Setup the confirm/cancel buttons
        if(this.confirmButton)
        {
            this.confirmButton.addEventListener("click", function()
            {
                var action = self.onConfirm;
                if(action)
                {
                    self.close();
                    action(self.getInput());
                }
            });
        }
        if(this.closeButtons)
        {
            for(let i = 0; i < this.closeButtons.length; ++i)
            {
                var closeButton = this.closeButtons[i];
                closeButton.addEventListener("click", function()
                {
                    var action = self.onCancel;
                    if(action)
                    {
                        self.close();
                        action("cancelled");
                    }
                });
            }
        }
    }

    close()
    {
        this.overlay.classList.remove("overlay_appear");
        this.onConfirm = null;
        this.onCancel = null;   
    }

    getInput()
    {
        return undefined;
    }

    async retrieveInput()
    {
        // Unhide
        this.overlay.classList.add("overlay_appear");

        var self = this;
        return await new Promise(function(resolve, reject)
        {
            self.onConfirm = resolve;
            self.onCancel = reject;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InputOverlay;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameIcon_js__ = __webpack_require__(4);





class GameList
{
    constructor(listId, hideWhenEmpty)
    {
        var container = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(listId);
        this.listContainer = container;
        this.gameHeader = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(container, ".game_list_header");
        this.gameList = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(container, ".game_list");
        this.gameMap = {};
        this.hideWhenEmpty = hideWhenEmpty;
        this.sortPredicate = null;
        this.lastVisibleSortedGame = null;
        this.gamePropBgStyle = this.createGamePropBgStyle();

        // Listen for events that would affect the game prop by style
        var self = this;
        this.listContainer.addEventListener("transitionend", function(event)
        {
            if(event.propertyName === "top")
            {
                var rect = self.listContainer.getBoundingClientRect();
                if(rect.top !== self.lastTopValue)
                {
                    self.lastTopValue = rect.top;
                    self.createGamePropBgStyle();
                }
            }
        });
        var content = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(".content");
        content.addEventListener("transitionend", function(event)
        {
            if(event.propertyName === "height")
            {
                var rect = content.getBoundingClientRect();
                if(rect.height !== self.lastContentHeight)
                {
                    self.lastContentHeight = rect.height;
                    self.createGamePropBgStyle();
                }
            }
        });
    }

    addGame(gameId, gameData, labelText, hoverText)
    {
        var gameIcon = this.gameMap[gameId];
        if(gameIcon)
        {
            // Remove, before we re-add
            this.removeGame(gameId);
        }

        // Make sure the list is visible when we add anything to the list
        this.listContainer.classList.remove("game_list_container_hidden");
        
        // Create the game widget
        var gameIcon = new __WEBPACK_IMPORTED_MODULE_1__GameIcon_js__["a" /* GameIcon */](labelText, hoverText, gameData.gameColor);
        gameIcon.gameData = gameData;
        gameIcon.sortable = true;
        gameIcon.propBgElement.classList.add(this.gamePropBgStyle);

        // Add it to the list
        gameIcon.attachParent(this.gameList);

        // Store the element in the game map for easy removal later
        this.gameMap[gameId] = gameIcon;

        // Re-sort game list
        this.sortGames();

        return gameIcon;
    }

    updateGame(gameId, gameData)
    {
        var gameIcon = this.gameMap[gameId];
        if(gameIcon)
        {
            gameIcon.gameData = gameData;
        }

        return gameIcon;
    }

    removeGame(gameId)
    {
        var gameIcon = this.gameMap[gameId];
        if(!gameIcon)
        {
            // Nothing to remove
            return;
        }

        this.removeGameHelper(gameIcon);

        delete this.gameMap[gameId];
        this.sortGames();        
        this.checkHideHeader();
    }

    removeAllGames()
    {
        // Remove all the games we know about
        var gameIdList = Object.keys(this.gameMap);
        for(var i = 0; i < gameIdList.length; ++i)
        {
            var gameId = gameIdList[i];
            let gameIcon = this.gameMap[gameId];            
            if(gameIcon)
            {
                this.removeGameHelper(gameIcon);
            }
        }

        this.gameMap = {};
        this.sortGames();
        this.checkHideHeader();
    }

    removeGameHelper(gameIcon)
    {
        gameIcon.remove = true; // causes to sort to end
        gameIcon.fadeOut(); // fade the icon out

        // Once the element finishes fading out, detach it
        gameIcon.addEventListener("transitionend", function()
        {
            gameIcon.detachParent();
        });
    }

    checkHideHeader()
    {                
        if(this.hideWhenEmpty)
        {
            var gameIdList = Object.keys(this.gameMap);
            if(gameIdList.length <= 0)
            {
                this.listContainer.classList.add("game_list_container_hidden");
            }
        }
    }

    sortBy(predicate)
    {
        this.sortPredicate = predicate;
        this.sortGames();
    }

    sortGames()
    {
        var games = [];

        // Put all the sortable entries in an array
        // and recalculate the flowIndex for every element in the list
        var minSortableFlowIndex = this.gameList.children.length;
        for (let i = 0; i < this.gameList.children.length; i++)
        {
            var child = this.gameList.children[i];
            child.gameIcon.flowIndex = i;
            if(child.gameIcon.sortable)
            {
                minSortableFlowIndex = Math.min(minSortableFlowIndex, i);
                games.push(child.gameIcon);
            }
        }

        // Nothing to sort?
        if(games.length <= 0)
        {
            return;
        }
        
        // Sort the elements
        var sortPredicate = this.sortPredicate;
        games.sort(function(lhs, rhs)
        {
            // Always sort "removed" elements to the end of the list
            if(rhs.remove && !lhs.remove)
            {
                return -1;
            }
            else if(lhs.remove && !rhs.remove)
            {
                return 1;
            }

            // Non-removed elements are sorted according to whatever sort
            // criteria has been set
            var result = 0;
            if(sortPredicate)
            {
                result = sortPredicate(lhs.gameData, rhs.gameData);
            }

            // If elements are equal, sort by instance id
            if(result === 0)
            {
                // More recent (larger ids) first
                return rhs.id - lhs.id;
            }
            else
            {
                return result;
            }
        });

        // Get the width of one element
        var elementWidth = games[0].getWidth();

        // Then adjust their positions
        for(let i = 0; i < games.length; ++i)
        {
            var gameIcon = games[i];
            
            var positionOffset = minSortableFlowIndex + i;
            var leftOffset = (elementWidth * positionOffset) + "px";
            gameIcon.setLeftStyle(leftOffset);

            if(!gameIcon.remove)
            {
                this.lastVisibleSortedGame = gameIcon;
            }
        }
    }

    createGamePropBgStyle()
    {
        var className = "game_prop_background_" + this.listContainer.getAttribute("id");

        // Check if we already have a style for this color
        var colorElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#" + className);
        if(colorElement)
        {
            colorElement.parentElement.removeChild(colorElement);
        }

        var listRect = this.listContainer.getBoundingClientRect();
        var contentRect = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(".content").getBoundingClientRect();

        var topPct = (contentRect.top - listRect.top) + "px";
        var bottomPct = listRect.height + (contentRect.bottom - listRect.bottom) + "px";

        var elem = document.createElement("style");
        elem.setAttribute("id", className);
        elem.type = "text/css";
        elem.innerHTML = "." + className + "{ background: linear-gradient(to bottom, rgba(97, 115, 119, 0.9) " + topPct + ", rgba(81, 99, 103, 0.9) " + bottomPct + "); }";  
        
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("head").appendChild(elem);

        return className;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameList;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Debug; });


class DebugSettings
{
    constructor()
    {
        this.enabled = false;
    }
}

var Debug = new DebugSettings();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);




class GameIcon
{
    constructor(labelText, hoverText, color)
    {
        this.id = ++GameIcon.instanceCount;
        this.template = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#game_icon_template");
        this.gameElement = this.template.cloneNode(true);
        this.gameElement.removeAttribute("id");
        this.gameElement.classList.remove("hidden");
        this.gameElement.gameIcon = this;
        var self = this;
        setTimeout(function()
        {
            self.gameElement.classList.remove("game_icon_fadeout");
        }, 0);
        
        this.labelElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.gameElement, ".game_icon_text_label");
        this.hoverElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.gameElement, ".game_icon_text_hover");
        this.propBgElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.gameElement, ".game_prop_background");

        this.labelElement.innerHTML = labelText;
        this.hoverElement.innerHTML = hoverText;

        // Create a new style for this game's color
        // NOTE: we need to use a class and not change the style on the element directly
        // otherwise this will override the active color change on click
        if(color)
        {
            var colorClass = this.createColorStyle(color);
            this.gameElement.classList.add(colorClass);
        }
    }

    attachParent(parent)
    {
        parent.appendChild(this.gameElement);
    }

    detachParent()
    {
        if(this.gameElement.parentNode)
        {
            this.gameElement.parentNode.removeChild(this.gameElement);
        }
    }

    getWidth()
    {
        return Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* outerWidth */])(this.gameElement);        
    }

    addEventListener(event, listener)
    {
        this.gameElement.addEventListener(event, listener);
    }

    setLabelText(text)
    {
        this.labelElement.innerHTML = text;
    }

    setHoverText(text)
    {
        this.hoverElement.innerHTML = text;        
    }

    setLeftStyle(value)
    {
        this.gameElement.style.left = value;
    }

    setHighlight(enable)
    {
        if(enable)
        {
            this.gameElement.classList.add("game_icon_highlight");
        }
        else
        {
            this.gameElement.classList.remove("game_icon_highlight");
        }
    }

    setPropertyBgWidth(width)
    {
        this.propBgElement.style.width = width;        
    }

    setGameProperty(slotIndex, label, text)
    {
        var propertyElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.gameElement, ".game_prop_slot" + slotIndex);
        var labelElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(propertyElement, ".game_prop_slot_label");
        var textElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(propertyElement, ".game_prop_slot_text");

        labelElement.innerHTML = label;
        textElement.innerHTML = text;
    }

    fadeOut()
    {
        this.gameElement.classList.add("game_icon_fadeout");
    }

    createColorStyle(color)
    {
        var colorNumberOnly = color.substring(1);
        var colorClass = ".game_color_" + colorNumberOnly;

        // Check if we already have a style for this color
        var colorElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(colorClass);
        if(!colorElement)
        {
            var color2 = this.lighten(colorNumberOnly);

            var elem = document.createElement("style");
            elem.type = "text/css";
            elem.innerHTML = colorClass + "{ background: linear-gradient(to bottom, " + color + ", " + color2 + "); }";
            Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("head").appendChild(elem);
        }

        return colorClass.substring(1);
    }

    lighten(hexColor)
    {
        var r = Number("0x" + (hexColor[0] + hexColor[1]));
        var g = Number("0x" + (hexColor[2] + hexColor[3]));
        var b = Number("0x" + (hexColor[4] + hexColor[5]));

        r = Math.min(0xff, r + 0x20);
        g = Math.min(0xff, g + 0x20);
        b = Math.min(0xff, b + 0x20);
        
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameIcon;


// Initialize statics
GameIcon.instanceCount = 0;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__ = __webpack_require__(1);





class EthInputOverlay extends __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__["a" /* InputOverlay */]
{
    constructor(overlayId)
    {
        super(overlayId);

        this.value = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".overlay_value");
        this.slider = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".overlay_slider");
        this.messageText = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".overlay_message");

        var self = this;

        // Setup the slider to update the value element
        this.slider.addEventListener("input", function()
        {
            self.updateSliderValue();
        });

        // Setup the value element to update the slider
        this.value.contentEditable = true;
        this.value.addEventListener("input", function()
        {
            var val = Number(self.value.innerHTML);
            if(isNaN(val))
            {
                self.value.innerHTML = self.slider.value;
            }
            else if(val < self.slider.min)
            {
                self.value.innerHTML = self.slider.min;
            }
            else if(val > self.slider.max)
            {
                self.value.innerHTML = self.slider.max;
            }

            self.slider.value = self.value.innerHTML;
        });

        // Prime the slider value
        this.updateSliderValue();        
    }

    updateSliderValue()
    {
        this.value.innerHTML = this.slider.value;        
    }

    initSlider(min, max, current)
    {
        // Set min/max value
        this.slider.min = min;
        this.slider.max = max;
        this.slider.value = current;
        this.updateSliderValue();
    }

    async retrieveInput(title, message)
    {
        if(title)
        {
            this.titleText.innerHTML = title;
        }
        if(message)
        {
            this.messageText.innerHTML = message;
        }

        return super.retrieveInput();
    }

    getInput()
    {
        return this.slider.value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EthInputOverlay;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__ = __webpack_require__(1);





class WheelInputOverlay extends __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__["a" /* InputOverlay */]
{
    constructor(overlayId)
    {
        super(overlayId);

        this.wheelContainer = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".wheel_container");
        this.wheelSlices = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["f" /* qsa */])(this.overlay, ".wheel_slice");
        this.selection = null;

        var self = this;
        for(let i = 0; i < this.wheelSlices.length; ++i)
        {
            this.wheelSlices[i].addEventListener("click", function()
            {
                self.selection = self.wheelSlices[i].children[0].innerHTML;
                self.selection = Number(self.selection);
                if(!isNaN(self.selection))
                {
                    if(self.lastSelected)
                    {
                        self.lastSelected.classList.remove("wheel_selected_you");                        
                    }

                    self.wheelSlices[i].classList.add("wheel_selected_you");
                    self.wheelContainer.setAttribute("centerContent", self.selection);
                    if(self.confirmButton)
                    {
                        self.confirmButton.disabled = false;
                    }
                    self.lastSelected = self.wheelSlices[i];
                }
            });
        }

        // Confirm button starts disabled
        this.clearInput();
    }

    clearInput()
    {
        this.wheelContainer.removeAttribute("centerContent");
        if(this.confirmButton)
        {
            this.confirmButton.disabled = true;
        }
        for(let i = 0; i < this.wheelSlices.length; ++i)
        {
            this.wheelSlices[i].classList.remove("wheel_selected_you");
        }
    }

    getInput()
    {
        return this.selection;
    }

    async retrieveInput(titleMsg)
    {
        this.clearInput();
        this.titleText.innerHTML = titleMsg;

        return super.retrieveInput();
    }    
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WheelInputOverlay;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MainApp_js__ = __webpack_require__(8);




window.addEventListener('load', function()
{
    var app = new __WEBPACK_IMPORTED_MODULE_0__MainApp_js__["a" /* MainApp */]();
    app.start();
});



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EthConnection_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Spineth_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Header_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Footer_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__OpenGameList_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ActiveGameList_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CompletedGameList_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__RecentGameList_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__WelcomeOverlay_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__TermsOverlay_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__FAQOverlay_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__HowToPlayOverlay_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__EthInputOverlay_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__StringInputOverlay_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__WheelInputOverlay_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__GameSummaryOverlay_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__StatusBar_js__ = __webpack_require__(23);






















class MainApp
{
    constructor()
    {
        this.statusBar = new __WEBPACK_IMPORTED_MODULE_17__StatusBar_js__["a" /* StatusBar */]();
        this.contentMsg = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#content_msg");
        this.howToPlayOverlay = new __WEBPACK_IMPORTED_MODULE_12__HowToPlayOverlay_js__["a" /* HowToPlayOverlay */]();
        this.welcomeOverlay = new __WEBPACK_IMPORTED_MODULE_9__WelcomeOverlay_js__["a" /* WelcomeOverlay */](this.howToPlayOverlay);
        this.tosOverlay = new __WEBPACK_IMPORTED_MODULE_10__TermsOverlay_js__["a" /* TermsOverlay */]();
        this.faqOverlay = new __WEBPACK_IMPORTED_MODULE_11__FAQOverlay_js__["a" /* FAQOverlay */]();
        this.ethOverlay = new __WEBPACK_IMPORTED_MODULE_13__EthInputOverlay_js__["a" /* EthInputOverlay */]("#eth_input_overlay");
        this.betOverlay = new __WEBPACK_IMPORTED_MODULE_15__WheelInputOverlay_js__["a" /* WheelInputOverlay */]("#bet_input_overlay");
        this.secretOverlay = new __WEBPACK_IMPORTED_MODULE_14__StringInputOverlay_js__["a" /* StringInputOverlay */]("#secret_input_overlay");
        this.revealOverlay = new __WEBPACK_IMPORTED_MODULE_14__StringInputOverlay_js__["a" /* StringInputOverlay */]("#reveal_input_overlay");
        this.gameFilterOverlay = new __WEBPACK_IMPORTED_MODULE_13__EthInputOverlay_js__["a" /* EthInputOverlay */]("#game_filter_overlay");
        this.gameSummaryOverlay = new __WEBPACK_IMPORTED_MODULE_16__GameSummaryOverlay_js__["a" /* GameSummaryOverlay */]();
        this.header = new __WEBPACK_IMPORTED_MODULE_3__Header_js__["a" /* Header */](this.welcomeOverlay);
        this.footer = new __WEBPACK_IMPORTED_MODULE_4__Footer_js__["a" /* Footer */](this.howToPlayOverlay, this.tosOverlay, this.faqOverlay);
        this.lastWaitForTxHash = null;
        this.ethConnection = null;
        this.spineth = null;
        this.onContentMsgFadeout = null;
    }

    setContentMsg(msgElement)
    {
        var self = this;

        // Make sure previous fadeout listener has been removed
        this.contentMsg.removeEventListener("transitionend", this.onContentMsgFadeout);

        this.onContentMsgFadeout = function(event)
        {
            // Fade out is done?
            if(event.propertyName === "opacity")
            {
                // Stop listening
                self.contentMsg.removeEventListener("transitionend", self.onContentMsgFadeout);
                self.contentMsg.innerHTML = "";
                
                // Fade in the new message, if it exists
                if(msgElement)
                {
                    self.contentMsg.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(msgElement).innerHTML;
                    self.contentMsg.classList.remove("content_msg_hide");
                }
            }
        };

        // Fade out the current message
        this.contentMsg.classList.add("content_msg_hide");

        // Listen for the fadeout to complete
        this.contentMsg.addEventListener("transitionend", this.onContentMsgFadeout);
    }

    async hideContentMsg()
    {
        this.setContentMsg(null);

        var self = this;
        return Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            // Listen for the fadeout to complete
            var waitForFadeout = function(event)
            {
                // Fade out is done?
                if(event.propertyName === "opacity")
                {
                    // Remove listener
                    self.contentMsg.removeEventListener("transitionend", waitForFadeout);
                    cb(null, true); // complete promise
                }
            };
            self.contentMsg.addEventListener("transitionend", waitForFadeout);
        });
    }

    async start()
    {
        this.setContentMsg("#content_msg_connecting");

        var provider = null;

        // Check if we have built in web3 integration, i.e. through mist or metamask
        if (typeof window.web3 === 'undefined')
        {
            // If not, create a provider that connects to public infura main net node by default
            provider = window.ZeroClientProvider({
                static: {
                eth_syncing: false,
                web3_clientVersion: 'ZeroClientProvider',
                },
                pollingInterval: 30,
                rpcUrl: 'https://mainnet.infura.io/9Tlsh35iuwyeWNJp7ITK',
                // account mgmt
                getAccounts: (cb) => cb(null, [])
            });

            // When using infura some of our status messages need to change
            this.statusBar.usingInfura = true;
        }
        else
        {
            // Use current builtin provider
            provider = window.web3.currentProvider;
        }
    
        // Create the web3 instance
        window.web3 = new window.Web3(provider);        
    
        // Start the eth connection
        var ethConnection = new __WEBPACK_IMPORTED_MODULE_1__EthConnection_js__["a" /* EthConnection */]();
    
        // Watch for a network change, in which case, we must reload the entire page
        // to propertly reinitialize
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* invoke */])(async function()
        {
            while(true)
            {
                var lastNetwork = ethConnection.network;
                // If we are currently on a valid network
                if(lastNetwork)
                {
                    // And that network changes, reload the page
                    await ethConnection.waitForChange(["network"]);
                    if(lastNetwork !== ethConnection.network)
                    {
                        document.location.reload();
                    }
                }
                // Otherwise, we are not on a valid network yet
                else
                {
                    // Wait until next change
                    await ethConnection.waitForChange(["network"]);
                }
            }
        });

        // Wait for the network and latest block numbers to update
        var networkId;
        try
        {
            await ethConnection.waitForChange(["network", "latestBlock"]);
            networkId = ethConnection.network;
        }
        catch(error)
        {
            this.setContentMsg("#content_msg_noconnect");
            return;
        }
    
        // Connection is good, now check if our contract is supported on this networkId
        var spineth = new __WEBPACK_IMPORTED_MODULE_2__Spineth_js__["a" /* Spineth */](networkId);
    
        // Is the contract valid?
        if(!spineth.isValid())
        {
            this.setContentMsg("#content_msg_nonetwork");
            return;
        }

        // Hide the message, and wait for it to completely disappear
        await this.hideContentMsg();
    
        // Connection and contract are good, run the app        
        this.init(ethConnection, spineth);
        this.run();
    }

    init(ethConnection, spineth)
    {
        this.ethConnection = ethConnection;
        this.spineth = spineth;
        this.openGameList = new __WEBPACK_IMPORTED_MODULE_5__OpenGameList_js__["a" /* OpenGameList */](this.spineth, this.gameFilterOverlay);
        this.activeGameList = new __WEBPACK_IMPORTED_MODULE_6__ActiveGameList_js__["a" /* ActiveGameList */](this.spineth);
        this.completedGameList = new __WEBPACK_IMPORTED_MODULE_7__CompletedGameList_js__["a" /* CompletedGameList */]();
        this.recentGameList = new __WEBPACK_IMPORTED_MODULE_8__RecentGameList_js__["a" /* RecentGameList */]();
        
        this.footer.updateContract(this.ethConnection.getEtherscanURL(), this.spineth.address);

        var self = this;
        this.footer.onClickDonation = async function(donationAddress)
        {
            if(!ethConnection.currentAccount)
            {
                self.statusBar.showNoAccountMessage();
                return;
            }

            self.ethOverlay.initSlider(0.001, 0.01, 0.001);
            var ethAmount = await self.ethOverlay.retrieveInput("DONATE", "All donations are greatly appreciated");
            var weiAmount = window.web3.toWei(ethAmount, "ether");
            window.web3.eth.sendTransaction({to: donationAddress, value: weiAmount}, function(){});
        }
    }

    run()
    {
        // For more terse access
        var ethConnection = this.ethConnection;
        var spineth = this.spineth;
        var header = this.header;
        var openGameList = this.openGameList;
        var activeGameList = this.activeGameList;
        var completedGameList = this.completedGameList;
        var recentGameList = this.recentGameList;
        var tosOverlay = this.tosOverlay;
        var ethOverlay = this.ethOverlay;
        var betOverlay = this.betOverlay;
        var gameSummaryOverlay = this.gameSummaryOverlay;
        var statusBar = this.statusBar;
        var self = this;

        // Show main content
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#content_main").classList.remove("hidden");

        // Check if we should show the welcome overlay
        this.welcomeOverlay.checkShow();

        // Start a job to regularly repopulate our header properties
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* invoke */])(async function()
        {
            while(true)
            {
                header.update(ethConnection);

                // Wait for anything to change
                await ethConnection.waitForChange();
            }
        });

        // Start a job to update the open game list
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* invoke */])(async function()
        {
            var handle = null;

            while(true)
            {
                spineth.stopWatch(handle); // Stop previous watch (if any)
                
                openGameList.removeAllGames(); // Clear the list

                // Start watching the list
                handle = spineth.watchOpenGames(ethConnection.latestBlock, function(type, gameId, game)
                {
                    switch(type)
                    {
                    case spineth.GAME_ADDED:
                        if(game.player1 !== ethConnection.currentAccount)
                        {
                            openGameList.addGame(gameId, game);
                        }
                        break;
                    case spineth.GAME_REMOVED:
                        openGameList.removeGame(gameId);
                        break;
                    }
                });

                // If there are any changes to network or currentAccount, reload the list
                await ethConnection.waitForChange(["currentAccount"]);
            }
        });

        // Start a job to update the active game list
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* invoke */])(async function()
        {
            var handle = null;

            while(true)
            {
                spineth.stopWatch(handle); // Stop previous watch (if any)
                
                activeGameList.removeAllGames(); // Clear the list

                // Start watching the list
                handle = spineth.watchActiveGames(ethConnection.currentAccount, ethConnection.latestBlock, function(type, gameId, game)
                {
                    switch(type)
                    {
                    case spineth.GAME_ADDED:
                        activeGameList.addGame(ethConnection.currentAccount, gameId, game);
                        break;
                    case spineth.GAME_UPDATED:
                        activeGameList.updateGame(ethConnection.currentAccount, gameId, game);
                        break;
                    case spineth.GAME_REMOVED:
                        activeGameList.removeGame(gameId);
                        break;
                    }
                });

                // If there are any changes to network or currentAccount, reload the list
                await ethConnection.waitForChange(["currentAccount"]);                                
            }
        });

        // Start a job to update the completed game list
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* invoke */])(async function()
        {
            var handle = null;

            while(true)
            {
                spineth.stopWatch(handle); // Stop previous watch (if any)
                
                completedGameList.removeAllGames(); // Clear the list

                // Start watching the list
                handle = spineth.watchCompletedGames(ethConnection.currentAccount, ethConnection.latestBlock, function(type, gameId, game)
                {
                    completedGameList.addGame(ethConnection.currentAccount, gameId, game);
                });

                // If there are any changes to network or currentAccount, reload the list
                await ethConnection.waitForChange(["currentAccount"]);
            }
        });
        
        // Start a job to update the recent game list
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* invoke */])(async function()
        {
            var handle = null;

            while(true)
            {
                spineth.stopWatch(handle); // Stop previous watch (if any)
                
                recentGameList.removeAllGames(); // Clear the list

                // Start watching the list
                var fromBlock = Math.max(0, ethConnection.latestBlock - 100000); // 100k blocks = ~2weeks
                handle = spineth.watchRecentGames(fromBlock, function(type, gameId, game)
                {
                    if( game.player1 !== ethConnection.currentAccount
                     && game.player2 !== ethConnection.currentAccount )
                    {
                        recentGameList.addGame(gameId, game);
                    }
                });

                // If there are any changes to network or currentAccount, reload the list
                await ethConnection.waitForChange(["currentAccount"]);
            }
        });

        recentGameList.onGameClick = function(gameId, gameData)
        {
            gameSummaryOverlay.show(null, gameData);
        }

        completedGameList.onGameClick = function(gameId, gameData)
        {
            gameSummaryOverlay.show(ethConnection.currentAccount, gameData);
        };

        activeGameList.onGameClick = function(gameId, gameData)
        {
            gameSummaryOverlay.show(ethConnection.currentAccount, gameData);
        };

        openGameList.onCreateClick = async function()
        {
            if(!ethConnection.currentAccount)
            {
                statusBar.showNoAccountMessage();
                return;
            }

            // Make sure they have accepted the terms of service once before
            await tosOverlay.checkAccept();
            
            // Get min/max bet values
            var betLimits = await spineth.retrieveBetLimits();

            var ethBalance = ethConnection.getCurrentBalanceEth();

            // Must have at least minimum bet to play
            if(Number(ethBalance) < Number(betLimits.min))
            {
                statusBar.showMessage("You need at least " + betLimits.min + " eth to play");
                return;
            }

            // Limit maximum to account balance
            if(Number(ethBalance) < Number(betLimits.max))
            {
                betLimits.max = ethBalance;
            }

            // Get eth input
            ethOverlay.initSlider(betLimits.min, betLimits.max, betLimits.min);
            var betInEth = await ethOverlay.retrieveInput("CREATE GAME", "How much would you like to wager?");

            // Get bet input
            var wheelBet = await betOverlay.retrieveInput("CREATE GAME");

            // Attempt to create the game
            try
            {
                var txHash = await spineth.createGame(ethConnection.currentAccount, betInEth, wheelBet, async function()
                {
                    return self.secretOverlay.retrieveInput();
                });
                self.waitForTransaction(txHash);
            }
            catch(err)
            {
                statusBar.showMessage(err);
            }
        };

        openGameList.onGameClick = async function(gameId, gameData)
        {
            if(!ethConnection.currentAccount)
            {
                statusBar.showNoAccountMessage();
                return;
            }

            // Make sure they have accepted the terms of service once before
            await tosOverlay.checkAccept();
            
            // Must have at least bet amount to play
            var ethBalance = ethConnection.getCurrentBalanceEth();
            if(Number(ethBalance) < Number(gameData.betAmountInEth))
            {
                statusBar.showMessage("You need at least " + gameData.betAmountInEth + " eth to join this game");
                return;
            }
            
            // Get bet input
            var wheelBet = await betOverlay.retrieveInput("JOIN GAME");

            // Attempt to join the game
            try
            {
                var txHash = await spineth.joinGame(ethConnection.currentAccount, gameId, wheelBet);
                self.waitForTransaction(txHash);
            }
            catch(err)
            {
                statusBar.showMessage(err);
            }
        };

        activeGameList.onCancel = async function(gameId)
        {
            try
            {
                var txHash = await spineth.cancelGame(ethConnection.currentAccount, gameId);
                self.waitForTransaction(txHash);
            }
            catch(err)
            {
                statusBar.showMessage(err);
            }
        };

        activeGameList.onExpire = async function(gameId)
        {
            try
            {
                var txHash = await spineth.expireGame(ethConnection.currentAccount, gameId);
                self.waitForTransaction(txHash);
            }
            catch(err)
            {
                statusBar.showMessage(err);
            }
        };

        activeGameList.onReveal = async function(gameId)
        {
            try
            {
                var txHash = await spineth.revealBet(ethConnection.currentAccount, gameId, async function()
                {
                    return self.revealOverlay.retrieveInput();
                });
                self.waitForTransaction(txHash);
            }
            catch(err)
            {
                statusBar.showMessage(err);
            }
        };

        activeGameList.onWithdraw = async function(gameId, gameData)
        {
            // Play an animation showing the result
            await gameSummaryOverlay.show(ethConnection.currentAccount, gameData, true);

            // Then perform the withdrawal transaction
            try
            {
                var txHash = await spineth.withdrawEarnings(ethConnection.currentAccount, gameId);
                self.waitForTransaction(txHash);
            }
            catch(err)
            {
                statusBar.showMessage(err);
            }
        };
    }

    async waitForTransaction(txHash)
    {
        this.lastWaitForTxHash = txHash;

        this.statusBar.showTransactionPendingMessage(this.ethConnection, txHash);

        // Wait until the transaction is mined
        while(true)
        {
            await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["h" /* wait */])(1000);
            
            // If we started waiting for another transaction, then break out
            if(this.lastWaitForTxHash !== txHash)
            {
                break;
            }
    
            try
            {
                await this.ethConnection.waitForTransaction(txHash);
                this.statusBar.showTransactionCompleteMessage(this.ethConnection, txHash);
                break;
            }
            catch(err)
            {
                this.statusBar.showMessage(err);
                break;
            }
        }
    }    
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainApp;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getEtherscanURL */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);




function getEtherscanURL(network)
{
    if(!network || network === "Main")
    {
        network = "";
    }
    else
    {
        network += ".";
    }    
    var etherscanURL = "https://" + network + "etherscan.io";
    return etherscanURL;        
}

// Object that manages connection to the ethereum blockchain
class EthConnection
{
    constructor()
    {
        this.network = null;
        this.node = null;
        this.latestBlock = null;
        this.currentAccount = null;
        this.listeners = [];
        this.networkNames = {
            1: "Main",
            3: "Ropsten",
            4: "Rinkeby",
            42: "Kovan"
        };

        this.updateInfo();
    }

    async updateInfo()
    {
        // Start a job to periodically update our connection information
        while(true)
        {
            // Remember old values
            var network = this.network;
            var node = this.node;
            var latestBlock = this.latestBlock;
            var currentAccount = this.currentAccount;
            var currentBalance = this.currentBalance;

            // Get new network value
            this.network = await this.retrieveNetwork();

            // Get new node value
            this.node = await this.retrieveNode();

            // Get new latestBlock value
            this.latestBlock = await this.retrieveBlockNumber();

            // Update current account value
            this.currentAccount = await this.retrieveCurrentAccount();

            // Update current account balance
            if(this.currentAccount)
            {
                this.currentBalance = await this.retrieveCurrentAccountBalance();
                this.currentBalance = this.currentBalance.toString(10);
            }

            var changes = [];
            if(this.network !== network)
            {
                changes.push("network");
            }
            if(this.node !== node)
            {
                changes.push("node");
            }
            if(this.latestBlock !== latestBlock)
            {
                changes.push("latestBlock");
            }
            if(this.currentAccount !== currentAccount)
            {
                changes.push("currentAccount");
            }
            if(this.currentBalance !== currentBalance)
            {
                changes.push("currentBalance");
            }
            
            if(changes.length > 0)
            {
                this.notifyPropertyChanges(changes);
            }

            // wait for a bit, then check again
            await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["h" /* wait */])(1000);
        }
    }

    getNetworkName(id)
    {
        var name = this.networkNames[id];
        if(name)
        {
            return name;
        }
        return "Private";
    }

    getEtherscanURL()
    {
        // Figure out the etherscan url for the current network
        var network = this.getCurrentNetworkName();
        return getEtherscanURL(network);
    }

    getCurrentNetworkName()
    {
        return this.getNetworkName(this.network);
    }

    getCurrentBalanceEth()
    {
        return window.web3.fromWei(this.currentBalance, "ether");
    }

    // Wait for specific properties to change
    async waitForChange(waitProperties)
    {
        var self = this;
        return await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.listeners.push({waitProperties: waitProperties, cb: cb});
        });
    }

    // Notify all property listeners
    notifyPropertyChanges(propertyChanges)
    {
        var callbacklist = [];

        var isPropertyChanged = function(name)
        {
            return propertyChanges.indexOf(name) >= 0;
        };

        // Check if any listeners care about these changes
        for(var i = 0; i < this.listeners.length; ++i)
        {
            var listener = this.listeners[i];
            var notify = false;

            // Filtering specific properties, check if one of them changed
            if(listener.waitProperties)
            {
                if(listener.waitProperties.find(isPropertyChanged))
                {
                    notify = true;
                }
            }
            // Not filtering anything specific, notify when anything changes
            else
            {
                notify = true;
            }

            if(notify)
            {
                // Remove this element from the list
                Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* arrayRemove */])(this.listeners, i);

                // Need to reexamine this element since we shortened the list
                --i;

                // Defer callbacks until after iteration
                callbacklist.push(listener.cb);
            }
        }

        // Notify all callbacks after iteration
        for(i = 0; i < callbacklist.length; ++i)
        {
            var cb = callbacklist[i];
            cb();
        }
    }

    async waitForTransaction(txHash)
    {
        while(true)
        {
            // Wait for a block change
            await this.waitForChange(["latestBlock"]);
            
            // Get the transaction
            var tx = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
            {
                window.web3.eth.getTransaction(txHash, cb);
            });

            // Once block number set, the transaction has been mined
            if(tx && tx.blockNumber)
            {
                // Next get the receipt to determine status
                var receipt = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
                {
                    window.web3.eth.getTransactionReceipt(txHash, cb);
                });

                // Status field is missing? We can't tell if we succeeded or not
                if(!receipt.status)
                {
                    throw "Transaction completed, but status unknown";
                }

                // Transaction completed, but failed
                if(parseInt(receipt.status) === 0)
                {
                    throw "Transaction failed, may have run out of gas";
                }

                break;
            }
        }
    }

    async retrieveNode()
    {
        return await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            window.web3.version.getNode(cb);
        });
    }

    async retrieveNetwork()
    {
        return await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            window.web3.version.getNetwork(cb);
        });
    }

    async retrieveNode()
    {
        return await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            window.web3.version.getNode(cb);
        });
    }

    async retrieveBlockNumber()
    {
        return await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            window.web3.eth.getBlockNumber(cb);
        });
    }

    async retrieveCurrentAccount()
    {
        return await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            window.web3.eth.getAccounts(function(err, result)
            {
                cb(err, result[0]);
            });            
        });
    }

    async retrieveCurrentAccountBalance()
    {
        var self = this;
        return await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            window.web3.eth.getBalance(self.currentAccount, cb);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EthConnection;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SpinethMainNetAddress */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Debug_js__ = __webpack_require__(3);





var SpinethMainNetAddress = "0xee44B11148486c05112d6418b987D8B8C2632E8f";

// Provies access to the spineth ethereum contract
class Spineth
{
    constructor(networkId)
    {
        // Contract state
        this.address = null;
        this.contract = null;

        // Contract constants
        this.abi = [{"constant":false,"inputs":[{"name":"newAuthority","type":"address"}],"name":"changeAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minBetWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"WHEEL_SIZE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"gameId","type":"uint256"}],"name":"calculateEarnings","outputs":[{"name":"feeWei","type":"uint256"},{"name":"weiPlayer1","type":"uint256"},{"name":"weiPlayer2","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gameContext","outputs":[{"name":"player1","type":"address"},{"name":"player2","type":"address"},{"name":"betAmountInWei","type":"uint256"},{"name":"wheelBetPlayer1","type":"uint256"},{"name":"wheelBetPlayer2","type":"uint256"},{"name":"wheelResult","type":"uint256"},{"name":"expireTime","type":"uint256"},{"name":"state","type":"uint8"},{"name":"withdrawnPlayer1","type":"bool"},{"name":"withdrawnPlayer2","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRevealSeconds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"minBet","type":"uint256"},{"name":"maxBet","type":"uint256"}],"name":"changeBetLimits","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"getNextGameId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"uint256"},{"name":"wheelPositionHash","type":"uint256"}],"name":"createGame","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"uint256"}],"name":"expireGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"uint256"}],"name":"cancelGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"uint256"}],"name":"withdrawEarnings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"WIN_PERCENT_PER_DISTANCE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"playerCompleteGames","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"uint256"},{"name":"playerSecret","type":"uint256"}],"name":"revealBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"gameId","type":"uint256"},{"name":"wheelBet","type":"uint256"}],"name":"joinGame","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"playerActiveGames","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FEE_PERCENT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"gameId","type":"uint256"},{"name":"wheelBet","type":"uint256"},{"name":"playerSecret","type":"uint256"}],"name":"createWheelBetHash","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"openGames","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxBetWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameId","type":"uint256"},{"indexed":true,"name":"player","type":"address"},{"indexed":true,"name":"eventType","type":"uint8"}],"name":"GameEvent","type":"event"}];
        
        // State enum
        this.WAITING_FOR_PLAYERS = 0;
        this.WAITING_FOR_REVEAL = 1;
        this.COMPLETE = 2;

        // Event enum
        this.EVENT_CREATE = 0;
        this.EVENT_CANCEL = 1;
        this.EVENT_JOIN = 2;
        this.EVENT_REVEAL = 3;
        this.EVENT_EXPIRE = 4;
        this.EVENT_COMPLETE = 5;
        this.EVENT_WITHDRAW = 6;
        this.EVENT_START_REVEAL = 7;
        
        // Event watch enum
        this.GAME_ADDED = 0;
        this.GAME_REMOVED = 1;
        this.GAME_UPDATED = 2;

        // Event topic indicies
        this.TOPIC_EVENTADDRESS = 0;
        this.TOPIC_GAMEID = 1;
        this.TOPIC_PLAYER = 2;
        this.TOPIC_TYPE = 3;
        
        // State name
        this.stateNames = {
            0: "WaitingForPlayers",
            1: "WaitingForReveal",
            2: "Complete"
        };

        // Setup contract details based on network
        switch(networkId)
        {
        case "18": // Private test network
            if(__WEBPACK_IMPORTED_MODULE_1__Debug_js__["a" /* Debug */].enabled)
            {
                this.address = "0x86FaCf4c5b0C28B34C24c92Ba2A12ac888Db6299";
            }
            break;
        case "1": // Main net
            this.address = SpinethMainNetAddress;
            break;
        case "4": // Rinkeby 
            this.address = "0xFaF98930E9ABd5676fD373186D1e37D545Fd9246";
            break;
        case "42": // Kovan
            this.address = "0xB7C6E6023f919060B8Cfb70BBB06DCF7aFDAEfB4";
            break;
        default:
            // Unsupported network
            break;
        }

        // Contract not available on this network?
        if(this.address == null)
        {
            return;
        }

        // Load the contract abi
        this.contract = window.web3.eth.contract(this.abi).at(this.address);

        // Provide an extension to contract methods that can convert return values
        // into objects. This is very useful for functions that return multiple values
        for(var i = 0; i < this.abi.length; ++i)
        {
            if(this.abi[i].type !== "function")
            {
                continue;
            }

            var methodName = this.abi[i].name;
            let returnValues = this.abi[i].outputs;

            this.extendContractMethod(methodName, returnValues);
        }
    }

    isValid()
    {
        return this.contract !== null;
    }

    // Helper function used to extend loaded contract methods based on abi output parameters
    extendContractMethod(methodName, returnValues)
    {
        this.contract[methodName].mapReturn = function(valueArray)
        {
            if(valueArray.length !== returnValues.length)
            {
                throw "Mismatched array lengths";
            }

            var result = {};
            for(var i = 0; i < returnValues.length; ++i)
            {
                result[returnValues[i].name] = valueArray[i];
            }

            return result;
        };
    }

    getGameColor(gameIdHash)
    {
        var hex = "0123456789ABCDEF";
        var color = "#";

        for(var i = 0; i < 6; ++i)
        {
            var c = gameIdHash.charAt(gameIdHash.length - 1 - i);
            var n = parseInt(c, 16);
            color += hex.charAt(8 + (n%7)); // Smallest color value is #888888
        }

        return color;
    }
        
    async retrieveBetLimits()
    {
        var self = this;

        var result = {};

        result.min = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.minBetWei(cb);
        });
        result.min = window.web3.fromWei(result.min, "ether");
        result.min = result.min.toString(10);

        result.max = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.maxBetWei(cb);
        });
        result.max = window.web3.fromWei(result.max, "ether");
        result.max = result.max.toString(10);

        return result;
    }

    async retrieveGame(gameId)
    {
        var self = this;

        // Get the game details for this game id
        var gameData = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.gameContext(gameId, cb);
        });
        gameData = self.contract.gameContext.mapReturn(gameData);
        gameData.betAmountInEth = window.web3.fromWei(gameData.betAmountInWei, "ether");
        gameData.gameId = gameId;

        // Calculate a color for this game
        var gameIdHash = window.web3.sha3(gameId);
        gameData.gameColor = self.getGameColor(gameIdHash);

        // If the game is compelte
        if(gameData.state.toNumber() === self.COMPLETE)
        {
            // Get outcome data
            gameData.outcome = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
            {
                self.contract.calculateEarnings(gameId, cb);
            });
            gameData.outcome = self.contract.calculateEarnings.mapReturn(gameData.outcome);
            gameData.outcome.ethPlayer1 = window.web3.fromWei(gameData.outcome.weiPlayer1, "ether");
            gameData.outcome.ethPlayer2 = window.web3.fromWei(gameData.outcome.weiPlayer2, "ether");
            gameData.outcome.feeEth = window.web3.fromWei(gameData.outcome.feeWei, "ether");
        }

        return gameData;
    }
    
    async retrieveOpenGames(gameCallback)
    {
        var self = this;

        // Gather list of games
        for(var i = 0; true; ++i)
        {
            // Get game id
            var gameId = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
            {
                self.contract.openGames(i, cb);
            });
            gameId = gameId.toString(10);

            // No more valid games
            if(gameId === "0")
            {
                break;                        
            }

            // Get game data
            var gameData = await self.retrieveGame(gameId);

            // Notify callback, and see if it wants to continue
            var bContinue = gameCallback(gameData);
            if(!bContinue)
            {
                break;
            }
        }
    }

    watchOpenGames(fromBlock, gameCallback)
    {
        var self = this;
        var watchHandle = {};

        // Setup watch handle
        watchHandle.active = true;
        watchHandle.listener = async function(event)
        {
            if(event.eventType === self.EVENT_CREATE)
            {
                var game = await self.retrieveGame(event.gameId);

                if(watchHandle.active)
                {
                    gameCallback(self.GAME_ADDED, game.gameId, game);
                }
            }
            else if(event.eventType === self.EVENT_JOIN
                 || event.eventType === self.EVENT_CANCEL)
            {
                if(watchHandle.active)
                {
                    gameCallback(self.GAME_REMOVED, event.gameId);
                }
            }
        };

        // First retrieve all current open games
        this.retrieveOpenGames(function(game)
        {
            // No longer watching, then don't continue
            if(!watchHandle.active)
            {
                return false;
            }

            // Notify callback, and continue
            gameCallback(self.GAME_ADDED, game.gameId, game);
            return true;

        }).then(function() // Then listen for any additional changes after the current block
        {
            if(watchHandle.active) // If we are still watching
            {
                self.addGameEventListener({}, fromBlock, watchHandle.listener);
            }
        });

        return watchHandle;
    }

    async retrieveActiveGames(account, gameCallback)
    {
        var self = this;

        if(!account)
        {
            return;
        }

        // Gather list of games
        for(var i = 0; true; ++i)
        {
            // Get game id
            var gameId = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
            {
                self.contract.playerActiveGames(account, i, cb);
            });
            gameId = gameId.toString(10);

            // No more valid games
            if(gameId === "0")
            {
                break;                        
            }

            // Get game data
            var gameData = await self.retrieveGame(gameId);

            // Notify callback, and see if it wants to continue
            var bContinue = gameCallback(gameData);
            if(!bContinue)
            {
                break;
            }
        }
    }

    watchActiveGames(account, fromBlock, gameCallback)
    {
        var self = this;
        var watchHandle = {};

        // No account to watch for?
        if(!account)
        {
            return;
        }

        // Setup the watch handle
        watchHandle.active = true;
        watchHandle.listener = async function(event)
        {
            if(event.eventType === self.EVENT_CREATE
            || event.eventType === self.EVENT_JOIN)
            {
                var game = await self.retrieveGame(event.gameId);

                if(watchHandle.active)
                {
                    gameCallback(self.GAME_ADDED, game.gameId, game);
                }
            }
            else if(event.eventType === self.EVENT_CANCEL
                 || event.eventType === self.EVENT_WITHDRAW)
            {
                if(watchHandle.active)
                {
                    gameCallback(self.GAME_REMOVED, event.gameId);
                }
            }
            else // Everything else is an update to game state
            {
                var game = await self.retrieveGame(event.gameId);

                if(watchHandle.active)
                {
                    gameCallback(self.GAME_UPDATED, game.gameId, game);
                }                
            }
        };

        // First retrieve all current active games
        this.retrieveActiveGames(account, function(game)
        {
            // No longer watching, then don't continue
            if(!watchHandle.active)
            {
                return false;
            }

            // Notify callback, and continue
            gameCallback(self.GAME_ADDED, game.gameId, game);
            return true;

        }).then(function() // Then listen for any additional changes after the current block
        {
            if(watchHandle.active) // If we are still watching
            {
                self.addGameEventListener({player: account}, fromBlock, watchHandle.listener);
            }
        });

        return watchHandle;
    }

    async retrieveCompletedGames(account, gameCallback)
    {
        var self = this;

        if(!account)
        {
            return;
        }

        // Gather list of games
        for(var i = 0; true; ++i)
        {
            // Get game id
            var gameId = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
            {
                self.contract.playerCompleteGames(account, i, cb);
            });
            gameId = gameId.toString(10);

            // No more valid games
            if(gameId === "0")
            {
                break;                        
            }

            // Get game data
            var gameData = await self.retrieveGame(gameId);

            // Notify callback, and see if it wants to continue
            var bContinue = gameCallback(gameData);
            if(!bContinue)
            {
                break;
            }
        }
    }

    watchCompletedGames(account, fromBlock, gameCallback)
    {
        var self = this;
        var watchHandle = {};

        // No account to watch for?
        if(!account)
        {
            return;
        }
        
        // Setup watch handle
        watchHandle.active = true;
        watchHandle.listener = async function(event)
        {
            if(event.eventType === self.EVENT_WITHDRAW)
            {
                var game = await self.retrieveGame(event.gameId);

                if(watchHandle.active)
                {
                    gameCallback(self.GAME_ADDED, game.gameId, game);
                }
            }
        };        

        // First retrieve all current completed games
        this.retrieveCompletedGames(account, function(game)
        {
            // No longer watching, then don't continue
            if(!watchHandle.active)
            {
                return false;
            }

            // Notify callback, and continue
            gameCallback(self.GAME_ADDED, game.gameId, game);
            return true;

        }).then(function() // Then listen for any additional changes after the current block
        {
            if(watchHandle.active) // If we are still watching
            {
                self.addGameEventListener({player: account, eventType: self.EVENT_WITHDRAW}, fromBlock, watchHandle.listener);
            }
        });

        return watchHandle;
    }

    watchRecentGames(fromBlock, gameCallback)
    {
        var self = this;
        var watchHandle = {};

        // Setup watch handle
        watchHandle.active = true;
        watchHandle.gameIdList = {};
        watchHandle.listener = async function(event)
        {
            if(event.eventType === self.EVENT_COMPLETE || event.eventType === self.EVENT_EXPIRE)
            {
                var game = await self.retrieveGame(event.gameId);

                if(watchHandle.active)
                {
                    // Suppress duplicate game ids
                    // This is common because every game has two complete events, one for each player
                    if(!watchHandle.gameIdList[event.gameId])
                    {
                        watchHandle.gameIdList[event.gameId] = true;
                        gameCallback(self.GAME_ADDED, game.gameId, game);
                    }
                }
            }
        };        

        // Start watching
        self.addGameEventListener({eventType: [self.EVENT_COMPLETE, self.EVENT_EXPIRE]}, fromBlock, watchHandle.listener);

        return watchHandle;
    }
    
    async createGame(account, betInEth, wheelBet, playerSecretGenerator)
    {
        var self = this;     

        // Convert bet amount from eth to wei
        var betInWei = window.web3.toWei(betInEth, "ether");

        // Get the next game id allocated for this account
        var gameId = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.getNextGameId(account, cb);
        });
        gameId = gameId.toString(10);

        var playerSecret = "";
        try
        {
            // Sign the game id to produce random, recreatable data for the player secret
            var gameIdHex = window.web3.sha3(window.web3.toHex("Signing Spineth Game ID: " + gameId));
            playerSecret = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
            {
                window.web3.eth.sign(account, gameIdHex, cb);
            });
        }
        catch(err)
        {
            // Check for mist/geth specific error, and fallback to using a manually entered password
            if(err.message == "authentication needed: password or unlock")
            {
                playerSecret = await playerSecretGenerator();
            }
            else
            {
                throw err; // propagate
            }
        }
        playerSecret = window.web3.sha3(playerSecret + gameId, {encoding: 'hex'});
        
        // Create wheel bet hash from secret
        var wheelBetHash = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.createWheelBetHash(gameId, wheelBet, playerSecret, cb);
        });
        wheelBetHash = wheelBetHash.toString(10);

        // Determine gas costs
        var estimatedGas = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.createGame.estimateGas(gameId, wheelBetHash, {from:account, value:betInWei}, cb);
        });

        // Issue transaction
        var txHash = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.createGame(gameId, wheelBetHash, {from:account, value:betInWei, gas:estimatedGas}, cb);
        });

        return txHash;
    }

    async cancelGame(account, gameId)
    {
        var self = this;

        // Determine gas costs
        var estimatedGas = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.cancelGame.estimateGas(gameId, {from:account, value:0}, cb);
        });

        // Issue transaction
        var txHash = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.cancelGame(gameId, {from:account, value:0, gas:estimatedGas}, cb);
        });

        return txHash;
    }

    async joinGame(account, gameId, wheelBet)
    {
        var self = this;

        // Get the required bet amount from the game
        var betInWei = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.gameContext(gameId, cb);
        });
        betInWei = self.contract.gameContext.mapReturn(betInWei);
        betInWei = betInWei.betAmountInWei.toString(10);

        // Determine gas costs
        var estimatedGas = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.joinGame.estimateGas(gameId, wheelBet, {from:account, value:betInWei}, cb);
        });

        // Issue transaction
        var txHash = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.joinGame(gameId, wheelBet, {from:account, value:betInWei, gas:estimatedGas}, cb);
        });

        return txHash;
    }

    async expireGame(account, gameId)
    {
        var self = this;

        // Determine gas costs
        var estimatedGas = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.expireGame.estimateGas(gameId, {from:account, value:0}, cb);
        });

        // Issue transaction
        var txHash = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.expireGame(gameId, {from:account, value:0, gas:estimatedGas}, cb);
        });

        return txHash;
    }

    async revealBet(account, gameId, playerSecretGenerator)
    {
        var self = this;

        var playerSecret = "";
        try
        {
            // Sign the game id to produce random, recreatable data for the player secret
            var gameIdHex = window.web3.sha3(window.web3.toHex("Signing Spineth Game ID: " + gameId));
            playerSecret = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
            {
                window.web3.eth.sign(account, gameIdHex, cb);
            });
        }
        catch(err)
        {
            // Check for mist/geth specific error, and fallback to using a manually entered password
            if(err.message == "authentication needed: password or unlock")
            {
                playerSecret = await playerSecretGenerator();
            }
            else
            {
                throw err; // propagate
            }
        }
        playerSecret = window.web3.sha3(playerSecret + gameId, {encoding: 'hex'});
        
        // Determine gas cost
        var estimatedGas = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.revealBet.estimateGas(gameId, playerSecret, {from:account, value:0}, cb);
        });

        // Issue transaction
        var txHash = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.revealBet(gameId, playerSecret, {from:account, value:0, gas:estimatedGas}, cb);
        });

        return txHash;
    }

    async withdrawEarnings(account, gameId)
    {
        var self = this;

        // Determine gas cost
        var estimatedGas = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.withdrawEarnings.estimateGas(gameId, {from:account, value:0}, cb);
        });

        // Issue transaction
        var txHash = await Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* makePromise */])(function(cb)
        {
            self.contract.withdrawEarnings(gameId, {from:account, value:0, gas:estimatedGas}, cb);
        });

        return txHash;
    }
    
    addGameEventListener(filterOptions, fromBlock, listener)
    {
        var self = this;

        // Stop listening to any previous events
        this.removeGameEventListener(listener);

        // Create the new listener filter
        var tmpFilter = self.contract.GameEvent(filterOptions);
        var filter = window.web3.eth.filter({address: self.contract.address.toLowerCase(), fromBlock: fromBlock, toBlock: 'latest', topics: tmpFilter.options.topics});

        // Start listening for events
        listener.gameEventFilter = filter;
        listener.gameEventListenerIds = {};
        filter.watch(function(error, result)
        {
            if(!error)
            {
                if(result.blockNumber != 0) // @todo - remove once mist logs contain actual block numbers..
                {
                    if(result.blockNumber < fromBlock) // Safety check..
                    {
                        return;
                    }
                }

                // Convert some argument types for easier use
                result.args = {};
                result.args.gameId = window.web3.toBigNumber(result.topics[self.TOPIC_GAMEID]).toString(10);
                result.args.player = window.web3.toBigNumber(result.topics[self.TOPIC_PLAYER]).toString(10);
                result.args.eventType = parseInt(result.topics[self.TOPIC_TYPE]);

                // Some web3 implementation seem to duplicate events.. filter them out here
                // NOTE: The nature of GameEvent ensures that each combination of parameters is unique
                var uniqueId = result.args.gameId + result.args.player + result.args.eventType;
                if(listener.gameEventListenerIds[uniqueId])
                {
                    return;
                }
                listener.gameEventListenerIds[uniqueId] = true;

                // Notify listener
                listener(result.args);
            }
        });
    }

    removeGameEventListener(listener)
    {
        if(listener && listener.gameEventFilter)
        {
            listener.gameEventFilter.stopWatching(function() {});
            delete listener.gameEventFilter;
            delete listener.gameEventListenerIds;
        }
    }

    stopWatch(watchHandle)
    {
        if(watchHandle)
        {
            this.removeGameEventListener(watchHandle.listener);
            watchHandle.active = false;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Spineth;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);




class Header
{
    constructor(howToPlayOverlay)
    {
        this.network = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#network_value");
        this.block = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#block_value");        
        this.account = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#account_value");
        this.balance = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#balance_value");
        this.title = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(".title_section");
        
        this.title.addEventListener("click", function()
        {
            howToPlayOverlay.show();
        });
    }

    update(ethConnection)
    {
        this.network.innerHTML = ethConnection.getNetworkName(ethConnection.network);
        this.block.innerHTML = ethConnection.latestBlock;

        if(ethConnection.currentAccount)
        {
            this.account.innerHTML = ethConnection.currentAccount;
            this.balance.innerHTML = ethConnection.getCurrentBalanceEth();
        }
        else
        {
            this.account.innerHTML = "-";
            this.balance.innerHTML = "-";
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Header;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);




class Footer
{
    constructor(howToPlayOverlay, tosOverlay, faqOverlay)
    {
        this.faq = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#footer_faq");
        this.tos = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#footer_tos");
        this.play = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#footer_play");
        this.contract = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#footer_contract");

        this.faq.addEventListener("click", function()
        {
            faqOverlay.show();
        });

        this.tos.addEventListener("click", function()
        {
            tosOverlay.show();
        });

        this.play.addEventListener("click", function()
        {
            howToPlayOverlay.show();
        });
    }

    updateContract(etherscanURL, address)
    {
        this.contract.classList.remove("hidden");
        
        // Build up the etherscan url
        var url = etherscanURL + "/address/" + address + "#code";
    
        // Link the contract source element to the appropriate etherscan page
        this.contract.setAttribute("href", url);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Footer;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameList_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GameIcon_js__ = __webpack_require__(4);






class OpenGameList extends __WEBPACK_IMPORTED_MODULE_1__GameList_js__["a" /* GameList */]
{
    constructor(spineth, filterOverlay)
    {
        super("#open_game_list", false);

        this.onCreateClick = null;
        this.onGameClick = null;

        // Setup the createGame element
        var self = this;
        this.createGameIcon = new __WEBPACK_IMPORTED_MODULE_2__GameIcon_js__["a" /* GameIcon */]("NEW", "PLAY");
        this.createGameIcon.setGameProperty(2, "", "Create");
        this.createGameIcon.setGameProperty(3, "", "Game");
        this.createGameIcon.setPropertyBgWidth("100px");
        this.createGameIcon.attachParent(this.gameList);
        this.createGameIcon.propBgElement.classList.add(this.gamePropBgStyle);
        this.createGameIcon.addEventListener("click", function()
        {
            if(self.onCreateClick)
            {
                self.onCreateClick();
            }
        });

        // Setup game filter button
        this.gameFilterButton = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.gameHeader, ".game_list_header_filter");
        this.gameFilterButton.addEventListener("click", async function()
        {
            var betLimits = await spineth.retrieveBetLimits();
            filterOverlay.initSlider(betLimits.min, betLimits.max, betLimits.min);

            var value = await filterOverlay.retrieveInput();
            self.sortByEth(value);
        });

        // Don't hide by default
        setTimeout(function()
        {
            self.listContainer.classList.remove("game_list_container_hidden");
        }, 33);
    }

    addGame(gameId, gameData)
    {
        // For icon text, limit bet amount to 2 decimals of precision
        var betAmountText = parseFloat(Math.round(gameData.betAmountInEth * 1000) / 1000).toFixed(3);

        // Add game
        var gameIcon = super.addGame(gameId, gameData, betAmountText + " ETH", "PLAY", gameData.gameColor);

        gameIcon.setGameProperty(2, "CREATOR", gameData.player1);
        gameIcon.setGameProperty(3, "WAGER", gameData.betAmountInEth + " ETH");

        // Delegate clicks
        var self = this;
        gameIcon.addEventListener("click", function()
        {
            if(self.onGameClick)
            {
                self.onGameClick(gameId, gameData);
            }
        });
    }

    sortByEth(value)
    {
        this.sortBy(function(lhs, rhs)
        {
            var lhsEth = lhs.betAmountInEth.toNumber();
            var rhsEth = rhs.betAmountInEth.toNumber();

            var lhsDiff = Math.abs(lhsEth - value);
            var rhsDiff = Math.abs(rhsEth - value);

            return lhsDiff - rhsDiff;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OpenGameList;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameList_js__ = __webpack_require__(2);




class ActiveGameList extends __WEBPACK_IMPORTED_MODULE_0__GameList_js__["a" /* GameList */]
{
    constructor(spineth)
    {
        super("#active_game_list", true);

        this.spineth = spineth;
        this.onGameClick = null;
        this.onCancel = null;
        this.onReveal = null;
        this.onExpire = null;
        this.onWithdraw = null;    
    }

    getTimeString(seconds)
    {
        var result = "";
        if(seconds > 3600)
        {
            result += Math.floor(seconds/3600) + "h ";
        }
        seconds = seconds % 3600;
        if(seconds > 60)
        {
            result += Math.floor(seconds/60) + "m ";            
        }
        result += (seconds%60) + "s";

        return result;
    }

    determineGameState(account, gameData)
    {
        var state = gameData.state.toNumber();
        var result = {};

        // Determine the creator
        result.creator = "OPPONENT";
        if(gameData.player1 === account)
        {
            result.creator = "YOU";            
        }

        // Determine the opponent
        if(gameData.player1 === account)
        {
            result.opponent = gameData.player2;
        }
        else if(gameData.player2 === account)
        {
            result.opponent = gameData.player1;
        }
    
        // Examine game state
        if(state === this.spineth.WAITING_FOR_PLAYERS)
        {
            result.label = "WAIT";
            result.hover = "CANCEL";
            result.opponent = "NONE";
            result.info = "WAITING FOR OPPONENT";
            result.action = this.onCancel;
        }
        else if(state === this.spineth.WAITING_FOR_REVEAL)
        {
            // Calculate expire time
            var currentTime = Math.floor(Date.now() / 1000);
            var expireTime = gameData.expireTime.toNumber() + 300; // Give 5 minutes leeway
            var remainingTime = expireTime - currentTime;

            if(gameData.player1 === account)
            {
                result.label = "REVEAL";
                result.hover = "REVEAL";
                result.info = "REVEAL YOUR BET";
                result.action = this.onReveal;
            }
            else if(remainingTime <= 0)
            {
                result.label = "EXPIRE";
                result.hover = "EXPIRE";
                result.info = "REVEAL TIME EXPIRED. EXPIRE GAME TO WIN";
                result.action = this.onExpire;
            }
            else
            {
                result.label = "WAIT";
                result.hover = this.getTimeString(remainingTime);
                result.info  ="WAITING FOR OPPONENT TO REVEAL BET";
                result.action = null;
            }
        }
        else if(state === this.spineth.COMPLETE)
        {
            result.label = "DONE";
            result.hover = "WITH DRAW";
            result.info = "WITHDRAW YOUR EARNINGS";
            result.action = this.onWithdraw;
        }

        return result;
    }

    updateGame(account, gameId, gameData)
    {
        var gameIcon = super.updateGame(gameId, gameData);

        this.updateGameState(account, gameIcon);
    }

    updateGameState(account, gameIcon)
    {
        var state = this.determineGameState(account, gameIcon.gameData);

        gameIcon.setLabelText(state.label);
        gameIcon.setHoverText(state.hover);

        gameIcon.setGameProperty(1, "INFO", state.info);
        gameIcon.setGameProperty(2, "OPPONENT", state.opponent);
        gameIcon.setGameProperty(3, "CREATED BY", state.creator);
        gameIcon.setGameProperty(4, "WAGER", gameIcon.gameData.betAmountInEth + " ETH");
        
        // If an action can be taken, highlight the game in some way to bring attention to it
        // NOTE: We exclude cancel from the list because its not an action that _needs_ to be
        // taken, its something that can be done when the user has become impatient
        if(state.action && state.action !== this.onCancel)
        {
            gameIcon.setHighlight(true);
        }
        else
        {
            gameIcon.setHighlight(false);
        }
    }
    
    addGame(account, gameId, gameData)
    {
        // Add the game
        var gameIcon = super.addGame(gameId, gameData, "", "", gameData.gameColor);

        // Prime game state by updating once
        this.updateGameState(account, gameIcon);

        // Delegate clicks
        var self = this;
        gameIcon.addEventListener("click", function()
        {
            var state = self.determineGameState(account, gameIcon.gameData);
            
            // If there is an action that can be performed, do that
            if(state.action)
            {
                state.action(gameId, gameIcon.gameData);
            }
            // Otherwise, perform generic game click
            else if(self.onGameClick)
            {
                self.onGameClick(gameId, gameIcon.gameData);
            }
        });

        // Update state onmouseover events
        var updateInterval;
        gameIcon.addEventListener("mouseover", function()
        {
            // Update immediately
            self.updateGameState(account, gameIcon);

            // And every second
            updateInterval = setInterval(function()
            {
                self.updateGameState(account, gameIcon);
            }, 1000);
        });
        gameIcon.addEventListener("mouseout", function()
        {
            clearInterval(updateInterval);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ActiveGameList;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameList_js__ = __webpack_require__(2);




class CompletedGameList extends __WEBPACK_IMPORTED_MODULE_0__GameList_js__["a" /* GameList */]
{
    constructor()
    {
        super("#completed_game_list", true);

        this.onGameClick = null;
    }

    addGame(account, gameId, gameData)
    {
        var earningsInEth = 0;
        var playedAgainst = "";
        if(gameData.player1 === account)
        {
            earningsInEth = gameData.outcome.ethPlayer1;
            playedAgainst = gameData.player2;
        }
        else if(gameData.player2 === account)
        {
            earningsInEth = gameData.outcome.ethPlayer2;
            playedAgainst = gameData.player1;
        }

        var feeEth = 0;
        var outcome = "DRAW";
        if(earningsInEth.toNumber() > gameData.betAmountInEth.toNumber())
        {
            // Fee is only paid when winning
            feeEth = gameData.outcome.feeEth;
            outcome = "WON";
        }
        else if(earningsInEth.toNumber() < gameData.betAmountInEth.toNumber())
        {
            feeEth = 0;
            outcome = "LOST";
        }        

        // Add the game
        var gameIcon = super.addGame(gameId, gameData, outcome, outcome, gameData.gameColor);
        
        gameIcon.setGameProperty(1, "OPPONENT", playedAgainst);
        gameIcon.setGameProperty(2, "WAGER", gameData.betAmountInEth + " ETH");
        gameIcon.setGameProperty(3, "PAYOUT", earningsInEth + " ETH");
        gameIcon.setGameProperty(4, "FEE PAID", feeEth + " ETH");
        
        // Delegate clicks
        var self = this;
        gameIcon.addEventListener("click", function()
        {
            if(self.onGameClick)
            {
                self.onGameClick(gameId, gameData);
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CompletedGameList;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameList_js__ = __webpack_require__(2);




class RecentGameList extends __WEBPACK_IMPORTED_MODULE_0__GameList_js__["a" /* GameList */]
{
    constructor()
    {
        super("#recent_game_list", true);

        this.onGameClick = null;
    }

    addGame(gameId, gameData)
    {
        if(this.gameList.children.length >= 16) // only keep most recent elements
        {
            if(this.lastVisibleSortedGame)
            {
                this.removeGame(this.lastVisibleSortedGame.gameData.gameId);
            }
        }

        // For icon text, limit bet amount to 2 decimals of precision
        var betAmountText = parseFloat(Math.round(gameData.betAmountInEth * 1000) / 1000).toFixed(3) + " ETH";
        
        // Add the game
        var gameIcon = super.addGame(gameId, gameData, betAmountText, betAmountText, gameData.gameColor);
        
        gameIcon.setGameProperty(1, "PLAYER 1", gameData.player1);
        gameIcon.setGameProperty(2, "PLAYER 2", gameData.player2);
        gameIcon.setGameProperty(3, "WAGER", gameData.betAmountInEth + " ETH");
        
        // Delegate clicks
        var self = this;
        gameIcon.addEventListener("click", function()
        {
            if(self.onGameClick)
            {
                self.onGameClick(gameId, gameData);
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RecentGameList;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InputOverlay_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Debug_js__ = __webpack_require__(3);





class WelcomeOverlay extends __WEBPACK_IMPORTED_MODULE_0__InputOverlay_js__["a" /* InputOverlay */]
{
    constructor(howToPlayOverlay)
    {
        super("#welcome_overlay");
        this.alwaysShow = false; // for testing
        this.welcomeVersion = "welcome_v1.0";
        this.howToPlayOverlay = howToPlayOverlay;
    }

    getInput()
    {
        return true;
    }

    async show()
    {
        try
        {
            var showHowToPlay = await this.retrieveInput();
            if(showHowToPlay)
            {
                this.howToPlayOverlay.show();
            }
        }
        catch(err)
        {
            // dialog cancelled, no action
        }
    }

    async checkShow()
    {
        // Should we show?
        if(__WEBPACK_IMPORTED_MODULE_1__Debug_js__["a" /* Debug */].enabled || !window.localStorage.getItem(this.welcomeVersion))
        {
            await this.show();
            window.localStorage.setItem(this.welcomeVersion, true);                
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WelcomeOverlay;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InputOverlay_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Debug_js__ = __webpack_require__(3);





class TermsOverlay extends __WEBPACK_IMPORTED_MODULE_0__InputOverlay_js__["a" /* InputOverlay */]
{
    constructor()
    {
        super("#tos_overlay");
        this.tosVersion = "tos_v1.0";
    }

    async checkAccept()
    {
        // Should we show?
        if(__WEBPACK_IMPORTED_MODULE_1__Debug_js__["a" /* Debug */].enabled || !window.localStorage.getItem(this.tosVersion))
        {
            // Updating button because we are accepting
            this.confirmButton.innerHTML = "ACCEPT";
            await this.retrieveInput();

            window.localStorage.setItem(this.tosVersion, true);                
        }
    }

    async show()
    {
        // Update button since we are only reviewing not accepting
        this.confirmButton.innerHTML = "CLOSE";
        try
        {
            await this.retrieveInput();
        }
        catch(err)
        {
            // dialog closed, no action
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TermsOverlay;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InputOverlay_js__ = __webpack_require__(1);




class FAQOverlay extends __WEBPACK_IMPORTED_MODULE_0__InputOverlay_js__["a" /* InputOverlay */]
{
    constructor()
    {
        super("#faq_overlay");
    }

    async show()
    {
        try
        {
            await this.retrieveInput();
        }
        catch(err)
        {
            // dialog cancelled, no action
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FAQOverlay;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EthInputOverlay_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__WheelInputOverlay_js__ = __webpack_require__(6);







class HowToPlayOverlay extends __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__["a" /* InputOverlay */]
{
    constructor()
    {
        super("#howtoplay_overlay");
        this.ethInput = new __WEBPACK_IMPORTED_MODULE_2__EthInputOverlay_js__["a" /* EthInputOverlay */]("#howtoplay_eth_input");
        this.ethInput.initSlider(0.001, 10.000, 5.000);
        this.betInput = new __WEBPACK_IMPORTED_MODULE_3__WheelInputOverlay_js__["a" /* WheelInputOverlay */]("#howtoplay_bet_input");
        this.highlightIcons = [
            Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#howtoplay_highlight1"),
            Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#howtoplay_highlight2"),
            Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#howtoplay_highlight3")
        ];
    }

    close()
    {
        for(var i = 0; i < this.highlightIcons.length; ++i)
        {
            this.highlightIcons[i].classList.remove("game_icon_highlight");
        }

        super.close();
    }
    
    async show()
    {
        for(var i = 0; i < this.highlightIcons.length; ++i)
        {
            this.highlightIcons[i].classList.add("game_icon_highlight");
        }

        try
        {
            await this.retrieveInput();
        }
        catch(err)
        {
            // dialog closed, no action
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HowToPlayOverlay;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__ = __webpack_require__(1);





class StringInputOverlay extends __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__["a" /* InputOverlay */]
{
    constructor(overlayId)
    {
        super(overlayId);

        this.text = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".overlay_text_input");

        var self = this;
        this.text.addEventListener("input", function()
        {
            // Disable if empty, enable if not
            self.confirmButton.disabled = (self.text.value == "");
        });
        
        this.overlay.addEventListener("transitionend", function(event)
        {
            // When visibility changes, refocus the text field
            if(event.propertyName == "opacity")
            {
                self.text.focus();
            }
        });
    }

    getInput()
    {
        return this.text.value;
    }

    async retrieveInput()
    {
        // Reset input
        this.text.value = "";
        this.confirmButton.disabled = true;
        
        return super.retrieveInput();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StringInputOverlay;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__ = __webpack_require__(1);





class GameSummaryOverlay extends __WEBPACK_IMPORTED_MODULE_1__InputOverlay_js__["a" /* InputOverlay */]
{
    constructor()
    {
        super("#game_summary_overlay");
        this.message = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, "#game_summary_message > .overlay_message");
        this.opponent = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, "#game_summary_opponent > div");
        this.betAmount = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, "#game_summary_bet > .game_summary_number");
        this.earnings = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, "#game_summary_earnings > .game_summary_number");
        this.payout = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, "#game_summary_payout > .game_summary_number");
        this.fee = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, "#game_summary_fee > .game_summary_number");
        this.wheelMarker = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".overlay_wheel_marker");
        this.wheelOuterContainer = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".wheel_outer_container");
        this.wheelContainer = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.overlay, ".wheel_container");
        this.wheelSlices = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["f" /* qsa */])(this.wheelContainer, ".wheel_slice");
    }

    clear()
    {
        // Reset fields
        this.message.innerHTML = "";
        this.opponent.innerHTML = "";
        this.betAmount.innerHTML = "";
        this.earnings.innerHTML = "";
        this.payout.innerHTML = "";
        this.fee.innerHTML = "";

        // Hide fields by default
        this.message.parentNode.classList.add("game_summary_hidden");
        this.opponent.parentNode.classList.add("game_summary_hidden");
        this.betAmount.parentNode.classList.add("game_summary_hidden");
        this.earnings.parentNode.classList.add("game_summary_hidden");
        this.payout.parentNode.classList.add("game_summary_hidden");
        this.fee.parentNode.classList.add("game_summary_hidden");  
        
        // Hide marker by default
        this.wheelMarker.classList.add("hidden");        
    
        // Stop spin animation
        this.wheelContainer.classList.remove("wheel_spin");
        Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["g" /* reflow */])(this.wheelContainer); // Reflow to ensure animation is removed

        // Remove previous bet colors from all slices
        for(let i = 0; i < this.wheelSlices.length; ++i)
        {
            this.wheelSlices[i].classList.remove("wheel_selected_you");
            this.wheelSlices[i].classList.remove("wheel_selected_opponent");            
            this.wheelSlices[i].classList.remove("wheel_selected_both");            
        }
    }

    async show(account, gameData, animateResult)
    {
        this.clear();

        var yourName = gameData.player1;
        var opponentName = gameData.player2;
        var yourBet = gameData.wheelBetPlayer1.toNumber();
        var opponentBet = gameData.wheelBetPlayer2.toNumber();
        var payout = gameData.outcome ? gameData.outcome.ethPlayer1 : 0;
        var betAmount = gameData.betAmountInEth;
        
        if(gameData.player1 === account)
        {
            yourName = "You";            
        }
        else if(gameData.player2 === account)
        {
            yourName = "You";
            opponentName = gameData.player1;
            yourBet = gameData.wheelBetPlayer2.toNumber();
            opponentBet = gameData.wheelBetPlayer1.toNumber();
            payout = gameData.outcome ? gameData.outcome.ethPlayer2 : 0;
        }

        if(!gameData.outcome) // Game doesn't have outcome yet
        {
            this.setField(this.opponent, "Opponent " + opponentName);
            this.setField(this.betAmount, betAmount);
            
            // Bet is valid? (can be invalid if not revealed)
            if(yourBet < this.wheelSlices.length)
            {
                this.wheelSlices[yourBet].classList.add("wheel_selected_you");
                this.setField(this.message, "Waiting for opponent to reveal bet");
            }
        }
        else // Game is done
        {
            // Show only your bet to start
            this.wheelMarker.classList.remove("hidden");
            this.wheelSlices[yourBet].classList.add("wheel_selected_you");
            this.setWheelNumber(gameData.wheelResult);
            
            // If we are animating the result, don't show any more data yet
            if(animateResult)
            {
                var self = this;
                return await new Promise(function(resolve, reject)
                {
                    // Start spin animation
                    self.wheelContainer.classList.add("wheel_spin");

                    var onSpinEnd = function()
                    {
                        // Remove event listener
                        self.wheelContainer.removeEventListener("animationend", onSpinEnd);

                        // Reshow without animation
                        self.show(account, gameData, false);
                        resolve();
                    }
                    self.wheelContainer.addEventListener("animationend", onSpinEnd);

                    // Show the overlay
                    self.retrieveInput().then(function()
                    {
                        // Remove event listener
                        self.wheelContainer.removeEventListener("animationend", onSpinEnd);
                        reject("overlay was closed");
                    });
                });
            }

            // Show the opponent's bet and whether it was a tied bet
            this.wheelSlices[opponentBet].classList.add("wheel_selected_opponent");
            if(yourBet === opponentBet)
            {
                this.wheelSlices[yourBet].classList.add("wheel_selected_both");
            }
            
            var earnings = payout.minus(betAmount);
            var message = yourName + " tied this game";
            var fee = 0;
            
            if(earnings.toNumber() > 0)
            {
                // Fee is only paid when winning
                message = yourName + " won this game";
                earnings = earnings.plus(gameData.outcome.feeEth);
                fee = -gameData.outcome.feeEth;
            }
            else if(earnings.toNumber() < 0)
            {
                message = yourName + " lost this game";
            }

            var earningsPct = earnings.dividedBy(betAmount).times(100).toNumber();

            // Determine max decimal places for alignment
            var maxDecimals = this.countDecimals(betAmount);
            maxDecimals = Math.max(maxDecimals, this.countDecimals(earnings));
            maxDecimals = Math.max(maxDecimals, this.countDecimals(fee));
            maxDecimals = Math.max(maxDecimals, this.countDecimals(payout));

            this.setField(this.message, message);                
            this.setField(this.opponent, "Against " + opponentName);
            this.setField(this.betAmount, betAmount.toFixed(maxDecimals));
            this.setField(this.earnings, "(" + earningsPct + "%) " + earnings.toFixed(maxDecimals));
            this.setField(this.fee, fee.toFixed(maxDecimals));
            this.setField(this.payout, payout.toFixed(maxDecimals));
        }

        // Show overlay
        try
        {
            await this.retrieveInput();
        }
        catch(err)
        {
            // dialog closed, no action
        }
    }

    countDecimals(number)
    {
        var numberAsString = "" + number;
        var decimals = numberAsString.split('.')[1];
        if(decimals)
        {
            return decimals.length;
        }

        return 0;
    }

    setWheelNumber(number)
    {
        var angle = 360 - ((360 / this.wheelSlices.length) * number);
        this.wheelOuterContainer.style.transform = "rotate(" + angle + "deg)";        
    }

    setField(fieldElement, value)
    {
        fieldElement.parentNode.classList.remove("game_summary_hidden");
        fieldElement.innerHTML = value;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameSummaryOverlay;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);




class StatusBar
{
    constructor()
    {
        this.statusBarElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])("#status_bar");
        this.dismissButton = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.statusBarElement, ".status_bar_dismiss");
        this.contentElement = Object(__WEBPACK_IMPORTED_MODULE_0__util_js__["e" /* qs */])(this.statusBarElement, ".status_bar_content");
        this.hideDelay = null;
        this.usingInfura = false;
    
        var self = this;
        this.dismissButton.addEventListener("click", function()
        {
            self.statusBarElement.classList.remove("status_bar_rolldown");
        });
    }

    hide()
    {
        this.statusBarElement.classList.remove("status_bar_rolldown");        
    }

    delayedHide(hideTime)
    {
        var self = this;
        clearTimeout(this.hideDelay);
        this.hideDelay = setTimeout(function()
        {
            self.hide();

        }, hideTime);
    }

    showElements(elements, displayTime)
    {
        this.contentElement.innerHTML = "";

        if(elements.length > 0)
        {
            for(var i = 0; i < elements.length; ++i)
            {
                this.contentElement.appendChild(elements[i]);
            }
        }
        else
        {
            this.contentElement.appendChild(elements);
        }

        this.statusBarElement.classList.add("status_bar_rolldown");
        if(displayTime > 0)
        {
            this.delayedHide(displayTime);
        }        
    }

    showMessage(message, displayTime)
    {
        // Default displayTime to 5 seconds
        if(!displayTime)
        {
            displayTime = 5000;
        }

        var messageElement = document.createElement('span');
        messageElement.innerHTML = message;
        this.showElements(messageElement, displayTime);
    }

    showNoAccountMessage()
    {
        if(this.usingInfura)
        {
            this.showMessage("Ethereum browser integration not detected", 5000);
        }
        else
        {
            this.showMessage("Your account appears to be locked", 5000);
        }
    }

    showTransactionPendingMessage(ethConnection, txHash)
    {
        var anchor = document.createElement('a');
        anchor.innerHTML = "Waiting for transaction to be mined";
        anchor.target = "_blank";

        // Build up the etherscan url
        var url = ethConnection.getEtherscanURL();
        url += "/search?q=" + txHash;
        anchor.href = url;

        var spinner = document.createElement('span');
        spinner.classList.add("status_bar_spinner");

        this.showElements([anchor, spinner], 0);
    }

    showTransactionCompleteMessage(ethConnection, txHash)
    {
        var anchor = document.createElement('a');
        anchor.innerHTML = "Transaction successfully mined!";
        anchor.target = "_blank";

        // Build up the etherscan url
        var url = ethConnection.getEtherscanURL();
        url += "/search?q=" + txHash;
        anchor.href = url;

        this.showElements(anchor, 5000);        
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StatusBar;



/***/ })
/******/ ]);