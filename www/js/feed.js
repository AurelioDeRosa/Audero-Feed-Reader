function Feed(name, url) {
   var _db = window.localStorage;
   var _tableName = 'feed';

   this.name = name;
   this.url = url;

   this.save = function (feeds) {
      _db.setItem(_tableName, JSON.stringify(feeds));
   };

   this.load = function () {
      return JSON.parse(_db.getItem(_tableName));
   };
}

Feed.prototype.add = function () {
   var index = Feed.getIndex(this);
   var feeds = Feed.getFeeds();

   if (index === false) {
      feeds.push(this);
   } else {
      feeds[index] = this;
   }

   this.save(feeds);
};

Feed.prototype.delete = function () {
   var index = Feed.getIndex(this);
   var feeds = Feed.getFeeds();

   if (index !== false) {
      feeds.splice(index, 1);
      this.save(feeds);
   }

   return feeds;
};

Feed.prototype.compareTo = function (other) {
   return Feed.compare(this, other);
};

Feed.compare = function (feed, other) {
   if (other == null) {
      return 1;
   }
   if (feed == null) {
      return -1;
   }
   var test = feed.name.localeCompare(other.name);
   return (test === 0) ? feed.url.localeCompare(other.url) : test;
};

Feed.getFeeds = function () {
   var feeds = new Feed().load();
   return (feeds === null) ? [] : feeds;
};

Feed.getFeed = function (feed) {
   var index = Feed.getIndex(feed);
   if (index === false) {
      return null;
   }
   var feed = Feed.getFeeds()[index];
   return new Feed(feed.name, feed.url);
};

Feed.getIndex = function (feed) {
   var feeds = Feed.getFeeds();
   for (var i = 0; i < feeds.length; i++) {
      if (feed.compareTo(feeds[i]) === 0) {
         return i;
      }
   }

   return false;
};

Feed.deleteFeeds = function () {
   new Feed().save([]);
};

Feed.searchByName = function (name) {
   var feeds = Feed.getFeeds();
   for (var i = 0; i < feeds.length; i++) {
      if (feeds[i].name === name) {
         return new Feed(feeds[i].name, feeds[i].url);
      }
   }

   return false;
};

Feed.searchByUrl = function (url) {
   var feeds = Feed.getFeeds();
   for (var i = 0; i < feeds.length; i++) {
      if (feeds[i].url === url) {
         return new Feed(feeds[i].name, feeds[i].url);
      }
   }

   return false;
};