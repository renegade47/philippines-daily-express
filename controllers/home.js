exports.index = function(req, res) {

	var sql = require("seriate");
	var showdown = require("showdown");
	var excerptHtml = require('excerpt-html');
	var isJSON = require('is-valid-json');
	var truncatise = require('truncatise');
	let date = require('date-and-time');


	var config = {
	    "server": process.env.DBSERVER,
	    "user": process.env.DBUSER,
	    "password": process.env.DBPASSWORD,
	    "database": process.env.DBNAME
	};

	var options = {
		  TruncateLength: 40,
		  TruncateBy : "words",
		  Strict : false,
		  StripHTML : true,
		  Suffix : '...'
	};


	function IsJsonString(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

	function isEmpty(obj) {
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }

	    return true;
	}

	sql.setDefaultConfig( config );


	sql.getPlainContext()
 		.step('topCommented',{
 			query: sql.fromFile( "../queries/topCommented.sql" )
 		})
 		.step('topUpvoted', {
 			query: sql.fromFile( "../queries/topUpvoted.sql")
 		})
 		.step('topRewards', {
 			query: sql.fromFile( "../queries/topRewards.sql")
 		})
 		.end(function(sets){
 			var topCommented = sets.topCommented;
 			var c = new showdown.Converter();
 			var topCommentedHTML = c.makeHtml(sets.topCommented[0].body);
 			var topCommentedX = truncatise(topCommentedHTML, options);
 			var c_created = topCommented[0].created;
 			var str = c_created.toString();
			var index = str.indexOf(" (");
			// if the index exists
			if(~index) {
			  str = str.substr(0, index);
			}
			c_created = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');;
 			var c_numberofComments = topCommented[0].children;
 			var c_link = topCommented[0].url;
 			var c_net_votes = topCommented[0].net_votes;
 			var c_reward = topCommented[0].pending_payout_value;
 			var c_author = topCommented[0].author;

 		
			if(isJSON(topCommented[0].json_metadata)){
 				var topCommentedJSON = JSON.parse(topCommented[0].json_metadata);
 				if(isJSON(topCommentedJSON)){
 					if(isEmpty(topCommentedJSON.image)){
 						var topCommentedImage = '';
	 				} else {
	 					var topCommentedImage = topCommentedJSON.image[0];
	 				}
 				}
 			} else {
 				var topCommentedImage = '';
 			}

 			var topCommentedArray = [
 				{
 					title: sets.topCommented[0].title,
 					excerpt: topCommentedX,
 					image: topCommentedImage,
 					created: c_created,
 					numberofComments: c_numberofComments,
 					link: c_link,
 					net_votes: c_net_votes,
 					reward: c_reward,
 					author: c_author
 				}
 			];

 			var topUpvoted = sets.topUpvoted;
 			var topUpvotedMarkdown = new showdown.Converter();
 			var topUpvotedHTML = topUpvotedMarkdown.makeHtml(topUpvoted[0].body);
 			var topUpvotedExcerpt = truncatise(topUpvotedHTML, options);
 			var u_created = topUpvoted[0].created;
 			var str = u_created.toString();
			var index = str.indexOf(" (");
			// if the index exists
			if(~index) {
			  str = str.substr(0, index);
			}
			u_created = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');;
 			var u_numberofComments = topUpvoted[0].children;
 			var u_link = topUpvoted[0].url;
 			var u_net_votes = topUpvoted[0].net_votes;
 			var u_reward = topUpvoted[0].pending_payout_value;
 			var u_author = topUpvoted[0].author;
 			if(isJSON(topUpvoted[0].json_metadata)){
 				var topUpvotedJSON = JSON.parse(topUpvoted[0].json_metadata);
 				if(isJSON(topUpvotedJSON)){
 					if(isEmpty(topUpvotedJSON.image)){
 						var topUpvotedImage = '';
	 				} else {
	 					var topUpvotedImage = topUpvotedJSON.image[0];
	 				}
 				}
 			} else {
 				var topUpvotedImage = '';
 			}

 			var topUpvotedArray = [
 				{
 					title: topUpvoted[0].title,
 					excerpt: topUpvotedExcerpt,
 					image: topUpvotedImage,
 					created: u_created,
 					numberofComments: u_numberofComments,
 					link: u_link,
 					net_votes: u_net_votes,
 					reward: u_reward,
 					author: u_author
 				}
 			];

 			var topRewards = sets.topRewards;

 			var topRewardsMarkdown = new showdown.Converter();
 			var topRewardsHTML = topRewardsMarkdown.makeHtml(sets.topRewards[0].body);
 			var topRewardsExcerpt = truncatise(topRewardsHTML, options);
 			var r_created = topRewards[0].created;
 			var str = r_created.toString();
			var index = str.indexOf(" (");
			// if the index exists
			if(~index) {
			  str = str.substr(0, index);
			}
			r_created = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');;
 			var r_numberofComments = topRewards[0].children;
 			var r_link = topRewards[0].url;
 			var r_net_votes = topRewards[0].net_votes;
 			var r_reward = topRewards[0].pending_payout_value;
 			var r_author = topRewards[0].author;
 			if(isJSON(topRewards[0].json_metadata)){
 				var topRewardsJSON = JSON.parse(topRewards[0].json_metadata);
 				if(isJSON(topRewardsJSON)){
 					if(isEmpty(topRewardsJSON.image)){
 						var topRewardsImage = '';
	 				} else {
	 					var topRewardsImage = topRewardsJSON.image[0];
	 				}
 				}
 			} else {
 				var topRewardsImage = '';
 			}

 			var topRewardsArray = [
 				{
 					title: topRewards[0].title,
 					excerpt: topRewardsExcerpt,
 					image: topRewardsImage,
 					created: r_created,
 					numberofComments: r_numberofComments,
 					link: r_link,
 					net_votes: r_net_votes,
 					reward: r_reward,
 					author: r_author
 				}
 			];

 			let now = new Date();
 			var date_now = date.format(now, 'dddd MMMM DD YYYY hh:mm A');

 			res.render('home', {topCommented: topCommentedArray, topUpvoted: topUpvotedArray, topRewards: topRewardsArray, date_now: date_now});
 		})
		.error( function( err){
			console.log( "Something bad happened:", err );
	});
};