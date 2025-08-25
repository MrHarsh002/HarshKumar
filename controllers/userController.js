import User from "../models/userModel.js";

export const registerUser = async(res, req) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(404).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = crypto.randomBytes(20).toString('hex')

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isVarified: false,
            verificationCode
        });

        await newUser.save();

    } catch (error) {
        console.error("Error to register user", error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const verifyUser = async(res, req) => {
    const {code} = req.params;
    const user = await User.findOne({verificationCode: code})
    if(!user){
        return res.status(400).json({
            message: "Invalid or expired verification code"
        })
    }
    if(user.isVarified){
        return res.status(404).json({
            message: "Email already verified"
        })
    }
    user.isVarified = true
    user.verificationCode = 'verified- ' + Date.now();
    await user.save();
    return res.status(200).json({
        message : "Email verified successfully"
    })
}

export const loginUser = async(res, req) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Email and Password are requierd"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }
        if(!user.isVarified){
            return res.status(401).json({
                message: 'Please verify your email'
            })
        }
        const isPasswordmatch = await bcrypt.compare(password, user.password);
        if(!isPasswordmatch){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        return res.status(200).json({
            message: "Login Successfull"
        })
    } catch (error) {
        console.log("Error in login user", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}