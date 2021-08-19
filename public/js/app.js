console.log("Client side javascript file is loaded!");

// fetch("http://localhost:3000/weather?address=boston")
//   .then((res) => res.json())
//   .then((result) => {
//     if (result.error) {
//       console.log("Error:- " + result.error);
//     } else {
//       console.log("Location:- " + result.location);
//       console.log("Forecast:- " + result.forecast);
//     }
//   });

const weatherForm = document.querySelector("form");
const searchValue = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

//msg1.textContent = "Test";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log(searchValue.value);
  msg1.textContent = "loading...";
  onClick();
});
const onClick = () => {
  fetch(`http://localhost:3000/weather?address=${searchValue.value}`)
    .then((res) => res.json())
    .then((result) => {
      if (result.message) {
        //console.log("Error:- " + result.error);
        msg1.textContent = result.message;
      } else {
        // console.log("Location:- " + result.location);
        // console.log("Forecast:- " + result.forecast);
        msg1.textContent = result.location;
        msg2.textContent = result.forecast;
      }
    });
};
