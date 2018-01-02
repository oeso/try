
/* login */
angular.module('travel')
    .controller('login', [ '$scope', '$location', '$http', 'fb', function($scope, $location, $http, FB) {
        //loginWidthFacebook()
        console.log(FB)
        $scope.loginFB = function(){
            FB.login(function(response){
                console.log(response)
            }, {
                scope : 'user_friends,email,user_about_me,user_birthday,user_education_history,user_events,user_games_activity,user_hometown,user_likes,user_location,user_managed_groups,user_photos,user_posts,user_relationships,user_relationship_details,user_religion_politics,user_tagged_places,user_videos,user_website,user_work_history,read_custom_friendlists,read_insights,read_audience_network_insights,read_page_mailboxes,manage_pages,publish_pages,publish_actions,rsvp_event,pages_show_list,pages_manage_cta,pages_manage_instant_articles,ads_read,ads_management,business_management,pages_messaging,pages_messaging_subscriptions,pages_messaging_phone_number'
            });
            $location.path('/loginSuccess');
        };
    }])

// /* login */
// angular.module('travel')
//     .controller('login', [ '$scope', '$location', '$http', function($scope, $location, $http) {
//         //loginWidthFacebook()
//         $scope.loginFB = function(){
//             FB.login();
//             $location.path('/loginSuccess');
//         };
//     }])