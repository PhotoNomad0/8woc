const fs = require(window.__base + 'node_modules/fs-extra');
const React = require('react');
const Modal = require('react-bootstrap/lib/Modal.js');
const FormGroup = require('react-bootstrap/lib/FormGroup.js');
const ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
const FormControl = require('react-bootstrap/lib/FormControl.js');
const GitApi = require('../GitApi.js');
const Button = require('react-bootstrap/lib/Button.js');
const ButtonGroup = require('react-bootstrap/lib/ButtonGroup.js');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar.js');
const Checkbox = require('react-bootstrap/lib/Checkbox.js');
const CoreStore = require('../../../stores/CoreStore.js');
const CheckStore = require('../../../stores/CheckStore');
const CoreActions = require('../../../actions/CoreActions.js');
const {dialog} = window.electron.remote;
const FileModule= require('../FileModule');
const ENTER = 13;
const api = window.ModuleApi;
const booksOfBible = require('../booksOfBible');
const TargetLanguage = require('../UploadModal');
const SelectChecks = require('./SelectChecks');
const path = require('path');
const CheckDataGrabber = require('./CheckDataGrabber');
const utils = require('../../../utils');
const AlertModal = require('../AlertModal');
const Access = require('../AccessProject.js');

const INVALID_PROJECT = 'This does not appear to be a translation studio project';
const DEFAULT_ERROR = 'Error';

const ProjectModal = React.createClass({
  params: {
    originalLanguagePath: window.__base + "data/ulgb"
  },

  getInitialState: function() {
    return {
      projectName:"",
      showModal: false,
      modalTitle:"Create Project",
      controlLabelTitle:"Name",
      placeHolderText:"Enter name of project",
      doneText:"Create",
      loadedChecks:[],
      currentChecks:[],
      modalValue:"Languages",
      backButton:'hidden',
      FetchDataArray:[]     //FetchDataArray of checkmodule
    };
  },

  componentWillMount: function() {
    CoreStore.addChangeListener(this.showCreateProject);      //action to show create project modal
  },
  showCreateProject: function(input) {
    var modal = CoreStore.getShowProjectModal()
    if (input) {
      modal = input;
      CoreStore.projectModalVisibility = input;
    }
    if(modal === "Check") {
      this.setState({
        showModal: true,
        modalValue: modal
      });
    } else if (modal === 'Languages') {
      this.setState({
        showModal: true,
        modalValue: modal,
        modalTitle: '',
        doneText: 'Check'
      });
    }
    else if (modal === "") {
      this.setState({
        showModal: false
      });
    }
  },

  hideModal: function() {
    this.getProjectStatus((result) => {
      if(result) {
        this.close();
      }
      });
    },

  close: function() {
    //CheckStore.getNameSpaces();
    CoreStore.projectModalVisibility = "";
    this.setState({
      showModal: false,
      FetchDataArray: []
    });
  },

  getProjectStatus: function(doneCallback) {
    var projectStatus = CoreStore.projectModalVisibility;
    var selectedModudles = this.state.FetchDataArray;
    if (projectStatus != "Languages" || (Object.keys(selectedModudles) == [] && projectStatus == 'Check')) {
      	var Alert = {
      		title: "You are currently making a project",
      		content: "Are you sure you want to cancel?",
      		leftButtonText: "No",
      		rightButtonText: "Yes"
      	}
      api.createAlert(Alert, function(result){
      	if(result == 'Yes') {
          doneCallback(true);
      	}
      });
    } else {
      doneCallback(true);
    }
  },
  makePathForChecks: function(check) {
    if (!check || check == '') {
      return;
    }
    var path = 'modules/' + check;
    return path;
  },

  onClick: function () {
    var tempFetchDataArray = [];      //tempFetchDataArray to push checkmodule paths onto
    if (this.state.modalValue == "Check") {
      for (var element in this.state.FetchDataArray) {
        var pathOfCheck = this.makePathForChecks(this.state.FetchDataArray[element]);
        if (pathOfCheck) {
          tempFetchDataArray.push([this.state.FetchDataArray[element], pathOfCheck]);
        }
      }
      this.close();
      var _this = this;
      var manifestLocation = path.join(this.params.targetLanguagePath, 'manifest.json');
      fs.readJson(manifestLocation, function(err, parsedManifest){
        if (parsedManifest && parsedManifest.project && parsedManifest.project.name) {
              var bookTitle = parsedManifest.project.name.split(' ');
              var bookName = _this.getBookAbbr(parsedManifest.project.name);
              _this.setBookName(bookName);
              let bookFileName = bookTitle.join('') + '.json';
              var saveLocation = _this.params.targetLanguagePath;
              localStorage.setItem('showTutorial', false);
              localStorage.setItem('lastProject', saveLocation);
              var user = CoreStore.getLoggedInUser();
              var username;
              if (user) {
                username = user.username;
              }
              var projectData = {
                user: [{username: username}],
                checkLocations: [],
                saveLocation: saveLocation,
                repo: _this.params.repo
              }
              api.putDataInCommon('saveLocation', saveLocation);
              CheckDataGrabber.saveManifest(saveLocation, projectData, parsedManifest);
              if (tempFetchDataArray.length > 0) {
                _this.clearOldData();
                CheckDataGrabber.getFetchData(tempFetchDataArray, _this.params);

              }
        } else {
          dialog.showErrorBox(DEFAULT_ERROR, INVALID_PROJECT);
        }
      });
  }
    else if (this.state.modalValue === 'Languages') {
      var _this = this;
      try {
        var manifestLocation = path.join(this.params.targetLanguagePath, 'manifest.json');
        fs.readJson(manifestLocation, function(err, parsedManifest){
          if (parsedManifest && parsedManifest.generator && parsedManifest.generator.name === 'ts-desktop') {
              var tcManifestLocation = path.join(_this.params.targetLanguagePath, 'tc-manifest.json');
              fs.readJson(tcManifestLocation, function(err, data) {
                if (err || !_this.isLocal) {
                  CoreActions.showCreateProject("Check");
                } else {
                  Access.loadFromFilePath(_this.params.targetLanguagePath);
                  _this.close();
                }
              });
          } else {
              dialog.showErrorBox(DEFAULT_ERROR, INVALID_PROJECT);
          }
        });
      } catch(error) {
        dialog.showErrorBox(DEFAULT_ERROR, INVALID_PROJECT);
      }
    }
  },

  clearOldData: function(){
    var manifest = api.getDataFromCommon('tcManifest');
    CoreActions.newProject();
    CheckStore.WIPE_ALL_DATA();
    api.modules = {};
    this.setSaveLocation(this.saveLocation);
    api.putDataInCommon('tcManifest', manifest);
  },

  getBookAbbr: function(book) {
    for (var bookAbbr in booksOfBible) {
      if (book.toLowerCase() == booksOfBible[bookAbbr].toLowerCase() || book.toLowerCase() == bookAbbr) {
        return bookAbbr;
      }
    }
    return null;
  },

  setSaveLocation: function(data) {
    this.saveLocation = data;
    if (CheckStore.storeData.common != undefined){
      api.putDataInCommon('saveLocation', data);
    } else {
      CheckStore.storeData['common'] = {};
      api.putDataInCommon('saveLocation', data);
    }
  },

  setTargetLanguageFilePath: function(path, link, local) {
    this.isLocal = local;
    this.saveLocation = path;
    this.params.targetLanguagePath = path;
    this.params.repo = link;
    this.onClick();
  },
  setBookName: function(abbr) {
    this.params.bookAbbr = abbr;
  },
  changeModalBody: function(modalBody) {
    if (modalBody == "Check") {
      return (<SelectChecks currentChecks={this.state.currentChecks} ref={"SelectChecks"} loadedChecks={this.state.loadedChecks} FetchDataArray={this.state.FetchDataArray}/>);
    } else if (modalBody === 'Languages') {
      return (<TargetLanguage ref={"TargetLanguage"} setTargetLanguageFilePath={this.setTargetLanguageFilePath} />);
    }
  },

  render: function() {
    return (
      <div>
      <Modal show={this.state.showModal} onHide={this.hideModal}>
      {this.changeModalBody(this.state.modalValue)}
      <Modal.Footer>
      <ButtonToolbar>
      <Button bsSize="xsmall" style={{visibility: this.state.backButton}}>Back</Button>
      <Button type="button" onClick={this.onClick} style={{position:'fixed', right: 15, bottom:10}}>{this.state.doneText}</Button>
      </ButtonToolbar>
      </Modal.Footer>
      </Modal>
      </div>
    )}
  });

  module.exports = ProjectModal;
