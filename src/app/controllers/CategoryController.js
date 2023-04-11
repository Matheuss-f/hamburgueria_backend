import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const {admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        const { name } = request.body

        const categoryExistis = await Category.findOne({
            where: { name },
        })

        if (categoryExistis) {
            return response.status(400).json({ error: 'Category name already exists' })
        }

        const { id } = await Category.create({ name })

        return response.json({ name, id })
    }

    async index(requet, response) {
        const category = await Category.findAll()

        return response.json(category)
    }
}

export default new CategoryController()
