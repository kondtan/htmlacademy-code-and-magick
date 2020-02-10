'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var wizardList = document.createDocumentFragment();
var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var coatColorArray = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorArray = ['black', 'red', 'blue', 'yellow', 'green'];

var wizardArray = [];

var getRandomInteger = function (min, max) {
  var random = Math.random() * (max + 1) + min;
  return Math.floor(random);
};

document.querySelector('.setup-similar').classList.remove('hidden');
userDialog.classList.remove('hidden');

for (var i = 0; i < 4; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  var randomName = wizardNames[getRandomInteger(0, wizardNames.length - 1)];
  var randomSurname = wizardSurnames[getRandomInteger(0, wizardSurnames.length - 1)];
  var fullName = randomName + ' ' + randomSurname;

  var randomEyesColor = eyesColorArray[getRandomInteger(0, eyesColorArray.length - 1)];

  var randomCoatColor = coatColorArray[getRandomInteger(0, coatColorArray.length - 1)];

  wizardArray[i] = {
    name: fullName,
    coatColor: randomCoatColor,
    eyesColor: randomEyesColor
  };

  wizardElement.querySelector('.setup-similar-label').textContent = wizardArray[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardArray[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardArray[i].eyesColor;

  wizardList.appendChild(wizardElement);
}

similarListElement.appendChild(wizardList);
