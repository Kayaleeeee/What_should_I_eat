import React, { Component } from "react";

export default class Restaurantlist extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleEvent = this.handleEvent.bind(this);
  }

  render() {
    const axios = require("axios");
    const cheerio = require("cheerio-react");
    const url = "https://mrxx.tistory.com/category";

    async function getHTML() {
      try {
        return await axios.get(url);
      } catch (error) {
        console.log(error);
      }
    }

    getHTML()
      .then((html) => {
        var titleList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div#contents").children("div.index-list-content");

        $bodyList.each(function (i, elem) {
          titleList[i] = {
            title: $(this).find(" div.index-inner-right a h3.tit_post").text(),
          };
        });

        const data = titleList;
        return data;
      })
      .then((res) => console.log(res));

    return <div>heelo</div>;
  }
}
