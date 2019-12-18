## React API Fetcher

Simple react api fetcher written in Typescript

## Features

- Support hook
- React JS/Native support
- Trigger update by dependencies
- Support connection timeout
- Support retry
- isLoading flag

## Getting started

unmanaged state

```js
import { request } from "react-api-fetcher";
request(
  "https://get.geojs.io/v1/ip/country.json",
  jsonData => {},
  error => {}
);
```

managed state

```js
import { useFetch } from "react-api-fetcher";
const { data, isLoading, error, retry } = useFetch({
  url: "https://get.geojs.io/v1/ip/country.json",
  onUpdate: [pageDep]
});
```
