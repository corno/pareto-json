import * as pi from 'pareto-core/dist/interface'
import * as pt from 'pareto-core/dist/assign'
import p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

import * as d_in from "../../../../interface/to_be_generated/json_with_parse_info"
import * as d_out from "../../../../interface/to_be_generated/json_x"
import * as d_function from "../../../../interface/to_be_generated/unmarshalled_from_json"

import * as r_json_x from "../json_x/json_with_parse_info"

export const Object_With_Unique_Keys_From_Object: pi.Refiner<
    d_out.Object_With_Unique_Keys,
    d_function.Error,
    d_in.Object
> = ($, abort) => {
    const object = $

    const found_properties = pt.dictionary.from.list(
        object.entries
    ).group(
        ($) => $.key.token.value
    ).__d_map(
        ($, id) => pt.decide.list(
            $
        ).has_single_item(
            ($) => $,
            ($) => abort({
                'type': ['multiple properties with this key', id],
                'range': object.dictionary['{'].range,
            }),
            () => p_unreachable_code_path("the list is the result of a 'group' operation, it cannot be empty")
        )
    )

    return {
        'properties': found_properties,
        'range': object.dictionary['{'].range
    }
}

export const Object_With_Unique_Keys_From_Value: pi.Refiner<
    d_out.Object_With_Unique_Keys,
    d_function.Error,
    d_in.Value
> = ($, abort) => Object_With_Unique_Keys_From_Object(
    r_json_x.Object($, abort),
    abort
)