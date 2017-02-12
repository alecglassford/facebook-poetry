'use strict';

var htmlToInsert = document.currentScript.dataset.htmlToInsert;
var elem = document.querySelector('[id^="more_pager_pagelet"]');
elem.insertAdjacentHTML( 'beforeBegin', htmlToInsert );
