import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_in from "../../../../interface/to_be_generated/json_with_parse_info"
import * as d_in_location from "astn-core/dist/interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/to_be_generated/json_x"
import * as d_function from "../../../../interface/to_be_generated/unmarshalled_from_json"
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//dependencies
import * as r_json_y from "../json_y/json_with_parse_info"


export const Array: _pi.Refiner<
    d_out.Array,
    d_function.Error,
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
    d_function.Error,
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
    d_function.Error,
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
    d_function.Error,
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
    d_function.Error,
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

export const Object_No_Unexpected_Properties: _pi.Refiner_With_Parameter<
    d_out.Object_No_Unexpected_Properties,
    d_function.Error,
    d_in.Value,
    {
        'expected properties': _pi.Dictionary<null>
    }
> = ($, abort, $p) => {


    const object = r_json_y.Object_With_Unique_Keys(
        Object($, abort),
        ($) => abort({
            'type': ['multiple properties with this key', $['conflicting key']],
            'range': $['range'],
        })
    )

    const unexpected_properties = _p.dictionary.from.dictionary(
        _p.dictionary.from.dictionary(
            object.properties,
        ).join(
            $p['expected properties'],
            ($, other, id): _pi.Optional_Value<d_in_location.Range> => _p.decide.optional(
                other,
                () => _p.optional.literal.not_set(),
                () => _p.optional.literal.set($.key.range)
            )
        )
    ).map_optionally(
        ($) => $
    )

    if (unexpected_properties.__get_number_of_entries() > 0) {
        return abort({
            'range': $.range,
            'type': ['unexpected properties', unexpected_properties],
        })
    }
    return object
}

export const String: _pi.Refiner<
    d_out.String,
    d_function.Error,
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
    d_function.Error,
    d_out.Object_With_Unique_Keys,
    {
        'key': string
    }
> = ($, abort, $p) => {
    const range = $.range
    return $.properties.__get_entry_deprecated(
        $p.key,
        {
            'no_such_entry': () => abort({
                'type': ['missing property', $p.key],
                'range': range,
            })
        }
    )
}

export const Nullable_Value = (
    $: d_in.Value,
): d_out.Nullable_Value => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'null': return _p.optional.literal.not_set()
            default: return _p.optional.literal.set(value)
        }
    })
}