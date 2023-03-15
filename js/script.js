const btnSteps = document.querySelectorAll(".btn--circle");
const slides = document.querySelectorAll(".main__slide");
const btnNextSteps = document.querySelectorAll(".btn--nextStep");
const btnPrevSteps = document.querySelectorAll(".btn--prevStep");

const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPhone = document.querySelector("#phone");

const requriedFields = document.querySelectorAll(".required");

// const priceAcarde = document.querySelector("#price--1");
// const priceAdvanced = document.querySelector("#price--2");
// const pricePro = document.querySelector("#price--3");
const priceTagsPlan = document.querySelectorAll(".price-tag--plan");
const priceTagsAddon = document.querySelectorAll(".price-tag--addon");

const btnSwitch = document.querySelector("#btnToggle");
const radioBtns = document.querySelectorAll('input[name="subscriptionType"]');

const addons = document.querySelectorAll('input[name="addonCheckbox"]');

const summaryPlan = document.querySelector("#summary--Plan");
const summaryPlanPrice = document.querySelector("#summary--Plan-Price");
const summaryFinalPrice = document.querySelector("#summary--final");
const addonHTML = document.querySelector("#addonHtml");

const linkChangePlan = document.querySelector("#changePlan");
// Default Values
let currentStep = 1;
let subscriptionPeriod = "Monthly";
let selectedAddons = [];
let finalPrice = 0;

// Arrays für die jeweiligen Preise
const pricePlanMonthly = [9, 12, 15];
const pricePlanYearly = [90, 120, 150];

const priceAddonMonthly = [1, 2, 2];
const priceAddonYearly = [10, 20, 20];

class Data {
  constructor(name, email, phone, plan, payment, addons) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.plan = plan;
    this.payment = payment;
    this.addons = addons;
  }
}

// const addons = {
//   addon1: {
//     name: "More Storage",
//     price: 2,
//   },
// };

let newInfo = new Data();

// Funktionalität der ersten Slide
const confirmForm = function () {
  btnNextSteps[0].addEventListener("click", function () {
    // der Eventlistener und die Funktion können nochmal getauscht werden. So herum ergibt es weniger Sinn!
    if (!inputName.value) {
      requriedFields[0].style.opacity = "100";
    } else requriedFields[0].style.opacity = "0";
    if (!inputEmail.value) {
      requriedFields[1].style.opacity = "100";
    } else requriedFields[1].style.opacity = "0";
    if (!inputPhone.value) {
      requriedFields[2].style.opacity = "100";
    } else requriedFields[2].style.opacity = "0";
    // Mit forEach durchlaufen lassen ist hier deutlich Sinnvoller und übersichtlicher!

    newInfo.name = inputName.value;
    newInfo.email = inputEmail.value;
    newInfo.phone = inputPhone.value;
    if (!inputName.value || !inputEmail.value || !inputPhone.value) return;

    showNextSlide();
  });
};

// Funktionalität der zweiten Slide
const switchSubscription = function () {
  // Onclick Funktion bei dem entsprechenden Switch
  if (btnToggle.checked) {
    subscriptionPeriod = "Yearly";
  } else subscriptionPeriod = "Monthly";
  changePriceTags();
};

const changePriceTags = function () {
  priceTagsPlan.forEach(function (price, i) {
    if (subscriptionPeriod === "Monthly") {
      price.innerHTML = `$${pricePlanMonthly[i]}/mo`;
      radioBtns[i].value = pricePlanMonthly[i];
    }
    if (subscriptionPeriod === "Yearly") {
      price.innerHTML = `$${pricePlanYearly[i]}/mo`;
      radioBtns[i].value = pricePlanYearly[i];
    }
  });
  priceTagsAddon.forEach(function (price, i) {
    if (subscriptionPeriod === "Monthly") {
      price.innerHTML = `$${priceAddonMonthly[i]}/mo`;
      addons[i].value = priceAddonMonthly[i];
    }
    if (subscriptionPeriod === "Yearly") {
      price.innerHTML = `$${priceAddonYearly[i]}/mo`;
      addons[i].value = priceAddonYearly[i];
    }
  });
};

const confirmPlan = function () {
  radioBtns.forEach((btn) => {
    if (btn.checked) {
      const planName = btn.nextElementSibling
        .querySelector(".plan-name")
        .innerHTML.trim();
      newInfo.plan = [planName, subscriptionPeriod];
      newInfo.payment = Number(btn.value);

      console.log(newInfo.plan);
    }
  });
  // Show next Slide
  showNextSlide();
};

// Funktionalität der dritten Slide

const confirmAddon = function () {
  // Addons Array löschen, falls die Eingabe später nochmal geändert werden soll.
  selectedAddons = [];
  finalPrice = 0;
  addons.forEach((addon) => {
    // Welche Addons sind ausgewählt?
    if (addon.checked) {
      const addonName = addon.nextElementSibling
        .querySelector("h3")
        .innerHTML.trim();
      const addonPrice = addon.value;
      // Speicher die Ausgewählten Addons (Name + Preis) als Array in einem Array
      finalPrice += Number(addonPrice);
      selectedAddons.push([addonName, addonPrice]);
    }
  });
  // Speicher das Addons Array
  newInfo.addons = selectedAddons;

  showNextSlide();

  // vierte Slide aktualisieren
  renderSummary();
};

// Funktionalität der vierten Slide

const renderSummary = function () {
  // Update Plan
  summaryPlan.innerHTML = `${newInfo.plan[0]} (${newInfo.plan[1]})`;
  summaryPlanPrice.innerHTML = `$${newInfo.payment}`;

  // Gesamtwert erhalten
  finalPrice += newInfo.payment;
  summaryFinalPrice.querySelector("p").innerHTML = `Total (per ${
    subscriptionPeriod === "Monthly" ? "Month" : "Year"
  })`;
  summaryFinalPrice.querySelector("span").innerHTML = `$${finalPrice}`;

  // Addons Html Code Rendern

  // Html aus dem Array erstellen
  const addonsArr = newInfo.addons;
  let completeHtml = "";

  addonsArr.forEach((addon, i) => {
    if (i < 1) {
      completeHtml = '<div class="border-t-[1px] border-grey-light"></div>';
    }
    // Der Divider Fehlt noch: if i === 0 then completeHtml = '<div class="border-t-[1px] border-grey-light"></div>';
    const htmlTemplate = `<div class="flex justify-between items-center">
    <p class="text-grey-cool text-sm">${addonsArr[i][0]}</p>
    <span class="text-sm tracking-wide">+$${addonsArr[i][1]}</span>
  </div>`;
    completeHtml += htmlTemplate;
  });

  // ${subscriptionPeriod === "Monthly" ? "mo" : "yr"}
  // Fand ich unnötig und dementsprechend weggelassen!

  // das Array muss durchlaufen werden und jeweils ein DIV pro Array erzeugen und die richtigen Elemente einsetzen!
  addonHTML.innerHTML = "";
  // innerHTML muss einmal geleert werden, falls die Addons verändert werden. Danach können sie neu gerendert werden.
  addonHTML.insertAdjacentHTML("afterbegin", completeHtml);
};

const goBackToSlide = function (e) {
  e.preventDefault();
  currentStep = 2;
  slides.forEach((slide) => showSlide(slide));
};

// Notwendige Funktionsaufrufe allgemein

changePriceTags();

confirmForm();

// Allgemeine Funktionalität

const hiddenAllSlides = function () {
  // durchläuft alle Slides und gibt Ihnen die Klasse hidden
  slides.forEach((slide) => slide.classList.add("hidden"));
};

const currentStepIcon = function () {
  btnSteps.forEach(function (btn) {
    if (btn.dataset.step == currentStep) {
      btn.classList.add("btn--circle-active");
    } else {
      btn.classList.remove("btn--circle-active");
    }
  });
};

const showNextSlide = function () {
  hiddenAllSlides();
  // Bevor hidden entfernt wird, wird allen Slides Hidden gegeben
  slides[currentStep].classList.remove("hidden");
  currentStep += 1;
  currentStepIcon();
};

// Show prev Slide
const clickPrev = function (btn) {
  btn.addEventListener("click", function () {
    currentStep -= 1;

    slides.forEach((slide) => showSlide(slide));
  });
};

const showSlide = function (slide) {
  if (currentStep == slide.dataset.slide) {
    hiddenAllSlides();
    currentStepIcon();
    // Bevor hidden entfernt wird, wird allen Slides Hidden gegeben
    slide.classList.remove("hidden");
  }
};

// Eventhandlers

btnPrevSteps.forEach((btn) => clickPrev(btn));
btnNextSteps[1].addEventListener("click", confirmPlan);

btnNextSteps[2].addEventListener("click", confirmAddon);

btnNextSteps[3].addEventListener("click", showNextSlide);

linkChangePlan.addEventListener("click", goBackToSlide);

//////////////////////////////////
// Funktionen für erste Testzwecke

const clickStep = function (btn) {
  // Click auf den jeweiligen runden Btn entfernt die "hidden" Class
  // Zum Navigieren für die Testzwecke notwendig
  btn.addEventListener("click", function () {
    currentStep = Number(btn.dataset.step);
    slides.forEach((slide) => showSlide(slide));
  });
};

const clickNext = function (btn) {
  btn.addEventListener("click", function () {
    currentStep += 1;

    slides.forEach((slide) => showSlide(slide));
  });
};

// nur für Testzwecke
// btnSteps.forEach((btn) => clickStep(btn));
