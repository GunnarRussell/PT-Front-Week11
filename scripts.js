let s0 = $("#s0");
let s1 = $("#s1");
let s2 = $("#s2");
let s3 = $("#s3");
let s4 = $("#s4");
let s5 = $("#s5");
let s6 = $("#s6");
let s7 = $("#s7");
let s8 = $("#s8");

let square = $(".square");

square.on("click", function()
{
    let thisButton = square.index($(this));
    console.log("clicked " + thisButton);
});