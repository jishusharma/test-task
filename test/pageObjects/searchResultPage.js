exports.SearchPageResult = SearchPageResult;
const puppeteer = require('puppeteer');
var  BasePage  = require('./basePage.js').BasePage;

function SearchPageResult (page) {

    BasePage.call(this);
    this.page = page;

    this.getArticlesCount = async function(delay) {
        await this.page.waitFor(delay);
        const count = await  this.page.evaluate(() => {
            return document.querySelectorAll('.cnn-search__result--article').length;
        });
        return count;
    }

    this.getEmptyListMessage = async function(delay) {
        await this.page.waitFor(delay);

        const data = await page.evaluate(() => {
            const elem = Array.from(document.querySelectorAll('.cnn-search__no-results > h3'))
            var ar = elem.map(el => el.textContent)
            var message = ar && ar.length > 0 ? ar[0] : "";
            return message;
        });

        return data;
    }

    this.close =  async function() {
        await this.browser.close();
    }
}