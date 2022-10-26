class Request {
  constructor(url, options) {
    this.url = url;
    this.options = options;
  }
}

class Headers {
  constructor(options) {
    this.options = options;
  }
}

async function fetch(input, init) {
  const options = input.options || {};
  const header = options.headers || {};
  const url = input.url || input;
  const responseType = options.responseType;
  if (/^wxfile:/.test(url)) {
    return new Promise((resolve, reject) => {
      try {
        const fs = wx.getFileSystemManager();
        const data = fs.readFileSync(url, (!responseType || ['arraybuffer', 'bold'].includes(responseType)) ? undefined : 'utf-8');
        resolve({
          url,
          status: 200,
          statusText: '200',
          body: data,
          headers: {},
          arrayBuffer() {
            return this.body;
          },
          json() {
            return this.body;
          },
          text() {
            return this.body;
          }
        });
      }
      catch(e) {
        reject(e);
      }
    });
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      header,
      responseType: (!responseType || ['arraybuffer', 'bold'].includes(responseType)) ? 'arraybuffer' : 'text',
      success: (res) => {
        resolve({
          url,
          status: res.statusCode,
          statusText: `${res.statusCode}`,
          body: res.data,
          headers: res.header,
          arrayBuffer() {
            return this.body;
          },
          json() {
            return this.body;
          },
          text() {
            return this.body;
          }
        });
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export {Request, Headers, fetch};