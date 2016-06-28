class Root extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {};
  }
  render(){
    return(
      <ul>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li class="dropdown">
          <a href="#" class="dropbtn">Dropdown</a>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </li>
      </ul>
  );
}
}

ReactDOM.render(<Root />, document.getElementById('content'));
