var style = {
  container:{
      backgroundColor: "#222",
      width: "85px",
      height: "100vh",
      marginLeft: "0px",
      display: "inline-block",
      position: "fixed",
      zIndex: "99",
      left: "0px",
      fontSize: "12px",
      overflowY: "scroll",
  },

  ul: {
      margin: "0px",
      padding: "0px",
  },

  li: {
    display: "block",
    textAlign: "center",
    borderBottom: "2px solid #1E1D1F",
    paddingTop: "20px",
    paddingBottom: "20px",
    color: "white",
    WebkitUserSelect: "none"
  },

  glyphicon: {
    fontSize: "25px",
    color: "white",
  },

  glyphiconHover: {
    fontSize: "29px",
    color: "#27E1FC",
  },

  hover: {
    backgroundColor: "#2b2b2b",
    color: "#27E1FC",
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    borderBottom: "2px solid #1E1D1F",
    WebkitUserSelect: "none",
    paddingTop: "18px",
    paddingBottom: "18px"
  },

  logo:{
    height: "60px",
    width: "55px",
    display: "block",
    padding: "5px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5px",
  },

  glyphiconOffline:{
    color: "#FF0000",
    fontSize: "25px",
  },

  glyphiconOnline:{
    color: "#00B233",
    fontSize: "25px",
  },
  disabled: {
    display: "block",
    color: "#a6a6a6",
    textAlign: "center",
    borderBottom: "2px solid #1E1D1F",
    paddingTop: "20px",
    paddingBottom: "20px",
    WebkitUserSelect: "none",
    cursor: "default"
  },
  disabledGlyph: {
    fontSize: "25px",
    color: "#a6a6a6"
  }
};

module.exports = style;
