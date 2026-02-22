import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import * as _p from 'pareto-core/dist/assign'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export const Float: _pi.Refiner_With_Parameter<number, string, d_out.List_of_Characters, { 'digits': number }> = ($, abort) => {
    const characters = $
    let result = 0
    let isNegative = false
    let startIndex = 0
    let decimalPart = 0
    let decimalDivisor = 1
    let exponent = 0
    let isExponentNegative = false
    let hasDecimal = false
    let inExponent = false

    const get_character_at = (index: number): number => characters.__deprecated_get_possible_item_at(index).__decide(
        ($) => $,
        () => abort("index out of bounds")
    )

    // Check for negative sign
    if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }

    // Parse the number
    for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)

        if (charCode === 46) { // '.'
            if (hasDecimal || inExponent) {
                abort("Invalid decimal format: multiple decimal points or decimal in exponent")
            }
            hasDecimal = true
        } else if (charCode === 101 || charCode === 69) { // 'e' or 'E'
            if (inExponent) {
                abort("Invalid decimal format: multiple exponent markers")
            }
            inExponent = true
            // Check for exponent sign
            if (i + 1 < characters.__get_number_of_items()) {
                const nextChar = get_character_at(i + 1)
                if (nextChar === 45) { // '-'
                    isExponentNegative = true
                    i++
                } else if (nextChar === 43) { // '+'
                    i++
                }
            }
        } else if (charCode >= 48 && charCode <= 57) { // '0'-'9'
            const digit = charCode - 48

            if (inExponent) {
                exponent = exponent * 10 + digit
            } else if (hasDecimal) {
                decimalPart = decimalPart * 10 + digit
                decimalDivisor = decimalDivisor * 10
            } else {
                result = result * 10 + digit
            }
        } else {
            abort("Invalid character in decimal string")
        }
    }

    // Combine integer and decimal parts
    let finalResult = result + (decimalPart / decimalDivisor)

    // Apply exponent
    if (isExponentNegative) {
        exponent = -exponent
    }

    // Apply exponent by multiplying/dividing by 10
    if (exponent > 0) {
        for (let i = 0; i < exponent; i++) {
            finalResult = finalResult * 10
        }
    } else if (exponent < 0) {
        for (let i = 0; i < -exponent; i++) {
            finalResult = finalResult / 10
        }
    }

    return isNegative ? -finalResult : finalResult
}

export const fractional_decimal: _pi.Refiner_With_Parameter<number, string, d_out.List_of_Characters, { 'number of fractional digits': number }> = ($, abort, $p) => {
    const characters = $
    let isNegative = false
    let startIndex = 0
    let decimalPointIndex = -1

    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort("Empty string is not a valid fractional decimal number")
    }

    const get_character_at = (index: number): number => {
        return characters.__deprecated_get_possible_item_at(index).__decide(
            ($) => $,
            () => abort("index out of bounds")
        )
    }

    // Check for negative sign
    if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }

    // Find decimal point and validate characters
    for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)

        if (charCode === 46) { // '.'
            if (decimalPointIndex !== -1) {
                abort("Multiple decimal points found")
            }
            decimalPointIndex = i
        } else if (!(charCode >= 48 && charCode <= 57)) {
            abort("Invalid character in fractional decimal string")
        }
    }

    // Must have a decimal point
    if (decimalPointIndex === -1) {
        abort("No decimal point found in fractional decimal string")
    }

    // Check that we have digits before decimal point
    if (decimalPointIndex === startIndex) {
        abort("No digits before decimal point")
    }

    // Calculate number of fractional digits in input
    const inputFractionalDigits = characters.__get_number_of_items() - decimalPointIndex - 1
    const expectedFractionalDigits = $p['number of fractional digits']

    // Check that the number of fractional digits matches expected
    if (inputFractionalDigits !== expectedFractionalDigits) {
        abort(`Expected ${expectedFractionalDigits} fractional digits, but found ${inputFractionalDigits}`)
    }

    // Parse integer part
    let result = 0
    for (let i = startIndex; i < decimalPointIndex; i++) {
        const charCode = get_character_at(i)
        const digit = charCode - 48
        result = result * 10 + digit
    }

    // Parse fractional part
    for (let i = decimalPointIndex + 1; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)
        const digit = charCode - 48
        result = result * 10 + digit
    }

    return isNegative ? -result : result
}