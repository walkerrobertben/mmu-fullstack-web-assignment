const self = {}

//authentication level enums
//these are like 'permission levels' to determine what actions a user can perform

self.LEVEL_AUTHOR = 0;
self.LEVEL_ADMIN = 1;

//author can create articles
//author can update their own articles
//author can delete their own articles
//author can delete comments on their own articles

//admin can do everything an author can do
//admin can create author accounts
//admin can update/delete anything

module.exports = self;