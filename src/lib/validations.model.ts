export interface ValidationsFormModel {
    result: boolean,
    errors: string[] | undefined,
}

export interface Errors {
    name: string,
    surname: string,
    email: string,
    phone: string,
    message: string,
    terms: boolean,
}

export enum ErrorMessages {
    empty = "Field required.",
    notValid = "Insert a valid format."
}
