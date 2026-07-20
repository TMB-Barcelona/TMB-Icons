const fs = require("fs");
const Downloader = require("nodejs-file-downloader");
const cliProgress = require("cli-progress");

const createDirIfNotExists = (dirName) => {
    if (!fs.existsSync(dirName)) {
        console.log(`Creating folder... ${dirName}`);
        fs.mkdirSync(dirName);
    }
};

const downloadFile = async (fileUrl, destPath, destFileName) => {
    console.log(`Downloading file '${destFileName}' from ${fileUrl}...`);

    const bar = new cliProgress.SingleBar(
        {
            format: " {bar} | [{value}/{total}] - {percentage}% | {destFileName}",
        },
        cliProgress.Presets.shades_grey
    );
    bar.start(100, 0);
    const downloader = new Downloader({
        url: fileUrl,
        directory: destPath, //Sub directories will also be automatically created if they do not exist.
        filename: destFileName,
        maxAttempts: 3, //Default is 1.
        shouldStop: function (error) {
            //A request that results in a status code of 400 and above, will throw an Error, that contains a custom property
            //"statusCode".

            //Note that an error that is thrown during the stream itself(after a valid http response was already received. It's quite rare, but happens), will not have a "statusCode" property.
            if (error.statusCode && error.statusCode === 404) {
                return true; //If you return true, the repetition will not happen. Returning anything else, including undefined, will let the downloader know that you want to continue repeating.
            }
        },
        cloneFiles: false, //This will cause the downloader to re-write an existing file.
        onProgress: function (percentage, chunk, remainingSize) {
            //Gets called with each chunk.
            bar.update(Math.round(percentage), { destFileName });
        },
    });

    try {
        await downloader.download();
    } catch (error) {
        console.log(`Error downloading ${fileUrl}: ${error}`);
    } finally {
        bar.stop();
    }
};

module.exports = {
    createDirIfNotExists,
    downloadFile,
};
