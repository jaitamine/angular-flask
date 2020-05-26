import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as toastr from 'toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
    // Sticky Header
    
$(window).scroll(function() {

  if ($(window).scrollTop() > 100) {
      $('.main_h').addClass('sticky');
  } else {
      $('.main_h').removeClass('sticky');
  }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
  if ($('.main_h').hasClass('open-nav')) {
      $('.main_h').removeClass('open-nav');
  } else {
      $('.main_h').addClass('open-nav');
  }
});

$('.main_h li a').click(function() {
  if ($('.main_h').hasClass('open-nav')) {
      $('.navigation').removeClass('open-nav');
      $('.main_h').removeClass('open-nav');
  }
});

// navigation scroll lijepo radi materem
$('nav a').click(function(event) {
  var id = $(this).attr("href");
  var offset = 70;
  var target = $(id).offset().top - offset;
  $('html, body').animate({
      scrollTop: target
  }, 500);
  event.preventDefault();
});
    
  }
  

}
