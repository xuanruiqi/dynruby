/**
 * Copyright(c) 2016 Xuanrui Qi
 */

'use strict';

var staticAnnotate = false;

function findRuby()
{
    return $('.dyn-ruby').toArray();
}

function annotatePersistent()
{
    for (var ruby of $('.dyn-ruby-p').toArray()) {
        var annotation = $(ruby).data('annotation');
        $(ruby).append('<rp>（</rp><rt>' + annotation + '</rt><rp>）</rp>');
    }
}

function addAnnotation(event)
{
    if (!staticAnnotate) {
        var annotation = $(this).data('annotation');
        $(this).append('<rp>（</rp><rt>' + annotation + '</rt><rp>）</rp>');
    }
}

function removeAnnotation(event)
{
    if (!staticAnnotate) {
        $(this).find('rt').remove();
        $(this).find('rp').remove();
    }
}

function annotateAll()
{
    staticAnnotate = true;
    for (var ruby of findRuby()) {
        var annotation = $(ruby).data('annotation');
        $(ruby).append('<rp>（</rp><rt>' + annotation + '</rt><rp>）</rp>');
    }
}

function unannotateAll()
{
    staticAnnotate = false;
    for (var ruby of findRuby()) {
        $(ruby).find('rt').remove();
        $(ruby).find('rp').remove();
    }
}

function run() 
{
    annotatePersistent();
    for (var ruby of findRuby()) {
        $(ruby).hover(addAnnotation, removeAnnotation);
    }

    for (var show of $('.show-dyn-ruby').toArray()) {
        $(show).click(annotateAll);
    }

    for (var hide of $('.hide-dyn-ruby').toArray()) {
        $(hide).click(unannotateAll);
    }
}

$(document).ready(run);
