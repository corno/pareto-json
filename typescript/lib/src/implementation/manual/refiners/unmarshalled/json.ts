import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_in from "../../../../interface/to_be_generated/json"
import * as d_in_location from "astn-core/dist/interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/to_be_generated/json"
import * as d_function from "../../../../interface/to_be_generated/unmarshall"
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

// The functionality in this file is similar to its sibling implementation; astn_parse_tree. I'm not sure yet which one will be preferred.
//this one assumes that a parse tree is first converted into a JSON  value, and then the refiners are applied to it. The other one assumes that the refiners are applied directly to the parse tree, without an intermediate step. The second one is might be more efficient, but the implementation of this one is easier to understand.


export const Array: _pi.Refiner<
    d_out.Array,
    d_function.JSON_Unmarshall_Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'array': return _p.ss($, ($) => $)
            default: return abort({
                'type': ['not an array', null],
                'range': value.range,
            })
        }
    })
}

export const Boolean: _pi.Refiner<
    d_out.Boolean,
    d_function.JSON_Unmarshall_Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'boolean': return _p.ss($, ($) => $)
            default: return abort({
                'type': ['not a boolean', null],
                'range': value.range,
            })
        }
    })
}

export const Null: _pi.Refiner<
    d_out.Null,
    d_function.JSON_Unmarshall_Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'null': return _p.ss($, ($) => $)
            default: return abort({
                'type': ['not a null', null],
                'range': value.range,
            })
        }
    })
}

export const Number: _pi.Refiner<
    d_out.Number,
    d_function.JSON_Unmarshall_Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'number': return _p.ss($, ($) => $)
            default: return abort({
                'type': ['not a number', null],
                'range': value.range,
            })
        }
    })
}

export const Object: _pi.Refiner<
    d_out.Object,
    d_function.JSON_Unmarshall_Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'object': return _p.ss($, ($) => $)
            default: return abort({
                'type': ['not an object', null],
                'range': value.range,
            })
        }
    })
}

export const String: _pi.Refiner<
    d_out.String,
    d_function.JSON_Unmarshall_Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'string': return _p.ss($, ($) => $)
            default: return abort({
                'type': ['not a string', null],
                'range': value.range,
            })
        }
    })
}

export const Property: _pi.Refiner_With_Parameter<
    d_out.Property,
    d_function.JSON_Unmarshall_Error,
    d_in.Object,
    {
        'range': d_in_location.Range
        'key': string
    }
> = ($, abort, $p) => {
    return _p.decide.list(
        _p.dictionary.from.list(
            $.entries
        ).group(
            ($) => $.key
        ).__get_entry_deprecated(
            $p.key,
            {
                'no_such_entry': () => abort({
                    'type': ['missing property', $p.key],
                    'range': $p.range,
                })
            }
        )
    ).has_single_item(
        ($) => $.value,
        () => abort({
            'type': ['multiple properties with this key', $p.key],
            'range': $p.range,
        }),
        () => _p_unreachable_code_path("the list is the result of a group, it cannot be empty")
    )
}