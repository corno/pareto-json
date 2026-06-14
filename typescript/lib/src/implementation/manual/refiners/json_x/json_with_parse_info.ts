import * as p_di from 'pareto-core/dist/data/interface'
import * as pt from 'pareto-core/dist/assign'
import * as p_ri from 'pareto-core/dist/refiner/interface'


import * as d_in from "../../../../interface/to_be_generated/json_with_parse_info"
import * as d_in_location from "astn-core/dist/interface/generated/liana/schemas/location/data"
import * as d_out from "../../../../interface/to_be_generated/json_x"
import * as d_function from "../../../../interface/to_be_generated/unmarshalled_from_json"
import p_unreachable_code_path from 'pareto-core/dist/specials/unreachable_code_path'

//dependencies
import * as r_json_y from "../json_y/json_with_parse_info"


export const Array: p_ri.Refiner<
    d_out.Array,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'array': return pt.ss($, ($) => $)
            default: return abort({
                'type': ['unexpected type', { 'expected': pt.list.literal(["array"]) }],
                'range': value.range,
            })
        }
    })
}

export const Boolean: p_ri.Refiner<
    d_out.Boolean,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'boolean': return pt.ss($, ($) => $)
            default: return abort({
                'type': ['unexpected type', { 'expected': pt.list.literal(["boolean"]) }],
                'range': value.range,
            })
        }
    })
}

export const Null: p_ri.Refiner<
    d_out.Null,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'null': return pt.ss($, ($) => $)
            default: return abort({
                'type': ['unexpected type', { 'expected': pt.list.literal(["null"]) }],
                'range': value.range,
            })
        }
    })
}

export const Number: p_ri.Refiner<
    d_out.Number,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'number': return pt.ss($, ($) => $)
            default: return abort({
                'type': ['unexpected type', { 'expected': pt.list.literal(["number"]) }],
                'range': value.range,
            })
        }
    })
}

export const Object: p_ri.Refiner<
    d_out.Object,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'object': return pt.ss($, ($) => $)
            default: return abort({
                'type': ['unexpected type', { 'expected': pt.list.literal(["object"]) }],
                'range': value.range,
            })
        }
    })
}

export const Object_No_Unexpected_Properties_From_Value: p_ri.Refiner_With_Parameter<
    d_out.Object_No_Unexpected_Properties,
    d_function.Error,
    d_in.Value,
    {
        'expected properties': p_di.Dictionary<null>
    }
> = ($, abort, $p) => Object_No_Unexpected_Properties_From_Object(
    Object($, abort),
    abort,
    $p
)

export const Object_No_Unexpected_Properties_From_Object: p_ri.Refiner_With_Parameter<
    d_out.Object_No_Unexpected_Properties,
    d_function.Error,
    d_in.Object,
    {
        'expected properties': p_di.Dictionary<null>
    }
> = ($, abort, $p) => {


    const object = r_json_y.Object_With_Unique_Keys_From_Object($, abort)

    const unexpected_properties = pt.dictionary.from.dictionary(
        pt.dictionary.from.dictionary(
            object.properties,
        ).join(
            $p['expected properties'],
            ($, other, id): p_di.Optional_Value<d_in_location.Range> => pt.decide.optional(
                other,
                () => pt.optional.literal.not_set(),
                () => pt.optional.literal.set($.key.range)
            )
        )
    ).map_optionally(
        ($) => $
    )

    if (unexpected_properties.__get_number_of_entries() > 0) {
        return abort({
            'type': ['unexpected properties', {
                'expected properties': $p['expected properties'],
                'unexpected properties': unexpected_properties,
            }],
            'range': object.range,
        })
    }
    return object
}

export const String: p_ri.Refiner<
    d_out.String,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'string': return pt.ss($, ($) => $)
            default: return abort({
                'type': ['unexpected type', { 'expected': pt.list.literal(["string"]) }],
                'range': value.range,
            })
        }
    })
}

export const Property: p_ri.Refiner_With_Parameter<
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
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'null': return pt.optional.literal.not_set()
            default: return pt.optional.literal.set(value)
        }
    })
}