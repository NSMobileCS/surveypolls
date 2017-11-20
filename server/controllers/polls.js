const mongoose = require('mongoose');

const Poll = mongoose.model("Poll");

const qMap = {      //translates param --> prop name
    '0': "votes_q0",
    '1': "votes_q1",
    '2': "votes_q2",
    '3': "votes_q3"
}

module.exports = {

    login: function(req, res) {
        console.log(req.body);
        req.session.user = req.body.username;
        console.log(`polls ctrl'r login function called. session-user:
        ${req.session.user}`);
        return res.json({user: req.session.user});
    },

    logout: function(req, res){
        req.session = null;
        res.status(200).json({"status":"OK"});
    },

    checkLogin: function(req, res){
        let user = req.session.user;
        console.log(`polls.checkLogin called session-user: ${user}`);
        return res.json({'username': user});

    },

    getAllPolls: function (req, res) {
        Poll.find(
            {},
            (err, surveys) => {
                // console.log(surveys);
                return res.json(surveys);
            }
        )
    },

    getOnePoll: function (req, res) {
        console.log(`polls.js.getOnePoll: req.params.id: ${req.params.id}`)
        Poll.findOne(
            {_id: req.params.id},
            (err, foundPoll) => {
                if (err) {
                    console.log(`server.polls.getOnePoll -> ERROR -> ${err}`);
                }
                return res.json(foundPoll);
            }
        );
    },

    addNewPoll: function (req, res) {
        console.log(req.body);
        if (!req.session.user){
            return res.redirect('/');
        }
        else {
            Poll.create({
                question: req.body.question,
                q0: req.body.q0,
                q1: req.body.q1,
                q2: req.body.q2,
                q3: req.body.q3,
                author: req.session.user
            },
            (err, newpoll) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
                else {
                    return res.sendStatus(200);
                }
            })
        }
    },

    modifyPoll: function (req, res) {
        Poll.find(
            {_id: req.params.id},
            (err, foundPoll) => {
                if (err) {console.log(err)};
                if (foundPoll.author != req.session.user){
                    return res.sendStatus(400);
                }
                if (req.body.question){foundPoll.question = req.body.question};
                if (req.body.q0){foundPoll.q0 = req.body.q0};
                if (req.body.q1){foundPoll.q1 = req.body.q1};
                if (req.body.q2){foundPoll.q2 = req.body.q2};
                if (req.body.q3){foundPoll.q3 = req.body.q3};
                foundPoll.save( (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(400);
                    }
                    else {
                        return res.sendStatus(200);
                    }
                });
            }
        )
    },

    deletePoll: function (req, res) {
        Poll.remove(
            {_id: req.params.id, username: req.session.user},
            (err) => {
                if (err) {
                    console.log('DELETEPOLL ERROR', err);
                    return res.sendStatus(400);
                }
                return res.sendStatus(200);
            }
        );
    },

    castVote: function (req, res) {
        console.log(`server | polls.js.castVote | req.body: ${req.body}`);
        Poll.findOne(
            {_id: req.params.id},
            (err, foundPoll) => {
                // console.log(foundPoll);
                foundPoll[qMap[req.body.qVote]] += 1;
                // console.log(foundPoll);
                foundPoll.save(
                    (errOnSave) => {
                        if (errOnSave) {
                            console.log('ERROR ON VOTE SAVE', errOnSave);
                        }
                    }
                );
                if (err) {
                    console.log(err);
                    return res.status(400).json(err)
                }
                return res.status(200).json(foundPoll);
            }
        )
    }
}