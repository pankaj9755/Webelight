import library from '../entity/library'
export class UserRepository extends library.User {

    constructor() {
        super()
    }

    getUserByCategory(category) {
        return this.findAll({
            where: {
                category: category
            }
        })
    }

    getUserSortByName(isDesc?: false) {
        let order = (isDesc) ? 'DESC' : 'ASC'
        return this.findAll({
            order: [
                ['name', order]
            ]
        })
    }
}

const userRepository: UserRepository = new UserRepository()

export default userRepository
