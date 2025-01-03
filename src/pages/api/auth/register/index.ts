import {NextApiRequest, NextApiResponse} from "next";
import {userApiInstance} from "@/utils/axios.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        const {fullname, email, password, username, phone, dateOfBirth} = req.body;
        const response = await userApiInstance.post("api/user/public/register", {
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            phone: phone,
            date_of_birth: dateOfBirth
        });
        if (response.status != 200) {
            res.status(400).end("Failed to register");
        }
        else {
            res.status(200).end("Register success");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).end("Internal server error");
    }
}