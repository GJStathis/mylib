## TODO
x Create a route to get a list of all the users and their user id
x Add a table that allows users to store a list of user ids that are their friends
x Users must send a friend invite and the match must be mutal, each user gets the friend added to their account on accept


- If a user is not another users friend then they cannot look at their library
- Users should see if they are friends with someone or not if they are looking at the list of all users

- Routes
    - DONE: /friends/search
    - DONE: /friends/add
    - DONE: /friends/remove

    x /alerts/all
        x given a user id this should list the alerts that this user has
    x /alerts/add
        x This should be an authed route
        x given a user id and message payload this route should add an alert to a users alerts
        x Create an enum to handle duplicate key error code error codes
    x /alerts/remove
        x given a user id and alert id remove an alert from a user
