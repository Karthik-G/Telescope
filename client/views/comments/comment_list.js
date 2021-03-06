Template[getTemplate('comment_list')].created = function(){
  postObject = this.data;
};

Template[getTemplate('comment_list')].helpers({
  comment_item: function () {
    return getTemplate('comment_item');
  },
  child_comments: function(){
    var post = this;
    if(this.postsList!=undefined)
      {
                post=this.postsList.fetch()[0];

      }
       if((post==undefined)&&(xt!=undefined))
      {
         post=xt.fetch()[0];
      }
    var comments = Comments.find({postId: post._id, parentCommentId: null}, {sort: {score: -1, postedAt: -1}});
    return comments;
  }
});

Template[getTemplate('comment_list')].rendered = function(){
  // once all comments have been rendered, activate comment queuing for future real-time comments
  window.queueComments = true;
};