class Log {
  warn(data: any) {
    return console.warn(
      "\x1b[33m%s\x1b[0m",
      `-------------->>> ${data} <<<-------------`
    );
  }

  error(data: any) {
    return console.error(
      "\x1b[41m",
      `-------------->>> ${data} <<<-------------`
    );
  }

  log(data: any) {
    return console.log(
      "\x1b[36m%s\x1b[0m",
      `-------------->>> ${data} <<<-------------`
    );
  }
}

export const LOG = new Log();
