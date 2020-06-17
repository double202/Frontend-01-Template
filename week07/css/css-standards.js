// http://w3.org/TR/?tag=css

let list = document.getElementById("container").children;

let result = [];

for (let li of list) {
    if (li.getAttribute("data-tag").match(/css/))
        result.push({
            name: li.children[1].children[0].textContent,
            url: li.children[1].children[0].href
        })
}

console.log(JSON.stringify(result, null, "    "));

