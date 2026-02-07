import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import * as _p from 'pareto-core/dist/assign'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'

import * as signatures from "../../../../interface/signatures"

export const deserialize: signatures.deserializers.primitives.approximate_number.scientific_notation = ($, abort) => {
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

export const serialize: signatures.serializers.primitives.approximate_number.scientific_notation = ($, $p) => {
    return _p_list_build_deprecated(($i) => {
        // Handle special case for zero in scientific notation
        if ($ === 0) {
            $i['add item'](48) // '0'

            // Add decimal point if we have more than 1 digit
            if ($p.digits > 1) {
                $i['add item'](46) // '.'

                // Add the required number of zeros after decimal point
                for (let i = 0; i < $p.digits - 1; i++) {
                    $i['add item'](48) // '0'
                }
            }

            // Add exponent part for zero: e+0
            $i['add item'](101) // 'e'
            $i['add item'](43)  // '+'
            $i['add item'](48)  // '0'
            return
        }

        // Handle negative numbers
        if ($ < 0) {
            $i['add item'](45) // '-'
            $ = -$
        }

        // Calculate exponent and mantissa for scientific notation
        let exponent = 0
        let mantissa = $

        // Normalize to range [1, 10)
        if (mantissa >= 10) {
            while (mantissa >= 10) {
                mantissa = mantissa / 10
                exponent++
            }
        } else if (mantissa < 1) {
            while (mantissa < 1) {
                mantissa = mantissa * 10
                exponent--
            }
        }

        // Create scale factor by multiplying
        let scale_factor = 1
        for (let i = 0; i < $p.digits - 1; i++) {
            scale_factor = scale_factor * 10
        }

        // Simple rounding using integer operations
        const mantissa_scaled = _p.number.integer.divide(mantissa * scale_factor + 0.5, 1, () => _p_unreachable_code_path("the divisor is hardcoded to 1"))

        // Convert mantissa to string
        const digits = _p_list_build_deprecated<number>(($i) => {
            let temp = mantissa_scaled
            // temp is always > 0 here since mantissa_scaled = integer_division(mantissa * scale_factor + 0.5, 1)
            // where mantissa >= 1.0 (normalized) and scale_factor >= 1, so result >= 1
            do {
                const digit = temp % 10
                $i['add item'](digit)
                temp = _p.number.integer.divide(temp, 10, () => _p_unreachable_code_path("the divisor is hardcoded to 10"))
            } while (temp > 0)
        })

        // Add leading digit
        const first_digit = digits.__deprecated_get_possible_item_at(digits.__get_number_of_items() - 1).__decide(
            ($) => $,
            () => _p_unreachable_code_path("index cannot be out of bounds")
        )
        $i['add item'](48 + first_digit) // First digit

        // Add decimal point if we have more digits
        if ($p.digits > 1 && digits.__get_number_of_items() > 1) {
            $i['add item'](46) // '.'

            // Add remaining digits in reverse order
            for (let j = digits.__get_number_of_items() - 2; j >= 0; j--) {
                const digit = digits.__deprecated_get_possible_item_at(j).__decide(
                    ($) => $,
                    () => _p_unreachable_code_path("index cannot be out of bounds")
                )
                $i['add item'](48 + digit)
            }
        }

        // Add exponent part
        $i['add item'](101) // 'e'
        if (exponent < 0) {
            $i['add item'](45) // '-'
            exponent = -exponent
        } else {
            $i['add item'](43) // '+'
        }

        // Convert exponent to string
        const exp_digits = _p_list_build_deprecated<number>(($i) => {
            if (exponent === 0) {
                $i['add item'](0)
            } else {
                do {
                    const digit = exponent % 10
                    $i['add item'](digit)
                    exponent = _p.number.integer.divide(exponent, 10, () => _p_unreachable_code_path("the divisor is hardcoded to 10"))
                } while (exponent > 0)
            }
        })

        // Add exponent digits in reverse order
        for (let j = exp_digits.__get_number_of_items() - 1; j >= 0; j--) {
            const digit = exp_digits.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            )
            $i['add item'](48 + digit)
        }
    })
}