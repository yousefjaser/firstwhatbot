const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { reportError } = require("../utils");
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// تفعيل البلجن
puppeteer.use(StealthPlugin());

module.exports.config = () => {
  try {
    // إعدادات خاصة ببيئة Render
    const isProduction = process.env.NODE_ENV === 'production';
    
    const puppeteerOptions = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ],
      headless: true,
      executablePath: isProduction ? '/usr/bin/google-chrome-stable' : undefined
    };

    const client = new Client({
      authStrategy: new LocalAuth({ 
        clientId: "client-one",
        dataPath: isProduction ? '/tmp/.wwebjs_auth' : './.wwebjs_auth'
      }),
      puppeteer: {
        headless: true,
        executablePath: puppeteerOptions.executablePath,
        args: puppeteerOptions.args,
        browserWSEndpoint: process.env.BROWSER_URL
      },
      webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
      }
    });

    global.whatsappclient = client;

    client.on("qr", (qr) => {
      console.log("newqrcode", qr);
      global.whatsappclient_qr = qr;
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("Client is ready!");
      global.clientready = true;
      global.clientauthenticated = true;
      global.whatsappclient_qr = null;
    });

    client.on("authenticated", () => {
      console.log("Client is authenticated!");
      global.clientauthenticated = true;
    });

    client.on("message", (message) => {
      // يمكن إضافة معالجة الرسائل هنا
    });

    client.on("disconnected", (reason) => {
      console.log("Client disconnected:", reason);
      global.clientready = false;
      global.clientauthenticated = false;
      
      // إعادة تشغيل العميل بعد 5 ثوان
      setTimeout(() => {
        client.initialize();
      }, 5000);
    });

    client.on("auth_failure", (message) => {
      console.log("auth_failure!", message);
      global.clientready = false;
      global.clientauthenticated = false;
    });

    // بدء تشغيل العميل
    client.initialize().catch(err => {
      console.error("Client initialization error:", err);
      reportError("whatsapp-client-init", err);
    });
    
  } catch (error) {
    reportError("whatsapp-config", error);
  }
};
