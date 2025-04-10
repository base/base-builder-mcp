import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import "dotenv/config";
import { getGuide, testAgentResponse } from "./tools.js";
import { getGuideParams, testAgentResponseParams } from "./params.js";
import { fetchAndUpdateSidebar } from "./sidebar.js";

// Initialize the server
const server = new McpServer({
  name: "docs-mcp",
  version: "1.0.0",
});

// Fetch sidebar before starting the server
await fetchAndUpdateSidebar();

// Set up a periodic update (e.g., every hour)
setInterval(fetchAndUpdateSidebar, 60 * 60 * 1000);

server.tool(
  "BuildOnBase",
  "If the user tells you I want to build on Base, this means that the user wants to use this tool which connects the user to Base docs. If you run this tool and you get an error because the guide is not found, try other guides from the sidebar.",
  getGuideParams.shape,
  getGuide
);

server.tool(
  "testAgentResponse",
  "Test the response of an agent",
  testAgentResponseParams.shape,
  testAgentResponse
);

const transport = new StdioServerTransport();
server.connect(transport);
