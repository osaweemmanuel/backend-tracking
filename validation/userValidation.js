const { body, query, validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        try {
            // Run all validations
            for (const validation of validations) {
                await validation.run(req);
            }

            // Collect validation errors
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                return next(); // Proceed if no errors
            }

            // Send error response
            return res.status(400).json({ errors: errors.array() });
        } catch (error) {
            // Handle any errors that occur during validation
            console.error('Validation Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};


const signupValidation = () => {
    return [
        // Custom validation to ensure either body or query is provided for firstname
        body('firstname').custom((value, { req }) => {
            if (!value && !req.query.firstname) {
                throw new Error('Firstname must be provided in either body or query');
            }
            return true;
        }),

        // Custom validation to ensure either body or query is provided for lastname
        body('lastname').custom((value, { req }) => {
            if (!value && !req.query.lastname) {
                throw new Error('Lastname must be provided in either body or query');
            }
            return true;
        }),

        // Custom validation to ensure either body or query is provided for gender
        body('gender').custom((value, { req }) => {
            if (!value && !req.query.gender) {
                throw new Error('Gender must be provided in either body or query');
            }
            return true;
        }),

        // Custom validation to ensure either body or query is provided for email
        body('email').custom((value, { req }) => {
            if (!value && !req.query.email) {
                throw new Error('Email must be provided in either body or query');
            }
            return true;
        }),

        // Custom validation to ensure either body or query is provided for password
        body('password').custom((value, { req }) => {
            if (!value && !req.query.password) {
                throw new Error('Password must be provided in either body or query');
            }
            return true;
        }),

        // Optionally check the fields from query or body if provided
        query('firstname').notEmpty().withMessage("Firstname is required").optional(),
        body('firstname').notEmpty().withMessage("Firstname is required").optional(),

        query('lastname').notEmpty().withMessage("Lastname is required").optional(),
        body('lastname').notEmpty().withMessage("Lastname is required").optional(),

        query('gender').notEmpty().withMessage("Gender is required").optional(),
        body('gender').notEmpty().withMessage("Gender is required").optional(),

        query('email').isEmail().withMessage("Enter a valid email").optional(),
        body('email').isEmail().withMessage("Enter a valid email").optional(),

        query('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters").optional(),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters").optional(),
    ];
};


const loginValidation = () => {
    return [
        // Custom validation to ensure either body or query is provided for email
        body('email').custom((value, { req }) => {
            if (!value && !req.query.email) {
                throw new Error('Email must be provided in either body or query');
            }
            return true;
        }),

        // Custom validation to ensure either body or query is provided for password
        body('password').custom((value, { req }) => {
            if (!value && !req.query.password) {
                throw new Error('Password must be provided in either body or query');
            }
            return true;
        }),

        // Optionally check email and password from query or body if provided
        query('email').isEmail().withMessage("Enter a valid email").optional(),
        body('email').isEmail().withMessage("Enter a valid email").optional(),
        
        // Ensure password has at least 6 characters (optional validation for both query and body)
        query('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters").optional(),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters").optional(),
    ];
};

module.exports = { validate, signupValidation, loginValidation };
