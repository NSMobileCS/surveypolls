const polls = require("../controllers/polls");

module.exports = function (app) {
    app.post("/login", polls.login);
    app.get("/login", polls.checkLogin);
    app.get("/logout", polls.logout);
    app.get("/polls", polls.getAllPolls);
    app.get("/polls/:id", polls.getOnePoll);
    app.post("/polls", polls.addNewPoll);
    app.put("/polls/:id", polls.modifyPoll);
    app.post("/polls/:id/destroy", polls.deletePoll);
    app.post("/polls/:id/vote", polls.castVote);
}
