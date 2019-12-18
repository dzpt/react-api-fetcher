import "abortcontroller-polyfill";
import timeout from "./timeout";

export default async (
  url: string,
  onSuccess: CallableFunction,
  onError: CallableFunction,
  options?: any
) => {
  const c = new AbortController();
  const timeOutId = timeout(
    c,
    () => {
      onError("Timed out");
    },
    options && options["timeout"] ? options["timeout"] : 10000
  );

  // console.log(url);

  try {
    const f = await fetch(url, { ...options, signal: c.signal });
    // f.json().then(d => console.log(d)).
    f.json()
      .then(res => {
        if (res) {
          onSuccess(res);
        }
      })
      .catch(err => {
        onError(err);
      });
  } catch (e) {
    onError(e);
  } finally {
    clearTimeout(timeOutId);
  }
};
