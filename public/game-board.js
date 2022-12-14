debugger;
var socket = io();

function refreshPage()
{
    window.location.reload();
}

function mark()
{
    const cross = document.createElement("img");
    cross.setAttribute("src", "cross.png");
    cross.setAttribute("id", "img-cross");
    document.getElementById("btn-first").appendChild(cross); // but for all boxes + for O
    document.getElementById("img-cross").width = "100";
    document.getElementById("img-cross").height = "100";
    console.log(cross);
}