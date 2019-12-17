// {
//   "/api": {
//     "target": "http://192.168.3.101:4000",
//     "secure": false
//   }
// }

const PROXY_CONFIG = {
  '/users/**': {
    target: 'https://api.github.com',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      // const cookieMap = {
      //   SID: '',
      // };
      // let cookie = '';
      // for (const key in cookieMap) {
      //   if (Object.prototype.hasOwnProperty.call(cookieMap, key)) {
      //     cookie += `${key}=${cookieMap[key]}; `;
      //   }
      // }
      // proxyReq.setHeader('cookie', cookie);
    },
  },
  "/api": {
    "target": "http://127.0.0.1:4000",
    "secure": false
  }
};

module.exports = PROXY_CONFIG;
