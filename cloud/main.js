Parse.Cloud.define('pushChannelTest', function(request, response) {

    var params = request.params;
    var user = request.user;
    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("deviceType", "android");

    Parse.Push.send({
        where: pushQuery,
        data: {
            alert: 'Parse server test',
            badge: 1,
            sound: 'default'
        }
    }, {
        success: function() {
            console.log("#### PUSH OK");
        },
        error: function(error) {
            console.log("#### PUSH ERROR" + error.message);
        },
        useMasterKey: true
    });

    response.success('success');
});
