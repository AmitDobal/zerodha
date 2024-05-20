import express from "express";
import { Client } from "@opensearch-project/opensearch";
import serverless from "serverless-http";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

dotenv.config({ path: ".env.local" });
const PORT = process.env.PORT || 8090;
app.use(cors());

// Route for handling search requests
app.get("/search", async (req, res) => {
  try {
    console.log("Inside search query");
    // Extract query parameter from the request
    const searchTerm = req.query.q || "";

    console.log("search term is ", searchTerm);
    // Example search query

    var host_aiven = process.env.AIVEN_URI;
    var client = new Client({
      node: host_aiven,
    });

    const { body } = await client.search({
      index: "complete_stocks", // Index name in OpenSearch
      body: {
        query: {
          match: {
            name: {
              query: searchTerm,
              fuzziness: "AUTO",
            },
          },
        },
      },
    });

    // Process search results
    const hits = body.hits.hits;
    // console.log(hits);

    res.status(200).json(hits);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  res.json({ message: "Lambda Search Service" });
});

// Wrap the Express app with serverless-http
const wrappedApp = serverless(app);

// // Export the wrapped app for Serverless Framework
export const handler = wrappedApp;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
