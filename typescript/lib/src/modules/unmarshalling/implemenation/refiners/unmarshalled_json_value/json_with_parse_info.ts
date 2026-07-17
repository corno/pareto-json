import * as p_ from 'pareto-core/implementation/refiner'
import * as p_temp from 'pareto-core/implementation/transformer'

import type * as p_i from 'pareto-core/interface/refiner'
import type * as p_di from 'pareto-core/interface/schema'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'


import type * as s_out from "../../../schemas/unmarshalled_json_value.js"
import type * as s_in from "../../../../deserialization/schemas/deserialized_json.js"
import type * as s_in_location from "../../../../deserialization/schemas/location.js"
import type * as s_error from "../../../schemas/json_value_unmarshalling.js"


export const Array: p_i.Refiner<
    s_out.Array,
    s_error.Error,
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
    s_error.Error,
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
    s_error.Error,
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
        }
    )
}

export const Number: p_i.Refiner<
    s_out.Number,
    s_error.Error,
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
    s_error.Error,
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
    s_error.Error,
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
    s_error.Error,
    s_in.Object,
    {
        'expected properties': p_di.Dictionary<null>
    }
> = ($, abort, $p) => {


    const object = Object_With_Unique_Keys_From_Object($, abort)

    //fixme: use p_assert
    const $v_unexpected_properties = p_temp.from.dictionary(
        p_temp.from.dictionary(object.properties).join(
            $p['expected properties'],
            ($, other, id): p_di.Optional_Value<s_in_location.Range> => p_temp.from.optional(other).decide(
                () => p_.literal.not_set(),
                () => p_.literal.set($.key.range)
            )
        )
    ).map_optionally(
        ($) => $
    )

    return p_temp.from.dictionary($v_unexpected_properties).on_has_entries(
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
    s_error.Error,
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
    s_error.Error,
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

export const Nullable_Value: p_.Refiner_Without_Error<
    s_out.Nullable_Value,
    s_in.Value
> = ($)=> {
        const value = $
        return p_.from.state($.type).decide(
            ($) => {
                switch ($[0]) {
                    case 'null': return p_.literal.not_set()
                    default: return p_.literal.set(value)
                }
            })
    }

export const Object_With_Unique_Keys_From_Object: p_i.Refiner<
    s_out.Object_With_Unique_Keys,
    s_error.Error,
    s_in.Object
> = ($, abort) => {
    const $v_object = $

    return {
        'properties': p_temp.from.list($v_object.entries).group(
            ($) => $.key.token.value,
            ($, id) => p_temp.from.list($).on_has_single_item(
                ($) => $,
                ($) => abort({
                    'type': ['multiple properties with this key', id],
                    'range': $v_object.dictionary['{'].range,
                }),
                () => p_unreachable_code_path("the list is the result of a 'group' operation, it cannot be empty")
            )
        ),
        'range': $.dictionary['{'].range
    }
}

export const Object_With_Unique_Keys_From_Value: p_i.Refiner<
    s_out.Object_With_Unique_Keys,
    s_error.Error,
    s_in.Value
> = ($, abort) => Object_With_Unique_Keys_From_Object(
    Object($, abort),
    abort
)