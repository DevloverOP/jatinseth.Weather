class UI {
    constructor(){
        this.DATA = new DATA();
      }


  closeForm(e) {
    if (e.target.classList.contains("close")) {
      document.getElementById("select_loc").style.display = "none";
      document.body.style.backgroundColor = "white";
    }
  }

  openForm(e) {
    document.body.style.backgroundColor = "rgba(0,0,0,0.7)";
    document.getElementById("select_loc").style.display = "block";
  }

  //set city

  static setCity(callback) {
    let d = new DATA();
    d.getdata().then((data) => {
      let cities = "";

      data.forEach((nagar) => {
        cities += `<option value=
                "${nagar.location.city}">
                ${nagar.location.city}
                </option>`;
      });
      document.getElementById("city").innerHTML = cities;
      callback(data);
    });
  }
  //set state
  static setState(city, data) {
    let towns = "";
    data.forEach((twn) => {
      if (twn.location.city === city) {
        twn.location.towns.forEach((atown) => {
          towns += `<option value="${atown.name}">
               ${atown.name}
               </option> `;
        });
      }
    });
    document.getElementById("town").innerHTML = towns;
  }
//previous Whether Load
   previousWhether=()=>{
      this.DATA.loadData((data)=>{
      this.getWhether(data[0],data[1]);
   });

  }

  //Select new Location on OK button press
  selectLocation=(eve)=>{

    let a = document.getElementById("city").value;
    let b = document.getElementById("town").value;
    this.getWhether(a,b);
    this.DATA.storeData(a,b);
    this.closeForm(eve);
  }

//getting whether Object
  getWhether(selectedcity=" ",selectedtown=" "){
    
      this.DATA.getdata().then((data)=>{
      data.forEach((areas,index)=>{
        if(areas.location.city===selectedcity){
          data[index].location.towns.forEach((town)=>{
          if(town.name===selectedtown){
            //sending whether object of selected city and town
          this.setWhetherDetails(town.whether,selectedcity,selectedtown);
          }})
          }})
    });
}
//setting whether details
setWhetherDetails(whether,selectedcity,selectedtown){


  document.getElementById("loc").textContent=`${selectedcity}/${selectedtown}`;
 
    document.getElementById("temp").innerText= whether.celcius;
    let val=document.getElementById('tab').children;
    val[0].innerText=`Fehranite: ${whether.Fehranite}`;
    val[1].innerText=`Humidity: ${whether.humidity}`;
    val[2].innerText=`Wind: ${whether.wind}`;
    document.getElementById('desc').innerHTML=`
       ${whether.Description}`;
    document.querySelector("#image").setAttribute(`style`,`background-image: url('./whether/icons/${whether.Description}.png')`);

}

}

class DATA {
  // fetch data
  async getdata() {
    let req = await fetch("./database.json");
    let res = await req.json();
    return res;
  }

 storeData(city,town){
let place=[];
localStorage.clear();
if(localStorage.getItem('places')===null){
  place.push(city);
  place.push(town);
  localStorage.setItem(`places`,JSON.stringify(place));
}
}
loadData(callback){
    if(localStorage.getItem('places')!==null){ 
    callback(JSON.parse(localStorage.getItem('places')));
    } }

}
//background color according to time
const d = new Date(Date.now()).getHours();
if(d>=07 && d<=15){
  document.body.style.background=`linear-gradient(to bottom,rgb(202, 222, 243),rgba(117, 175, 230, 0.855),rgba(194, 219, 226, 0.855))`;
}else if(d>15 && d<=19){
  document.body.style.background=`linear-gradient(to bottom,rgb(34, 102, 174),rgb(244, 253, 167))`;
}else if((d>=20 && d<=23) || (d>=00 && d<=06)  ){
  document.body.style.background=`linear-gradient(to bottom,rgb(0, 17, 34),rgba(0, 0, 0, 0.856))`;
}








