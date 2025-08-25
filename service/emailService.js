import dotenv from 'dotenv';

export const sendverificationEmail = async (email, code)=>{
    try {
        const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        text: `Your verification code is ${code}`
    }
    } catch (error) {
        console.log("Error sending verification email:", error)
    }
}