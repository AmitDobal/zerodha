import UpstoxClient from "upstox-js-sdk";

export const getOrders = async (req, res) => {
  let defaultClient = UpstoxClient.ApiClient.instance;
  var OAUTH2 = defaultClient.authentications["OAUTH2"];
  OAUTH2.accessToken = process.env.UPSTOX_ACCESS_TOKEN;
  let apiInstance = new UpstoxClient.OrderApi();

  let apiVersion = "2.0";

  apiInstance.getOrderBook(apiVersion, (error, data, response) => {
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

export const addOrder = async (req, res) => {
  let defaultClient = UpstoxClient.ApiClient.instance;
  var OAUTH2 = defaultClient.authentications["OAUTH2"];
  OAUTH2.accessToken = process.env.UPSTOX_ACCESS_TOKEN;
  let apiInstance = new UpstoxClient.OrderApi();

  const { symbol } = req.body;
  let body = new UpstoxClient.PlaceOrderRequest(
    1,
    UpstoxClient.PlaceOrderRequest.ProductEnum.D,
    UpstoxClient.PlaceOrderRequest.ValidityEnum.DAY,
    0.0,
    symbol,
    UpstoxClient.PlaceOrderRequest.OrderTypeEnum.MARKET,
    UpstoxClient.PlaceOrderRequest.TransactionTypeEnum.BUY,
    0,
    0.0,
    true
  );

  let apiVersion = "2.0";
  apiInstance.placeOrder(body, apiVersion, (error, data, response) => {
    if (error) {
      res.status(500).json({ error: error.message });
      console.error(error.response.text);
    } else {
      res.status(200).json({ data: data });
      console.log("API called successfully. Returned data: " + data);
    }
  });
};

export const cancelOrder = async (req, res) => {
  let defaultClient = UpstoxClient.ApiClient.instance;
  var OAUTH2 = defaultClient.authentications["OAUTH2"];
  OAUTH2.accessToken = process.env.UPSTOX_ACCESS_TOKEN;
  let apiInstance = new UpstoxClient.OrderApi();

  let { orderId } = req.body;
  let apiVersion = "2.0";

  apiInstance.cancelOrder(orderId, apiVersion, (error, data, response) => {
    if (error) {
      res.status(500).json({ error: error.message });
      console.error(error.message);
    } else {
      res.status(200).json({ data: data });
      console.log("API called successfully. Returned data: " + data);
    }
  });
};
