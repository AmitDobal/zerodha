import express from "express";
import dotenv from "dotenv";
import UpstoxClient from "upstox-js-sdk";

dotenv.config({ path: ".env.local" });
const app = express();
const PORT = process.env.PORT || 4000;

//STEP 1 - Get the code
//paste it in your browser to get the AUTH_CODE code
const authurlfortoken_ = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${
  process.env.UPSTOX_API_KEY
}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

// authurlfortoken_ = encodeURIComponent(authurlfortoken_)
console.log("\nGet AUTH code:------->\n", authurlfortoken_);

//STEP 2 - Login and get the ACCESS TOKEN
app.get("/getAccessToken", (req, res) => {
  loginToUpstox();
  res.json({ message: "Succeeded" });
});

const loginToUpstox = () => {
  const apiInstance = new UpstoxClient.LoginApi();
  const apiVersion = "2.0";
  const opts = {
    code: process.env.UPSTOX_AUTH_CODE,
    clientId: process.env.UPSTOX_API_KEY,
    clientSecret: process.env.UPSTOX_API_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    grantType: "authorization_code",
  };
  apiInstance.token(apiVersion, opts, (error, data, response) => {
    if (error) {
      console.log("Error occurred: ", error.message);
    } else {
      console.log("\nAccess Token - ", data["accessToken"]);
      console.log(
        "\nAPI called successfully. Returned data: " + JSON.stringify(data)
      ); //this will have auth token. copy that
    }
  });
};

app.get("/getOHLCData", (req, res) => {
  console.log("Getting OHLC route");
  const symbol = req.query.symbol;
  getMarketQuoteOHLC(symbol, (err, data) => {
    if (err) {
      res.status(500).json("failed");
    } else {
      res.status(200).json(data);
    }
  });
});

const getMarketQuoteOHLC = (symbol, callback) => {
  let defaultClient = UpstoxClient.ApiClient.instance;
  var OAUTH2 = defaultClient.authentications["OAUTH2"];
  OAUTH2.accessToken = process.env.UPSTOX_ACCESS_TOKEN;
  let apiInstance = new UpstoxClient.MarketQuoteApi();
  let apiVersion = "2.0";
  //let symbol = "NSE_EQ|INE669E01016";
  let interval = "1d";
  apiInstance.getMarketQuoteOHLC(
    symbol,
    interval,
    apiVersion,
    (error, data, response) => {
      if (error) {
        console.error(error);
        callback(err, null);
      } else {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
        callback(null, data);
      }
    }
  );
};

app.get("/getHistoricalData", (req, res) => {
  console.log("Getting Historical route");
  const symbol = req.query.symbol;
  getHistoricalData(symbol, (err, data) => {
    if (err) {
      res.status(500).json("failed");
    } else {
      res.status(200).json(data);
    }
  });
});

const getHistoricalData = (symbol, callback) => {
  let apiInstance = new UpstoxClient.HistoryApi();

  let apiVersion = "2.0";
  //   let instrumentKey = "NSE_EQ|INE669E01016";
  let interval = "30minute";
  let toDate = "2023-11-13";
  let fromDate = "2023-11-12";

  apiInstance.getHistoricalCandleData1(
    symbol,
    interval,
    toDate,
    fromDate,
    apiVersion,
    (error, data, response) => {
      if (error) {
        console.error(error);
        callback(error, null);
      } else {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
        callback(null, data);
      }
    }
  );
};

app.listen(PORT, () => {
  console.log(`\nMarket data service is running on http://localhost:${PORT}`);
});
