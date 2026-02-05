const stripe=require("../config/stripe");

exports.createPaymentIntent =async(req,res)=>{

    try {
        const {amount}=req.body
        if(!amount){
            return res.status(400).json({msg:"Amount and currency required"})
        }

        const paymentMethod=await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            payment_method: 'pm_card_visa',
            payment_method_types: ['card'],
        }) 
        res.status(200).json({
            "paymentClientSecret" :paymentMethod
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({
            error:error.message
        })
    }

};

exports.paymentConfirm=async(req,res)=>{
    try {     
        const {paymentIntentId,paymentMethod}=req.body
        const paymentconfirmation=await stripe.paymentIntents.confirm(paymentIntentId,{
            payment_method:paymentMethod,
        })
        res.json(paymentconfirmation);
     } catch (error) {
        console.log(error);
        res.json(error.message)
    }

}

