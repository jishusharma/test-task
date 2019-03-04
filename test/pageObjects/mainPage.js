exports.MainPage = MainPage;
var  BasePage  = require('./basePage.js').BasePage;
var  SearchPageResult  = require('./searchResultPage.js').SearchPageResult;
const puppeteer = require('puppeteer');

function MainPage () {
    BasePage.call(this);
    this.typeToSearchInput = async function(text) {
        await this.page.focus('.search__input-field')
        await this.page.keyboard.type(text)
    }

    this.showSearchInput =  async function() {
        var btn = await this.page.$('#search-button')
        await btn.click();
    }
    this.proceedToResultPage = async function() {
        btn = await this.page.$('.search__submit-button')
        await btn.click();
        return await new SearchPageResult(this.page);
    }

}
