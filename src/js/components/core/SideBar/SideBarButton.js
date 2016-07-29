
const api = window.ModuleApi;
const React = api.React;
const CoreActions = require('../../../actions/CoreActions.js');
const RB = api.ReactBootstrap;
const {Glyphicon} = RB;
const style = require("./Style");

class SideBarButton extends React.Component{
  constructor(){
    super();
    this.state ={
      hover: false,
    }
  }

  mouseEnter(){
    this.setState({hover: true});
  }

  mouseLeave(){
    this.setState({hover: false});
  }

      render(){
        const linkStyle = this.props.enabled ? (this.state.hover ? style.hover : style.li) : style.disabled;
        const GlyphStyle = this.props.enabled ? (this.state.hover ? style.glyphiconHover : style.glyphicon) : style.disabledGlyph;
        return(
          <div>
            <li style={linkStyle} onClick={this.props.enabled ? this.props.handleButtonClick : () => {}} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
              <Glyphicon glyph={this.props.glyphicon} style={GlyphStyle}/><br/>{this.props.value}</li>
          </div>
        );
      }

}

module.exports = SideBarButton;
