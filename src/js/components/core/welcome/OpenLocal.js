const React = require('react');

const Dropzone = require('react-dropzone');

const remote = window.electron.remote;
const {dialog} = remote;


const style = {
                dropzone: {
                  active: {
                    border: '2px solid #727272'
                  },
                  text: {
                    borderRadius: '10px',
                    marginTop: '10px',
                    backgroundColor: '#ffffff',
                    color: '#34495e',
                    fontSize: '30px',
                    height: '50px',
                    verticalAlign: 'middle',
                    width: '100%'
                  },
                  main: {
                    width: '100%',
                    color: '#ffffff',
                    height: '200px',
                    fontSize: '25px'
                  },
                  inner: {
                    fontSize: '15px'
                  }
                }
              }

const OpenLocal = React.createClass({
  getInitialState: function() {
    return {
      filePath: ''
    }
  },
  onDrop: function(files) {
    var _this = this;
    if (files !== undefined) {
      _this.setState({filePath: files[0].path});
      _this.props.sendFilePath(files[0].path);
    }
  },
  onClick: function() {
    var _this = this;
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, function(filename) {
      if (filename !== undefined) {
        _this.setState({filePath: filename[0]});
        _this.props.sendFilePath(filename[0]);
      }
    });
  },

  render: function() {
    return (
    <div onClick = {this.onClick} >
        <Dropzone onDrop = {this.onDrop}
        disableClick={true} multiple={false} style={style.dropzone.main}
        activeStyle={style.dropzone.active}>
            <div style={style.dropzone.text}>
              <center>
                Click To Open A Project
                <span style={style.dropzone.inner}> {this.state.filePath} </span>
              </center>
            </div>
      </Dropzone>
    </div>
  );
  }

});

module.exports = OpenLocal;
