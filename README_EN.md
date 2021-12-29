# jsonbase

This project provides a JSON Database based on Cloudflare Workers deployment. You can easily store and read JSON data.

## Example

Use POST to write sample data `{"hello": "world"}` to namespace `demo_bucket/hello`.

```bash
curl -X "POST" "https://jsonbase.huhuhang.workers.dev/demo_bucket/hello" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"hello": "world"}'
```

Get data for namespace `demo_bucket/hello` using GET method.

```bash
curl "https://jsonbase.huhuhang.workers.dev/demo_bucket/hello"
```

Returns.

```json
{"hello": "world"}
```

## How to deploy

You can create a new project directly in Cloudflare Workers web version and copy `index.js` from this repository to the online editor to deploy it.

You also need to create a KV database and bind to Cloudflare Workers.

![1640759478099](https://cdn.jsdelivr.net/gh/huhuhang/cdn@master/images/2021/12/1640759478099.png)

or use the official wrangler cli tool provided by.

1. learn how to use the Cloudflare Workers command line tool [wrangler](https://github.com/cloudflare/wrangler).
2. initialize a new project based on this project.

    ```bash
    wrangler generate jsonbase https://github.com/huhuhang/jsonbase
    ```

3. modify the reserved `account_id` in `wrangler.toml` and replace it with your account information. 4.
4. Modify the KV database `id` reserved in `wrangler.toml` and replace it with your account information.
5. Add the `jsonbase` project to the Cloudflare Workers deployment.

## Authentication?

Currently there is no authentication added, to secure your data, you can use Cloudflare Access to create a request policy. Or refer to [official example](https://developers.cloudflare.com/workers/examples/auth-with-headers) to modify the code to add authentication module. Please do not use the sample database in the project in production environment, your data may be removed or tampered with, please deploy it yourself.
