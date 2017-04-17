const request = require('request')
const cheerio = require('cheerio')

exports.artbava = (callback, callback2) => {
    let index = 0
    let base_url = 'http://www.artbava.com'

    parseUTF8(base_url + '/exhibit/', ($) => {
        $('div#exhibit-list .exhibition-box').each(function (i, element) {
                let link = $(this).children('a').attr('href')
                let list_title = $(this).children('.exhibition-name').children('strong').children('a').text().trim()


                callback(list_title).then(() => {
                    if (++index <= 5) {
                        parseUTF8(base_url + link, ($2) => {

                            let gigan = $2('body > div.container.content-wrapper > div.row.m-t-lg.no-select > div.col-md-9.col-sm-12.no-select > div:nth-child(1) > h4:nth-child(3)').text();
                            let title = $2('body > div.container.content-wrapper > div.row.m-t-lg.no-select > div.col-md-9.col-sm-12.no-select > div:nth-child(1) > h2 > strong').text();
                            let address = $2('body > div.container.content-wrapper > div.row.m-t-lg.no-select > div.col-md-3.col-sm-12.col-xs-12.gallery-info > nav > p:nth-child(2) > small').text();
                            // let price = $2('body > div:nth-child(5) > div > div.row.content-section > div.col-md-2.col-xs-12.no-padding.info > div.exhibit-info-wrapper > div > p.fee').text();
                            // let contact = $2('body > div:nth-child(5) > div > div.row.content-section > div.col-md-2.col-xs-12.no-padding.info > div.exhibit-info-wrapper > div > p.phone-number').text();
                            let site = $2('body > div.container.content-wrapper > div.row.m-t-lg.no-select > div.col-md-3.col-sm-12.col-xs-12.gallery-info > nav > p.url > small > a').attr('href');
                            let htmlContents = $2('body > div.container.content-wrapper > div.row.m-t-lg.no-select > div.col-md-9.col-sm-12.no-select > div.no-select.content-section').html();
                            let mainImage = $2('body > div.container.content-wrapper > div.row.m-t-lg.no-select > div.col-md-9.col-sm-12.no-select > div:nth-child(1) > div.image-section > div.slider-item > div > img.item').attr('src')
                            let position = $2('body > div.container.content-wrapper > div.row.m-t-lg.no-select > div.col-md-9.col-sm-12.no-select > div:nth-child(1) > h4:nth-child(2)').text();
                            // let openingHour = $2('body > div:nth-child(5) > div > div.row.content-section > div.col-md-2.col-xs-12.no-padding.info > div.exhibit-info-wrapper > div > p.open-time').text();

                            let giganArray = gigan.split('~');

                            let showArray = [
                            {name: 'title', value: list_title},
                            {name: 'status', value: '요청'},
                            {name: 'originUrl', value: base_url + link},
                            {name: 'startDate', value: new Date(giganArray[0].trim().replace('년 ', '-').replace('월 ', '-').replace('일',''))},
                            {name: 'endDate', value: new Date(giganArray[1].trim().replace('년 ', '-').replace('월 ', '-').replace('일',''))},
                            {name: 'imageUrl', value: base_url + mainImage},
                            {name: 'urlLink', value: site},
                            // {name: 'contact', value: contact},
                            // {name: 'openingHour', value: openingHour},
                            {name: 'address', value: address},
                            {name: 'name', value: position},
                            {name: 'source', value: 'artbava'},
                            {name: 'htmlContents', value: htmlContents, excludeFromIndexes: true}
                        ]
                        callback2(showArray)

                        })
                    }
                })
        })
    })
}
function parseUTF8(paramUrl, callback) {
    request({
            url : paramUrl,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36' }
        }, (err, res, html) => {
            let body = cheerio.load(html);
            callback(body)
        })
}