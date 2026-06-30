require("dotenv").config();
const http = require("http");
const PORT = process.env.PORT;
const { v4: uuidv4 } = require("uuid");
const { errorHandle } = require("./errorHandle");
const { httpHead } = require("./config");
const todos = [];
const httpListener = (req, res) => {
  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, httpHead);
    res.end(
      JSON.stringify({
        status: "success",
        data: todos,
      })
    );
  } else if (req.url === "/todos" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        if (title !== undefined) {
          const todo = {
            title,
            id: uuidv4(),
          };
          todos.push(todo);
          res.writeHead(200, httpHead);
          res.end(
            JSON.stringify({
              status: "success",
              data: todos,
            })
          );
        } else {
          errorHandle(res, "title輸入錯誤，新增失敗");
        }
      } catch (error) {
        errorHandle(res, "程式碼輸入錯誤，新增失敗");
      }
    });
  } else if (req.url === "/todos" && req.method === "OPTIONS") {
    res.writeHead(200, httpHead);
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const findId = req.url.split("/").pop();
        const todoIdx = todos.findIndex((item) => item.id === findId);
        const title = JSON.parse(body).title;
        if (todoIdx !== -1 && title !== undefined) {
          todos[todoIdx].title = title;
          res.writeHead(200, httpHead);
          res.end(
            JSON.stringify({
              status: "success",
              data: todos,
            })
          );
        } else {
          errorHandle(res, "id 或 title 輸入錯誤，更新錯誤");
        }
      } catch (error) {
        errorHandle(res, "程式碼輸入錯誤，更新錯誤");
      }
    });
  } else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
    const findId = req.url.split("/").pop();
    const todoIdx = todos.findIndex((item) => item.id === findId);
    if (todoIdx !== -1) {
      todos.splice(todoIdx, 1);
      res.writeHead(200, httpHead);
      res.end(
        JSON.stringify({
          status: "success",
          data: todos,
        })
      );
    } else {
      errorHandle(res, "id 輸入錯誤，刪除失敗");
    }
  } else if (req.url === "/todos" && req.method === "DELETE") {
    todos.length = 0;
    res.writeHead(200, httpHead);
    res.end(
      JSON.stringify({
        status: "success",
        data: todos,
      })
    );
  } else {
    res.writeHead(400, httpHead);
    res.end(
      JSON.stringify({
        status: false,
        message: "無此網路路由",
      })
    );
  }
};

const server = http.createServer(httpListener);
server.listen(PORT || 3005);
