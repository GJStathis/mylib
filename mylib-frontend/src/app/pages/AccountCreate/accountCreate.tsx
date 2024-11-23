import FormInputBlock from "../../../components/FormInputBlock/forminputblock"
import { useState } from "react"
import { UserModel, ResponseMessage } from "../../../types/interfaces"
import { useNavigate } from "react-router-dom"

export default function AccountCreate() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const emailValidationRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    const minPasswordLength = 8
    const minPasswordComplexity = 4
    const navigate = useNavigate()


    function validatePassword(password: string, confirmPassword: string): boolean {

        if(password !== confirmPassword) {
            alert("Please ensure that passwords match")
            return false
        }

        if(password.length < minPasswordLength) {
            alert("Please ensure that password is greater then 8 characters")
            return false
        }

        let complexitySum = 0
        complexitySum += /[A-Z]+/.test(password) ? 1 : 0;
        complexitySum += /[a-z]+/.test(password) ? 1 : 0;
        complexitySum += /[0-9]+/.test(password) ? 1 : 0;
        complexitySum += /[\W]+/.test(password) ? 1 : 0;
        
        if(complexitySum < minPasswordComplexity) {
            alert("Please ensure that password includes at least\n 1 uppercase character\n 1 lowercase character\n 1 numeric value\n 1 sepcial character like !,@,#,...")
            return false
        }

        return true
    }

    function createAccount(e: React.FormEvent<HTMLFormElement>) {
        const emailIsValid = emailValidationRegex.test(email)
        const passwordIsValid = validatePassword(password, confirmPassword)
        const nameExists = name.length > 0

        if(!emailIsValid) {
            alert("Please enter a valid email address")
            return
        }

        if(!passwordIsValid) {
            return
        }

        if(!nameExists) {
            alert("Please remember to enter your name")
            return
        }

        const body: UserModel = {
            auth_origin: "Local",
            display_name: name,
            email: email,
            password: password
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/user`, {
            method: "POST",
            body: JSON.stringify(body)
        })
        .then((res) => {
            if(res.status !== 200) {
                return res.json().then((errData: ResponseMessage) => {
                    throw new Error(`Error: ${errData.message}`)
                })
            }

            return res.json()
        })
        .then((data) => {
            alert("User succesfully created")
            navigate("/login")
        })
        .catch((err) => {
            alert(err)
        })
    }


    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-[350px] p-[10px] border-2 border-black rounded-[10px] drop-shadow-[5px_5px_5px_black] bg-[#FAF9F6] flex items-center justify-center flex-col">
                <h3 className="m-0 text-2xl font-typeMachine">Create Account</h3>
                <hr className="m-0 w-1/2 mb-5" />
                <form onSubmit={(e) => createAccount(e)}>
                    <FormInputBlock>
                        <label htmlFor="name">name</label>
                        <input type="text" id="name" placeholder="first and last name" className="border-2 border-black rounded-[10px] h-[30px] p-2" value={name} onChange={e => setName(e.target.value)}/>
                    </FormInputBlock>


                    <FormInputBlock>
                        <label htmlFor="email">email</label>
                        <input type="text" id="email" className="border-2 border-black rounded-[10px] h-[30px] p-2" value={email} onChange={e => setEmail(e.target.value)}/>
                    </FormInputBlock>

                    <FormInputBlock>
                        <label htmlFor="password">password</label>
                        <input type="password" id="password" className="border-2 border-black rounded-[10px] h-[30px] p-2" value={password} onChange={e => setPassword(e.target.value)}/>
                    </FormInputBlock>

                    <FormInputBlock>
                        <label htmlFor="confirmPassword">confirm password</label>
                        <input type="password" id="confirmPassword" className="border-2 border-black rounded-[10px] h-[30px] p-2" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    </FormInputBlock>

                    <input type="submit" 
                           value="Create Account"
                           className="h-[30px] mt-2 bg-transparent border border-black rounded-[5px] transition-all duration-100 ease-in-out hover:bg-black hover:text-white font-bold p-2 leading-none disabled:cursort-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:text-gray-500"/>
                </form>
            </div>
        </div>
    )
}