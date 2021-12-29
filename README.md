# jsonbase

[English README](./README_EN.md)

本项目提供了基于 Cloudflare Workers 部署的 JSON Database 数据库。可以方便地存储和读取 JSON 数据。

## 示例

使用 POST 向命名空间 `demo_bucket/hello` 写入示例数据 `{"hello": "world"}`：

```bash
curl -X "POST" "https://jsonbase.huhuhang.workers.dev/demo_bucket/hello" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d '{"hello": "world"}'
```

使用 GET 方法获取命名空间 `demo_bucket/hello` 的数据：

```bash
curl "https://jsonbase.huhuhang.workers.dev/demo_bucket/hello"
```

返回：

```json
{"hello":"world"}
```

## 如何部署

你可以直接在 Cloudflare Workers 网页版中新建项目，并复制本仓库中的 `index.js` 到在线编辑器中部署。

同时需要创建一个 KV 数据库，并绑定到 Cloudflare Workers。

![1640759478099](https://cdn.jsdelivr.net/gh/huhuhang/cdn@master/images/2021/12/1640759478099.png)

或者使用官方提供的 wrangler cli 工具：

1. 了解 Cloudflare Workers 命令行工具 [wrangler](https://github.com/cloudflare/wrangler) 的使用方法。
2. 基于本项目初始化一个新的项目。

    ```bash
    wrangler generate jsonbase https://github.com/huhuhang/jsonbase
    ```

3. 请修改 `wrangler.toml` 中预留的 `account_id`，替换为你的账户信息。
4. 请修改 `wrangler.toml` 中预留的 KV 数据库 `id`，替换为你的账户信息。
5. 将 `jsonbase` 项目添加到 Cloudflare Workers 部署。

## 身份认证

目前没有添加任何身份认证，为了保护数据安全，可以使用 Cloudflare Access 创建请求策略。或者参考 [官方示例](https://developers.cloudflare.com/workers/examples/auth-with-headers) 修改代码添加认证模块。请不要在生产环境使用项目中的示例数据库，你的数据可能被移除或篡改，请自行部署。
