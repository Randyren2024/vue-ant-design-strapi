const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 9000;

// 静态文件路径
app.use(express.static(path.join(__dirname)));

// 所有路由指向index.html（SPA应用）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// FC入口函数
exports.handler = (req, res, context) => {
  app(req, res);
};

// FC初始化函数
exports.initializer = (context, callback) => {
  console.log('Function initialized!');
  callback(null, '');
};

// 本地开发服务
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
} 