const APIKey = "u21LuqswDXSulw7pL8EiYXLn7Vz2a3Il";
        const button = document.getElementById('search');
        const input = document.getElementById('Enter-data');
         const message = document.getElementById('message');
        const container = document.getElementById('container');

      button.onclick = searchGifs;
      input.addEventListener("keydown", function (e) 
      {
        if (e.key === "Enter") searchGifs();
      });

      function searchGifs() {
      const query = input.value.trim();
    if (!query) {
        message.textContent = "Type something to search.";
        return;
    }

    const url = "https://api.giphy.com/v1/gifs/search" + "?q=" + encodeURIComponent(query)+ "&api_key=" + APIKey+ "&limit=12";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                displayGifs(response.data);
            } else {
                message.textContent = "Error " + xhr.status + ". Check your API key.";
            }
        }
    };

    xhr.send();
}

function displayGifs(gifs) {
    container.innerHTML = "";
    if (gifs.length === 0) {
        message.textContent = "No GIFs found. Try another word.";
        return;
    }
    message.textContent = "";

    gifs.forEach(function (gif) {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        container.appendChild(img);
    });
}
   
