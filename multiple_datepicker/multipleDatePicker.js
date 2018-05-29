/*
 @author : Maelig GOHIN For ARCA-Computing - www.arca-computing.fr
 @version: 2.1.1

 @description:  MultipleDatePicker is an Angular directive to show a simple calendar allowing user to select multiple dates.
 Css style can be changed by editing less or css stylesheet.
 See scope declaration below for options you can pass through html directive.
 Feel free to edit and share this piece of code, our idea is to keep it simple ;)

 Demo page : http://arca-computing.github.io/MultipleDatePicker/
 */

'use strict';
var multipleDatePicker = function () {
        return {
            restrict: 'AE',
            scope: {
                /*
                 * Type : Array of moment dates
                 * Array will mutate when user select/unselect a date
                 */
                ngModel: '=?',
                /*
                 * Type: array of objects (see doc)
                 * Days to highlights
                 * */
                highlightDays: '=?',
                /*
                 * Type : function
                 * Will be called to manage (un)selection of a date
                 */
                dayClick: '=?',
                /*
                 * Type : function
                 * Will be called to manage hover of a date
                 */
                dayHover: '=?',
                /*
                 * Type: function
                 * The function to be called when a user right-clicks on a date
                 */
                rightClick: '=?',
                /*
                 * Type: moment date
                 * Month to be displayed
                 * Default is current month
                 */
                month: '=?',
                /*
                 * Type: function(newMonth, oldMonth)
                 * Will be called when month changed
                 * Param newMonth/oldMonth will be the first day of month at midnight
                 * */
                monthChanged: '=?',
                /*
                 * Type: function(event, month)
                 * Will be called when trying to change month
                 * Param month will be the first day of month at midnight
                 * */
                yearChanged: '=?',
                /*
                 * Type: function(event, year)
                 * Will be called when trying to change month
                 * Param month will be the first day of month at midnight
                 * */                    
                monthClick: '=?',
                /*
                 * Type: array of integers
                 * Recurrent week days not selectables
                 * /!\ Sunday = 0, Monday = 1 ... Saturday = 6
                 * */
                weekDaysOff: '=?',
                /*
                 * Type: boolean
                 * Set all days off
                 * */
                allDaysOff: '=?',
                /*
                 * Type: array of moment dates
                 * Set days allowed (only thos dates will be selectable)
                 * */
                daysAllowed: '=?',
                /*
                 * Type: boolean
                 * Sunday be the first day of week, default will be Monday
                 * */
                sundayFirstDay: '=?',
                /*
                 * Type: boolean
                 * if true can't navigate
                 * */
                disableNavigation: '=?',
                /*
                 * Type: boolean
                 * if true can't go back in months before today's month
                 * */
                disallowBackPastMonths: '=?',
                /*
                 * Type: boolean
                 * if true can't go in futur months after today's month
                 * */
                disallowGoFuturMonths: '=?',
                /*
                 * Type: boolean
                 * if true empty boxes will be filled with days of previous/next month
                 * */
                showDaysOfSurroundingMonths: '=?',
                /*
                 * Type: string
                 * CSS classes to apply to days of next/previous months
                 * */
                cssDaysOfSurroundingMonths: '=?',
                /*
                 * Type: boolean
                 * if true events on empty boxes (or next/previous month) will be fired
                 * */
                fireEventsForDaysOfSurroundingMonths: '=?',
                /*
                 * Type: any type moment can parse
                 * If filled will disable all days before this one (not included)
                 * */
                disableDaysBefore: '=?',
                /*
                 * Type: any type moment can parse
                 * If filled will disable all days after this one (not included)
                 * */
                disableDaysAfter: '=?',
                /*
                 * Type: int
                 * Number of years from scope.month to show in past in select
                 * note : will change year into a select
                 */
                changeYearPast: '=?',
                /*
                 * Type: int
                 * Number of years from scope.month to show in future in select
                 * note : will change year into a select
                 */
                changeYearFuture: '=?'
            },
            template:   '<div class="multiple-date-picker">' +
                        '<div class="picker-top-row">' +
                        '<div class="picker-nav picker-nav-left-arrow" ng-class="{\'disabled\':disableBackButton}" ng-click="changeMonth($event, disableBackButton, -1)"><span class="hide">이전 월</span></div>' +
                        '<div class="picker-month">' +
                        '<span ng-if="yearsForSelect.length > 0">{{yearToDisplay}}년 </span>' +
                        '{{monthToDisplay}} ' +							
                        '</div>' +				
                        '<div class="picker-nav picker-nav-right-arrow" ng-class="{\'disabled\':disableNextButton}" ng-click="changeMonth($event, disableNextButton, 1)"><span class="hide">다음 월</span></div>' +
                        '</div>' +
                        '<div class="picker-days-week-row">' +
                        '<div class="picker-days-week-cell" ng-repeat="day in daysOfWeek">{{day}}</div>' +
                        '</div>' +
                        '<div class="picker-days-row">' +
                        '<div class="picker-day" title="{{day.title}}" ng-repeat="day in days" ng-click="toggleDay($event, day)"><div class="cell {{getDayClasses(day)}}" >{{day ? day.mdp.otherMonth && !showDaysOfSurroundingMonths ? \'&nbsp;\' : day.date.format(\'D\') : \'\'}}</div></div>' +
                        '</div>' +
                        //'<button class="btn_close_calender" ng-click="calanderOpen();">닫기</button>' +
                        '</div>',
            link: function (scope) {
                scope.ngModel = scope.ngModel || [];

                /*utility functions*/
                var checkNavigationButtons = function () {
                        var today = moment(),
                            previousMonth = moment(scope.month).subtract(1, 'month'),
                            nextMonth = moment(scope.month).add(1, 'month');
                        scope.disableBackButton = scope.disableNavigation || (scope.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
                        scope.disableNextButton = scope.disableNavigation || (scope.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
                    },
                    getDaysOfWeek = function () {
                        /*To display days of week names in moment.lang*/
                        var momentDaysOfWeek = moment().localeData()._weekdaysMin,
                            days = [];
                        for (var i = 1; i < 7; i++) {
                            days.push(momentDaysOfWeek[i]);
                        }

                        if (scope.sundayFirstDay) {
                            days.splice(0, 0, momentDaysOfWeek[0]);
                        } else {
                            days.push(momentDaysOfWeek[0]);
                        }

                        return days;
                    },
                    getMonthYearToDisplay = function () {
                        var month = scope.month.format('MMMM');
                        return month.charAt(0).toUpperCase() + month.slice(1);
                    },
                    getYearsForSelect = function () {
                        var now = moment(),
                            changeYearPast = Math.max(0, parseInt(scope.changeYearPast, 10) || 0),
                            changeYearFuture = Math.max(0, parseInt(scope.changeYearFuture, 10) || 0),
                            min = moment(scope.month).subtract(changeYearPast, 'year'),
                            max = moment(scope.month).add(changeYearFuture, 'year'),
                            result = [];
                        max.add(1, 'year');
                        for (var m = moment(min); max.isAfter(m, 'YEAR'); m.add(1, 'year')) {
                            if ((!scope.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!scope.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
                                result.push(m.format('YYYY'));
                            }
                        }
                        return result;
                    };

                /*scope functions*/
                var watches = [];
                watches.push(
                    scope.$watch('ngModel', function () {
                        scope.generate();
                    }, true)
                );

                watches.push(
                    scope.$watch('month', function () {
                        scope.generate();
                    }, true)
                );

                watches.push(
                    scope.$watch('highlightDays', function () {
                        scope.generate();
                    }, true)
                );

                watches.push(
                    scope.$watch('weekDaysOff', function () {
                        scope.generate();
                    }, true)
                );

                watches.push(
                    scope.$watch('allDaysOff', function () {
                        scope.generate();
                    }, true)
                );

                watches.push(
                    scope.$watch('daysAllowed', function () {
                        scope.generate();
                    }, true)
                );

                watches.push(
                    scope.$watch('disableDaysBefore', function () {
                        scope.generate();
                    }, true)
                );

                watches.push(
                    scope.$watch('disableDaysAfter', function () {
                        scope.generate();
                    }, true)
                );

                watches.push(
                    scope.$watch(function () {
                        return moment.locale();
                    }, function () {
                        scope.daysOfWeek = getDaysOfWeek();
                        scope.monthToDisplay = getMonthYearToDisplay();
                    }, true)
                );

                scope.$on('destroy', function () {
                    for (var i = 0; i < watches.length; i++) {
                        watches[i]();
                    }
                });
                //default values
                scope.month = scope.month || moment().startOf('day');
                scope.days = [];
                scope.weekDaysOff = scope.weekDaysOff || [];
                scope.daysOff = scope.daysOff || [];
                scope.disableBackButton = false;
                scope.disableNextButton = false;
                scope.daysOfWeek = getDaysOfWeek();
                scope.cssDaysOfSurroundingMonths = scope.cssDaysOfSurroundingMonths || 'picker-empty';
                scope.yearsForSelect = [];

                /**
                 * Called when user clicks a date
                 * @param event event the click event
                 * @param day "complex" mdp object with all properties
                 */
                scope.toggleDay = function (event, day) {                    	
                    if (day.mdp.otherMonth && !scope.fireEventsForDaysOfSurroundingMonths) {
                        return;
                    }
                    
                    var cells = angular.element(document.querySelector(".cell"));
                    event.preventDefault();

                    var prevented = false;

                    event.preventDefault = function () {
                        prevented = true;
                    };

                    if (typeof scope.dayClick == 'function') {
                        scope.dayClick(event, day);
                       
                    }
/*
                    if (day.selectable && !prevented) {
                        //console.log('2')
                        day.mdp.selected = !day.mdp.selected;
                        if (day.mdp.selected) {
                            scope.ngModel.push(day.date);
                        } else {
                            var idx = -1;
                            for (var i = 0; i < scope.ngModel.length; ++i) {
                                if (moment.isMoment(scope.ngModel[i])) {
                                    if (scope.ngModel[i].isSame(day.date, 'day')) {
                                        idx = i;
                                        break;
                                    }
                                } else {
                                    if (scope.ngModel[i].date.isSame(day.date, 'day')) {
                                        idx = i;
                                        break;
                                    }
                                }
                            }
                            if (idx !== -1) scope.ngModel.splice(idx, 1);
                        }
                    }
                    */
                };

                /**
                 * Hover day
                 * @param event hover event
                 * @param day "complex" mdp object with all properties
                 */
                scope.hoverDay = function (event, day) {
                    event.preventDefault();
                    var prevented = false;

                    event.preventDefault = function () {
                        prevented = true;
                    };

                    if (typeof scope.dayHover == 'function') {
                        scope.dayHover(event, day);
                    }

                    if (!prevented) {
                        day.mdp.hover = event.type === 'mouseover';
                    }
                };

                /**
                 * Right clicked on day
                 * @param event Click event
                 * @param day Day clicked
                 */
                scope.rightClicked = function (event, day) {
                    if (typeof scope.rightClick === 'function') {
                        event.preventDefault();
                        scope.rightClick(event, day);
                    }
                };

                scope.getDayClasses = function (day) {
                    var css = '';
                    if (day.css && (!day.mdp.otherMonth || scope.showDaysOfSurroundingMonths)) {
                        css += ' ' + day.css;
                    }
                    if (scope.cssDaysOfSurroundingMonths && day.mdp.otherMonth) {
                        css += ' ' + scope.cssDaysOfSurroundingMonths;
                    }
                    if (day.mdp.selected) {
                        css += ' picker-selected';
                    }
                    if (!day.selectable) {
                        css += ' picker-off';
                    }
                    if (day.mdp.today) {
                        css += ' today';
                    }
                    if (day.mdp.past) {
                        css += ' past';
                    }
                    if (day.mdp.future) {
                        css += ' future';
                    }
                    if (day.mdp.otherMonth) {
                        css += ' picker-other-month';
                    }
                    return css;
                };

                /*Navigate to another month*/
                scope.changeMonth = function (event, disable, add) {
                    if (disable) {
                        return;
                    }

                    event.preventDefault();

                    var prevented = false;

                    event.preventDefault = function () {
                        prevented = true;
                    };

                    var monthTo = moment(scope.month).add(add, 'month');
                    if (typeof scope.monthClick == 'function') {
                        scope.monthClick(event, monthTo);
                    }

                    if (!prevented) {
                        var oldMonth = moment(scope.month);
                        scope.month = monthTo;
                        if (typeof scope.monthChanged == 'function') {
                            scope.monthChanged(scope.month, oldMonth, event);
                        }
                    }
                  
                };

                /*Change year*/
                scope.changeYear = function (year) {
                    scope.month = scope.month.year(parseInt(year, 10));
                    if (typeof scope.yearChanged == 'function') {
                        scope.yearChanged(year, scope.month);
                    }
                };

                /*Check if the date is off : unselectable*/
                scope.isDayOff = function (day) {
                    return scope.allDaysOff ||
                        (!!scope.disableDaysBefore && moment(day.date).isBefore(scope.disableDaysBefore, 'day')) ||
                        (!!scope.disableDaysAfter && moment(day.date).isAfter(scope.disableDaysAfter, 'day')) ||
                        (angular.isArray(scope.weekDaysOff) && scope.weekDaysOff.some(function (dayOff) {
                            return day.date.day() === dayOff;
                        })) ||
                        (angular.isArray(scope.daysOff) && scope.daysOff.some(function (dayOff) {
                            return day.date.isSame(dayOff, 'day');
                        })) ||
                        (angular.isArray(scope.daysAllowed) && !scope.daysAllowed.some(function (dayAllowed) {
                            return day.date.isSame(dayAllowed, 'day');
                        })) ||
                        (angular.isArray(scope.highlightDays) && scope.highlightDays.some(function (highlightDay) {
                            return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable;
                        }));
                };

                /*Check if the date is selected*/
                scope.isSelected = function (day) {
                    return scope.ngModel.some(function (d) {
                        return day.date.isSame(d, 'day');
                    });
                };

                /*Generate the calendar*/
                scope.generate = function () {
                    scope.yearsForSelect = getYearsForSelect();
                    scope.monthToDisplay = getMonthYearToDisplay();
                    scope.yearToDisplay = scope.month.format('YYYY');
                    var previousDay = moment(scope.month).date(0).day(scope.sundayFirstDay ? 0 : 1).subtract(1, 'day');

                    if (moment(scope.month).date(0).diff(previousDay, 'day') > 6) {
                        previousDay = previousDay.add(1, 'week');
                    }

                    var firstDayOfMonth = moment(scope.month).date(1),
                        days = [],
                        now = moment(),
                        lastDay = moment(firstDayOfMonth).endOf('month'),
                        createDate = function () {
                            var day = {
                                date: moment(previousDay.add(1, 'day')),
                                mdp: {
                                    selected: false
                                }
                            };
                           
                            if (angular.isArray(scope.highlightDays)) {
                                var hlDay = scope.highlightDays.filter(function (d) {
                                    return day.date.isSame(d.date, 'day');
                                });
                                day.css = hlDay.length > 0 ? hlDay[0].css : '';
                                day.title = hlDay.length > 0 ? hlDay[0].title : '';
                            }
                            day.selectable = !scope.isDayOff(day);
                            day.mdp.selected = scope.isSelected(day);
                            day.mdp.today = day.date.isSame(now, 'day');
                            day.mdp.past = day.date.isBefore(now, 'day');
                            day.mdp.future = day.date.isAfter(now, 'day');
                            if (!day.date.isSame(scope.month, 'month')) {
                                day.mdp.otherMonth = true;
                            }
                            return day;
                        },
                        maxDays = lastDay.diff(previousDay, 'days'),
                        lastDayOfWeek = scope.sundayFirstDay ? 6 : 0;

                    if (lastDay.day() !== lastDayOfWeek) {
                        maxDays += (scope.sundayFirstDay ? 6 : 7) - lastDay.day();
                    }

                    for (var j = 0; j < maxDays; j++) {
                        days.push(createDate());
                    }

                    scope.days = days;
                    checkNavigationButtons();
                };

                scope.generate();
            }
        };
    };



