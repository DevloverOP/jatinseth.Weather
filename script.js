
const ui = new UI();
const dt = new DATA();

let fetchedData;
 UI.setCity((data)=>{
    fetchedData=data;
    UI.setState(document.getElementById('city').value, data);
});
//console.log(window);
window.addEventListener('load',ui.previousWhether);


//OPen location
document.getElementById("loc").addEventListener("click",ui.openForm);

// setting title attribute On location
document.getElementById("loc").addEventListener('mouseover',(e)=>{
e.target.setAttribute('title','Change Location');
});

//Closing location
document.querySelector('.exit').addEventListener("click", ui.closeForm);

// selecting town
document.getElementById("city").addEventListener('click',(e)=>{
 UI.setState((e.target.value),fetchedData);
});

//selecting new location
document.getElementById("ok").addEventListener("click",ui.selectLocation);

