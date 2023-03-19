
function append_json(id, object, n=1) {
    var grid = document.createElement("div");
    grid.className = "container";
    document.getElementById(id).appendChild(grid);
    for (var k in object) {
        var row = document.createElement("div");
        row.className = "row"
        grid.appendChild(row)
        // key
        var key = document.createElement("div")
        key.className = "col-lg-4 col-md-2 col-sm-1"
        key.innerHTML = k
        row.appendChild(key)
        // value
        var value = document.createElement("div")
        value.className = "col-lg-4 col-md-2 col-sm-1"
        row.appendChild(value)
        if (typeof(object[k]) == "object") {
            var nest_id = "nest" + n.toString();
            value.id = nest_id;
            append_json(nest_id, object[k], n=n+1);
        }
        else {
            value.innerHTML = object[k]
        }
    }
}

$.ajax({
    type: "GET",
    url: "lab5data.json",
    success: function(response) {
        
        append_json("data-area", response)
    }
})