//var fs = require('fs');
//var http = require('http');

/*
console.log('running the script...');

function intervalFunc() {
    console.log('new interval');
}

setInterval(intervalFunc, 5000);
*/

const image_files = [
    "shuttle1.html",
    "shuttle2.html",
    "shuttle3.html",
    "shuttle4.html",
    "shuttle5.html"
]

var num = 1;

$(document).ready(function(){
    console.log('running the script...');
    function intervalFunc() {
        
        $.ajax({url: image_files[num], success: function(result){
            $("#nav-img-div").html(result);
        }})

        if (num == 4) {
            num = 0;
        }
        else {
            num = num + 1;
        }
    }

    setInterval(intervalFunc, 5000);
});