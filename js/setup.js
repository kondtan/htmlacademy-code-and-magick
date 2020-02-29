'use strict';

var WIZARDS_AMOUNT = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLORS_ARRAY = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_ARRAY = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS_ARRAY = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY = 27;
var ENTER_KEY = 13;
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var setupWizardEyes = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
var setupWizardCoat = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');

var wizardCoatClickCounter = 0;
var wizardEyesClickCounter = 0;
var wizardFireballClickCounter = 0;

document.querySelector('.setup-similar').classList.remove('hidden');

// генерируем случайное число
var getRandomInteger = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// генерируем случайные данные в виде объекта wizard
var generateRandomWizard = function () {
  var wizard = {};

  wizard.name = getRandomInteger(NAMES) + ' ' + getRandomInteger(SURNAMES);
  wizard.coatColor = getRandomInteger(EYES_COLORS_ARRAY);
  wizard.eyesColor = getRandomInteger(COATS_COLORS_ARRAY);

  return wizard;
};

// создаем DOM-элемент на основе JS-объекта
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// создаем фрагмент и заполняем блок DOM-элементами
var insertWizards = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_AMOUNT; i++) {
    fragment.appendChild(renderWizard(generateRandomWizard()));
  }

  return fragment;
};

similarListElement.appendChild(insertWizards());

// создаем магическую кнопку
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    closePopup();
  }
};

// создаем функцию, отрывающую окно настроек
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// создаем функцию, закрывающую окно настроек
var closePopup = function () {
  if (!document.activeElement.classList.contains('setup-user-name')) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

setupClose.addEventListener('click', closePopup);

// открываем окно настроек по клику на аватарку
setupOpen.addEventListener('click', openPopup);

// открываем окно настроек по нажатию на Enter
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    openPopup();
  }
});

// закрываем окно настроек по клику на крестик
setupClose.addEventListener('click', function () {
  closePopup();
});

// закрываем окно настроек по нажатию на Enter
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    closePopup();
  }
});

var onCoatClick = function () {
  if (wizardCoatClickCounter === COATS_COLORS_ARRAY.length - 1) {
    wizardCoatClickCounter = 0;
  } else {
    wizardCoatClickCounter++;
  }
  var randomColor = COATS_COLORS_ARRAY[wizardCoatClickCounter];
  wizardCoat.style.fill = randomColor;
  setupWizardCoat.value = randomColor;
};

wizardCoat.addEventListener('click', onCoatClick);

var onEyesClick = function () {
  if (wizardEyesClickCounter === EYES_COLORS_ARRAY.length - 1) {
    wizardEyesClickCounter = 0;
  } else {
    wizardEyesClickCounter++;
  }
  var randomColor = EYES_COLORS_ARRAY[wizardEyesClickCounter];
  wizardEyes.style.fill = randomColor;
  setupWizardEyes.value = randomColor;
};

wizardEyes.addEventListener('click', onEyesClick);

var onFireballClick = function () {
  if (wizardFireballClickCounter === FIREBALL_COLORS_ARRAY.length - 1) {
    wizardFireballClickCounter = 0;
  } else {
    wizardFireballClickCounter++;
  }
  var randomColor = FIREBALL_COLORS_ARRAY[wizardFireballClickCounter];
  wizardFireball.style.background = randomColor;
  wizardFireball.querySelector('input').value = randomColor;
};

wizardFireball.addEventListener('click', onFireballClick);
