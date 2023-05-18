const http =require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temprature = tempVal.replace("{%tempval%}",orgVal.main.temp);
    temprature = temprature.replace("{%tempmin%}",orgVal.main.temp_min);
    temprature = temprature.replace("{%tempmax%}",orgVal.main.temp_max);
    temprature = temprature.replace("{%location%}",orgVal.name);
    temprature = temprature.replace("{%country%}",orgVal.sys.country);
 return temprature;
}

const server = http.createServer((req, res)=>{
    if(req.url == "/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=9dc7024cd430cbc8ba3ab7620b2238d4')
.on('data', (chunk) => {
    const objdata = JSON.parse(chunk);
    const arrdata = [objdata];
  //console.log(arrdata[0].main.temp);
  const realTimeData = arrdata.map((val) =>{
    replaceVal(homeFile,val)
  }).join("")
 // res.write(realTimeData);
})
.on('end', (err)  =>{
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
    }
});


server.listen(8000,"127.0.0.1");