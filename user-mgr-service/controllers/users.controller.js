import UpstoxClient from "upstox-js-sdk";

export const getFunds = async (req, res) => {
  let defaultClient = UpstoxClient.ApiClient.instance;
  var OAUTH2 = defaultClient.authentications["OAUTH2"];
  OAUTH2.accessToken = process.env.UPSTOX_ACCESS_TOKEN;
  let apiInstance = new UpstoxClient.UserApi();
  let apiVersion = "2.0";

  apiInstance.getUserFundMargin(apiVersion, null, (error, data, response) => {
    if (error) {
      res.status(500).json({ error: error.message });
      console.error(error.message);
    } else {
      res.status(200).json({ data: data });
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    }
  });
};
