const StreamZip = require("node-stream-zip");

function docxExtractor(filePath) {
  return new Promise((resolve, reject) => {
    const zip = new StreamZip({
      file: filePath,
      storeEntries: true,
    });

    zip.on("ready", () => {
      const chunks = [];
      let content = "";

      zip.stream("word/document.xml", (err, stream) => {
        if (err) {
          reject(err);
          return;
        }

        stream.on("data", function (chunk) {
          chunks.push(chunk);
        });

        stream.on("end", function () {
          content = Buffer.concat(chunks);
          zip.close();

          const body = [];
          const components = content.toString().split("<w:t");

          for (let i = 0; i < components.length; i++) {
            const tags = components[i].split(">");
            const textContent = tags[1].replace(/<.*$/, "");
            body.push(textContent.trim());
          }
          resolve(body.join("\n"));
        });
      });
    });

    zip.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = { docxExtractor };
