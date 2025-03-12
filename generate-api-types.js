import { spawn, exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

function formatWithPrettier(filePath) {
  return new Promise((resolve, reject) => {
    exec(`npx prettier --write ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`❌ Error running Prettier: ${stderr ?? error.message}`);
      } else {
        console.log(`✨ Prettified: ${filePath}`);
        resolve(stdout);
      }
    });
  });
}

const configPath = path.resolve(process.cwd(), "api-urls.json");
const apiList = JSON.parse(fs.readFileSync(configPath, "utf-8"));

async function fetchJsonData(url) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch API: ${response.statusText}`);
  return response.json();
}

function generateTypes(jsonData, outputPath) {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(os.tmpdir(), "temp.json");
    fs.writeFileSync(tempFilePath, JSON.stringify(jsonData, null, 2));

    const quicktypeProcess = spawn("quicktype", [
      "-l",
      "ts",
      "--just-types",
      "--no-enums",
      "-o",
      outputPath,
      tempFilePath,
    ]);

    let errorMessage = "";
    quicktypeProcess.stderr.on("data", (data) => {
      errorMessage += data.toString();
    });

    quicktypeProcess.on("close", async (code) => {
      fs.unlinkSync(tempFilePath);
      if (code === 0) {
        await formatWithPrettier(outputPath);
        resolve(`✅ Types saved to ${outputPath}`);
      } else {
        reject(`❌ Error running quicktype: ${errorMessage}`);
      }
    });
  });
}

async function main() {
  for (const { url, output } of apiList) {
    try {
      console.log(`🚀 Fetching data from: ${url}`);
      const jsonData = await fetchJsonData(url);

      const outputPath = path.resolve(process.cwd(), output);
      console.log(`📝 Generating TypeScript types to: ${outputPath}`);

      await generateTypes(jsonData, outputPath);
      console.log(`✅ Types saved to ${output}`);
    } catch (error) {
      console.error(`❌ Error processing ${url}: ${error}`);
    }
  }
}

main();
