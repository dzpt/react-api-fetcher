import "abortcontroller-polyfill";

export default function timeout(
  c: AbortController,
  callback: CallableFunction,
  timeout: number = 10000
): any {
  const signal = c.signal;
  const timeOutId = setTimeout(() => {
    c.abort();
  }, timeout);

  signal.addEventListener("abort", () => {
    clearTimeout(timeOutId);
    callback();
  });
  return timeOutId;
}
