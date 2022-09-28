const db    = require('../.././database/models');


const usersController ={

    'list': async(req, res) => {

        await db.User.findAll()
        .then(users => {
            const listUsers = [];
            users.forEach(user => {
                const data = {};
                data['id'] = user.id;
                data['name'] = user.name;
                data['email'] = user.email;
                data['ïmage'] = user.ïmage;
                listUsers.push(data);
            });
            res.status(200).json({
                meta: {
                    status: 200,
                    total:users.length,
                    url: 'api/users'
                },
                data: listUsers
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                meta:{
                    status: 404,
                    url: 'api/users'
                },
                data: "not found"
            });
        })
    },
    'detail': async(req, res) => {

        await db.User.findByPk(req.params.id)
        .then(user => {
            res.status(200).json({
                meta: {
                    status: 200,
                    url: "api/users/{id}"
                },
                data: {
                    // id: user.id,
                    // name: user.name,
                    // email: user.email,
                    // Image: user.Image
                    user
                }
        })
        .catch(err => {
            res.status(404).json({
                meta:{
                    status:404,
                    url: "api/users/{id}"
                },
                data: "not found"
            })
        })
        
    })},
    'lastUser': async(req, res) => {

            await db.user.findAll()
            .then( users =>{
                const listUsers = [];
            users.forEach(user => {
                const data = {};
                data['id'] = user.id;
                data['name'] = user.name;
                data['email'] = user.email;
                data['ïmage'] = user.ïmage;
                listUsers.push(data);
            });
            res.status(200).json({
                meta: {
                    status: 200,
                    total:users.length,
                    url: 'api/users'
                },
                data: listUsers.slice(-1)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                meta:{
                    status: 404,
                    url: 'api/users'
                },
                data: "not found"
            });
        })
                 

    }

        
}

module.exports = usersController;