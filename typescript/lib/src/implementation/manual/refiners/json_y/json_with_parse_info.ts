import * as p_ from 'pareto-core/dist/implementation/refiner'

import * as p_i from 'pareto-core/dist/interface/refiner'
import * as p_temp from 'pareto-core/dist/implementation/transformer'
import p_unreachable_code_path from 'pareto-core/dist/implementation/specials/unreachable_code_path'

import * as d_in from "../../../../interface/data/json_with_parse_info"
import * as d_out from "../../../../interface/data/json_x"
import * as d_function from "../../../../interface/data/unmarshalled_from_json"

import * as r_json_x from "../json_x/json_with_parse_info"

export const Object_With_Unique_Keys_From_Object: p_i.Refiner<
    d_out.Object_With_Unique_Keys,
    d_function.Error,
    d_in.Object
> = ($, abort) => {
    const object = $

    return {
        'properties': p_temp.from.list(
            object.entries
        ).group(
            ($) => $.key.token.value
        ).__d_map_deprecated(
            ($, id) => p_temp.from.list(
                $
            ).on_has_single_item(
                ($) => $,
                ($) => abort({
                    'type': ['multiple properties with this key', id],
                    'range': object.dictionary['{'].range,
                }),
                () => p_unreachable_code_path("the list is the result of a 'group' operation, it cannot be empty")
            )
        )
        ,
        'range': $.dictionary['{'].range
    }
}

export const Object_With_Unique_Keys_From_Value: p_i.Refiner<
    d_out.Object_With_Unique_Keys,
    d_function.Error,
    d_in.Value
> = ($, abort) => Object_With_Unique_Keys_From_Object(
    r_json_x.Object($, abort),
    abort
)