Parse.Cloud.define('facebookNotifyFriends', function(request, response) {

    var currentUser = request.user;
    console.log(currentUser);

    var userQuery = new Parse.Query(Parse.User);
    userQuery.containedIn("fbid", currentUser.get("fbFriends"));

    var query = new Parse.Query(Parse.Installation);
    query.matchesQuery("user", userQuery);

    var pushMessage = 'Follow your Facebook friend ' + currentUser.get('firstName') + ' on Quest';

    Parse.Push.send({
        where: query,
        data: {
            alert: pushMessage,
            badge: 1,
            sound: 'default'
        }
    }, {
        success: function() {
            console.log('##### PUSH OK');
            response.success('success sent notifications');
        },
        error: function(error) {
            console.log('##### PUSH ERROR');
            response.error(error);
        },
        useMasterKey: true
    });
});
