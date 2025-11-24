type Level = "debug" | "info" | "warn" | "error"

const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "true"

function log(level: Level, ...args: unknown[]) {
  if (level === "debug" && !DEBUG) return
  const prefix = `[NPS:${level}]`
  // eslint-disable-next-line no-console
  console[level === "debug" ? "log" : level](prefix, ...args)
}

export default {
  debug: (...args: unknown[]) => log("debug", ...args),
  info: (...args: unknown[]) => log("info", ...args),
  warn: (...args: unknown[]) => log("warn", ...args),
  error: (...args: unknown[]) => log("error", ...args),
}