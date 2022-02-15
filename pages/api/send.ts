import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
type Data = {
  success: boolean
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if(req.method === 'POST'){
    const{name, email, message}: {name: string, email: string, message: string} = req.body
    const msg = {
      to: 'me@cheryljones.com.au',
      from:'me@cheryljones.com.au',
      subject: `${name.toUpperCase()} sent you a message`,
      text: `Email: ${email} `,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email} </p> <p><strong>message:</strong> ${message}</p>`
    }
    try{
      await sgMail.send(msg)
      res.status(200).json({success: true})
    } catch(err) {
      res.status(200).json({success: false})
    }
  }
  
}