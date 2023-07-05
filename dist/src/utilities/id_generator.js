"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = exports.dateFunc = exports.generatekey = exports.generatekeyE = exports.generateId = void 0;
function generateId(order_type) {
    const id = new Date();
    const i = id.toLocaleString();
    const j = i.split(",")[0];
    const k = j.split("/").join("");
    const l = i.split(",")[1];
    const m = l.split(" ")[1];
    const n = m.split(":")[0];
    const o = m.split(":")[1];
    const p = m.split(":")[2];
    const q = Math.round(Math.random() * 90000 + 10000);
    const r = order_type.toUpperCase() + "_" + k + n + o + "_" + p + o + n + "_" + q;
    return r;
}
exports.generateId = generateId;
/**
 * eslint-disable @typescript-eslint/no-inferrable-types
 *
 * @format
 */
var generatekeyE;
(function (generatekeyE) {
    generatekeyE["alphanum"] = "alphanum";
    generatekeyE["letters"] = "letters";
    generatekeyE["numbers"] = "numbers";
    generatekeyE["default"] = "default";
    generatekeyE["characters"] = "characters";
})(generatekeyE = exports.generatekeyE || (exports.generatekeyE = {}));
function generatekey(size = 10, type = generatekeyE.alphanum) {
    const numbers = "01234567890";
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const characters = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸƒˆ˜¡¢£¤¥€¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωϑϒϖ†‡•…‰′″‾⁄℘ℑℜ™ℵ←↑→↓↔↵⇐⇑⇒⇓⇔∀∂∃∅∇∈∉∋∏∑−∗√∝∞∠∧∨∩∪∫∴∼≅≈≠≡≤≥⊂⊃⊄⊆⊇⊕⊗⊥⋅⌈⌉⌊⌋⟨⟩◊♠♣♥♦";
    const presets = {
        numbers,
        letters: `${letters}${letters.toUpperCase()}`,
        alphanum: `${letters}${numbers}${letters.toUpperCase()}`,
        characters,
        default: `${numbers}${letters}${letters.toUpperCase()}${characters}`,
    };
    const preset_type = presets[type];
    const gen_key = Array(size)
        .fill(null)
        .map((data) => {
        preset_type.charAt(Math.round(Math.random() * preset_type.length) - 1);
    });
    return gen_key;
}
exports.generatekey = generatekey;
function dateFunc() {
    const id = new Date();
    const i = id.toLocaleString();
    const j = i.split(",")[0];
    const k = j.split("/").join("");
    const l = i.split(",")[1];
    const m = l.split(" ")[1];
    const n = m.split(":")[0];
    const o = m.split(":")[1];
    const p = m.split(":")[2];
    const q = Math.round(Math.random() * 90000 + 10000);
    const r = k + n + o + "_" + p + o + n + "_" + q;
    const date = k + n + o;
    const ret = date ?? r;
    return ret;
}
exports.dateFunc = dateFunc;
function generateApiKey() {
    const numbers = "0123456789";
    const lower_case_letters = "abcdefghijklmnopqrstuvwxyz";
    const upper_case_letters = lower_case_letters.toLocaleUpperCase();
    const alphanum = `${lower_case_letters}${upper_case_letters}${numbers}`;
    const alphanum_array = alphanum.split("");
    const private_key_result = [];
    const public_key_result = [];
    for (const b in alphanum_array) {
        b;
        const private_key = Math.round(Math.random() * (alphanum_array.length - 1));
        const public_key = Math.round(Math.random() * (alphanum_array.length - 1));
        private_key_result.push(alphanum_array[private_key]);
        public_key_result.push(alphanum_array[public_key]);
        //   console.log(v[rVal]);
    }
    const slice_private_key = private_key_result.slice(0, 30);
    const slice_public_key = public_key_result.slice(0, 24);
    const gotten_private_key = slice_private_key.join("");
    const gotten_public_key = slice_public_key.join("");
    return {
        gotten_private_key,
        gotten_public_key,
    };
}
exports.generateApiKey = generateApiKey;
