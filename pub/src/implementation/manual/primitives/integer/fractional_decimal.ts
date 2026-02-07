import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import * as _p from 'pareto-core/dist/assign'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'

import * as signatures from "../../../../interface/signatures"

export const deserialize: signatures.deserializers.primitives.integer.fractional_decimal = ($, abort, $p) => {
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

export const serialize: signatures.serializers.primitives.integer.fractional_decimal = ($, $p) => {

    return _p_list_build_deprecated<number>(($i) => {
        let value = $

        // Handle negative numbers
        if (value < 0) {
            $i['add item'](45) // '-'
            value = -value
        }

        // Calculate the divisor for the fractional part (10^fractionalDigits)
        let divisor = 1
        for (let i = 0; i < $p['number of fractional digits']; i++) {
            divisor *= 10
        }

        // Split into integer and fractional parts
        const integerPart = _p.number.integer.divide(value, divisor, () => _p_unreachable_code_path("the divisor is starting at 1 and is multiplied by 10 in each iteration, so it cannot be zero"))
        const fractionalPart = value % divisor

        // Generate integer part digits
        const integerDigits = _p_list_build_deprecated<number>(($i) => {
            let temp = integerPart
            if (temp === 0) {
                $i['add item'](0)
            } else {
                while (temp > 0) {
                    const digit = temp % 10
                    $i['add item'](digit)
                    temp = _p.number.integer.divide(temp, 10, () => _p_unreachable_code_path("the divisor is hardcoded to 10"))
                }
            }
        })

        // Add integer part (reverse order)
        for (let j = integerDigits.__get_number_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + integerDigits.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            ))
        }

        // Add decimal point
        $i['add item'](46) // '.'

        // Generate fractional part digits
        const fractionalDigits_list = _p_list_build_deprecated<number>(($i) => {
            let temp = fractionalPart
            for (let i = 0; i < $p['number of fractional digits']; i++) {
                const digit = temp % 10
                $i['add item'](digit)
                temp = _p.number.integer.divide(temp, 10, () => _p_unreachable_code_path("the divisor is hardcoded to 10"))
            }
        })

        // Add fractional part (reverse order)
        for (let j = fractionalDigits_list.__get_number_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + fractionalDigits_list.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            ))
        }
    })
}