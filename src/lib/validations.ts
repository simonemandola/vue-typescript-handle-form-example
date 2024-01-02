import type {Errors, ValidationsFormModel} from "@/lib/validations.model.ts"
import {ErrorMessages} from "@/lib/validations.model.ts"

const EmailPattern = new RegExp("^[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$")
const JustNumbersPattern = new RegExp('^[0-9]+$')

function isEmptyField(field: string): string {
    return field.length === 0
        ? ErrorMessages.empty
        : undefined
}

function validatePattern(pattern: RegExp, text: string): boolean {
    return pattern.test(text)
}

export function validateForm(
    name: string,
    surname: string,
    email: string,
    phone: string,
    message: string,
    terms: boolean
): ValidationsFormModel {
    const errors: Errors = {}

    // name
    errors.name = isEmptyField(name)

    // surname
    errors.surname = isEmptyField(surname)

    // email
    if (!isEmptyField(email) || !validatePattern(EmailPattern, email)) {
        if (isEmptyField(email)) {
            errors.email = ErrorMessages.empty
        } else if (!validatePattern(EmailPattern, email)) {
            errors.email = ErrorMessages.notValid
        }
    } else {
        errors.email = undefined
    }

    // phone
    if (!isEmptyField(phone) || !validatePattern(JustNumbersPattern, phone)) {
        if (isEmptyField(phone)) {
            errors.phone = ErrorMessages.empty
        } else if (!validatePattern(JustNumbersPattern, phone)) {
            errors.phone = ErrorMessages.notValid
        }
    } else {
        errors.phone = undefined
    }

    // message
    errors.message = isEmptyField(message)

    // terms
    errors.terms = terms
        ? undefined
        : ErrorMessages.empty

    return {
        result: Object.values(errors).every(field => field === undefined), // Check for errors
        errors
    }

}