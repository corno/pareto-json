import p_list_from_text from 'pareto-core/dist/implementation/specials/list_from_text'
import * as pt from 'pareto-core/dist/implementation/transformer'
import p_unreachable_code_path from 'pareto-core/dist/implementation/specials/unreachable_code_path'
import p_list_build_deprecated from 'pareto-core/dist/implementation/specials/list_build_deprecated'
import * as p_di from 'pareto-core/dist/interface/data'
import * as p_i from 'pareto-core/dist/interface/transformer'

import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export const Float: p_i.Transformer_With_Parameter<number, d_out.List_of_Characters, { 'digits': number }> = ($, $p) => {
    return p_list_build_deprecated(($i) => {
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
        const mantissa_scaled = pt.number.from.number.divide(
            mantissa * scale_factor + 0.5,
            1,
            ['towards zero', null],
            {
                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 1")
            }
        )

        // Convert mantissa to string
        const digits = p_list_build_deprecated<number>(
            ($i) => {
                let temp = mantissa_scaled
                // temp is always > 0 here since mantissa_scaled = integer_division(mantissa * scale_factor + 0.5, 1)
                // where mantissa >= 1.0 (normalized) and scale_factor >= 1, so result >= 1
                do {
                    const digit = temp % 10
                    $i['add item'](digit)
                    temp = pt.number.from.number.divide(
                        temp,
                        10,
                        ['towards zero', null],
                        {
                            divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                        }
                    )
                } while (temp > 0)
            }
        )

        // Add leading digit
        const first_digit = digits.__deprecated_get_possible_item_at(digits.__get_number_of_items() - 1).__decide(
            ($) => $,
            () => p_unreachable_code_path("index cannot be out of bounds")
        )
        $i['add item'](48 + first_digit) // First digit

        // Add decimal point if we have more digits
        if ($p.digits > 1 && digits.__get_number_of_items() > 1) {
            $i['add item'](46) // '.'

            // Add remaining digits in reverse order
            for (let j = digits.__get_number_of_items() - 2; j >= 0; j--) {
                const digit = digits.__deprecated_get_possible_item_at(j).__decide(
                    ($) => $,
                    () => p_unreachable_code_path("index cannot be out of bounds")
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
        const exp_digits = p_list_build_deprecated<number>(
            ($i) => {
                if (exponent === 0) {
                    $i['add item'](0)
                } else {
                    do {
                        const digit = exponent % 10
                        $i['add item'](digit)
                        exponent = pt.number.from.number.divide(
                            exponent,
                            10,
                            ['towards zero', null],
                            {
                                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                            }
                        )
                    } while (exponent > 0)
                }
            }
        )

        // Add exponent digits in reverse order
        for (let j = exp_digits.__get_number_of_items() - 1; j >= 0; j--) {
            const digit = exp_digits.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => p_unreachable_code_path("index cannot be out of bounds")
            )
            $i['add item'](48 + digit)
        }
    })
}

export const Fractional_Decimal: p_i.Transformer_With_Parameter<number, d_out.List_of_Characters, { 'number of fractional digits': number }> = ($, $p) => {

    return p_list_build_deprecated<number>(($i) => {
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
        const integerPart = pt.number.from.number.divide(
            value,
            divisor,
            ['towards zero', null],
            {
                divided_by_zero: () => p_unreachable_code_path("the divisor is starting at 1 and is multiplied by 10 in each iteration, so it cannot be zero")
            }
        )
        const fractionalPart = value % divisor

        // Generate integer part digits
        const integerDigits = p_list_build_deprecated<number>(($i) => {
            let temp = integerPart
            if (temp === 0) {
                $i['add item'](0)
            } else {
                while (temp > 0) {
                    const digit = temp % 10
                    $i['add item'](digit)
                    temp = pt.number.from.number.divide(
                        temp,
                        10,
                        ['towards zero', null],
                        {
                            divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                        }
                    )
                }
            }
        })

        // Add integer part (reverse order)
        for (let j = integerDigits.__get_number_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + integerDigits.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => p_unreachable_code_path("index cannot be out of bounds")
            ))
        }

        // Add decimal point
        $i['add item'](46) // '.'

        // Generate fractional part digits
        const fractionalDigits_list = p_list_build_deprecated<number>(($i) => {
            let temp = fractionalPart
            for (let i = 0; i < $p['number of fractional digits']; i++) {
                const digit = temp % 10
                $i['add item'](digit)
                temp = pt.number.from.number.divide(
                    temp,
                    10,
                    ['towards zero', null],
                    {
                        divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                    }
                )
            }
        })

        // Add fractional part (reverse order)
        for (let j = fractionalDigits_list.__get_number_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + fractionalDigits_list.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => p_unreachable_code_path("index cannot be out of bounds")
            ))
        }
    })
}

export const String = (
    $: string,
): d_out.List_of_Characters => pt.literal.nested_list([
    [
        0x22, // "
    ],
    pt.list.from.list(
        p_list_from_text($, ($) => $),
    ).flatten(
        ($): p_di.List<number> => {
            switch ($) {
                case 0x2F: // slash (\/)
                    return pt.literal.list([
                        0x5c, // \
                        0x2f, // /
                    ])
                case 0x22: // " (\")
                    return pt.literal.list([
                        0x5C, // \
                        0x22, // "
                    ])
                case 0x5C: // \ (\\)
                    return pt.literal.list([
                        0x5C, // \
                        0x5C, // \
                    ])
                case 0x08: // backspace (\b)
                    return pt.literal.list([
                        0x5C, // \
                        0x62, // b
                    ])
                case 0x0C: // form feed (\f)
                    return pt.literal.list([
                        0x5C, // \
                        0x66, // f
                    ])
                case 0x0A: // line feed (\n)
                    return pt.literal.list([
                        0x5C, // \
                        0x6E, // n
                    ])
                case 0x0D: // carriage return (\r)
                    return pt.literal.list([
                        0x5C, // \
                        0x72, // r
                    ])
                case 0x09: // horizontal tab (\t)
                    return pt.literal.list([
                        0x5C, // \
                        0x74, // t
                    ])
                case 0x0B: // vertical tab (\v)
                    return pt.literal.list([
                        0x5C, // \
                        0x76, // v
                    ])
                default: {
                    return pt.literal.list([
                        $,
                    ])
                }
            }
        }
    ),
    [
        0x22, // "
    ]
])