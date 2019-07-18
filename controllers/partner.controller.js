const Partner = require('../models/partner.model');

module.exports = {
    //POST PARTNER
    partner_create: function (req, res) {
        Partner.create(req.body, (err, partner) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Cant create partner'
                })
            } else {
                res.status(200).json({
                    success: true,
                    partner: partner
                })
            }
        })
    },

    //GET PARTNER
    partner_all: function (req, res) {
        Partner.find({}, (err, partners) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Cant get partner'
                })
            } else {
                res.status(200).json({
                    success: true,
                    partners: partners
                })
            }
        })
    },

    //GET PARTNER BY ID
    partner_detail: function (req, res) {
        Partner.findById(req.params.id, (err, partner) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Cant get partner by id'
                })
            } else {
                res.status(200).json({
                    success: true,
                    partner: partner
                })
            }
        })
    },

    //PUT PARTNER BY ID
    partner_update: function (req, res) {
        Partner.findByIdAndUpdate({
            _id: req.params.id
        }, req.body, (err, update) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Cant update partner'
                })
            } else {
                Partner.findById({
                    _id: req.params.id
                }, (err, id) => {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: "Error cant get by id"
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            update: id,
                            message: 'Success Update!'
                        })
                    }
                })
            }
        })
    },

    //DELETE PARTNER
    partner_delete: function (req, res) {
        Partner.findByIdAndDelete({
            _id: req.params.id
        }, (err, deleted) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Cant delete partner'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Succes delete partner'
                })
            }
        })
    }
}