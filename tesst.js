/**
 * Created by User on 22.06.2017.
 */
const rp = require('request-promise');
const fs = require('fs');
const cheerio = require('cheerio');

const limit = 5;


function getUrls (limit) {
    return new Promise((resolve, reject) => {
        return rp({
            url : 'https://www.057.ua/rss',
            encoding: 'utf-8'
        })
            .then(body => {
                let inkArr = [];
                let $ = cheerio.load(body, {xmlMode: true});
                let items = $('item');
                if (items.length < limit) {
                    reject('rss dose not consist this much news. News limit is - ' + items.length);
                }
                else {
                    items.each((i, elem) => {
                        inkArr.push($(elem).children('link').text());
                        if (i === limit - 1) {
                            resolve(inkArr);
                            return false;

                        }
                    });
                }
            })
    })
}

function parceNewByLink (link) {
    return new Promise((resolve, reject) => {
        return rp({
            url : link,
            encoding: 'utf-8'
        })
            .then(body => {
                let $ = cheerio.load(body);
                let obj = {
                    title: $('.text_header').text(),
                    link: link,
                    description: $('.static').html(),

                };
                resolve (obj);
            })
    })
}

getUrls(limit)
    .then((linkArr => {
        return Promise.all(linkArr.map(elem => {
            return parceNewByLink(elem);
        }))
    }))
    .then(resultArr => console.log(resultArr))
    .catch(err => console.log(err));