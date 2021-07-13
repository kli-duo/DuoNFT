/* eslint-disable */
require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const pinata = pinataSDK(key, secret);

const axios = require("axios");

export const pinJSONToIPFS = async JSONBody => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const fileNames = [
  "1header plus.png",
  "Duo at home.png",
  "Duo laptop.png",
  "Duo_Artist.png",
  "Duo_Artist_2.png",
  "Duo_Back.svg",
  "Duo_Beginner.svg",
  "Duo_Bell.svg",
  "Duo_BicepCurl.png",
  "Duo_Birthday_1.svg",
  "Duo_Birthday_2.svg",
  "Duo_Birthday_3.svg",
  "Duo_Birthday_4.svg",
  "Duo_Books.svg",
  "Duo_Bravo.png",
  "Duo_Casual.svg",
  "Duo_Cheerleader.png",
  "Duo_CheerleaderJump.png",
  "Duo_ClipboardStar.png",
  "Duo_Costume_Baller.svg",
  "Duo_Costume_Super.svg",
  "Duo_Costume_Tracksuit.svg",
  "Duo_Detective.png",
  "Duo_Eye_Mask.svg",
  "Duo_Falling.svg",
  "Duo_Flag_French.png",
  "Duo_FootballRun.png",
  "Duo_Gaming.svg",
  "Duo_Grad.svg",
  "Duo_Grad_Jump.svg",
  "Duo_Headphones.svg",
  "Duo_Headphones_Gray.svg",
  "Duo_Heart.svg",
  "Duo_HeartEyes.png",
  "Duo_Intense.svg",
  "Duo_Interested.svg",
  "Duo_Intern.svg",
  "Duo_Joyous.svg",
  "Duo_Leap.svg",
  "Duo_Light_Bulb.svg",
  "Duo_Lock.svg",
  "Duo_Love.svg",
  "Duo_Magic.png",
  "Duo_Mail.svg",
  "Duo_Meh.svg",
  "Duo_PencilBoarding.svg",
  "Duo_PencilDraw.svg",
  "Duo_Placement.svg",
  "Duo_PlacementTest.svg",
  "Duo_Plus.svg",
  "Duo_Plus_Crown.svg",
  "Duo_Plus_Drink.svg",
  "Duo_Plus_Fly.svg",
  "Duo_Plus_Heart.svg",
  "Duo_Plus_Jetpack.svg",
  "Duo_Plus_Jump.svg",
  "Duo_Plus_Parachute.svg",
  "Duo_Plus_Ribbon.svg",
  "Duo_Plus_Sad.svg",
  "Duo_Plus_Shield.svg",
  "Duo_Plus_Straight_On.svg",
  "Duo_Plus_UpsideDown.svg",
  "Duo_Plus_Window.svg",
  "Duo_Pointer.svg",
  "Duo_Profile.svg",
  "Duo_QueensGuard.png",
  "Duo_Reading.png",
  "Duo_ReportCard1.png",
  "Duo_ReportCard2.png",
  "Duo_RingingBell.svg",
  "Duo_Sad.svg",
  "Duo_Serious.svg",
  "Duo_Sleep.svg",
  "Duo_Spread_Owl.svg",
  "Duo_Straight_On.svg",
  "Duo_Straight_On_Grounded.svg",
  "Duo_Thought_Bulb.svg",
  "Duo_Three_Quarter.svg",
  "Duo_Trophy.png",
  "Duo_Trophy.svg",
  "Duo_Upside_Down.svg",
  "Duo_Wave.svg",
  "Duo_Welcome.svg",
  "Duo_Winter Copy.png",
  "Duo_Yuck.svg",
  "Duo_featherboa.png",
  "Duo_sunglasses.png",
  "Owlfit_ChampagneTracksuit_Stretch.png",
  "Owlfit_FormalAttire_Rose.png",
  "Owlfit_Super_Jump.png",
  "Waving Plus Duo.png",
  "all4one.svg",
  "candid_kind.svg",
  "duo-podcast.svg",
  "duocon-illustration.svg",
  "iOS Copy 147.png",
  "img-duo-det.svg",
  "learners_first.svg",
  "long_view.svg",
  "picassoduo.png",
];
