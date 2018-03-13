/**
 * downloadFile( username, repoName , ...pathToFile)
 * username //bansalayush
 * respoName //rnhotel
 * pathToFile
 *
 * downloadFolder(username,repoName, pathToFolder)
 * username //bansalayush
 * respoName //rnhotel
 * pathToFolder
 */

//bansalayush/rnhotel/master/src/ListPage.js
const https = require('https');
const fs = require('fs');
const DOMAIN = 'raw.githubusercontent.com';

function writeFile(data, fileName) {
  fs.appendFile(fileName, data.toString(), err => {
    if (err) {
      console.log('error in writing file', err);
    }
  });
}

function EOF(data) {
  console.log('EOF');
}

function getFileName(pathToFile) {
  var result = pathToFile.split('/');
  var splitLength = result.length;
  return result[splitLength - 1];
}
function getFile(branchName, username, repoName, ...pathToFile) {
  pathToFile.forEach(item => {
    const path = `/${username}/${repoName}/${branchName}/${item}`;
    const URL = `${DOMAIN}${path}`;
    const options = {
      hostname: DOMAIN,
      path: path
    };
    var fileName = getFileName(item);

    https
      .get(options, function(res) {
        console.log(res.statusCode);
        /* if file not found */
        if (res.statusCode === 404) {
          console.log('FILE NOT FOUND');
        } else {
          /* if file found */
          res.on('data', data => writeFile(data, fileName));
          res.on('end', data => EOF(data));
        }
      })
      .on('error', function(res) {
        console.log('error in reading URL');
      });
  });
}
getFile('master', 'bansalAyush', 'InstagramClone', '.babelrc', 'README.md');
