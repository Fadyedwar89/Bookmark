var nameInput = document.getElementById("SiteName");
var urlInput = document.getElementById("SiteURL");
var error = document.getElementById("error");
var iconX = document.querySelector("i.cursor-pointer");
var btn = document.querySelector("button");
var inputData = [];
var container = ``;

if (localStorage.getItem("urlData") != null) {
  inputData = JSON.parse(localStorage.getItem("urlData"));
  container = showAllData(inputData);
}

btn.addEventListener("click", function () {
  var urlData = {
    name: nameInput.value,
    url: urlInput.value,
  };

  if (
    nameInput.classList.contains("is-valid") &&
    urlInput.classList.contains("is-valid")
  ) {
    inputData.push(urlData);
    localStorage.setItem("urlData", JSON.stringify(inputData));
    showlastInput();
    clearData();
    nameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
  } else {
    error.classList.replace("d-none", "position-absolute");
  }
});

function clearData() {
  var urlData = {
    name: (nameInput.value = null),
    url: (urlInput.value = null),
  };
}

function showAllData(arr) {
  var container = ``;
  for (let i = 0; i < arr.length; i++) {
    container += `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td>
            <button onclick=" visitUrl(${i});" type="button" class=" d-block mx-auto btn btn-visit">
             <i class="fa-solid fa-eye pe-2"></i> Visit</button>
        </td>
        <td>
            <button onclick=" removeDada(${i});" type="button" class=" d-block mx-auto btn btn-delete">
              <i class="fa-solid fa-trash-can pe-2"></i>  Delete</button>
        </td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = container;
  return container;
}

function showlastInput() {
  var lastIndex = inputData.length - 1;
  container += `<tr>
        <td>${inputData.length}</td>
        <td>${inputData[lastIndex].name}</td>
        <td>
            <button onclick=" visitUrl(${lastIndex});" type="button" class=" d-block mx-auto btn btn-visit">
             <i class="fa-solid fa-eye pe-2"></i> Visit</button>
        </td>
        <td>
            <button onclick=" removeDada(${lastIndex});" type="button"  class=" d-block mx-auto btn btn-delete">
              <i class="fa-solid fa-trash-can pe-2"></i>  Delete</button>
        </td>
    </tr>`;
  document.getElementById("tableBody").innerHTML = container;
}

function removeDada(index) {
  inputData.splice(index, 1);
  localStorage.setItem("urlData", JSON.stringify(inputData));
  container = showAllData(inputData);
}

function visitUrl(index) {
  if (/^(https?:\/\/)/.test(inputData[index].url)) {
    open(`${inputData[index].url}`);
  } else {
    open(`https://${inputData[index].url}`);
  }
}

function validationInput(element) {
  var regex = {
    SiteName: /^\w{3,}$/,
    SiteURL: /^(https?:\/\/)?(www\.)?\w+\.\w{2,}\/?(\/\w+)*$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

error.addEventListener("click", function (e) {
  if (e.target.classList.contains("bg-layer")) {
    error.classList.replace("position-absolute", "d-none");
  }
});

iconX.addEventListener("click", function (e) {
  error.classList.replace("position-absolute", "d-none");
});

window.onkeydown = function (event) {
  if (event.keyCode == 27) {
    error.classList.replace("position-absolute", "d-none");
  }
};
