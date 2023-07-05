"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG = void 0;
class Log {
    warn(data) {
        return console.warn("\x1b[33m%s\x1b[0m", `-------------->>> ${data} <<<-------------`);
    }
    error(data) {
        return console.error("\x1b[41m", `-------------->>> ${data} <<<-------------`);
    }
    log(data) {
        return console.log("\x1b[36m%s\x1b[0m", `-------------->>> ${data} <<<-------------`);
    }
}
exports.LOG = new Log();
