export class User {
    id: number
    userName: string
    email: string
    password: string
    status: string
    mobileNumber: number

    constructor() {
        this.id = 0
        this.userName = null
        this.email = null
        this.password = null
        this.status = null
        this.mobileNumber = 0
    }

    getId(id: number) {
        this.id = id
    }

    getUserName(userName: string) {
        this.userName = userName
    }

    getEmail(email: string) {
        this.email = email
    }

    getPassword(password: string) {
        this.password = password
    }

    getStatus(status: string) {
        this.status = status
    }

    getMobileNumber(mobileNumber: number) {
        this.mobileNumber = mobileNumber
    }

    setId(id: number) {
       this.id = id
    }

    setUserName(userName: string) {
        this.userName = userName
    }

    setEmail(email: string) {
        this.email = email
    }

    setPassword(password: string) {
        this.password = password
    }

    setStatus(status: string) {
        this.status = status
    }

    setMobileNumber(mobileNumber: number) {
        this.mobileNumber = mobileNumber
    }

   
}