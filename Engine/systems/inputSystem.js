import System from "./system.js";
import { RENDERER } from "../engine.js";


export default class InputManager extends System {

    constructor() {
        super("InputManager")
        this.downKeys = {}
        this.clickPos = {}
        this.mousePos = {}
        this.KEYS = {
            ArrowUp: 'ArrowUp',
            ArrowDown: 'ArrowDown',
            ArrowLeft: 'ArrowLeft',
            ArrowRight: 'ArrowRight',
            Escape: 'Escape',
            Numrow0: 'Digit0',
            Numrow1: 'Digit1',
            Numrow2: 'Digit2',
            Numrow3: 'Digit3',
            Numrow4: 'Digit4',
            Numrow5: 'Digit5',
            Numrow6: 'Digit6',
            Numrow7: 'Digit7',
            Numrow8: 'Digit8',
            Numrow9: 'Digit9',
            Minus: 'Minus',
            Equal: 'Equal',
            Backspace: 'Backspace',
            Tab: 'Tab',
            KeyQ: 'KeyQ',
            KeyW: 'KeyW',
            KeyE: 'KeyE',
            KeyR: 'KeyR',
            KeyT: 'KeyT',
            KeyY: 'KeyY',
            KeyU: 'KeyU',
            KeyI: 'KeyI',
            KeyO: 'KeyO',
            KeyP: 'KeyP',
            BracketLeft: 'BracketLeft',
            BracketRight: 'BracketRight',
            Enter: 'Enter',
            ControlLeft: 'ControlLeft',
            KeyA: 'KeyA',
            KeyS: 'KeyS',
            KeyD: 'KeyD',
            KeyF: 'KeyF',
            KeyG: 'KeyG',
            KeyH: 'KeyH',
            KeyJ: 'KeyJ',
            KeyK: 'KeyK',
            KeyL: 'KeyL',
            Semicolon: 'Semicolon',
            Quote: 'Quote',
            Backquote: 'Backquote',
            ShiftLeft: 'ShiftLeft',
            Backslash: 'Backslash',
            KeyZ: 'KeyZ',
            KeyX: 'KeyX',
            KeyC: 'KeyC',
            KeyV: 'KeyV',
            KeyB: 'KeyB',
            KeyN: 'KeyN',
            KeyM: 'KeyM',
            Comma: 'Comma',
            Period: 'Period',
            Slash: 'Slash',
            ShiftRight: 'ShiftRight',
            NumpadMultiply: 'NumpadMultiply',
            AltLeft: 'AltLeft',
            Space: 'Space',
            CapsLock: 'CapsLock',
            F1: 'F1',
            F2: 'F2',
            F3: 'F3',
            F4: 'F4',
            F5: 'F5',
            F6: 'F6',
            F7: 'F7',
            F8: 'F8',
            F9: 'F9',
            F10: 'F10',
            Pause: 'Pause',
            ScrollLock: 'ScrollLock',
            Numpad7: 'Numpad7',
            Numpad8: 'Numpad8',
            Numpad9: 'Numpad9',
            NumpadSubtract: 'NumpadSubtract',
            Numpad4: 'Numpad4',
            Numpad5: 'Numpad5',
            Numpad6: 'Numpad6',
            NumpadAdd: 'NumpadAdd',
            Numpad1: 'Numpad1',
            Numpad2: 'Numpad2',
            Numpad3: 'Numpad3',
            Numpad0: 'Numpad0',
            NumpadDecimal: 'NumpadDecimal',
        }
        this.registerListeners();
    }

    registerListeners(){
        let canvas = RENDERER.canvas || document.getElementById('myCanvas')

        if(!canvas) return

        canvas.addEventListener(CTX_EVENTS.LeftClick, e =>{
            this.clickPos = this.getXandY(e)
        })

        canvas.addEventListener(CTX_EVENTS.MouseMove, e =>{
            this.mousePos = this.getXandY(e)
        })

        canvas.addEventListener(CTX_EVENTS.KeyDown,
            e => {
                /** e.code cooresponds to strings describing the key like ArrowUp, ArrowDown, KeyE, KeyW, Digit5, e.t.c */
                this.downKeys[e.code] = true
            },
            false
        )

        canvas.addEventListener(CTX_EVENTS.KeyUp,
            e => { delete this.downKeys[e.code] },
            false
        )

        this.listenersRegistered = true;
    }


    isInit(){
        if(!this.listenersRegistered){
            this.registerListeners();
        }
        return this.listenersRegistered
    }

    isKeyDown(keyCode){
        return this.downKeys[keyCode] || false
    }

    getXandY(e){
        let x = e.clientX - RENDERER.canvas.getBoundingClientRect().left
        let y = e.clientY - RENDERER.canvas.getBoundingClientRect().top
        return {x: x, y: y}
    }

    
}

var CTX_EVENTS = {
    LeftClick: 'click',
    RightClick: 'contextmenu',
    MouseMove: 'mousemove',
    MouseWheel: 'mousewheel',
    KeyDown: 'keydown',
    KeyUp: 'keyup',
    Load: 'load',
    Error: 'error'
}