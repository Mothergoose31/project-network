
   export const utilToggerAllButtonOnOff = function(state){
    if (state == 0){
      let buttons = document.getElementsByTagName("button");
      let i;
      for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("disabled");
        console.log(buttons[i]);
      }
    }
    else if (state == 1){
      let buttons = document.getElementsByTagName("button");
      let i;
      for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("disabled");
        console.log(buttons[i]);
      }
    }
  }