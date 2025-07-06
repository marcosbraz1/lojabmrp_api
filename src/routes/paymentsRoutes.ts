// src/routes/privateRoutes.ts
import { Router, Request, Response } from 'express'
import { authenticateToken } from '../middlewares/authMiddleware'
import { Preference } from 'mercadopago'
const token: string = process.env.MP_TOKEN!
const payments = new Preference({
    accessToken: token,
    options: { timeout: 5000 },
})
const router = Router()

router.post('/create', async (req: Request, res: Response) => {
    let data = null
    try {
        const response = await payments
            .create({
                body: {
                    items: [
                        {
                            id: '1234',
                            title: 'Dummy Title',
                            description: 'Dummy description',
                            picture_url: 'https://www.myapp.com/myimage.jpg',
                            category_id: 'car_electronics',
                            quantity: 1,
                            currency_id: 'BRL',
                            unit_price: 10,
                        },
                    ],
                    marketplace_fee: 0,
                    payer: {
                        name: 'Test',
                        surname: 'User',
                        email: 'your_test_email@example.com',
                        phone: {
                            area_code: '11',
                            number: '4444-4444',
                        },
                        identification: {
                            type: 'CPF',
                            number: '19119119100',
                        },
                        address: {
                            zip_code: '06233200',
                            street_name: 'Street',
                            street_number: '123',
                        },
                    },
                    back_urls: {
                        success: 'https://test.com/success',
                        failure: 'https://test.com/failure',
                        pending: 'https://test.com/pending',
                    },
                    differential_pricing: {
                        id: 1,
                    },
                    expires: false,
                    additional_info: 'Discount: 12.00',
                    auto_return: 'all',
                    binary_mode: true,
                    external_reference: '1643827245',
                    marketplace: 'marketplace',
                    notification_url: 'https://notificationurl.com',
                    operation_type: 'regular_payment',
                    payment_methods: {
                        default_payment_method_id: 'master',
                        excluded_payment_types: [
                            {
                                id: 'ticket',
                            },
                        ],
                        excluded_payment_methods: [
                            {
                                id: '',
                            },
                        ],
                        installments: 5,
                        default_installments: 1,
                    },

                    statement_descriptor: 'Test Store',
                },
            })
            .then((rest) => {
                console.log(rest)
                res.json(rest)
            })
    } catch (error) {
        console.error(error)
        res.sendStatus(400)
    }

    return
})

export default router
