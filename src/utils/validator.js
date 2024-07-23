import validator from 'is_js';

const checkEmpty = (val, key) => {
    if (validator.empty(val.trim())) {
        return `${key}`;
    } else {
        return '';
    }
}

const checkMinLength = (val, minLength, key) => {
    if (val.trim().length < minLength) {
        return `Please enter valid ${key}`
    } else {
        return '';
    }
}

// export default function validate(data) {
//     const { name, mobile, email, password } = data;

//     if (name !== undefined) {
//         let emptyValidationText = checkEmpty(name, 'Please enter your user name');
//         if (emptyValidationText !== '') {
//             return emptyValidationText;
//         } else {
//             let minLengthValidation = checkMinLength(name, 3, 'userName');
//             if (minLengthValidation !== '') {
//                 return minLengthValidation;
//             }
//         }
//     }

//     if (email !== undefined) {
//         let emptyValidationText = checkEmpty(email, 'Please enter your email');
//         if (emptyValidationText !== '') {
//             return emptyValidationText;
//         } else {
//             if (!validator.email(email)) {
//                 return 'Please enter valid email';
//             }
//         }
//     }

//     if (mobile !== undefined) {
//         let emptyValidationText = checkEmpty(mobile, 'Please enter your mobile number');
//         if (emptyValidationText !== '') {
//             return emptyValidationText;
//         } else {
//             if (!validator.isMobilePhone(mobile, 'any', { strictMode: false })) {
//                 return 'Please enter valid mobile number';
//             } else if (mobile.length !== 10) {
//                 return 'Mobile number must be 10 digits long';
//             }
//         }
//     }

//     if (password !== undefined) {
//         let emptyValidationText = checkEmpty(password, 'Please enter your password');
//         if (emptyValidationText !== '') {
//             return emptyValidationText;
//         } else {
//             let minLengthValidation = checkMinLength(password, 6, 'password');
//             if (minLengthValidation !== '') {
//                 return minLengthValidation;
//             }
//         }
//     }
// }

export default function validate(data) {
    const { email, password } = data;
    

    if (!email) {
        return 'Please enter your email';
    } else if (!validator.email(email)) {
                         return 'Please enter valid email';
    }

    if (!password) {
        return 'Please enter your password';
    } else if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }

   
}
