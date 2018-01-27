/* Browser preferred language */
var getFirstBrowserLanguage = function () {
	var nav = window.navigator,
		browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
		i,
		language;

	// support for HTML 5.1 "navigator.languages"
	if (Array.isArray(nav.languages)) {
		for (i = 0; i < nav.languages.length; i++) {
			language = nav.languages[i];
			if (language && language.length) {
				return language;
			}
		}
	}

	// support for other well known properties in browsers
	for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
		language = nav[browserLanguagePropertyKeys[i]];
		if (language && language.length) {
			return language;
		}
	}

	return null;
};

console.log(getFirstBrowserLanguage());
var __dirname = location.protocol + '//' + location.host + '/' + location.pathname.replace(/\//g, "") ;

var set_locale_to = function(locale) {
	'use strict';
  	if (locale){
		$.i18n().locale = locale;
	}
	$('head').i18n();
	$('body').i18n();
};
var file = __dirname + '/locales/i18n/'
var locales = ['en' , 'tr'];
var ext = '.json';
console.log(file+'< TRACKER >');
jQuery(function() {
	'use strict';
	$.i18n().load( {
		'en': file + locales[0] + ext,
		'tr': file + locales[1] + ext
		}).done( function() {
			/*jshint -W117 */
			set_locale_to(url('?locale'));
			History.Adapter.bind(window, 'statechange', function(){
			  set_locale_to(url('?locale'));
			});
			if (getFirstBrowserLanguage() === 'tr' ){
				History.pushState(null, null, "?locale=tr" );
				// document.title =
			} else {
				History.pushState(null, null, "?locale=en");
			}
			$('#i18n-switch').on('click', 'a', function(e) {
				e.preventDefault();
				//$.i18n().locale = $(this).data('locale');
				History.pushState(null, null, "?locale=" + $(this).data('locale'));
				$.getJSON( file + $(this).data('locale') + ext , function(data) {
					document.title = data.SiteName;
				});
				console.log('Translation successful!');
			});
		});
});
$("[data-i18n]").i18n();
