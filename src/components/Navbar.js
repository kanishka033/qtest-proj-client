import "../App.css";

const Navbar =() => {
  
    const iconClick = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
   
  return (
    <div>
      
      <div className="topnav" id="myTopnav">
     <a href="#logo" className="logo" id="Qtest">Qtest</a>
     <a href="#Responses" className="link active">Responses <i className="fas fa-bell"></i></a> 
     <a href="#Build Test" className="link">Create Test <i className="fa fa-plus"></i> </a>
   
        <div className="topnav-right">
     <a href="#login" className="btn-signin">Login<i className="fa fa-fw fa-user"></i></a></div>
  
    <a href="#" className="icon" onClick={iconClick}>
      <i className="fa fa-bars"> </i>
    </a>
  </div>
  
   </div>
  )
  }

  export default Navbar;
  
  