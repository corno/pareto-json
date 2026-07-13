import * as p_ from 'pareto-core/implementation/refiner'
import * as p_t from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/refiner'
import type * as p_di from 'pareto-core/interface/schema'

import type * as s_out from "../../../private_schemas/json_x.js"
import type * as s_in from "../../../interface/schemas/json_with_parse_info.js"
import type * as s_in_location from "../../../interface/schemas/location.js"
import type * as s_function from "../../../private_schemas/unmarshalled_from_json.js"

//dependencies
import * as r_json_y from "../json_y/json_with_parse_info.js"


export const Array: p_i.Refiner<
    s_out.Array,
    s_function.Error,
    s_in.Value
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
    s_out.Boolean,
    s_function.Error,
    s_in.Value
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
    s_out.Null,
    s_function.Error,
    s_in.Value
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
    s_out.Number,
    s_function.Error,
    s_in.Value
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
    s_out.Object,
    s_function.Error,
    s_in.Value
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
    s_out.Object_No_Unexpected_Properties,
    s_function.Error,
    s_in.Value,
    {
        'expected properties': p_di.Dictionary<null>
    }
> = ($, abort, $p) => Object_No_Unexpected_Properties_From_Object(
    Object($, abort),
    abort,
    $p
)

export const Object_No_Unexpected_Properties_From_Object: p_i.Refiner_With_Parameter<
    s_out.Object_No_Unexpected_Properties,
    s_function.Error,
    s_in.Object,
    {
        'expected properties': p_di.Dictionary<null>
    }
> = ($, abort, $p) => {


    const object = r_json_y.Object_With_Unique_Keys_From_Object($, abort)

    //fixme: use p_assert
    const $v_unexpected_properties = p_t.from.dictionary(
        p_t.from.dictionary(object.properties).join(
            $p['expected properties'],
            ($, other, id): p_di.Optional_Value<s_in_location.Range> => p_t.from.optional(other).decide(
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
    s_out.String,
    s_function.Error,
    s_in.Value
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
    s_out.Property,
    s_function.Error,
    s_out.Object_With_Unique_Keys,
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
    $: s_in.Value,
): s_out.Nullable_Value => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'null': return p_.literal.not_set()
                default: return p_.literal.set(value)
            }
        })
}