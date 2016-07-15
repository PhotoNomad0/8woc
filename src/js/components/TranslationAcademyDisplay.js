const React = require('react');
const Markdown = require('react-remarkable');

const Well = require('react-bootstrap/lib/Well.js');
const Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
const Button = require('react-bootstrap/lib/Button.js');

const TranslationAcademyScraper = require('./TranslationAcademyScraper.js');
const EventEmitter = require('events').EventEmitter;

const AbstractCheckModule = require('../AbstractCheckModule');

const TranslationAcademyDisplay extends AbstractCheckModule{
// this makes fields start off empty so they can be filled eventually
  sectionList: null,

  currentMarkdown: null,

  tAHtmlScraper: null,
// gets the initial states of the fields so that when they are toggled they can be displayed
  constructor(){
    super();

    this.getAndDisplaySection = this.getAndDisplaySection.bind(this);
    this.updateText = this.updateText.bind(this);
    this.displaySection = this.displaySection.bind(this);
    this.setCurrentMarkdown = this.setCurrentMarkdown.bind(this);
  }

  componentWillMount() {
    this.getAndDisplaySection();
    this.setState({
      toggleDisplay: false,
      currentSection: null,
      markdownToggle: false,
      value: ''
    });
  }

  getAndDisplaySection() {
    var _this = this;
// create new instance of the scraper
/**
* This callback will fire once the data has been retrieved from the internet
* 'data' contains the list of words
*/
    function setList(data) {
// set our list to the data that was retrieved, when done it calls display section
      _this.sectionList = data;
// everytime the state changes React re-renders the component so the display changes
      _this.setState({

        toggleDisplay: !_this.state.toggleDisplay
      });
// passing display section as a prop
      _this.displaySection(_this.props.sectionName);
    }
// creates a new instance because its a class and classes need objects
    this.tAHtmlScraper = new TranslationAcademyScraper();
// Get the list of sections in tA , undefined because i want the default url, when done it calls funtion set list
    this.tAHtmlScraper.getTranslationAcademySectionList(undefined, setList);
  }
/**
* Sets the attribute 'currentMarkdown' from the file returned from
* the htmlscraper
*/
  displaySection(sectionName) {
    this.setState({
      currentSection: sectionName
    });
    var rawMarkdown = null;
    var _this = this;
    this.tAHtmlScraper.getSection(sectionName + '.md',
      function(file) { // assign callback
        rawMarkdown = file;
        var markDownToDisplay = rawMarkdown.split("---")[2];
        _this.setCurrentMarkdown(
          <Markdown source={markDownToDisplay}/>
        );
      }
    );
  }

  setCurrentMarkdown(markdownComponent) {
    this.currentMarkdown = markdownComponent;
    this.setState({
      markdownToggle: !this.state.markdownToggle
    });
    this.forceUpdate();
  }

  
}

module.exports = TranslationAcademyDisplay;
