/**
 * Copyright(c) 2017 Xuanrui Qi
 */

'use strict';

let DYN_ANNO_RE = /[（(]([0-9a-zA-Z\u4e00-\u9fff\u3040-\u30ff\u3005]+)[）)][{｛]([^}｝]+)[}｝]/g;
let PERSISTENT_ANNO_RE = /[\[＜〈【]([0-9a-zA-Z\u4e00-\u9fff\u3040-\u30ff\u3005]+)[\]＞〉】][{｛]([^}｝]+)[}｝]/g;

function findRubyBlocks()
{
    return $('.ruby-block').toArray();
}

function convertRegex()
{
    for (var ruby of findRubyBlocks()) {
        console.log(ruby);
        var innerText = $(ruby).html();
        console.log(innerText);
        $(ruby).html(
            innerText.replace(DYN_ANNO_RE, '<ruby class="dyn-ruby" data-annotation="$2">$1</ruby>')
                     .replace(PERSISTENT_ANNO_RE, '<ruby class="dyn-ruby-p" data-annotation="$2">$1</ruby>')
        );
    }
}

/**
 * Copied verbatim from "dyn-ruby.js"
 * Chrome and IE don't support imports yet, so no luck
 * importing from "dyn-ruby.js" for many users including
 * myself. The only way is to "hardcode" the import by,
 * well, copying-and-pasting.
 */

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

/* End of verbatim copy */


$(document).ready(function () {
    convertRegex();
    run();
});
