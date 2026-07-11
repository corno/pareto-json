
import type * as p_i from 'pareto-core/interface/refiner'
import * as p_temp from 'pareto-core/implementation/transformer'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

import type * as s_in from "../../../interface/schemas/json_with_parse_info.js"
import type * as s_out from "../../../interface/schemas/json_x.js"
import type * as s_function from "../../../interface/schemas/unmarshalled_from_json.js"

import * as r_json_x from "../json_x/json_with_parse_info.js"

export const Object_With_Unique_Keys_From_Object: p_i.Refiner<
    s_out.Object_With_Unique_Keys,
    s_function.Error,
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
    s_function.Error,
    s_in.Value
> = ($, abort) => Object_With_Unique_Keys_From_Object(
    r_json_x.Object($, abort),
    abort
)