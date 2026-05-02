import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import * as _p from 'pareto-core/dist/assign'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import * as _pi from 'pareto-core/dist/interface'

import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export const Float: _pi.Transformer_With_Parameter<number, d_out.List_of_Characters, { 'digits': number }> = ($, $p) => {
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
        const mantissa_scaled = _p.number.integer.divide(
            mantissa * scale_factor + 0.5,
            1,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 1")
            }
        )

        // Convert mantissa to string
        const digits = _p_list_build_deprecated<number>(($i) => {
            let temp = mantissa_scaled
            // temp is always > 0 here since mantissa_scaled = integer_division(mantissa * scale_factor + 0.5, 1)
            // where mantissa >= 1.0 (normalized) and scale_factor >= 1, so result >= 1
            do {
                const digit = temp % 10
                $i['add item'](digit)
                temp = _p.number.integer.divide(
                    temp,
                    10,
                    {
                        divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                    }
                )
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
                    exponent = _p.number.integer.divide(
                        exponent,
                        10,
                        {
                            divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                        }
                    )
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

export const Fractional_Decimal: _pi.Transformer_With_Parameter<number, d_out.List_of_Characters, { 'number of fractional digits': number }> = ($, $p) => {

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
        const integerPart = _p.number.integer.divide(
            value,
            divisor,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is starting at 1 and is multiplied by 10 in each iteration, so it cannot be zero")
            }
        )
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
                    temp = _p.number.integer.divide(
                        temp,
                        10,
                        {
                            divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                        }
                    )
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
                temp = _p.number.integer.divide(
                    temp,
                    10,
                    {
                        divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                    }
                )
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

export const String = (
    $: string,
): d_out.List_of_Characters => _p.list.nested_literal_old([
    [
        0x22, // "
    ],
    _p.list.from.list(
        _p_list_from_text($, ($) => $),
    ).flatten(
        ($): _pi.List<number> => {
            switch ($) {
                case 0x2F: // slash (\/)
                    return _p.list.literal([
                        0x5c, // \
                        0x2f, // /
                    ])
                case 0x22: // " (\")
                    return _p.list.literal([
                        0x5C, // \
                        0x22, // "
                    ])
                case 0x5C: // \ (\\)
                    return _p.list.literal([
                        0x5C, // \
                        0x5C, // \
                    ])
                case 0x08: // backspace (\b)
                    return _p.list.literal([
                        0x5C, // \
                        0x62, // b
                    ])
                case 0x0C: // form feed (\f)
                    return _p.list.literal([
                        0x5C, // \
                        0x66, // f
                    ])
                case 0x0A: // line feed (\n)
                    return _p.list.literal([
                        0x5C, // \
                        0x6E, // n
                    ])
                case 0x0D: // carriage return (\r)
                    return _p.list.literal([
                        0x5C, // \
                        0x72, // r
                    ])
                case 0x09: // horizontal tab (\t)
                    return _p.list.literal([
                        0x5C, // \
                        0x74, // t
                    ])
                case 0x0B: // vertical tab (\v)
                    return _p.list.literal([
                        0x5C, // \
                        0x76, // v
                    ])
                default: {
                    return _p.list.literal([
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