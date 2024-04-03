const lightBtn = document.getElementById("lightMode");
const darkBtn = document.getElementById("darkMode");
const calcScreenMain = document.querySelector(".calc-screen__main");
const calcScreenTop = document.querySelector(".calc-screen__top");
const calcScreenLarge = document.querySelector(".calc-screen__large");
const numberpadWrapper = document.querySelector(".numberpad-wrapper");
const currentTime = document.querySelector("#currentTime");

// Theme
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefer-color-scheme: dark)").matches;

// Toggle icons
const iconToggle = () => {
  lightBtn.classList.toggle("hidden");
  darkBtn.classList.toggle("hidden");
};

// Initial theme check
const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    darkBtn.classList.toggle("hidden");
  } else {
    lightBtn.classList.toggle("hidden");
  }
};
themeCheck();

// Theme switch
const themeSwitch = () => {
  document.documentElement.classList.toggle("dark");
  const theme = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  localStorage.setItem("theme", theme);
  iconToggle();
};
lightBtn.addEventListener("click", themeSwitch);
darkBtn.addEventListener("click", themeSwitch);

// Numberpad event listener
numberpadWrapper.addEventListener("click", (e) => {
  const targetClassList = e.target.classList;
  const initialNumber = calcScreenMain.textContent;
  if (targetClassList.contains("numbers-btn")) {
    if (
      (initialNumber.includes(".") && e.target.textContent == ".") |
      (initialNumber.length > 11)
    ) {
      calcScreenMain.textContent = initialNumber;
    } else if (initialNumber === "0")
      calcScreenMain.textContent = e.target.textContent;
    else calcScreenMain.textContent = initialNumber + e.target.textContent;
  } else if (targetClassList.contains("clear")) {
    calcScreenMain.textContent = "0";
    calcScreenTop.textContent = "";
    calcScreenLarge.textContent = "";
  } else if (
    targetClassList.contains("percent") ||
    targetClassList.contains("fa-percent")
  ) {
    if (
      !calcScreenMain.textContent.includes("%") &&
      calcScreenMain.textContent !== "0"
    ) {
      calcScreenTop.textContent += `${initialNumber} % `;
      calcScreenMain.textContent = "0";
    }
  } else if (
    targetClassList.contains("fa-delete-left") ||
    targetClassList.contains("edit")
  ) {
    if (initialNumber.length > 1 && initialNumber !== "0") {
      calcScreenMain.textContent = initialNumber.slice(0, -1);
    } else {
      calcScreenMain.textContent = "0";
    }
  } else if (
    targetClassList.contains("divide") ||
    targetClassList.contains("fa-divide")
  ) {
    calcScreenTop.textContent += `${initialNumber} / `;
    calcScreenMain.textContent = "0";
  } else if (
    targetClassList.contains("multiply") ||
    targetClassList.contains("fa-xmark")
  ) {
    calcScreenTop.textContent += `${initialNumber} * `;
    calcScreenMain.textContent = "0";
  } else if (
    targetClassList.contains("minus") ||
    targetClassList.contains("fa-minus")
  ) {
    calcScreenTop.textContent += `${initialNumber} - `;
    calcScreenMain.textContent = "0";
  } else if (
    targetClassList.contains("plus") ||
    targetClassList.contains("fa-plus")
  ) {
    calcScreenTop.textContent += `${initialNumber} + `;
    calcScreenMain.textContent = "0";
  } else if (
    targetClassList.contains("equal") ||
    targetClassList.contains("fa-equals")
  ) {
    if (calcScreenTop.textContent.includes("%")) {
      const perIndex = calcScreenTop.textContent.indexOf("%");
      if (calcScreenTop.textContent.length > 10) {
        calcScreenLarge.textContent = eval(
          `${calcScreenTop.textContent.slice(
            0,
            perIndex
          )} * ${initialNumber} / 100`
        );
        calcScreenTop.textContent = "";
        calcScreenMain.textContent = "";
      } else {
        calcScreenMain.textContent = eval(
          `${calcScreenTop.textContent.slice(
            0,
            perIndex
          )} * ${initialNumber} / 100`
        );
        calcScreenTop.textContent = "";
      }
    } else {
      if (calcScreenTop.textContent.length > 10) {
        calcScreenLarge.textContent = eval(
          `${calcScreenTop.textContent}${initialNumber}`
        );
        calcScreenTop.textContent = "";
        calcScreenMain.textContent = "";
      } else {
        calcScreenMain.textContent = eval(
          `${calcScreenTop.textContent}${initialNumber}`
        );
        calcScreenTop.textContent = "";
      }
    }
  }
});

// Time settings
function setData() {
  const now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  currentTime.textContent = `${hours}:${minutes}`;
}
setInterval(setData, 1000); // Refresh time every second
