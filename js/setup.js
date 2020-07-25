'use strict';

var WIZARDS_AMOUNT = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Василий', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLORS_ARRAY = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_ARRAY = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

document.querySelector('.setup-similar').classList.remove('hidden');
userDialog.classList.remove('hidden');

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
