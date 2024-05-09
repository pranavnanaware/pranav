const NotionParse = require("@kodaps/notion-parse");
require("dotenv").config();

const go = async () => {
  console.log("NOTION_SECRET:", process.env.NOTION_SECRET);
  console.log("NOTION_DATABASE_ID:", process.env.NOTION_DATABASE_ID);
  if (process.env.NOTION_SECRET) {
    await NotionParse.parseNotion(process.env.NOTION_SECRET, "./content", [
      {
        databaseId: process.env.NOTION_DATABASE_ID || "",
        contentType: "Blog",
        filterFields: ["createdAt", "status", "Type"],
      },
    ]);
  }
};

go().then(() => {
  console.log("Done");
});
