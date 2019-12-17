import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PASSWORD_REGEXP } from './web.pattern';

function isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0
}

export class WebValidators {
    static fixedLength(length: number): ValidatorFn {
        return (control: AbstractControl) => {
            if (isEmptyInputValue(control.value)) {
                return null  // don't validate empty values to allow optional controls
            }

            const curLength: number = control.value ? control.value.length : 0

            return curLength !== length
                ? {length: {requiredLength: length, actualLength: curLength}}
                : null
        }
    }

    /**
     * Validator that compares the value of the given FormControls
     */
    static equalsTo(compareControl: FormControl | AbstractControl): ValidatorFn {
        return function (control: FormControl) {
            if (compareControl.value !== control.value) {
                return {equalsTo: {requiredValue: compareControl.value}}
            }

            return null
        }
    }

    static filterEmail(compareArray: string[]): ValidatorFn {
        return function (control: FormControl) {
            if (compareArray.includes(control.value)) {
                return {filterEmail: {requiredValue: compareArray}}
            }

            return null
        }
    }

    static matchingPasswords(password: string, confirmPassword: string) {
        return (group: FormGroup) => {
            const pwd = group.controls[password]
            const confirmPwd = group.controls[confirmPassword]
            if (pwd.value !== confirmPwd.value) {
                confirmPwd.setErrors({passwordsEqual: true})
            } else {
                confirmPwd.setErrors(null)
            }
        }
    }

    static agreementChecked(): ValidatorFn {
        return (agreement: AbstractControl) => {
            return (agreement.value === true) ? null : {
                checked: {
                    valid: false
                }
            }
        }
    }
}

export const NameValidator = [
    Validators.minLength(1),
    Validators.maxLength(100)
]

export const PhoneNumberValidator = [
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern(/^\d+[-\d]*$/)
]

export const PasswordValidator = [
    Validators.required,
    Validators.pattern(PASSWORD_REGEXP)
]
