import SelectLists from "../Model/SelectLists.js";
import {Router} from "express";

const router = Router();

router.get('/select',async (req,res) => {
    try {
        const select = await SelectLists.find({})
        res.status(200).json(select)

    } catch (e) {
        res.status(500).json({message:'Something went wrong'});
    }
})

router.post('/select',async (req,res) => {
    try {
        const select = new SelectLists({
            label:req.body.label
        })
        await select.save();
        res.status(201).json({message:'Select has been added'});

    } catch (e) {
        res.status(500).json({message:'Something went wrong'});
    }
})

router.delete('/select',async (req,res) => {
    try {
        await SelectLists.deleteOne({label:req.body.label});
        res.status(201).json({message:'Select has been deleted'});

    } catch (e){
        res.status(500).json({message:'Something went wrong'});
    }
})

export default router;