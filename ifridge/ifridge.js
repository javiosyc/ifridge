var samplePostsData = [{
    "author": "Richard",
    "text": "Meteor is great!"
}, {
    "author": "Richard",
    "text": "Meteor is so nice!"
}, {
    "author": "Richard",
    "text": "Meteor is the best!"
}];
var Posts = new Meteor.Collection("myBookPosts");
if(Meteor.isClient) {
    Template.main.helpers({
        "posts": Posts.find()
    });
    Template.main.events({
        "submit form": function(e) {
            e.preventDefault();
            var post = {
                "author": $(e.target).find("[name=author]").val(),
                "text": $(e.target).find("[name=text]").val()
            };
            post._id = Posts.insert(post);
            $(e.target).find("[name=author]").val("");
            $(e.target).find("[name=text]").val("");											
        },
        "click .close" : function(e) {
            console.log(this);
            Posts.remove(this._id);
        }
       
    })
}
if(Meteor.isServer) {
    if(Posts.find().count() == 0) {
        Posts.insert(samplePostsData[0]);
        Posts.insert(samplePostsData[1]);
        Posts.insert(samplePostsData[2]);
    }
}