const process = require("child_process");
const { promisify } = require("util");
const exec = promisify(process.exec);
const fs = require("fs");
const path = require("path");

async function cnpm_install(url, packageArr) {
  try {
    let pwdUrl = path.resolve(__dirname, url);
    console.log(`cd ${pwdUrl}`);
    await exec(`cd ${pwdUrl}`);
    console.log(packageArr);
    if (packageArr.dep) {
      let res = await exec(
        `cd ${pwdUrl} && cnpm install ${
          packageArr.dep
        } -D --registry=http://172.16.61.219:12000/`
      );
      console.log("client install dep ", res);
    }
    if (packageArr.dev) {
      let res = await exec(
        `cd ${pwdUrl} && cnpm install ${
          packageArr.dev
        } -S --registry=http://172.16.61.219:12000/`
      );
      console.log("client install dev ", res);
    }
  } catch (error) {
    console.log(`error ${url}`, error);
  }
}

async function main() {
  let clientMatch = matchPackage(
    "./dev/client/package.json",
    "./dev/client/package-bak.json"
  );
  let omcMatch = matchPackage(
    "./dev/omc/package.json",
    "./dev/omc/package-bak.json"
  );
  let wechatMatch = matchPackage(
    "./dev/wechat/package.json",
    "./dev/wechat/package-bak.json"
  );
  if (clientMatch) {
    cnpm_install("./dev/client", clientMatch);
  }
  if (omcMatch) {
    cnpm_install("./dev/omc", omcMatch);
  }
  if (wechatMatch) {
    cnpm_install("./dev/wechat", wechatMatch);
  }
}
function matchPackage(srcUrl, bakUrl) {
  let src = path.resolve(__dirname, srcUrl);
  let bak = path.resolve(__dirname, bakUrl);
  if (!fs.existsSync(src) || !fs.existsSync(bak)) {
    console.log("传入的文件其中一个不存在");
    return null;
  }
  const srcDepObj = require(src).dependencies;
  const srcDevObj = require(src).devDependencies;

  const bakDepObj = require(bakUrl).dependencies;
  const bakDevObj = require(bakUrl).devDependencies;

  let depArr = getDifferent(srcDepObj, bakDepObj);
  let devArr = getDifferent(srcDevObj, bakDevObj);

  return { dep: depArr, dev: devArr };
}

function getDifferent(srcObj, bakObj) {
  let arr = [];
  for (const key in srcObj) {
    if (srcObj.hasOwnProperty(key)) {
      const element = srcObj[key];
      if (!bakObj.hasOwnProperty(key)) {
        arr.push(`${key}@${element}`);
      }
    }
  }
  return arr.join(" ");
}

main();
