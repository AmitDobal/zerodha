import fs from "fs";
import { parse } from "csv-parse";
// import { PrismaClient } from "@prisma/client";
import { Client } from "@opensearch-project/opensearch";

const LoadStockData = async (req, res) => {
  // const prisma = new PrismaClient();
  const csvFilePath =
    "D:\\Software Engineering\\System Design\\HHLD - Keerti\\18. Zerodha\\market-data-service\\stocks.csv";
  const stocksDataForOpenSearch = [];

  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ",", quote: '"', columns: true }))
    .on("data", async (row) => {
      try {
        // await prisma.Stocks.create({
        //   data: {
        //     instrumentKey: row["instrument_key"],
        //     //exchangeToken: row['"exchange_token"'],
        //     //tradingSymbol: row['"tradingsymbol"'],
        //     name: row["name"],
        //     //lastPrice: parseFloat(row['"last_price"']),
        //     //expiry: row['"expiry"'] ? new Date(row['"expiry"']) : null,
        //     //strike: row['"strike"'] ? parseFloat(row['"strike"']) : null,
        //     //tickSize: parseFloat(row['"tick_size"']),
        //     //lotSize: parseInt(row['"lot_size"']),
        //     type: row["instrument_type"],
        //     //optionType: row['"option_type"'] || null,
        //     exchange: row["exchange"],
        //   },
        // });
        console.log(`Inserted row: ${JSON.stringify(row)}`);
        console.log("Adding to OpenSearch");

        //sending data to opensearch
        var host = process.env.AIVEN_URI;
        var client = new Client({
          node: host,
        });

        var index_name = "complete_stocks";
        var stock_data = {
          instrumentKey: row["instrument_key"],
          name: row["name"],
          type: row["instrument_type"],
          exchange: row["exchange"],
        };

        var response = await client.index({
          // id: title, // (let elastic search take care of id)
          index: index_name,
          body: stock_data,
          refresh: true,
        });

        console.log(stock_data);
        console.log(response);
      } catch (error) {
        console.error(
          `Error inserting row: ${JSON.stringify(row)}, Error: ${error.message}`
        );
      }
    })
    .on("end", async () => {
      console.log("CSV file successfully processed.");
      res.json({ message: "CSV file successfully processed" });
      // await prisma.$disconnect();
    })
    .on("error", (error) => {
      console.error("Error parsing CSV:", error.message);
      res.status(400).json({ message: "parsing error" });
    });
};

export default LoadStockData;
