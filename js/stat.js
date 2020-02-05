'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_MARGIN = 50;
var BAR_COLOR_YOU = 'rgba(255, 0, 0, 1)';
var TEXT_HEIGHT = 10;
var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = '#000';
var TEXT_HEADING_Y = 40;
var HEADING_GAP_X = 30;
var TEXT_HEADING_LINE_GAP = 20;
var TEXT_HEADING_FIRST_LINE = 'Ура, вы победили!';
var TEXT_HEADING_SECOND_LINE = 'Список результатов:';

var getRandomInteger = function (min, max) {
  var random = Math.random() * (max + 1) + min;
  return Math.floor(random);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, text) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  var textHeadingX = CLOUD_X + HEADING_GAP_X;
  var textHeadingSecondLineY = TEXT_HEADING_Y + TEXT_HEADING_LINE_GAP;
  renderText(ctx, textHeadingX, TEXT_HEADING_Y, TEXT_HEADING_FIRST_LINE);
  renderText(ctx, textHeadingX, textHeadingSecondLineY, TEXT_HEADING_SECOND_LINE);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var playerX = CLOUD_X + BAR_MARGIN + (BAR_MARGIN + BAR_WIDTH) * i;
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var barY = BAR_HEIGHT - barHeight + CLOUD_Y + TEXT_HEIGHT + TEXT_HEADING_Y + TEXT_HEADING_LINE_GAP * 2;
    var barColor = (players[i] === 'Вы') ? BAR_COLOR_YOU : 'hsl(240, ' + getRandomInteger(10, 100) + '%, 30%)';
    var playerTime = Math.floor(times[i]);
    var playerTimeY = barY - TEXT_HEIGHT;
    var nameY = CLOUD_HEIGHT - TEXT_HEIGHT + CLOUD_Y;

    renderText(ctx, playerX, playerTimeY, playerTime, TEXT_FONT, TEXT_COLOR);
    renderText(ctx, playerX, nameY, players[i], TEXT_FONT, TEXT_COLOR);
    renderBar(ctx, playerX, barY, BAR_WIDTH, barHeight, barColor);
  }
};
