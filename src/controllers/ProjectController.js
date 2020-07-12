const knex = require('../database')

module.exports = {
    //funmção de listagem dinamica, pode ser repassado o id de um usuário específico
    async index(req, res) {

        try {

            const { user_id } = req.query

            const query = knex('projects')

            if (user_id) {
                query
                    .where({ user_id })
                    .join('users', 'users.id', '=', 'projects.user_id')
                    .select('projects.*', 'users.username')
            }

            const results = await query

            return res.json(results)

        } catch (error) {
            next(error)
        }
    },
}