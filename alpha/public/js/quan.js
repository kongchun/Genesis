!function e(n,t,a){function r(o,s){if(!t[o]){if(!n[o]){var c="function"==typeof require&&require;if(!s&&c)return c(o,!0);if(i)return i(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var d=t[o]={exports:{}};n[o][0].call(d.exports,function(e){var t=n[o][1][e];return r(t?t:e)},d,d.exports,e,n,t,a)}return t[o].exports}for(var i="function"==typeof require&&require,o=0;o<a.length;o++)r(a[o]);return r}({1:[function(e,n,t){"use strict";var a=e("../message.js");$(function(){$("#main-btn").click(function(){var e=$("#main").data("id"),n=$("#main-phone").val().replace(/(^\s*)|(\s*$)/g,"");return 11!=n.length?void a.alert("请输入正确的手机号!"):0==$("#main-tips-checkbox:checked").length?void a.alert("请先同意优惠规则!"):void $.post("/quan/invite/"+e,{tel:n},function(e){e.result&&(location.href="/quan/receive/"+e.customer._id)})})})},{"../message.js":2}],2:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.alert=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning",t={warning:["alert-warning","fa-exclamation-circle"],success:["alert-success","fa-check"]},a='<div class="modal fade" tabindex="-1" role="dialog">\n\t<div class="modal-dialog" role="document">\n\t    <div class="alert alert-block '+t[n][0]+' fade in">\n\t        <a class="close" data-dismiss="modal" aria-label="Close" href="#" aria-hidden="true">×</a>\n\t        <p></p>\n\t        <i class="fa  '+t[n][1]+'"></i>\n\t        <span>\n\t        '+e+"\n\t        </span>\n\t        <p></p>\n\t    </div>\n\t    </div> \n\t </div>",r=$(a);$("body").append(r),$(r).modal("show"),$(r).on("hidden.bs.modal",function(){r.remove()})}},{}]},{},[1]);