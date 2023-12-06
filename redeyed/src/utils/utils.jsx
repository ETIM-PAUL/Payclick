
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getNonNullValue = (value) => {
  if (value != "") {
    return value;
  } else {
    return undefined;
  }
};

export function filterEmptyFields(object) {
  Object.keys(object).forEach((key) => {
    if (empty(object[key])) {
      delete object[key];
    }
  });
  return object;
}

export function empty(value) {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    value === "undefined"
  );
}

export const isImage = (file) => {
  const validImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
  if (validImageTypes.includes(file.file.type)) return true;
  return false;
};

export const isVideo = (file) => {
  const validVideoTypes = ["video/webm", "video/mp4"];
  if (validVideoTypes.includes(file.file.type)) return true;
  return false;
};

export const isPdf = (file) => {
  const validVideoTypes = ["application/pdf"];
  if (validVideoTypes.includes(file.file.type)) return true;
  return false;
};

export const randomString = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateUUID = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const capitalize = (string) => {
  const removedSpecialCharacters = string.replace(/[^a-zA-Z0-9]/g, " ");

  const splitWords = removedSpecialCharacters.split(" ");
  const capitalized = splitWords.map(
    (dt) => `${dt[0].toUpperCase()}${dt.substring(1)}`
  );

  return capitalized.join(" ");
};

export const dateHandle = (date) => {
  const newDate = date
    ? new Date(date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  return newDate;
};

export const ghrapDate = (date) => {
  const newDate = new Date(date);
  var mS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log(newDate.getDate(), mS[newDate.getMonth()]);

  return `${newDate.getDate()} ${mS[newDate.getMonth()]}`;
};

export const formatCode = function (code) {
  return prettier.format(code, {
    parser: "babel",
    plugins: [parserBabel],
    singleQuote: true,
    trailingComma: "es5",
    jsxSingleQuote: true,
    printWidth: 80,
    tabWidth: 2,
  });
}


/**
 * @typedef {Object} StringCaserOptions
 * @property {"space" | String} separator - define what separates each word, undefined returns no separation - passing "space" separates the words by a space
 * @property {"uppercase" | "lowercase" | "capitalize" | "camelCase" | "PascalCase"} casetype - text case type, uppercase, lowercase of capitalized
 */

/**
 *
 * @param {String} string - text to convert
 * @param {StringCaserOptions} options - options
 * @returns
 */
export const StringCaser = (string, { separator, casetype }) => {
  if (!string) return null;
  const removedSpecialCharacters = string.replace(/[^a-zA-Z0-9]/g, " ");
  let casedText = [];
  const splitWords = removedSpecialCharacters.split(" ").filter(Boolean);

  if (casetype === "capitalize") {
    casedText = splitWords.map(
      (/** @type {string} */ dt) => `${dt[0].toUpperCase()}${dt.substring(1)}`
    );
  }
  if (casetype === "uppercase") {
    casedText = splitWords.map((/** @type {string} */ dt) => dt.toUpperCase());
  }
  if (casetype === "lowercase") {
    casedText = splitWords.map((/** @type {string} */ dt) => dt.toLowerCase());
  }
  if (casetype === "camelCase") {
    casedText = splitWords.map((/** @type {string} */ dt, index) =>
      index === 0
        ? dt.toLowerCase()
        : `${dt[0].toUpperCase()}${dt.substring(1)}`
    );
  }
  if (casetype === "PascalCase") {
    casedText = splitWords.map(
      (/** @type {string} */ dt) => `${dt[0].toUpperCase()}${dt.substring(1)}`
    );
  }

  if (separator) {
    if (separator === "space") {
      return casedText.join(" ");
    } else {
      return casedText.join(separator);
    }
  } else {
    return casedText.join("");
  }
};

export function parseJsonSafely(json, failReturn) {
  if (typeof json === "object" || Array.isArray(json)) return json;
  if (typeof json !== "string") return failReturn;
  try {
    const res = JSON.parse(json);
    return res;
  } catch (err) {
    console.log("err", json, err);
    return failReturn;
  }
}