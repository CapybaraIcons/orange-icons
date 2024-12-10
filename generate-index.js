import { promises as fs } from "fs";
import path from "path";

// Path to the folder containing the icons
const folderPath = process.cwd(); // Current working directory

// Function to create the index.js file
async function createIndexFile() {
  try {
    // Get all files in the folder ending with .svg
    const files = (await fs.readdir(folderPath)).filter((file) =>
      file.endsWith(".svg")
    );

    // Create export statements for each file
    const exports = files
      .map((file) => {
        const name = path.basename(file, ".svg"); // Remove the .svg extension
        const pascalCaseName = name
          .replace(/-./g, (match) => match[1].toUpperCase()) // Convert kebab-case to camelCase
          .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
        return `export { default as ${pascalCaseName} } from './${file}';`;
      })
      .join("\n");

    // Write the exports to an index.js file
    await fs.writeFile(path.join(folderPath, "index.js"), exports);

    console.log("index.js has been created with exports for all SVG files!");
  } catch (error) {
    console.error("Error creating index.js:", error);
  }
}

createIndexFile();
