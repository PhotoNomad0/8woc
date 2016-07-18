const React = require('react');
const Markdown = require('react-remarkable');

const Well = require('react-bootstrap/lib/Well.js');
const Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
const Button = require('react-bootstrap/lib/Button.js');

const TranslationAcademyScraper = require('./TranslationAcademyScraper.js');
const EventEmitter = require('events').EventEmitter;

const AbstractCheckModule = require('../components/modules/AbstractCheckModule');

class TranslationAcademyDisplay extends AbstractCheckModule{

  constructor(){
    super();

    this.sectionList = null;
    this.currentMarkdown = null;
    this.tAHtmlScraper = null;

    this.getAndDisplaySection = this.getAndDisplaySection.bind(this);
    this.displaySection = this.displaySection.bind(this);
    this.setCurrentMarkdown = this.setCurrentMarkdown.bind(this);
  }

  componentWillMount() {
    this.getAndDisplaySection();
    this.setState({
      tAScraper: null;
    });
  }

  getAndDisplaySection() {
// creates a new instance because its a class and classes need objects
    tAHtmlScraper = new TranslationAcademyScraper();
// Get the list of sections in tA , undefined because i want the default url, when done it calls funtion set list
    this.tAHtmlScraper.getTranslationAcademySectionList(undefined, (sectionList) => {this.displaySection()});
  }
/**
* Sets the attribute 'currentMarkdown' from the file returned from
* the htmlscraper
*/
  displaySection(sectionName) {
    var markdown;
    this.tAHtmlScraper.getSection(sectionName + '.md',
      function(file) {
          markdown = <Markdown source={file.split("---")[2]}/>
      }
    );
    return markdown;
  }

  render() {
    var _this = this;
    return (
      <Well>
        <div style={{overflowY: "scroll"}}>
          <h1> Translation Academy</h1>
          {this.displaySection(this.props.sectionName)}
        </div>
      </Well>
    );
  }

}

module.exports = TranslationAcademyDisplay;
