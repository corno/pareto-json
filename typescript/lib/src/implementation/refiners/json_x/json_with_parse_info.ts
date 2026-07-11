import * as p_ from 'pareto-core/implementation/refiner'
import * as p_t from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/refiner'
import type * as p_di from 'pareto-core/interface/data'


import type * as d_in from "../../../interface/schemas/json_with_parse_info.js"
import type * as d_in_location from "astn-core/interface/data/location"
import type * as d_out from "../../../interface/schemas/json_x.js"
import type * as d_function from "../../../interface/schemas/unmarshalled_from_json.js"

//dependencies
import * as r_json_y from "../json_y/json_with_parse_info.js"


export const Array: p_i.Refiner<
    d_out.Array,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'array': return p_.option($, ($) => $)
                default: return abort({
                    'type': ['unexpected type', { 'expected': p_.literal.list(["array"]) }],
                    'range': value.range,
                })
            }
        })
}

export const Boolean: p_i.Refiner<
    d_out.Boolean,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'boolean': return p_.option($, ($) => $)
                default: return abort({
                    'type': ['unexpected type', { 'expected': p_.literal.list(["boolean"]) }],
                    'range': value.range,
                })
            }
        })
}

export const Null: p_i.Refiner<
    d_out.Null,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'null': return p_.option($, ($) => $)
                default: return abort({
                    'type': ['unexpected type', { 'expected': p_.literal.list(["null"]) }],
                    'range': value.range,
                })
            }
        })
}

export const Number: p_i.Refiner<
    d_out.Number,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'number': return p_.option($, ($) => $)
                default: return abort({
                    'type': ['unexpected type', { 'expected': p_.literal.list(["number"]) }],
                    'range': value.range,
                })
            }
        })
}

export const Object: p_i.Refiner<
    d_out.Object,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'object': return p_.option($, ($) => $)
                default: return abort({
                    'type': ['unexpected type', { 'expected': p_.literal.list(["object"]) }],
                    'range': value.range,
                })
            }
        })
}

export const Object_No_Unexpected_Properties_From_Value: p_i.Refiner_With_Parameter<
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

export const Object_No_Unexpected_Properties_From_Object: p_i.Refiner_With_Parameter<
    d_out.Object_No_Unexpected_Properties,
    d_function.Error,
    d_in.Object,
    {
        'expected properties': p_di.Dictionary<null>
    }
> = ($, abort, $p) => {


    const object = r_json_y.Object_With_Unique_Keys_From_Object($, abort)

    //fixme: use p_assert
    const $v_unexpected_properties = p_t.from.dictionary(
        p_t.from.dictionary(object.properties).join(
            $p['expected properties'],
            ($, other, id): p_di.Optional_Value<d_in_location.Range> => p_t.from.optional(other).decide(
                () => p_.literal.not_set(),
                () => p_.literal.set($.key.range)
            )
        )
    ).map_optionally(
        ($) => $
    )

    return p_t.from.dictionary($v_unexpected_properties).on_has_entries(
        ($) => abort({
            'type': ['unexpected properties', {
                'expected properties': $p['expected properties'],
                'unexpected properties': $v_unexpected_properties,
            }],
            'range': object.range,
        }),
        () => object
    )
}

export const String: p_i.Refiner<
    d_out.String,
    d_function.Error,
    d_in.Value
> = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'string': return p_.option($, ($) => $)
                default: return abort({
                    'type': ['unexpected type', { 'expected': p_.literal.list(["string"]) }],
                    'range': value.range,
                })
            }
        })
}

export const Property: p_i.Refiner_With_Parameter<
    d_out.Property,
    d_function.Error,
    d_out.Object_With_Unique_Keys,
    {
        'key': string
    }
> = ($, abort, $p) => {
    const range = $.range
    return p_.from.dictionary($.properties).get_entry(
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
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'null': return p_.literal.not_set()
                default: return p_.literal.set(value)
            }
        })
}