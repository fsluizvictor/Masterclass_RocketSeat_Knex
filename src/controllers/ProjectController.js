const knex = require('../database')

module.exports = {
    //funmção de listagem dinamica, pode ser repassado o id de um usuário específico
    async index(req, res) {

        try {

            const { user_id, page = 1 } = req.query

            const countObj = knex('projects').count()

            const query = knex('projects')
                .limit(5)
                .offset((page - 1) * 5)

            if (user_id) {
                query
                    .where({ user_id })
                    .join('users', 'users.id', '=', 'projects.user_id')
                    .select('projects.*', 'users.username')

                countObj
                    .where({ user_id })
            }

            const [count] = await countObj
            res.header('X-Total-Count', count["count"])

            const results = await query

            return res.json(results)

        } catch (error) {
            next(error)
        }
    },

    async create(req, res, next) {
        try {

            const { title, user_id } = req.body

            await knex('projects')
                .insert({
                    title,
                    user_id
                })

            return res.status(201).send()

        } catch (error) {
            next(error)
        }
    },
}