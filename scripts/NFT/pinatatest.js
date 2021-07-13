const {
  pinataApiKey,
  pinataApiSecret,
  pinataJWT,
} = require("../../secrets.json");

const axios = require("axios");
const fs = require("fs");
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

const axiosConfig = {
  headers: {
    Authorization: "Bearer " + pinataJWT,
  },
};

const pinataUrl =
  "https://api.pinata.cloud/psa/pins/20dbf05a-d66e-48b0-b4a4-5591c54d5d67";
const pinataPinsUrl = "https://api.pinata.cloud/psa/pins";

// pinata.testAuthentication().then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)
// })

async function getPinList() {
  // const pinList = await pinata.pinList()
  // console.log(pinList)
  axios
    .get(pinataPinsUrl, axiosConfig)
    .then(function (res) {
      console.log(res.data.results[1].pin);
    })
    .catch(err => console.log("err", err.response.data));
}

async function pinFromFS() {
  pinataOptions = {
    wrapWithDirectory: true,
  };
  sourcePath = "/Users/kli/Desktop/duolingo/NFT/DuoAssets";
  return pinata.pinFromFS(sourcePath, { pinataOptions });
}

async function listFilesInDir() {
  let fileNames = [];
  const testFolder = "/Users/kli/Desktop/duolingo/NFT/DuoAssets";
  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
      fileNames.push(file);
    });
    console.log(fileNames);
  });
}

// getPinList().catch((err)=>"err")
// pinFromFS().then((res)=>console.log(res)).catch((err)=>console.log(err))
listFilesInDir();
