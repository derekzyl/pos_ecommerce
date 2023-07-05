import { IdGenE } from "./interface_utilities/id_gen.interface";

export function generateId(order_type: IdGenE) {
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
  const r =
    order_type.toUpperCase() + "_" + k + n + o + "_" + p + o + n + "_" + q;

  return r;
}

/**
 * eslint-disable @typescript-eslint/no-inferrable-types
 *
 * @format
 */

export enum generatekeyE {
  alphanum = "alphanum",
  letters = "letters",
  numbers = "numbers",
  default = "default",
  characters = "characters",
}

export function generatekey(
  size = 10,
  type: generatekeyE = generatekeyE.alphanum
) {
  const numbers = "01234567890";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const characters =
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿŒœŠšŸƒˆ˜¡¢£¤¥€¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωϑϒϖ†‡•…‰′″‾⁄℘ℑℜ™ℵ←↑→↓↔↵⇐⇑⇒⇓⇔∀∂∃∅∇∈∉∋∏∑−∗√∝∞∠∧∨∩∪∫∴∼≅≈≠≡≤≥⊂⊃⊄⊆⊇⊕⊗⊥⋅⌈⌉⌊⌋⟨⟩◊♠♣♥♦";

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

export function dateFunc() {
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
export function generateApiKey() {
  const numbers = "0123456789";
  const lower_case_letters = "abcdefghijklmnopqrstuvwxyz";
  const upper_case_letters: string = lower_case_letters.toLocaleUpperCase();
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
