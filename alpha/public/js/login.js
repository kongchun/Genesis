!function e(a,s,r){function n(o,i){if(!s[o]){if(!a[o]){var u="function"==typeof require&&require;if(!i&&u)return u(o,!0);if(t)return t(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var c=s[o]={exports:{}};a[o][0].call(c.exports,function(e){var s=a[o][1][e];return n(s?s:e)},c,c.exports,e,a,s,r)}return s[o].exports}for(var t="function"==typeof require&&require,o=0;o<r.length;o++)n(r[o]);return n}({1:[function(e,a,s){"use strict";var r=e("../message.js");$(function(){$("#btn_login").click(function(){var e=$("#account").val(),a=$("#password").val();$.post("api/login",{account:e,password:a},function(e){e.result?location.href="list":r.alert("用户名或密码不正确!")},"json")}),$("#btn_regist").click(function(){var a=$("#username").val(),s=$("#userpassword").val(),n=$("#useranotherPass").val();return e.userName_validate(a)?e.password_validate(s)?e.anotherpass_validate(s,n)?void $.post("api/addUser",{userName:a,passWord:s},function(e){e.result?($(".regist-box-container").hide(),$(".regist-success-box").show()):(r.alert("注册失败,请联系网管"),$("#username").empty(),$("#userpassword").empty(),$("#useranotherPass").empty())},"json"):void $("#useranotherPass").focus():void $("#userpassword").focus():void $("#username").focus()}),$("#username").keyup(function(){var e=$("#username").val();$.post("api/checkUserName",{userName:e},function(e){e.result?($(".userName-exsit").slideDown(500,function(){$(this).css("display","block")}),$("#username").focus()):$(".userName-exsit").slideUp(500,function(){$(this).css("display","none")})},"json")});var e={userName_validate:function(e){var a=/[a-zA-z][a-zA-Z0-9_]{5,9}/g;return""==e?(r.alert("用户名是必填项"),!1):!!a.test(e)||(r.alert("用户名由6-10位的字母和数字组成,开头只能是字母"),!1)},password_validate:function(e){return""==e?(r.alert("密码是必填项"),!1):!(e.length<6||e.length>18)||(r.alert("密码长度在6-18位之间"),!1)},anotherpass_validate:function(e,a){return""==a?(r.alert("确认密码是必填项"),!1):e==a||(r.alert("两次密码应该一致"),!1)}}})},{"../message.js":2}],2:[function(e,a,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});s.alert=function(e){var a=arguments.length<=1||void 0===arguments[1]?"warning":arguments[1],s={warning:["alert-warning","fa-exclamation-circle"],success:["alert-success","fa-check"]},r='<div class="modal fade" tabindex="-1" role="dialog">\n\t<div class="modal-dialog" role="document">\n\t    <div class="alert alert-block '+s[a][0]+' fade in">\n\t        <a class="close" data-dismiss="modal" aria-label="Close" href="#" aria-hidden="true">×</a>\n\t        <p></p>\n\t        <i class="fa  '+s[a][1]+'"></i>\n\t        <span>\n\t        '+e+"\n\t        </span>\n\t        <p></p>\n\t    </div>\n\t    </div> \n\t </div>",n=$(r);$("body").append(n),$(n).modal("show"),$(n).on("hidden.bs.modal",function(){n.remove()})}},{}]},{},[1]);