
const request = require('request')
const cheerio = require('cheerio')
const Iconv = require('iconv').Iconv

exports.parseUTF8 = (paramUrl, callback) => {
    request({
            url : paramUrl,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36' }
        }, (err, res, html) => {
            let body = cheerio.load(html);
            callback(body)
        })
}

exports.parseCp949 = (paramUrl, callback) => {
    request({url: paramUrl, encoding: null}, (error, response, html) => {
        let htmlEncode = new Buffer(html, 'binary');
        let iconv = new Iconv('CP949', 'UTF8');
        htmlEncode = iconv.convert(htmlEncode).toString();

        let body = cheerio.load(htmlEncode, {decodeEntities: false});
        callback(body)
    })
}