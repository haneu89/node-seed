const request = require('request')
const cheerio = require('cheerio')
const Iconv = require('iconv').Iconv


function cp949Parse(paramUrl, callback) {
    request({url: paramUrl, encoding: null}, (error, response, html) => {
        let htmlEncode = new Buffer(html, 'binary');
        let iconv = new Iconv('CP949', 'UTF8');
        htmlEncode = iconv.convert(htmlEncode).toString();

        let body = cheerio.load(htmlEncode, {decodeEntities: false});
        callback(body)
    })
}
exports.arthub = (callback, callback2) => {
    var index = 0;
    let base_url = 'http://www.arthub.co.kr/';
    
    cp949Parse(base_url + 'sub01/board08_list.htm', ($) => {
        $('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr > td > table').each(function (i, element) {

            let link = $(this).children('tr').children('td:nth-child(3)').children('table').children('tr').children('td:nth-child(2)').children('table').children('tr').children('td:nth-child(1)').children('span').children('a').attr('href');
            let list_title = $(this).children('tr').children('td:nth-child(3)').children('table').children('tr').children('td:nth-child(2)').children('table').children('tr').children('td:nth-child(1)').children('span').text().trim();

            callback(list_title).then(() => {
                if (++index <= 20) {
                    cp949Parse(base_url +'sub01/' + link, $2 => {
                        let gigan = $2('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(1) > td > table > tr:nth-child(4) > td:nth-child(2) > table > tr > td > table > tr:nth-child(2) > td > table > tr:nth-child(2) > td:nth-child(2)').text();
                        // let title = $2('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(1) > td > table > tr:nth-child(4) > td:nth-child(2) > table > tr > td > table > tr:nth-child(1) > td:nth-child(2) > span').text();
                        let address = $2('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(1) > td > table > tr:nth-child(4) > td:nth-child(2) > table > tr > td > table > tr:nth-child(2) > td > table > tr:nth-child(6) > td:nth-child(2)').text();
                        // let price = $2('body > div:nth-child(5) > div > div.row.content-section > div.col-md-2.col-xs-12.no-padding.info > div.exhibit-info-wrapper > div > p.fee').text();
                        let contact = $2('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(1) > td > table > tr:nth-child(4) > td:nth-child(2) > table > tr > td > table > tr:nth-child(2) > td > table > tr:nth-child(7) > td:nth-child(2)').text();
                        let site = $2('body > table  > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(1) > td > table > tr:nth-child(4) > td:nth-child(2) > table > tr > td > table > tr:nth-child(2) > td > table > tr:nth-child(8) > td:nth-child(2) > a').text();
                        let htmlContents = $2('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(3) > td > table > tr:nth-child(4) > td:nth-child(2)').html();
                        let mainImage = $2('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(1) > td > table > tr:nth-child(4) > td:nth-child(2) > table > tr > td > table > tr:nth-child(1) > td:nth-child(1) > div > div > img').attr('src');
                        let position = $2('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(1) > td > table > tr:nth-child(4) > td:nth-child(2) > table > tr > td > table > tr:nth-child(2) > td > table > tr:nth-child(5) > td:nth-child(2)').text();
                        let openingHour = $2('body > table > tr > td > table > tr:nth-child(3) > td > table > tr > td:nth-child(1) > table > tr:nth-child(1) > td > table > tr:nth-child(4) > td:nth-child(2) > table > tr > td > table > tr:nth-child(2) > td > table > tr:nth-child(4) > td:nth-child(2)').text();

                        let giganArray = gigan.split(' ');

                        let showArray = [
                            {name: 'title', value: list_title},
                            {name: 'status', value: '요청'},
                            {name: 'originUrl', value: base_url +'sub01/' + link},
                            {name: 'startDate', value: new Date(giganArray[0])},
                            {name: 'endDate', value: (giganArray[2] != '') ? new Date(giganArray[2]) : null},
                            {name: 'imageUrl', value: mainImage.replace('../', base_url)},
                            {name: 'urlLink', value: site},
                            {name: 'contact', value: contact},
                            {name: 'openingHour', value: openingHour},
                            {name: 'address', value: address},
                            {name: 'name', value: position.split('&nbsp;')[0]},
                            {name: 'source', value: 'arthub'},
                            {name: 'htmlContents', value: htmlContents.replace(/\/admin\//g, 'http://arthub.co.kr/admin/'), excludeFromIndexes: true}
                        ]
                        callback2(showArray)
                    })
                }

            })
            
        })
    
    })
}
